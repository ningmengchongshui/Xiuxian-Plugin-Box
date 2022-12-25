import noderequire from '../db/noderequire.js'
const FS = noderequire.fs()
const path = noderequire.path()
const other = `${path.resolve()}${path.sep}config${path.sep}config/other.yaml`
const group = `${path.resolve()}${path.sep}config${path.sep}config/group.yaml`
const map = {
  'return': '请先执行\npnpm i yamljs -w\npnpm i  js-yaml -w',
  'off': '关闭成功',
  'on': '开启成功',
  'setUp': '设置成功',
  'delete': '删除成功',
  'add': '添加成功'
}
class defset {
  constructor() {
    try {
      this.YAMLJS = noderequire.yamlJs()
    } catch { }
    try {
      this.JSYAML = noderequire.jsYaml()
    } catch { }
  }
  ReadConfig = () => {
    try {
      const data = this.YAMLJS.load(group)
      data.default.disable = ['十连', '角色查询', '体力查询', '用户绑定', '抽卡记录', '添加表情', '欢迎新人', '退群通知', '云崽帮助', '角色素材', '今日素材', '养成计算', '米游社公告']
      const yamlStr = this.JSYAML.dump(data)
      FS.writeFileSync(group, yamlStr, 'utf8')
      return map['off']
    } catch {
      return map['return']
    }
  }
  ReadConfighelp = () => {
    try {
      const data = this.YAMLJS.load(group)
      data.default.disable.push(...['云崽帮助'])
      const yamlStr = this.JSYAML.dump(data)
      FS.writeFileSync(group, yamlStr, 'utf8')
      return map['setUp']
    } catch {
      return map['return']
    }
  }
  AddMaster = (mastername) => {
    try {
      const QQ = Number(mastername)
      const data = this.YAMLJS.load(other)
      data.masterQQ.push(QQ)
      const yamlStr = this.JSYAML.dump(data)
      FS.writeFileSync(other, yamlStr, 'utf8')
      return map['add']
    } catch {
      return map['return']
    }
  }
  DeleteMaster = (mastername) => {
    try {
      const QQ = Number(mastername)
      const data = this.YAMLJS.load(other)
      const sum = []
      data.masterQQ.forEach((item) => {
        if (item != QQ) {
          sum.push(item)
        }
      })
      data.masterQQ = sum
      const yamlStr = this.JSYAML.dump(data)
      FS.writeFileSync(other, yamlStr, 'utf8')
      return map['delete']
    } catch {
      return map['return']
    }
  }
  OffGroup = () => {
    try {
      const data = this.YAMLJS.load(other)
      data.disablePrivate = true
      const yamlStr = this.JSYAML.dump(data)
      FS.writeFileSync(other, yamlStr, 'utf8')
      return map['off']
    } catch {
      return map['return']
    }
  }
  OnGroup = () => {
    try {
      const data = this.YAMLJS.load(other)
      data.disablePrivate = false
      const yamlStr = this.JSYAML.dump(data)
      FS.writeFileSync(other, yamlStr, 'utf8')
      return map['on']
    } catch {
      return map['return']
    }
  }
}
export default new defset()
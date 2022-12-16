import noderequire from '../db/noderequire.js'
const FS = noderequire.fs()
const path = noderequire.path()
const __dirname = `${path.resolve()}${path.sep}plugins${path.sep}Xiuxian-Plugin-Box${path.sep}config${path.sep}xiuxian${path.sep}xiuxian.yaml`
const config = {
  '突破冷却': 'CD.Level_up',
  '破体冷却': 'CD.LevelMax_up',
  '道宣冷却': 'CD.Autograph',
  '改名冷却': 'CD.Name',
  '重生冷却': 'CD.Reborn',
  '赠送冷却': 'CD.Transfer',
  '攻击冷却': 'CD.Attack',
  '击杀冷却': 'CD.Kill',
  '白名单群': 'group.white',
  '年龄每小时增加': 'Age.size',
  '最多功法持有数': 'myconfig.gongfa',
  '最多装备持有数': 'myconfig.equipment',
  '闭关倍率': 'biguan.size',
  '闭关时间': 'biguan.time',
  '降妖倍率': 'work.size',
  '降妖时间': 'work.time',
}
const map = {
  'return': '请先执行\npnpm i yamljs -w\npnpm i  js-yaml -w',
  'noconfig': '无配置信息'
}
class XiuxianYaml {
  constructor() {
    try {
      this.YAML = noderequire.yamlJs()
    } catch {
    }
    try {
      this.yaml = noderequire.jsYaml()
    } catch {
    }
  }
  config = (name, size) => {
    if (config.hasOwnProperty(name)) {
      const [name0, name1] = config[name].split('.')
      try {
        const data = this.YAML.load(`${__dirname}`)
        data[name0][name1] = Number(size)
        const yamlStr = this.yaml.dump(data)
        FS.writeFileSync(`${__dirname}`, yamlStr, 'utf8')
        return `updata:${data[name0][name1]}=${size}`
      } catch {
        return map['return']
      }
    } else {
      return map['noconfig']
    }
  }
}
export default new XiuxianYaml()
import { appname } from './index.js'
import config from '../xiuxian/config.js'
const dirname = `plugins/${appname}/resources`
class Help {
  constructor() {
    super()
    this.userId = 'help'  //文件标记
    this.model = ''
    this._path = process.cwd().replace(/\\/g, '/')
  }
  get prefix() {
    return `Yz:${appname}:${this.model}:`
  }
  //这里才是要反馈的
  get screenData() {
    return {
      //html保存id
      saveId: this.userId,
      //模板html路径                    //
      tplFile: `./${dirname}/html/${this.model0}/${this.model}.html`,
      /** 绝对路径 */
      //插件资源路径
      pluResPath: `${this._path}/${dirname}/`,
    }
  }

  static gethelp = async (data1, data2) => {
    let helpData = config.getConfig(data1, data2)
    let versionData = config.getdefset('version', 'version')
    return {
      saveId: this.userId,//这里其实是文件名
      version: versionData[0].version,
      helpData,
    }
  }
}
export default new Help()
import { appname } from '../index.js'
const dirname = `plugins/${appname}/resources`
class Help {
  constructor() {
    this.userId = 'help'  //文件标记
    this.name = ''    //地址标记
    this._path = process.cwd().replace(/\\/g, '/')  //插件位置 
  }
  /**
   * @param {地址} path 
   * @param {文件名} name 
   * @param {数据地址} data1 
   * @param {数据文件名} data2 
   * @returns 
   */
  gethelp = async (path, name, data1, data2) => {
    this.name = name
    //tudo
    //帮助图数据
    const helpData = ""
    return {
      saveId: this.userId,//这里其实是文件名
      //模板html路径  
      tplFile: `./${dirname}/html/${path}/${this.name}.html`,
      /** 绝对路径 */
      pluResPath: `${this._path}/${dirname}/`,
      version: "v2.0",
      helpData
    }
  }
}
export default new Help()
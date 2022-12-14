import FS from 'node:fs'
import path from 'path'
import {existplayer,userstart} from './index.js'
const __dirname = `${path.resolve()}${path.sep}plugins`
class dataup {
  constructor() { }
  pluginupdata = (pluginname) => {
    try {
      const newpath = `${pluginname}${path.sep}resources${path.sep}data${path.sep}xiuxian_player`
      const NEW__PATH = `${__dirname}${path.sep}${newpath}`
      const data = this.getadress(NEW__PATH, 'json')
      data.forEach(async (item) => {
        const user_qq = item.replace(`${NEW__PATH}${path.sep}`, '').replace('.json', '')
        await this.Create_player(user_qq)
        const player = await this.Read(item)
        let level = await Read_level(user_qq) 
        level.level_id = await Numbers(player.level_id / 5)
        level.levelmax_id = await Numbers(player.Physique_id / 5)
        level.experience = await Numbers(player.修为)
        level.experiencemax = await Numbers(player.血气)
        await Write_level(user_qq, level)
        let wealth = await Read_wealth(user_qq)
        wealth.lingshi = await Numbers(player.灵石)
        await Write_wealth(user_qq, wealth)
      })
      return `共${data.length}名获得前世记忆`
    } catch {
      return '升级失败'
    }
  }
  /**
   * 
   * @param {地址} PATH 
   * @param {文件类型} type 
   * @returns 含有所有数据的路径
   */
  getadress = (PATH, type) => {
    const newsum = []
    const travel = (dir, callback) => {
      FS.readdirSync(dir).forEach((file) => {
        var pathname = path.join(dir, file)
        if (FS.statSync(pathname).isDirectory()) {
          travel(pathname, callback)
        } else {
          callback(pathname)
        }
      })
    }
    travel(PATH, (pathname) => {
      let temporary = pathname.search(type)
      if (temporary != -1) {
        newsum.push(pathname)
      }
    })
    return newsum
  }
  /**
   * 这里需要一个专门用来给升级写的初始化存档
   */
  Create_player = async (UID) => {
    const ifexistplay = await existplayer(UID)
    if (ifexistplay) {
      return
    }
    await userstart(UID)
    return
  }
  /**
   * 读取数据
   */
  Read = async (PATH) => {
    const dir = path.join(`${PATH}`)
    let player = FS.readFileSync(dir, 'utf8', (err, data) => {
      if (err) {
        return 'error'
      }
      return data
    })
    player = JSON.parse(player)
    return player
  }
}
export default new dataup()
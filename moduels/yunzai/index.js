import nodefs from '../db/nodefs.js'
import noderequire from "../db/noderequire.js"
import { __dirname } from '../db/nodefs.js'
import { existplayer } from '../xiuxian/index.js'
const PATH = noderequire.path()
//插件名字：
export const appname = 'Xiuxian-Plugin-Box'
//插件配置
export const yunzaiConfig = (name, rule) => {
    return { name: name, dsc: name, event: 'message', priority: 400, rule: rule }
}
//修仙地址
export const NEW__dirname = `${__dirname}/plugins/${appname}`
//修仙数据
export const __PATH = {
    //基础
    'fixepoint': PATH.join(NEW__dirname, '/resources/data/fixed/point'),
    'fixedposition': PATH.join(NEW__dirname, '/resources/data/fixed/position'),
    'fixedequipment': PATH.join(NEW__dirname, '/resources/data/fixed/equipment'),
    'fixedgoods': PATH.join(NEW__dirname, '/resources/data/fixed/goods'),
    'fixedLevel': PATH.join(NEW__dirname, '/resources/data/fixed/Level'),
    'fixedoccupation': PATH.join(NEW__dirname, '/resources/data/fixed/occupation'),
    'fixedtalent': PATH.join(NEW__dirname, '/resources/data/fixed/talent'),
    //生成
    'all': PATH.join(NEW__dirname, '/resources/data/birth/all'),
    'position': PATH.join(NEW__dirname, '/resources/data/birth/position'),
    'Level': PATH.join(NEW__dirname, '/resources/data/birth/Level'),
    //玩家
    'player': PATH.join(NEW__dirname, '/resources/data/birth/xiuxian/player'),
    'action': PATH.join(NEW__dirname, '/resources/data/birth/xiuxian/action'),
    'battle': PATH.join(NEW__dirname, '/resources/data/birth/xiuxian/battle'),
    'equipment': PATH.join(NEW__dirname, '/resources/data/birth/xiuxian/equipment'),
    'talent': PATH.join(NEW__dirname, '/resources/data/birth/xiuxian/talent'),
    'wealth': PATH.join(NEW__dirname, '/resources/data/birth/xiuxian/wealth'),
    'najie': PATH.join(NEW__dirname, '/resources/data/birth/xiuxian/najie'),
    'Exchange': PATH.join(NEW__dirname, '/resources/data/birth/exchange'),
    'Forum': PATH.join(NEW__dirname, '/resources/data/birth/forum'),
    //寿命
    'life': PATH.join(NEW__dirname, '/resources/data/birth/xiuxian/life')
}
/**
 * 指令检测
 * @param {消息} e 
 * @returns 真假
 */
export const Go = async (e) => {
    if (!e.isGroup) {
        return false
    }
    const UID = e.user_id
    const ifexistplay = await existplayer(UID)
    if (!ifexistplay) {
        return false
    }
    let action = await redis.get(`xiuxian:player:${UID}:action`)
    if (action != undefined) {
        action = JSON.parse(action)
        if (action.actionName == undefined) {
            e.reply('旧版数据残留,请联系主人使用[#修仙删除数据]')
            return false
        }
        e.reply(`${action.actionName}中...`)
        return false
    }
    return true
}
/**
 * 艾特
 * @param {消息} e 
 * @returns UID
 */
export const At = async (e) => {
    const isat = e.message.some((item) => item.type === 'at')
    if (!isat) {
        return 0
    }
    const atItem = e.message.filter((item) => item.type === 'at')
    const B = atItem[0].qq
    const ifexistplay = await existplayer(B)
    if (!ifexistplay) {
        return 0
    }
    return B
}
//生成动态数据
nodefs.newlist(__PATH['Level'], 'levellist0', [])
nodefs.newlist(__PATH['Level'], 'levellist0', [
    ...nodefs.getlist(__PATH['fixedLevel'], 'levellist0.json')
])
nodefs.newlist(__PATH['Level'], 'levellist1', [])
nodefs.newlist(__PATH['Level'], 'levellist1', [
    ...nodefs.getlist(__PATH['fixedLevel'], 'levellist1.json')
])
nodefs.newlist(__PATH['all'], 'all', [])
nodefs.newlist(__PATH['all'], 'all', [
    ...nodefs.getlist(__PATH['fixedequipment'], 'json'),
    ...nodefs.getlist(__PATH['fixedgoods'], 'json')
])
nodefs.newlist(__PATH['all'], 'commodities', [])
nodefs.newlist(__PATH['all'], 'commodities', [
    ...nodefs.getlist(__PATH['fixedgoods'], '0.json')
])
nodefs.newlist(__PATH['all'], 'dropsItem', [])
nodefs.newlist(__PATH['all'], 'dropsItem', [
    ...nodefs.getlist(__PATH['fixedequipment'], 'json'),
    ...nodefs.getlist(__PATH['fixedgoods'], 'json')
])
nodefs.newlist(__PATH['position'], 'position', [])
nodefs.newlist(__PATH['position'], 'position', [
    ...nodefs.getlist(__PATH['fixedposition'], 'json')
])
nodefs.newlist(__PATH['position'], 'point', [])
nodefs.newlist(__PATH['position'], 'point', [
    ...nodefs.getlist(__PATH['fixepoint'], 'json')
])
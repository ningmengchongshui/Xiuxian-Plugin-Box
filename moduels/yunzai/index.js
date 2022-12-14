import { __dirname } from '../db/nodefs.js'
import { existplayer,Read_battle } from '../xiuxian/index.js'
import PATH from 'path'
//插件名字
export const appname = 'Xiuxian-Plugin-Box'
//插件优先级
export const NEW__dirname = `${__dirname}/plugins/${appname}`
export const __PATH = {
    'fixepoint': PATH.join(NEW__dirname, '/resources/data/fixed/point'),
    'fixedposition': PATH.join(NEW__dirname, '/resources/data/fixed/position'),
    'fixedequipment': PATH.join(NEW__dirname, '/resources/data/fixed/equipment'),
    'fixedgoods': PATH.join(NEW__dirname, '/resources/data/fixed/goods'),
    'fixedLevel': PATH.join(NEW__dirname, '/resources/data/fixed/Level'),
    'fixedoccupation': PATH.join(NEW__dirname, '/resources/data/fixed/occupation'),
    'fixedtalent': PATH.join(NEW__dirname, '/resources/data/fixed/talent'),
    'all': PATH.join(NEW__dirname, '/resources/data/birth/all'),
    'position': PATH.join(NEW__dirname, '/resources/data/birth/position'),
    'Level': PATH.join(NEW__dirname, '/resources/data/birth/Level'),
    'player': PATH.join(__dirname, '/resources/data/birth/xiuxian/player'),
    'action': PATH.join(__dirname, '/resources/data/birth/xiuxian/action'),
    'battle': PATH.join(__dirname, '/resources/data/birth/xiuxian/battle'),
    'equipment': PATH.join(__dirname, '/resources/data/birth/xiuxian/equipment'),
    'level': PATH.join(__dirname, '/resources/data/birth/xiuxian/level'),
    'talent': PATH.join(__dirname, '/resources/data/birth/xiuxian/talent'),
    'wealth': PATH.join(__dirname, '/resources/data/birth/xiuxian/wealth'),
    'najie': PATH.join(__dirname, '/resources/data/birth/xiuxian/najie'),
    'Exchange': PATH.join(__dirname, '/resources/data/birth/Exchange'),
    'Forum': PATH.join(__dirname, '/resources/data/birth/Forum'),
    'life': PATH.join(__dirname, '/resources/data/birth/xiuxian/life')
}
export const yunzaiConfig = (name, rule) => {
    return { name: name, dsc: name, event: 'message', priority: 400, rule: rule }
}

export const Gomini = async (e) => {
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
            e.reply('存在旧版本残留,请联系主人使用[#修仙删除数据]')
            return false
        }
        e.reply(action.actionName + '中...')
        return false
    }
    return true
}

/**
 * 状态封锁查询
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
    const player = await Read_battle(UID)
    if (player.nowblood <= 1) {
        e.reply('血量不足...')
        return false
    }
    return true
}

/**
 * 艾特并返回QQ
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

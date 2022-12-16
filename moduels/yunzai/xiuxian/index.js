import { existplayer } from '../../xiuxian/index.js'
const map = {
    'undefined': '旧版数据残留,请联系主人使用[#修仙删除数据]'
}
/**
 * 指令检测
 */
export const Go = async (e) => {
    if (!e.isGroup) {
        return false
    }
    const ifexistplay = await existplayer(e.user_id)
    if (!ifexistplay) {
        return false
    }
    let action = await redis.get(`xiuxian:player:${e.user_id}:action`)
    if (action != undefined) {
        action = JSON.parse(action)
        if (action.actionName == undefined) {
            e.reply(map['undefined'])
            return false
        }
        e.reply(`${action.actionName}...`)
        return false
    }
    return true
}
/**
 * 艾特获得UID
 * @param {} e 
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
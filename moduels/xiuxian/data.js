import picture from '../yunzai/help/picture.js'
import Show from '../yunzai/help/show.js'
import config from './config.js'
import { talentname, Read_battle, Read_player, Read_wealth, Read_talent, Read_equipment, Read_level, Read_najie, Read_Life, existplayer } from './index.js'
export const get_map_img = async (UID) => {
    const ifexistplay = await existplayer(UID)
    if (!ifexistplay) {
        return
    }
    const myData = {}
    const data = await Show.get_Data('map', 'map', myData, UID)
    const img = await picture.puppeteer('player', data)
    return img
}
export const get_updata_img = async (UID) => {
    const ifexistplay = await existplayer(UID)
    if (!ifexistplay) {
        return
    }
    const updata = config.getdefset('version', 'version')
    const myData = {
        version: updata
    }
    const data = await Show.get_Data('updata', 'updata', myData)
    const img = await picture.puppeteer('player', data)
    return img
}
export const get_config_img = async (e) => {
    if (!e.isMaster) {
        return
    }
    const xiuxain = config.getConfig('xiuxian', 'xiuxian')
    const myData = {
        xiuxain: xiuxain
    }
    const data = await Show.get_Data('config', 'config', myData, UID)
    const img = await picture.puppeteer('player', data)
    return img
}
export const get_player_img = async (UID) => {
    const ifexistplay = await existplayer(UID)
    if (!ifexistplay) {
        return
    }
    const player = await Read_player(UID)
    const wealt = await Read_wealth(UID)
    const equipment = await Read_equipment(UID)
    const talent = await Read_talent(UID)
    const level = await Read_level(UID)
    const battle = await Read_battle(UID)
    const linggenname = await talentname(talent)
    let life = await Read_Life()
    life = life.find(item => item.qq == UID)
    let name = ''
    for (var i = 0; i < linggenname.length; i++) {
        name = name + linggenname[i]
    }
    let size = Math.trunc(talent.talentsize)
    if (await talent.talentshow != 0) {
        size = '未知'
        name = '未知'
    } else {
        size = `+${size}%`
    }
    const myData = {
        user_id: UID,
        life: life,
        player: player,
        level: level,
        linggenname: name,
        battle: battle,
        equipment: equipment,
        lingshi: Math.trunc(wealt.lingshi),
        xianshi: Math.trunc(wealt.xianshi),
        talent: talent,
        talentsize: size
    }
    const data = await Show.get_Data('user/player', 'player', myData, UID)
    const img = await picture.puppeteer('player', data)
    return img
}
export const get_equipment_img = async (UID) => {
    const ifexistplay = await existplayer(UID)
    if (!ifexistplay) {
        return
    }
    const battle = await Read_battle(UID)
    const equipment = await Read_equipment(UID)
    let life = await Read_Life()
    life = life.find(item => item.qq == UID)
    const myData = {
        user_id: UID,
        battle: battle,
        life: life,
        equipment: equipment
    }
    const data = await Show.get_Data('user/equipment', 'equipment', myData, UID)
    const img = await picture.puppeteer('player', data)
    return img
}
export const get_najie_img = async (UID) => {
    const ifexistplay = await existplayer(UID)
    if (!ifexistplay) {
        return
    }
    let life = await Read_Life()
    life = life.find(item => item.qq == UID)
    const player = await Read_player(UID)
    const battle = await Read_battle(UID)
    const najie = await Read_najie(UID)
    const thing = najie.thing
    const thing_list = []
    const danyao_list = []
    const daoju_list = []
    thing.forEach((item, index) => {
        let id = item.id.split('-')
        if (id[0] == 4) {
            danyao_list.push(item)
        } else if (id[0] == 6) {
            daoju_list.push(item)
        } else {
            thing_list.push(item)
        }
    })
    const myData = {
        user_id: UID,
        player: player,
        life: life,
        battle: battle,
        najie: najie,
        thing: thing_list,
        daoju_list: daoju_list,
        danyao_list: danyao_list
    }
    const data = await Show.get_Data('user/najie', 'najie', myData, UID)
    const img = await picture.puppeteer('player', data)
    return img
}
export const get_toplist_img = async (UID, list) => {
    const ifexistplay = await existplayer(UID)
    if (!ifexistplay) {
        return
    }
    const myData = {
        list: list,
    }
    const data = await Show.get_Data('toplist', 'toplist', myData, UID)
    const img = await picture.puppeteer('player', data)
    return img
}
import plugin from '../../../../lib/plugins/plugin.js'
import nodefs from '../../moduels/db/nodefs.js'
import { existplayer, Read_action, point_map, sortBy, Read_level, Read_battle } from '../../moduels/xiuxian/index.js'
import { get_toplist_img } from '../../moduels/yunzai/data.js'
import { yunzaiConfig } from '../../moduels/yunzai/index.js'
export class toplist extends plugin {
    constructor() {
        super(yunzaiConfig('secretplace', [
            {
                reg: '^#封神榜$',
                fnc: 'TOP_Immortal'
            },
            {
                reg: '^#至尊榜$',
                fnc: 'TOP_genius'
            },
            {
                reg: '^#杀神榜$',
                fnc: 'TOP_prestige'
            }
        ]))
    }
    TOP_prestige = async (e) => {
        const UID = e.user_id
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        const action = await Read_action(UID)
        const address_name = '天机门'
        const map = await point_map(action, address_name)
        if (!map) {
            e.reply(`需[#城池名+${address_name}]`)
            return
        }
        const playerList = await nodefs.returnjson()
        const temp = []
        const list = []
        for (let item of playerList) {
            const newbattle = await Read_level(item)
            if (newbattle.prestige > 0) {
                const battle = {
                    'QQ': item,
                    'power': newbattle.prestige,
                    'name': 'MP'
                }
                temp.push(battle)
            }
        }
        if (temp.length == 0) {
            e.reply('此界皆是良民')
            return
        }
        temp.sort(sortBy('power'))
        temp.forEach((item, index) => {
            if (index < 10) {
                list.push(item)
            }
        })
        const img = await get_toplist_img(e, list)
        e.reply(img)
        return
    }
    TOP_Immortal = async (e) => {
        const UID = e.user_id
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        const action = await Read_action(UID)
        const address_name = '天机门'
        const map = await point_map(action, address_name)
        if (!map) {
            e.reply(`需[#城池名+${address_name}]`)
            return
        }
        const playerList = await nodefs.returnjson()
        const temp = []
        const list = []
        for (let item of playerList) {
            const level = await Read_level(item)
            if (level.level_id > 10) {
                const newbattle = await Read_battle(item)
                const battle = {
                    'QQ': item,
                    'power': newbattle.power,
                    'name': 'CE'
                }
                temp.push(battle)
            }
        }
        if (temp.length == 0) {
            e.reply('无一人成仙')
            return
        }
        temp.sort(sortBy('power'))
        temp.forEach((item, index) => {
            if (index < 10) {
                list.push(item)
            }
        })
        const img = await get_toplist_img(e, list)
        e.reply(img)
        return
    }
    TOP_genius = async (e) => {
        const UID = e.user_id
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        const action = await Read_action(UID)
        const address_name = '天机门'
        const map = await point_map(action, address_name)
        if (!map) {
            e.reply(`需[#城池名+${address_name}]`)
            return
        }
        const list = []
        const temp = []
        const playerList = await nodefs.returnjson()
        for (let item of playerList) {
            const level = await Read_level(item)
            if (level.level_id <= 10) {
                const newbattle = await Read_battle(item)
                const battle = {
                    'QQ': item,
                    'power': newbattle.power,
                    'name': 'CE'
                }
                temp.push(battle)
            }
        }
        if (temp.length == 0) {
            return
        }
        temp.sort(sortBy('power'))
        temp.forEach(async (item, index) => {
            if (index < 10) {
                list.push(item)
            }
        })
        const img = await get_toplist_img(e, list)
        e.reply(img)
        return
    }
}
import plugin from '../../../../lib/plugins/plugin.js'
import { get_equipment_img, get_player_img } from '../../moduels/yunzai/showData.js'
import { yunzaiConfig } from '../../moduels/yunzai/index.js'
import { existplayer } from '../../moduels/xiuxian/index.js'
export class information extends plugin {
    constructor() {
        super(yunzaiConfig('',[
            {
                reg: '^#基础信息$',
                fnc: 'Show_player'
            },
            {
                reg: '^#面板信息$',
                fnc: 'show_equipment',
            },
            {
                reg: '^#功法信息$',
                fnc: 'show_gongfa',
            }
        ]))
    }
    Show_player = async (e) => {
        const UID = e.user_id
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        const img = await get_player_img(e)
        e.reply(img)
        return
    }
    show_equipment = async (e) => {
        const UID = e.user_id
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        const img = await get_equipment_img(e)
        e.reply(img)
        return
    }
}
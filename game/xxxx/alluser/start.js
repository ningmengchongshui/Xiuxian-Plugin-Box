import plugin from '../../../../lib/plugins/plugin.js'
import config from '../../moduels/xiuxian/config/index.js'
import { yunzaiConfig } from '../../moduels/yunzai/index.js'
import { userstart, GenerateCD, deletelife, offaction, exist } from '../../moduels/xiuxian/index.js'
import { get_player_img } from '../../moduels/xiuxian/showimg.js'
export class start extends plugin {
    constructor() {
        super(yunzaiConfig('', [
            {
                reg: '^#降临世界$',
                fnc: 'Create_player'
            },
            {
                reg: '^#再入仙途$',
                fnc: 'reCreate_player'
            }
        ]))
    }
    Create_player = async (e) => {
        const group =  config.configXiuxian().group.white;
        if (group != 0) {
            if (e.group_id != group) {
                return
            }
        }
        if (!e.isGroup || e.user_id == 80000000) {
            return
        }
        const ifexistplay = await exist(e.user_id)
        if (!ifexistplay) {
            const img = await get_player_img(e.user_id)
            if (img == undefined) {
                e.reply('已死亡，需要#再入仙途')
            } else {
                e.reply(img)
            }
            return
        }
        e.reply(`${await userstart(e.user_id)}\n`)
        return
    }

    reCreate_player = async (e) => {
        const CD = await GenerateCD(e.user_id, '8', config.configXiuxian().CD.Reborn)
        if (CD != 0) {
            e.reply(CD)
            return
        }
        await offaction(e.user_id)
        await deletelife(e.user_id)
        e.reply(await userstart(e.user_id))
        return
    }
}
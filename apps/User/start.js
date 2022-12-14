import plugin from '../../../../lib/plugins/plugin.js'
import config from '../../moduels/Config.js'
import fs from 'fs'
import { yunzaiConfig } from '../../moduels/yunzai/index.js'
import { segment } from 'oicq'
import { __PATH, userstart, GenerateCD, deletelife, offaction, exist } from '../../moduels/xiuxian/index.js'
import { get_player_img } from '../../moduels/showData.js'
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
        this.xiuxianConfigData = config.getConfig('xiuxian', 'xiuxian')
    }
    Create_player = async (e) => {
        const group = this.xiuxianConfigData.group.white
        if (group != 0) {
            if (e.group_id != group) {
                return
            }
        }
        if (!e.isGroup || e.user_id == 80000000) {
            return
        }
        const usr_qq = e.user_id
        const ifexistplay = await exist(usr_qq)
        if (!ifexistplay) {
            const img = await get_player_img(e)
            if (img == undefined) {
                e.reply('已死亡，需要#再入仙途')
            } else {
                e.reply(img)
            }
            return
        }
        e.reply(await userstart(usr_qq))
        return
    }

    reCreate_player = async (e) => {
        const usr_qq = e.user_id
        const CDTime = this.xiuxianConfigData.CD.Reborn
        const CDid = '8'
        const now_time = new Date().getTime()
        const CD = await GenerateCD(usr_qq, CDid)
        if (CD != 0) {
            e.reply(CD)
            return
        }
        await offaction(usr_qq)
        fs.rmSync(`${__PATH.player}/${usr_qq}.json`)
        await deletelife(usr_qq)
        e.reply([segment.at(usr_qq), '岁月悠悠\n世间终会出现两朵相同的花\n千百年的回眸\n一花凋零\n一花绽\n是否为同一朵\n任后人去评断'])
        e.reply(await userstart(usr_qq))
        await redis.set(`xiuxian:player:${usr_qq}:${CDid}`, now_time)
        await redis.expire(`xiuxian:player:${usr_qq}:${CDid}`, CDTime * 60)
        return
    }
}
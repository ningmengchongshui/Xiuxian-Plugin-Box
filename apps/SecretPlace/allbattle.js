import plugin from '../../../../lib/plugins/plugin.js'
import config from '../../moduels/config.js'
import { yunzaiConfig } from '../../moduels/yunzai/index.js'
import { At, Go } from '../../moduels/yunzai/index.js'
import { Read_action, point_map, existplayer, GenerateCD, Read_level, deletePrestige, randomNuber, addPrestige, addKnapsack, randomEquipment } from '../../moduels/xiuxian/index.js'
export class allbattle extends plugin {
    constructor() {
        super(yunzaiConfig('allbattle', [
            {
                reg: '^#攻击.*$',
                fnc: 'Attack'
            },
            {
                reg: '^#洗手$',
                fnc: 'HandWashing'
            }
        ]))
        this.xiuxianConfigData = config.getConfig('xiuxian', 'xiuxian')
    }
    Attack = async (e) => {
        const good = await Go(e)
        if (!good) {
            return
        }
        const user = {
            A: e.user_id,
            B: 0,
            C: 0,
            QQ: 0,
            p: await randomNuber(1, 99)
        }
        user.B = await At(e)
        if (user.B == 0 || user.B == user.A) {
            return
        }
        const actionA = await Read_action(user.A)
        const actionB = await Read_action(user.B)
        if (actionA.region != actionB.region) {
            e.reply('没找到此人')
            return
        }
        if (actionA.address == 1) {
            e.reply('[修仙联盟]普通卫兵:城内不可出手!')
            return
        }
        if (actionB.address == 1) {
            e.reply('[修仙联盟]普通卫兵:城内不可出手!')
            return
        }
        const CD = await GenerateCD(user.A, '0', this.xiuxianConfigData.CD.Attack)
        if (CD != 0) {
            e.reply(CD)
            return
        }
        user.QQ = user.A //tudo 战斗模型删除
        await addPrestige(user.A, Number(1))
        const LevelB = await Read_level(user.B)
        const MP = LevelB.prestige * 10 + Number(50)
        if (user.p <= MP) {
            if (user.QQ != user.A) {
                user.C = user.A
                user.A = user.B
                user.B = user.C
            }
            let thing = await randomEquipment(user.B)
            if (thing) {
                await addKnapsack(user.A, thing, Number(1))
                e.reply(`${user.A}夺走了${thing.name}`)
            }
        }
        return
    }
    HandWashing = async (e) => {
        if (!e.isGroup) {
            return
        }
        const ifexistplay = await existplayer(e.user_id)
        if (!ifexistplay) {
            return
        }
        const map = await point_map(e.user_id, '天机门')
        if (!map) {
            e.reply(`需[#城池名+天机门]`)
            return
        }
        e.reply(await deletePrestige(e.user_id))
        return
    }
}
const MAP = {
    'refuse': '[修仙联盟]普通卫兵:城内不可出手',
    'notfind': '未找到',
    'name_tianjiment': '天机门',
    'name_return': '需[#城池名+天机门]'
}
export class allbattle  {
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
            e.reply(MAP['notfind'])
            return
        }
        if (actionA.address == 1) {
            e.reply(MAP['refuse'])
            return
        }
        if (actionB.address == 1) {
            e.reply(MAP['refuse'])
            return
        }
        const CD = await GenerateCD(user.A, '0', this.xiuxianConfigData.CD.Attack)
        if (CD != 0) {
            e.reply(CD)
            return
        }
        user.QQ = user.A
        return
        //tudo 战斗模型删除
        const prestigesize = 1
        const prestigebase = 50
        await addPrestige(user.A, prestigesize)
        const LevelB = await Read_level(user.B)
        const MP = LevelB.prestige * 10 + prestigebase
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
        const map = await point_MAP(e.user_id, MAP['name_tianjiment'])
        if (!map) {
            e.reply(MAP['name_return'])
            return
        }
        e.reply(await deletePrestige(e.user_id))
        return
    }
}
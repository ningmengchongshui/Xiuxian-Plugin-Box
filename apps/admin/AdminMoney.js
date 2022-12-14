import plugin from '../../../../lib/plugins/plugin.js'
import { __PATH, At, Numbers, Add_lingshi, Read_wealth, search_thing_name, Read_najie, Add_najie_thing, Write_najie, Write_wealth } from '../../model/xiuxian/index.js'
import { yunzaiConfig } from '../../model/yunzai/index.js'
export class AdminMoney extends plugin {
    constructor() {
        super(yunzaiConfig('admin', [
            {
                reg: '^#修仙扣除.*$',
                fnc: 'Deduction'
            },
            {
                reg: '^#修仙补偿.*$',
                fnc: 'Fuli'
            },
            {
                reg: '^#修仙馈赠.*$',
                fnc: 'gifts'
            }
        ]))
    }
    gifts = async (e) => {
        if (!e.isMaster) {
            return
        }
        const B = await At(e)
        if (B == 0) {
            return
        }
        const [name, acount] = e.msg.replace('#修仙馈赠', '').split('\*')
        const searchsthing = await search_thing_name(name)
        if (searchsthing == 1) {
            e.reply(`世界没有${name}`)
            return
        }
        const quantity = await Numbers(acount)
        let najie = await Read_najie(B)
        najie = await Add_najie_thing(najie, searchsthing, quantity)
        await Write_najie(B, najie)
        e.reply(`${B}获得馈赠:${name}`)
        return
    }
    Deduction = async (e) => {
        if (!e.isMaster) {
            return
        }
        const B = await At(e)
        if (B == 0) {
            return
        }
        const lingshi = await Numbers(e.msg.replace('#修仙扣除', ''))
        const player = await Read_wealth(B)
        if (player.lingshi < lingshi) {
            e.reply('他好穷的')
            return
        }
        player.lingshi -= lingshi
        await Write_wealth(B, player)
        e.reply(`已扣除灵石${lingshi}`)
        return
    }
    Fuli = async (e) => {
        if (!e.isMaster) {
            return
        }
        const lingshi = await Numbers(e.msg.replace('#修仙补偿', ''))
        const B = await At(e)
        if (B == 0) {
            return
        }
        await Add_lingshi(B, lingshi)
        e.reply(`${B}获得${lingshi}灵石的补偿`)
        return
    }
}
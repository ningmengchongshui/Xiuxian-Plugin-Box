import plugin from '../../../../lib/plugins/plugin.js'
import { Numbers, Add_lingshi, Read_wealth, search_thing_name, Write_wealth, addKnapsack } from '../../moduels/xiuxian/index.js'
import { At } from '../../moduels/yunzai/index.js'
import { yunzaiConfig } from '../../moduels/yunzai/index.js'
export class admoney extends plugin {
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
        const UID = await At(e)
        if (UID == 0) {
            return
        }
        const [name, acount] = e.msg.replace('#修仙馈赠', '').split('\*')
        const searchsthing = await search_thing_name(name)
        if (searchsthing == 1) {
            e.reply(`没有:${name}`)
            return
        }
        const quantity = await Numbers(acount)
        await addKnapsack(UID, searchsthing, quantity)
        e.reply(`${UID}获得:${name}`)
        return
    }
    Deduction = async (e) => {
        if (!e.isMaster) {
            return
        }
        const UID = await At(e)
        if (UID == 0) {
            return
        }
        const lingshi = await Numbers(e.msg.replace('#修仙扣除', ''))
        const player = await Read_wealth(UID)
        if (player.lingshi < lingshi) {
            e.reply('他好穷的')
            return
        }
        player.lingshi -= lingshi
        await Write_wealth(UID, player)
        e.reply(`已扣除灵石${lingshi}`)
        return
    }
    Fuli = async (e) => {
        if (!e.isMaster) {
            return
        }
        const lingshi = await Numbers(e.msg.replace('#修仙补偿', ''))
        const UID = await At(e)
        if (UID == 0) {
            return
        }
        await Add_lingshi(UID, lingshi)
        e.reply(`${UID}获得${lingshi}灵石的补偿`)
        return
    }
}
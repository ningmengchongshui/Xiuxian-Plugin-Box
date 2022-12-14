import plugin from '../../../../lib/plugins/plugin.js'
import { Numbers, Read_wealth, Add_lingshi, point_map, exist_najie_thing_name, Add_najie_thing, existplayer, ForwardMsg,  Read_najie, Write_najie, Read_action } from '../../moduels/xiuxian/index.js'
export class transaction extends plugin {
    constructor() {
        super({
            name: 'transaction',
            dsc: 'transaction',
            event: 'message',
            priority: 600,
            rule: [
                {
                    reg: '^#购买.*$',
                    fnc: 'Buy_comodities'
                },
                {
                    reg: '^#出售.*$',
                    fnc: 'Sell_comodities'
                },
                {
                    reg: '^#凡仙堂$',
                    fnc: 'ningmenghome',
                },
            ]
        })
    }
    ningmenghome = async (e) => {
        const UID = e.user_id
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        const action = await Read_action(UID)
        const address_name = '凡仙堂'
        const map = await point_map(action, address_name)
        if (!map) {
            e.reply(`需[#城池名+${address_name}]`)
            return
        }
        const msg = [
            '___[凡仙堂]___\n#购买+物品名*数量\n不填数量,默认为1'
        ]
        const commodities_list = ''  //tudo
        commodities_list.forEach((item) => {
            const id = item.id.split('-')
            if (id[0] == 4) {
                if (id[1] == 1) {
                    msg.push(`物品:${item.name}\n气血:${item.blood}%\n价格:${item.price}`)
                } else {
                    msg.push(`物品:${item.name}\n修为:${item.experience}\n价格:${item.price}`)
                }
            } else if (id[0] == 5) {
                msg.push(`物品:${item.name}\n天赋:${item.size}%\n价格:${item.price}`)
            }
        })
        await ForwardMsg(e, msg)
        return
    }
    Buy_comodities = async (e) => {
        if (!e.isGroup) {
            return
        }
        const UID = e.user_id
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        const action = await Read_action(UID)
        const address_name = '凡仙堂'
        const map = await point_map(action, address_name)
        if (!map) {
            e.reply(`需[#城池名+${address_name}]`)
            return
        }
        const thing = e.msg.replace('#购买', '')
        const code = thing.split('\*')
        const [thing_name, thing_acount] = code
        const the = {
            "quantity": 99,
            "najie": {}
        }
        the.quantity = await Numbers(thing_acount)
        if (the.quantity > 99) {
            the.quantity = 99
        }
        const ifexist = '' //tudo
        if (!ifexist) {
            e.reply(`[凡仙堂]小二\n不卖:${thing_name}`)
            return
        }
        const player = await Read_wealth(UID)
        const lingshi = player.lingshi
        const commodities_price = ifexist.price * the.quantity
        if (lingshi < commodities_price) {
            e.reply(`[凡仙堂]小二\n灵石不足`)
            return
        }
        the.najie = await Read_najie(UID)
        if (the.najie.thing.length > 21) {
            e.reply('储物袋已满')
            return
        }
        the.najie = await Add_najie_thing(the.najie, ifexist, the.quantity)
        await Write_najie(UID, the.najie)
        await Add_lingshi(UID, -commodities_price)
        e.reply(`[凡仙堂]薛仁贵\n你花[${commodities_price}]灵石购买了[${thing_name}]*${the.quantity},`)
        return
    }
    Sell_comodities = async (e) => {
        if (!e.isGroup) {
            return
        }
        const UID = e.user_id
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        const action = await Read_action(UID)
        const address_name = '凡仙堂'
        const map = await point_map(action, address_name)
        if (!map) {
            e.reply(`需[#城池名+${address_name}]`)
            return
        }
        const thing = e.msg.replace('#出售', '')
        const code = thing.split('\*')
        const [thing_name, thing_acount] = code//数量
        const the = {
            "quantity": 99,
            "najie": {}
        }
        the.quantity = await Numbers(thing_acount)
        if (the.quantity > 99) {
            the.quantity = 99
        }
        const najie_thing = await exist_najie_thing_name(UID, thing_name)
        if (najie_thing == 1) {
            e.reply(`[凡仙堂]小二\n你没[${thing_name}]`)
            return
        }
        if (najie_thing.acount < the.quantity) {
            e.reply('[凡仙堂]小二\n数量不足')
            return
        }
        the.najie = await Read_najie(UID)
        the.najie = await Add_najie_thing(the.najie, najie_thing, -the.quantity)
        await Write_najie(UID, the.najie)
        const commodities_price = najie_thing.price * the.quantity
        await Add_lingshi(UID, commodities_price)
        e.reply(`[凡仙堂]欧阳峰\n出售得${commodities_price}灵石 `)
        return
    }
}
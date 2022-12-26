export class transaction {
    ningmenghome = async (UID) => {
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return []
        }
        const action = await Read_action(UID)
        const address_name = '凡仙堂'
        const map = await point_map(action, address_name)
        if (!map) {
            return [`需[#城池名+${address_name}]`]
        }
        const msg = [
            '___[凡仙堂]___\n#购买+物品名*数量\n不填数量,默认为1'
        ]
        const commodities_list = nodefs.Read('commodities', __PATH['all'])
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
        return msg
    }
    Buy_comodities = async (UID, thing) => {
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return []
        }
        const action = await Read_action(UID)
        const address_name = '凡仙堂'
        const map = await point_map(action, address_name)
        if (!map) {
            return [`需[#城池名+${address_name}]`]
        }
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
        const ifexist = await nodefs.readFindName(__PATH['all'], 'commodities', thing_name)
        if (!ifexist) {
            return [`[凡仙堂]小二\n不卖:${thing_name}`]
        }
        const player = await Read_wealth(UID)
        const lingshi = player.lingshi
        const commodities_price = ifexist.price * the.quantity
        if (lingshi < commodities_price) {
            return [`[凡仙堂]小二\n灵石不足`]
        }
        the.najie = await Read_najie(UID)
        if (the.najie.thing.length > 21) {
            return ['储物袋已满']
        }
        the.najie = await Add_najie_thing(the.najie, ifexist, the.quantity)
        await Write_najie(UID, the.najie)
        await Add_lingshi(UID, -commodities_price)
        return [`[凡仙堂]薛仁贵\n你花[${commodities_price}]灵石购买了[${thing_name}]*${the.quantity}`]
    }
    Sell_comodities = async (UID, thing) => {
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return []
        }
        const action = await Read_action(UID)
        const address_name = '凡仙堂'
        const map = await point_map(action, address_name)
        if (!map) {
            return [`需[#城池名+${address_name}]`]
        }
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
            return [`[凡仙堂]小二\n你没[${thing_name}]`]
        }
        if (najie_thing.acount < the.quantity) {
            return ['[凡仙堂]小二\n数量不足']
        }
        the.najie = await Read_najie(UID)
        the.najie = await Add_najie_thing(the.najie, najie_thing, -the.quantity)
        await Write_najie(UID, the.najie)
        const commodities_price = najie_thing.price * the.quantity
        await Add_lingshi(UID, commodities_price)
        return [`[凡仙堂]欧阳峰\n出售得${commodities_price}灵石 `]
    }
}
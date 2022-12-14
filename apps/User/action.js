import plugin from '../../../../lib/plugins/plugin.js'
import config from '../../moduels/config.js'
import { get_najie_img } from '../../moduels/yunzai/showData.js'
import { yunzaiConfig } from '../../moduels/yunzai/index.js'
import { segment } from 'oicq'
import { existplayer, Read_najie, point_map, Read_action, Add_lingshi, Write_najie, Numbers, Add_najie_lingshi, Read_wealth } from '../../moduels/xiuxian/index.js'
import { Go } from '../../moduels/yunzai/index.js'
export class action extends plugin {
    constructor() {
        super(yunzaiConfig('action', [
            {
                reg: '^#储物袋$',
                fnc: 'Show_najie'
            },
            {
                reg: '^#升级储物袋$',
                fnc: 'Lv_up_najie'
            },
            {
                reg: '^#(存|取)灵石(.*)$',
                fnc: 'Take_lingshi'
            }
        ]))
        this.xiuxianConfigData = config.getConfig('xiuxian', 'xiuxian')
    }
    Show_najie = async (e) => {
        const UID = e.user_id
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        const img = await get_najie_img(e)
        e.reply(img)
        return
    }
    Lv_up_najie = async (e) => {
        const good = await Go(e)
        if (!good) {
            return
        }
        const UID = e.user_id
        const action = await Read_action(UID)
        const address_name = '炼器师协会'
        const map = await point_map(action, address_name)
        if (!map) {
            e.reply(`需[#城池名+${address_name}]`)
            return
        }
        const najie = await Read_najie(UID)
        const player = await Read_wealth(UID)
        const najie_num = this.xiuxianConfigData.najie_num
        const najie_price = this.xiuxianConfigData.najie_price
        if (najie.grade == najie_num.length) {
            e.reply('已经是最高级的了')
            return
        }
        if (player.lingshi < najie_price[najie.grade]) {
            e.reply(`灵石不足,还需要准备${najie_price[najie.grade] - player.lingshi}灵石`)
            return
        }
        await Add_lingshi(UID, -najie_price[najie.grade])
        najie.lingshimax = najie_num[najie.grade]
        najie.grade += 1
        await Write_najie(UID, najie)
        e.reply(`花了${najie_price[najie.grade - 1]}灵石升级,目前灵石存储上限为${najie.lingshimax}`)
        return
    }
    Take_lingshi = async (e) => {
        const good = await Go(e)
        if (!good) {
            return
        }
        const UID = e.user_id
        const reg = new RegExp(/取|存/)
        const func = reg.exec(e.msg)
        const msg = e.msg.replace(reg, '')
        let lingshi = msg.replace('#灵石', '')
        const player_lingshi = await Read_wealth(UID)
        if (lingshi == '全部') {
            lingshi = player_lingshi.lingshi
        }
        lingshi = await Numbers(lingshi)
        if (func == '存') {
            if (player_lingshi.lingshi < lingshi) {
                e.reply([segment.at(UID), `灵石不足,目前只有${player_lingshi.lingshi}灵石`])
                return
            }
            const najie = await Read_najie(UID)
            if (najie.lingshimax < najie.lingshi + lingshi) {
                await Add_najie_lingshi(UID, najie.lingshimax - najie.lingshi)
                await Add_lingshi(UID, -najie.lingshimax + najie.lingshi)
                e.reply([segment.at(UID), `已放入${najie.lingshimax - najie.lingshi}灵石,储物袋存满了`])
                return
            }
            await Add_najie_lingshi(UID, lingshi)
            await Add_lingshi(UID, -lingshi)
            e.reply([segment.at(UID), `储存完毕,目前还有${player_lingshi.lingshi - lingshi}灵石,储物袋内有${najie.lingshi + lingshi}灵石`])
            return
        }
        if (func == '取') {
            const najie = await Read_najie(UID)
            if (najie.lingshi < lingshi) {
                e.reply([segment.at(UID), `储物袋灵石不足,目前最多取出${najie.lingshi}灵石`])
                return
            }
            await Add_najie_lingshi(UID, -lingshi)
            await Add_lingshi(UID, lingshi)
            e.reply([segment.at(UID), `本次取出灵石${lingshi},储物袋还剩余${najie.lingshi - lingshi}灵石`])
            return
        }
        return
    }
}
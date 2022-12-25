import { segment } from 'oicq'
import { Read_action, point_map, Read_level, Read_najie, Add_najie_thing, Write_najie, Numbers, Add_lingshi, GenerateCD, Read_wealth, Write_wealth, Write_action } from '../../moduels/xiuxian/index.js'
import { At, Go } from '../../moduels/yunzai/xiuxian/index.js'
export class moneyoperation {
    New_lingshi = async (e) => {
        const good = await Go(e)
        if (!good) {
            return
        }
        const UID = e.user_id
        const action = await Read_action(UID)
        const address_name = '联盟'
        const map = await point_map(action, address_name)
        if (!map) {
            e.reply(`需[#城池名+${address_name}]`)
            return
        }
        const level = await Read_level(UID)
        if (level.level_id != 1) {
            return
        }
        if (action.newnoe != 1) {
            return
        }
        action.newnoe = 0
        await Write_action(UID, action)
        const equipment_name = '烂铁匕首'
        const money = Number(5)
        const ifexist = ''
        let najie = await Read_najie(UID)
        najie = await Add_najie_thing(najie, ifexist, Number(1))
        await Write_najie(UID, najie)
        await Add_lingshi(UID, money)
        e.reply(`[修仙联盟]方正\n看你骨骼惊奇\n就送你一把[${equipment_name}]吧\n还有这${money}灵石\n可在必要的时候用到`)
        e.reply(`你对此高兴万分\n把[${equipment_name}]放进了#储物袋`)
        return
    }
    Give_lingshi = async (e) => {
        const good = await Go(e)
        if (!good) {
            return
        }
        const A = e.user_id
        const B = await At(e)
        if (B == 0 || B == A) {
            return
        }
        let islingshi = e.msg.replace('#赠送灵石', '')
        const lingshi = await Numbers(islingshi)
        const A_player = await Read_wealth(A)
        if (A_player.lingshi < lingshi) {
            e.reply([segment.at(A), `似乎没有${lingshi}灵石`])
            return
        }
        const CD = await GenerateCD(A, '5', this.xiuxianConfigData.CD.Transfer)
        if (CD != 0) {
            e.reply(CD)
            return
        }
        A_player.lingshi -= lingshi
        await Write_wealth(A, A_player)
        await Add_lingshi(B, lingshi)
        e.reply([segment.at(B), `你获得了由 ${A}赠送的${lingshi}灵石`])
        return
    }
}

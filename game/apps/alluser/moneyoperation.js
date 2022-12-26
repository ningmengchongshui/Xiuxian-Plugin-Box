export class moneyoperation {
    New_lingshi = async (UID) => {
        const action = await Read_action(UID)
        const address_name = '联盟'
        const map = await point_map(action, address_name)
        if (!map) {
            return [`需[#城池名+${address_name}]`]
        }
        const level = await Read_level(UID)
        if (level.level_id != 1) {
            return []
        }
        if (action.newnoe != 1) {
            return []
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
        return [`[修仙联盟]方正\n看你骨骼惊奇\n就送你一把[${equipment_name}]吧\n还有这${money}灵石\n可在必要的时候用到`,`你对此高兴万分\n把[${equipment_name}]放进了#储物袋`]
    }
}

export class action {
    Show_najie = async (UID) => {
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return []
        }
        const img = await get_najie_img(UID)
        return [img]
    }
    Lv_up_najie = async (UID) => {
        const action = await Read_action(UID)
        const address_name = '炼器师协会'
        const map = await point_map(action, address_name)
        if (!map) {
            return [`需[#城池名+${address_name}]`]
        }
        const najie = await Read_najie(UID)
        const player = await Read_wealth(UID)
        const najie_num = this.xiuxianConfigData.najie_num
        const najie_price = this.xiuxianConfigData.najie_price
        if (najie.grade == najie_num.length) {
            return ['已经是最高级的了']
        }
        if (player.lingshi < najie_price[najie.grade]) {
            return [`灵石不足,还需要准备${najie_price[najie.grade] - player.lingshi}灵石`]
        }
        await Add_lingshi(UID, -najie_price[najie.grade])
        najie.lingshimax = najie_num[najie.grade]
        najie.grade += 1
        await Write_najie(UID, najie)
        return [`花了${najie_price[najie.grade - 1]}灵石升级,目前灵石存储上限为${najie.lingshimax}`]
    }
    
}
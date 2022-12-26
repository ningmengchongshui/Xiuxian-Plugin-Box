export class modify {
    Change_name = async (UID) => {
        const action = await Read_action(UID)
        const address_name = '联盟'
        const map = await point_map(action, address_name)
        if (!map) {
            return [`需[#城池名+${address_name}]`]
        }
        const lingshi = 5
        let new_name = e.msg.replace('#改名', '')
        if (new_name.length == 0) {
            return []
        }
        Filterwords.forEach((item) => {
            new_name = new_name.replace(item, '')
        })
        if (new_name.length > 8) {
            return ['[修仙联盟]白老\n小友的这名可真是稀奇']
        }
        const wealth = await Read_wealth(UID)
        if (wealth.lingshi < lingshi) {
            return [`需${lingshi}灵石`]
        }
        const CD = await GenerateCD(UID, '3', this.xiuxianConfigData.CD.Name)
        if (CD != 0) {
            return [CD]
        }
        await Add_lingshi(UID, -lingshi)
        const life = await Read_Life()
        life.forEach((item) => {
            if (item.qq == UID) {
                item.name = new_name
            }
        })
        await Write_Life(life)
        const img = await get_player_img(e.user_id)
        return [img]
    }
    Change_autograph = async (UID, new_msg) => {
        const player = await Read_player(UID)
        new_msg = new_msg.replace(' ', '')
        Filterwords.forEach((item) => {
            new_msg = new_msg.replace(item, '')
        })
        if (new_msg.length == 0 || new_msg.length > 50) {
            return ['请正确设置,且道宣最多50字符']
        }
        const CD = await GenerateCD(UID, '4', this.xiuxianConfigData.CD.Autograph)
        if (CD != 0) {
            return [CD]
        }
        player.autograph = new_msg
        await Write_player(UID, player)
        const img = await get_player_img(UID)
        return [img]
    }
}
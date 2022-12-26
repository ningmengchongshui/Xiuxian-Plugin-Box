export class onekey  {
    OneKey_all = async (UID) => {
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        const action=await Read_action(UID)
        const address_name='万宝楼'
        const map=await point_map(action,address_name)
        if(!map){
            return [`需[#城池名+${address_name}]`]
        }
        let najie = await Read_najie(UID)
        let money = 0
        for (let item of najie.thing) {
            money += item.acount * item.price
        }
        await Add_lingshi(UID, money)
        najie.thing = []
        await Write_najie(UID, najie)
        return [`[蜀山派]叶铭\n这是${money}灵石,道友慢走`]
    }
    OneKey_key = async (e) => {
        if (!e.isGroup) {
            return []
        }
        const UID = e.user_id
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return []
        }
        return []
    }
}
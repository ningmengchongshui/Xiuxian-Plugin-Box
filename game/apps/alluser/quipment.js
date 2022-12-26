export class quipment {
    add_equipment = async (e) => {
        if (!e.isGroup) {
            return
        }
        const UID = e.user_id
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        const thing_name = e.msg.replace('#装备', '')
        const najie_thing = await exist_najie_thing_name(UID, thing_name)
        if (najie_thing == 1) {
            e.reply(`没有${thing_name}`)
            return
        }
        const equipment = await Read_equipment(UID)
        if (equipment.length >= this.xiuxianConfigData.myconfig.equipment) {
            return
        }
        equipment.push(najie_thing)
        await Write_equipment(UID, equipment)
        let najie = await Read_najie(UID)
        najie = await Add_najie_thing(najie, najie_thing, -1)
        await Write_najie(UID, najie)
        e.reply(`装备${thing_name}`)
        return
    }
    delete_equipment = async (UID,thing_name) => {
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return []
        }
        let equipment = await Read_equipment(UID)
        const islearned = equipment.find(item => item.name == thing_name)
        if (!islearned) {
            return
        }
        const q = {
            "x": 0
        }
        equipment.forEach((item, index, arr) => {
            if (item.name == thing_name && q.x == 0) {
                q.x = 1
                arr.splice(index, 1)
            }
        })
        await Write_equipment(UID, equipment)
        let najie = await Read_najie(UID)
        najie = await Add_najie_thing(najie, islearned, 1)
        await Write_najie(UID, najie)
        return [`已卸下${thing_name}`]
    }
}
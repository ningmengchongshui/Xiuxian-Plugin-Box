export class information {
    Show_player = async (UID) => {
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        const img = await get_player_img(UID)
        return [img]
    }
    show_equipment = async (UID) => {
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        const img = await get_equipment_img(UID)
        return [img]
    }
}
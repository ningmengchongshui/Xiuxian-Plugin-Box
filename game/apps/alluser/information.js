import { get_equipment_img, get_player_img } from '../../moduels/xiuxian/showimg.js'
import { existplayer } from '../../moduels/xiuxian/index.js'
export class information {
    Show_player = async (e) => {
        const UID = e.user_id
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        const img = await get_player_img(UID)
        e.reply(img)
        return
    }
    show_equipment = async (e) => {
        const UID = e.user_id
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        const img = await get_equipment_img(UID)
        e.reply(img)
        return
    }
}
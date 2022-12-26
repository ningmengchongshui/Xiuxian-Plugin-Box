export class start {
    Create_player = async (UID) => {
        const ifexistplay = await exist(UID)
        if (!ifexistplay) {
            const img = await get_player_img(UID)
            if (img == undefined) {
                return ['已死亡，需要#再入仙途']
            } else {
                return [img]
            }
        }
        e.reply(`${await userstart(UID)}\n`)
        return
    }

    reCreate_player = async (UID) => {
        const CD = await GenerateCD(UID, '8', '')
        if (CD != 0) {
            return [CD]
        }
        await offaction(UID)
        await deletelife(UID)
        return [await userstart(UID)]
    }
}
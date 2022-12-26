export class start{
    Create_player = async (e) => {
        if (!e.isGroup || e.user_id == 80000000) {
            return
        }
        const ifexistplay = await exist(e.user_id)
        if (!ifexistplay) {
            const img = await get_player_img(e.user_id)
            if (img == undefined) {
                e.reply('已死亡，需要#再入仙途')
            } else {
                e.reply(img)
            }
            return
        }
        e.reply(`${await userstart(e.user_id)}\n`)
        return
    }

    reCreate_player = async (e) => {
        const CD = await GenerateCD(e.user_id, '8', '')
        if (CD != 0) {
            e.reply(CD)
            return
        }
        await offaction(e.user_id)
        await deletelife(e.user_id)
        e.reply(await userstart(e.user_id))
        return
    }
}
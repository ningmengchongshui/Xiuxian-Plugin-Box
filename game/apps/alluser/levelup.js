export class levelup {
    Level_up = async (UID) => {
        const CDTime = this.xiuxianConfigData.CD.Level_up
        const CD = await GenerateCD(UID, '6', this.xiuxianConfigData.CD.Level_up)
        if (CD != 0) {
            return [CD]
        }
        const player = await Read_level(UID)
        const Level = await nodefs.readFindId(__PATH['level'], 'levellist0', player.level_id)
        if (player.experience < Level.exp) {
            return [`修为不足,再积累${Level.exp - player.experience}修为后方可突破`]
        }
        if (Level.id == 10) {
            return [`渡劫期修士需[#渡劫]后,方能[#羽化登仙]`]
        }
        const rank_name = [
            '初期', '中期', '后期', '巅峰', '圆满'
        ]
        if (player.level_id > 1 && player.rank_id < 4) {
            player.rank_id = player.rank_id + 1
            player.experience -= Level.exp
            await Write_level(UID, player)
            await updata_equipment(UID)
            return [`突破成功至${player.levelname}${rank_name[player.rank_id]}`]
        }
        const msg=[]
        if (Math.random() > 1 - player.level_id / 25) {
            const bad_time = Math.random()
            let x = 0
            if (bad_time > 0.9) {
                x = 0.4
                msg.push(`突然听到一声鸡叫,鸡..鸡..鸡...鸡你太美!险些走火入魔,丧失了${Math.ceil((Level.exp) * x)}修为`)
            } else if (bad_time > 0.8) {
                x = 0.2
                msg.push(`突破瓶颈时想到鸡哥了,险些走火入魔,丧失了${Math.ceil(Level.exp) * x}修为`)
            } else if (bad_time > 0.7) {
                x = 0.1
                msg.push(`突破瓶颈时突然想起后花园种有药草,强行打断突破,嘴角流血,丧失了${Math.ceil(Level.exp) * x}修为`)
            } else {
                msg.push(`憋红了脸,境界突破失败,等到${CDTime}分钟后再尝试吧`)
            }
            player.experience -= Math.ceil(Level.exp * x)
            await Write_level(UID, player)
            return  msg
        }
        player.level_id = player.level_id + 1
        player.levelname = await nodefs.readFindId(__PATH['level'], 'levellist0', player.level_id).name
        player.experience -= Level.exp
        player.rank_id = 0
        await Write_level(UID, player)
        await updata_equipment(UID)
        const life = await Read_Life()
        life.forEach((item) => {
            if (item.qq == UID) {
                item.life += Math.floor(item.life * player.level_id / 3)
                msg.push(`突破成功至${player.levelname}${player.rank_name[player.rank_id]},寿命至${item.life}`)
            }
        })
        await Write_Life(life)
        return msg
    }
}
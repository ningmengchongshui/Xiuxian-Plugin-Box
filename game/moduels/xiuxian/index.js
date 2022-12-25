import { __PATH } from '../yunzai/index.js'
import useraction from './useraction.js'
import userdata from './userdata.js'
const map = {
    'start': '降临成功',
    'delete': '删除成功',
    'ctrate': '创建成功',
    'undefined': '存在旧版残留,请联系主人使用#修仙删除数据',
    'free': '空闲',
    'nodata': '无信息'
}
const talentnamemap = {
    '1': '金',
    '2': '木',
    '3': '水',
    '4': '火',
    '5': '土',
    '6': '雷',
    '7': '光',
    '8': '暗',
    '9': '冰',
    '10': '风',
}
const CDname = {
    '0': '攻击',
    '1': '降妖',
    '2': '闭关',
    '3': '改名',
    '4': '道宣',
    '5': '赠送',
    '6': '突破',
    '7': '破体',
    '8': '转世',
    '9': '行为',
    '10': '击杀'
}
/**
 * @param {ID} UID 
 * @returns 随机丢出一件装备 
 */
export const randomEquipment = async (UID) => {
    let equipment = await userdata.readEquipment(UID)
    let thing
    if (equipment.length > 0) {
        thing = await Anyarray(equipment)
        equipment = equipment.filter(item => item.name != thing.name)
        await Write_equipment(UID, equipment)
    }
    return thing
}

export const addPrestige = async (UID, size) => {
    const Level = await Read_level(UID)
    Level.prestige += size
    await Write_level(user.A, Level)
    return
}

export const deletePrestige = async (UID) => {
    const Level = await Read_level(UID)
    const money = 10000 * Level.level_id
    if (Level.prestige > 0) {
        const wealt = await Read_wealth(UID)
        if (wealt.lingshi > money) {
            Level.prestige -= 1
            wealt.lingshi -= money
            await Write_level(UID, Level)
            await Write_wealth(UID, wealt)
            return '[天机门]南宫问天\n为你清除1点魔力值'
        }
        return `[天机门]韩立\n清魔力需要${money}`
    } else {
        return '[天机门]李逍遥\n你一身清廉'
    }
}
export const userstart = async (UID) => {
    await useraction.createUser(UID)
    return map['start']
}

/**
 * 删除存档数据
 * @returns 
 */
export const deletegame = async () => {
    await Write_Exchange([])
    await Write_Forum([])
    await Write_Life([])
    await this.deleteredis()
    return map['delete']
}
/**
 * 删除redis数据
 * @returns 
 */
export const deleteredis = async () => {
    const allkey = await redis.keys('xiuxian:*', (err, data) => { })
    if (allkey) {
        allkey.forEach(async (item) => {
            await redis.del(item)
        })
        return map['delete']
    } else {
        return map['nodata']
    }
}
/**
 * 删除某人寿命
 * @param {UID} UID 
 * @returns 
 */
export const deletelife = async (UID) => {
    let life = await Read_Life()
    life = await life.filter(item => item.qq != UID)
    await Write_Life(life)
    return
}

/**
 * @param {UID} UID 
 * @returns 
 */
export const exist = async (UID) => {
    const life = await Read_Life()
    const find = life.find(item => item.qq == UID)
    if (find == undefined) {
        return true
    } else {
        return false
    }
}
/**
 * 
 * @param {UID} UID 
 * @returns 
 */
export const existplayer = async (UID) => {
    const life = await Read_Life()
    const find = life.find(item => item.qq == UID)
    //不存在，指令不生效
    if (find == undefined) {
        return false
    }
    //存在，没有死
    if (find.status != 0) {
        return true
    } else {
        return false
    }
}
/**
 * 
 * @param {UId} UID 
 * @returns 
 */
export const existplayerplugins = async (UID) => {
    const life = await Read_Life()
    const find = life.find(item => item.qq == UID)
    if (find == undefined) {
        return false
    } else {
        return find
    }
}

//魔力操作
export const Add_prestige = async (UID, prestige) => {
    const player = await Read_level(UID)
    player.prestige += Math.trunc(prestige)
    await Write_level(UID, player)
    return
}
//灵石操作
export const Add_lingshi = async (UID, lingshi) => {
    const player = await Read_wealth(UID)
    player.lingshi += Math.trunc(lingshi)
    await Write_wealth(UID, player)
    return
}
//修为操作
export const Add_experience = async (UID, experience) => {
    const player = await Read_level(UID)
    const exp0 = await Numbers(player.experience)
    const exp1 = await Numbers(experience)
    player.experience = exp0 + exp1
    await Write_level(UID, player)
    return
}
//气血操作
export const Add_experiencemax = async (UID, qixue) => {
    const player = await Read_level(UID)
    player.experiencemax += Math.trunc(qixue)
    await Write_level(UID, player)
    return
}
//血量按百分比恢复
export const Add_blood = async (UID, blood) => {
    const player = await Read_battle(UID)
    const battle = await Read_battle(UID)
    //判断百分比
    if (player.nowblood < Math.floor(battle.blood * blood * 0.01)) {
        player.nowblood = Math.floor(battle.blood * blood * 0.01)
    }
    await Write_battle(UID, player)
    return
}
//储物袋灵石操作
export const Add_najie_lingshi = async (UID, acount) => {
    const najie = await Read_najie(UID)
    najie.lingshi += Math.trunc(acount)
    await Write_najie(UID, najie)
    return
}
//新增功法
export const Add_player_AllSorcery = async (UID, gongfa) => {
    const player = await Read_talent(UID)
    player.AllSorcery.push(gongfa)
    await Write_talent(UID, player)
    await player_efficiency(UID)
    return
}

/**
 * 拦截非法用户
 * @param {*} UID 
 * @returns 
 */
export const newGo = async (UID) => {
    const ifexistplay = await existplayer(UID)
    if (!ifexistplay) {
        return map['nodata']
    }
    let action = await redis.get(`xiuxian:player:${UID}:action`)
    if (action != undefined) {
        action = JSON.parse(action)
        if (action.actionName == undefined) {
            return map['undefined']
        }
        return `${action.actionName}...`
    }
    return true
}

/**
 * 得到灵根名字
 */
export const talentname = async (player) => {
    const talentname = []
    let name = ''
    const talent = player.talent
    for (let i = 0; i < talent.length; i++) {
        name = talentnamemap[talent[i]]
        talentname.push(name)
    }
    return talentname
}


//根据id搜储物袋物品
export const exist_najie_thing_id = async (UID, thing_id) => {
    const najie = await Read_najie(UID)
    const ifexist = najie.thing.find(item => item.id == thing_id)
    if (!ifexist) {
        return 1
    }
    return ifexist
}
//根据名字搜储物袋物品
export const exist_najie_thing_name = async (UID, name) => {
    const najie = await Read_najie(UID)
    const ifexist = najie.thing.find(item => item.name == name)
    if (!ifexist) {
        return 1
    }
    return ifexist
}
//给储物袋添加物品
export const Add_najie_thing = async (najie, najie_thing, thing_acount) => {
    const thing = najie.thing.find(item => item.id == najie_thing.id)
    if (thing) {
        let acount = thing.acount + thing_acount
        if (acount < 1) {
            najie.thing = najie.thing.filter(item => item.id != najie_thing.id)
        } else {
            najie.thing.find(item => item.id == najie_thing.id).acount = acount
        }
        return najie
    } else {
        najie_thing.acount = thing_acount
        najie.thing.push(najie_thing)
        return najie
    }
}
/**
 * @param {ID} UID 
 * @param {物品} searchsthing 
 * @param {数量} quantity 
 * @returns 
 */
export const addKnapsack = async (UID, searchsthing, quantity) => {
    let najie = await Read_najie(UID)
    najie = await Add_najie_thing(najie, searchsthing, quantity)
    await Write_najie(UID, najie)
    return
}
//发送转发消息
export const ForwardMsg = async (e, data) => {
    const msgList = []
    for (let i of data) {
        msgList.push({
            message: i,
            nickname: Bot.nickname,
            user_id: Bot.uin,
        })
    }
    if (msgList.length == 1) {
        await e.reply(msgList[0].message)
    } else {
        await e.reply(await Bot.makeForwardMsg(msgList))
    }
    return
}

/**
 * 得到状态
 */
export const getPlayerAction = async (UID) => {
    const arr = {}
    let action = await redis.get(`xiuxian:player:${UID}:action`)
    action = JSON.parse(action)
    if (action != null) {
        const action_end_time = action.end_time
        const now_time = new Date().getTime()
        if (now_time <= action_end_time) {
            const m = parseInt((action_end_time - now_time) / 1000 / 60)
            const s = parseInt(((action_end_time - now_time) - m * 60 * 1000) / 1000)
            arr.action = action.action//当期那动作
            arr.time = m + 'm' + s + 's'//剩余时间
            return arr
        }
    }
    arr.action = map['free']
    return arr
}
/**
 * 关闭状态
 */
export const offaction = async (qq) => {
    const exists = await redis.exists(`xiuxian:player:${qq}:action`)
    if (exists == 1) {
        await redis.del(`xiuxian:player:${qq}:action`)
    }
    return
}
/**
 * 冷却检测
 */
export const GenerateCD = async (UID, CDid, CDTime) => {
    const now_time = new Date().getTime()
    const remainTime = await redis.ttl(`xiuxian:player:${UID}:${CDid}`)
    const time = {
        h: 0,
        m: 0,
        s: 0
    }
    if (remainTime != -1) {
        time.h = Math.floor(remainTime / 60 / 60)
        time.h = time.h < 0 ? 0 : time.h
        time.m = Math.floor((remainTime - time.h * 60 * 60) / 60)
        time.m = time.m < 0 ? 0 : time.m
        time.s = Math.floor((remainTime - time.h * 60 * 60 - time.m * 60))
        time.s = time.s < 0 ? 0 : time.s
        if (time.h != 0 || time.m != 0 || time.s != 0) {
            return `${CDname[CDid]}冷却${time.h}h${time.m}m${time.s}s`
        }
    }
    await redis.set(`xiuxian:player:${UID}:${CDid}`, now_time)
    await redis.expire(`xiuxian:player:${UID}:${CDid}`, CDTime * 60)
    return 0

}
//插件CD检测
export const GenerateCDplugin = async (UID, CDid, CDname) => {
    const remainTime = await redis.ttl(`xiuxian:player:${UID}:${CDid}`)
    const time = {
        h: 0,
        m: 0,
        s: 0
    }
    if (remainTime != -1) {
        time.h = Math.floor(remainTime / 60 / 60)
        time.h = time.h < 0 ? 0 : time.h
        time.m = Math.floor((remainTime - time.h * 60 * 60) / 60)
        time.m = time.m < 0 ? 0 : time.m
        time.s = Math.floor((remainTime - time.h * 60 * 60 - time.m * 60))
        time.s = time.s < 0 ? 0 : time.s
        if (time.h != 0 || time.m != 0 || time.s != 0) {
            return `${CDname[CDid]}冷却${time.h}h${time.m}m${time.s}s`
        }
    }
    await redis.set(`xiuxian:player:${UID}:${CDid}`, now_time)
    await redis.expire(`xiuxian:player:${UID}:${CDid}`, CDTime * 60)
    return 0
}
//判断两者是否可以交互
export const interactive = async (A, B) => {
    const a = await Read_action(A)
    const b = await Read_action(B)
    //198=1.98=1
    a.x = Math.floor(a.x / 100)
    a.y = Math.floor(a.y / 100)
    //145/100=1.45=1
    b.x = Math.floor(b.x / 100)
    b.y = Math.floor(b.y / 100)
    if (a.x == b.x && b.y == b.y) {
        return true
    }
    return false
}
//判断两者距离
export const distance = async (A, B) => {
    const a = await Read_action(A)
    const b = await Read_action(B)
    const h = Math.pow(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2), 1 / 2)
    return h
}
//两者距离
export const map_distance = async (A, B) => {
    const h = Math.pow(Math.pow((A.x - B.x1), 2) + Math.pow((A.y - B.y1), 2), 1 / 2)
    return h
}
//输入：模糊搜索名字并判断是否在此地
export const point_map = async (UID, addressName) => {
    const action = await Read_action(UID)
    const point = ''
    let T = false
    point.forEach((item) => {
        if (item.name.includes(addressName)) {
            if (action.x == item.x && action.y == item.y) {
                T = true
            }
        }
    })
    return T
}
import { __PATH } from '../yunzai/index.js'
import noderequire from '../db/noderequire.js'
import nodefs from '../db/nodefs.js'
const FS = noderequire.fs()
const PATH = noderequire.path()
const map={
    'start':'降临成功',
    'delete':'删除成功',
    'ctrate':'创建成功',
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
 * 随机获得奖励
 * @param {概率} P 
 * @returns 
 */
export const randomReward = async (P) => {

    return
}
/**
 * @param {ID} UID 
 * @returns 随机丢出一件装备 
 */
export const randomEquipment = async (UID) => {
    let equipment = await Read_equipment(UID)
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

export const randomNuber = async (mini, max) => {
    return Math.floor((Math.random() * (max - mini) + mini))
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
    const new_player = {
        'autograph': '无',//道宣
        'days': 0//签到
    }
    const new_battle = {
        'nowblood': await nodefs.readFindId(__PATH['level'], 'levellist0',1).blood,
        'extra_attack': '',
        'extra_blood': '',
        'extra_defense': '',
    }
    const new_level = {
        'prestige': 0,//魔力
        'level_id': 1,//练气境界
        'levelname': '凡人',//练气名
        'experience': 1,//练气经验
        'levelmax_id': 1,//练体境界
        'levelnamemax': '莽夫',//练体名
        'experiencemax': 1,//练体经验
        'rank_id': 0,//数组位置
        'rankmax_id': 0//数组位置
    }
    const new_wealth = {
        'lingshi': 0,
        'xianshi': 0
    }
    const position = await nodefs.readFindName(__PATH['position'], 'position','极西')
    const positionID = position.id.split('-')
    const the = {
        mx: Math.floor((Math.random() * (position.x2 - position.x1))) + Number(position.x1),
        my: Math.floor((Math.random() * (position.y2 - position.y1))) + Number(position.y1)
    }
    const new_action = {
        'game': 1,//游戏状态
        'Couple': 1, //双修
        'newnoe': 1, //新人
        'x': the.mx,
        'y': the.my,
        'z': positionID[0],//位面 
        'region': positionID[1],//区域
        'address': positionID[2],//属性
        'Exchange': 0
    }
    const new_najie = {
        'grade': 1,
        'lingshimax': 50000,
        'lingshi': 0,
        'thing': []
    }
    const newtalent = await get_talent()
    const new_talent = {
        'talent': newtalent,//灵根
        'talentshow': 1,//显示0,隐藏1
        'talentsize': 0,//天赋
        'AllSorcery': []//功法
    }
    const thename = {
        name1: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
        name2: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
    }
    const name = await Anyarray(thename.name1) + await Anyarray(thename.name2)
    const life = await Read_Life()
    const time = new Date()
    life.push({
        'qq': UID,
        'name': `${name}`,
        'Age': 1,//年龄
        'life': Math.floor((Math.random() * (100 - 50) + 50)), //寿命
        'createTime': time.getTime(),
        'status': 1
    })
    await Write_player(UID, new_player)
    await Write_talent(UID, new_talent)
    await player_efficiency(UID)
    await Write_battle(UID, new_battle)
    await Write_level(UID, new_level)
    await Write_wealth(UID, new_wealth)
    await Write_action(UID, new_action)
    await Write_equipment(UID, [])
    await Write_najie(UID, new_najie)
    await Write_Life(life)
    return map['start']
}

export const deletegame = async () => {
    await Write_Exchange([])
    await Write_Forum([])
    await Write_Life([])
    await this.deleteredis()
    return map['delete']
}

export const deleteredis = async () => {
    const allkey = await redis.keys('xiuxian:*', (err, data) => { })
    if (allkey) {
        allkey.forEach(async (item) => {
            await redis.del(item)
        })
        return map['delete']
    } else {
        return '无一花草'
    }
}

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
/**
 * 
 * @param {UID} UID 
 * @returns 
 */
export const Read_player = async (UID) => {
    return await nodefs.Read(UID, __PATH['user_player'])
}
/**
 * 
 * @param {UID} UID 
 * @param {地址} data 
 * @returns 
 */
export const Write_player = async (UID, data) => {
    await nodefs.Write(UID, data, __PATH['user_player'])
    return
}
//读取灵根
export const Read_talent = async (UID) => {
    return await nodefs.Read(UID, __PATH['user_talent'])
}
//写入新灵根
export const Write_talent = async (UID, data) => {
    await nodefs.Write(UID, data, __PATH['user_talent'])
    return
}
//读取战斗
export const Read_battle = async (UID) => {
    return await nodefs.Read(UID, __PATH['user_battle'])
}
//写入新战斗
export const Write_battle = async (UID, data) => {
    await nodefs.Write(UID, data, __PATH['user_battle'])
    return
}
//读取境界
export const Read_level = async (UID) => {
    return await nodefs.Read(UID, __PATH['user_level'])
}
//写入新境界
export const Write_level = async (UID, data) => {
    await nodefs.Write(UID, data, __PATH['user_level'])
    return
}
//读取财富
export const Read_wealth = async (UID) => {
    return await nodefs.Read(UID, __PATH['user_wealth'])
}
//写入新财富
export const Write_wealth = async (UID, data) => {
    await nodefs.Write(UID, data, __PATH['user_wealth'])
    return
}
//读取状态
export const Read_action = async (UID) => {
    return await nodefs.Read(UID, __PATH['user_action'])
}
//写入新状态
export const Write_action = async (UID, data) => {
    await nodefs.Write(UID, data, __PATH['user_action'])
    return
}
//读取储物袋
export const Write_najie = async (UID, najie) => {
    await nodefs.Write(UID, najie, __PATH['user_najie'])
    return
}
export const Read_najie = async (UID) => {
    return await nodefs.Read(UID, __PATH['user_najie'])
}
//读取装备
export const Read_equipment = async (UID) => {
    return await nodefs.Read(UID, __PATH['user_equipment'])
}
//写入新装备
export const Write_equipment = async (UID, equipment) => {
    await nodefs.Write(UID, equipment, __PATH['user_equipment'])
    await updata_equipment(UID)
    return
}
//计算面板
export const updata_equipment = async (UID) => {
    const battle = await Read_battle(UID)
    const equipment = await Read_equipment(UID)
    const level = await Read_level(UID)
    //tudo
    const levelmini = await nodefs.readFindId(__PATH['level'],'levellist0',level.level_id)
    const levelmax = await nodefs.readFindId(__PATH['level'],'levellist1',level.level_id)
    const the = {
        attack: 0,
        defense: 0,
        blood: 0,
        burst: 0,
        burstmax: 0,
        speed: 0,
        player: 0
    }
    equipment.forEach((item) => {
        the.attack = the.attack + item.attack
        the.defense = the.defense + item.defense
        the.blood = the.blood + item.blood
        the.burst = the.burst + item.burst
        the.burstmax = the.burstmax + item.burstmax
        the.speed = the.speed + item.speed
    })
    const bloodLimit = levelmini.blood + levelmax.blood + Math.floor((levelmini.blood + levelmax.blood) * the.blood * 0.01)
    the.player = {
        nowblood: battle.nowblood > bloodLimit ? bloodLimit : battle.nowblood,
        attack: levelmini.attack + levelmax.attack + Math.floor((levelmini.attack + levelmax.attack) * the.attack * 0.01),
        defense: levelmini.defense + levelmax.defense + Math.floor((levelmini.defense + levelmax.defense) * the.defense * 0.01),
        blood: bloodLimit,
        burst: levelmini.burst + levelmax.burst + the.burst,
        burstmax: levelmini.burstmax + levelmax.burstmax + the.burstmax + level.rank_id * 10,
        speed: levelmini.speed + levelmax.speed + the.speed
    }
    the.player.power = the.player.attack + the.player.defense + the.player.blood + the.player.burst + the.player.burstmax + the.player.speed
    await Write_battle(UID, the.player)
    return
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
    player.experience = await exp0 + exp1
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
//怪物战斗
export const monsterbattle = async (e, battleA, battleB) => {
    const battle_msg = {
        msg: [],
        QQ: 1
    }
    const battle = {
        Z: 1
    }
    const battle_hurt = {
        hurtA: 0,
        hurtB: 0
    }
    if (battleA.speed >= battleB.speed - 5) {
        battle_hurt.hurtA = battleA.attack - battleB.defense >= 0 ? battleA.attack - battleB.defense + 1 : 0
        if (battle_hurt.hurtA <= 1) {
            battle_msg.msg.push('你个老六想偷袭,却连怪物的防御都破不了,被怪物一巴掌给拍死了!')
            battleA.nowblood = 0
            battle_msg.QQ = 0
            await Write_battle(e.user_id, battleA)
            return battle_msg
        }
        const T = await battle_probability(battleA.burst)
        if (T) {
            battle_hurt.hurtA += Math.floor(battle_hurt.hurtA * battleA.burstmax / 100)
        }
        battleB.nowblood = battleB.nowblood - battle_hurt.hurtA
        if (battleB.nowblood < 1) {
            battle_msg.msg.push('你仅出一招,就击败了怪物!')
            return battle_msg
        } else {
            battle_msg.msg.push(`你个老六偷袭,造成${battle_hurt.hurtA}伤害`)
        }
    }
    else {
        battle_msg.msg.push('你个老六想偷袭,怪物一个转身就躲过去了')
    }
    while (true) {
        battle.Z++
        if (battle.Z == 30) {
            break
        }
        battle_hurt.hurtB = battleB.attack - battleA.defense >= 0 ? battleB.attack - battleA.defense + 1 : 0
        const F = await battle_probability(battleB.burst)
        if (F) {
            battle_hurt.hurtB += Math.floor(battle_hurt.hurtB * battleB.burstmax / 100)
        }
        battleA.nowblood = battleA.nowblood - battle_hurt.hurtB
        if (battle_hurt.hurtB > 1) {
            if (battleA.nowblood < 1) {
                battle_msg.msg.push(`经过${battle.Z}回合,你被怪物击败了!`)
                battleA.nowblood = 0
                battle_msg.QQ = 0
                break
            }
        }
        battle_hurt.hurtA = battleA.attack - battleB.defense >= 0 ? battleA.attack - battleB.defense + 1 : 0
        const T = await battle_probability(battleA.burst)
        if (T) {
            battle_hurt.hurtA += Math.floor(battle_hurt.hurtA * battleA.burstmax / 100)
        }
        if (battle_hurt.hurtA <= 1) {
            battle_msg.msg.push('你再次攻击,却连怪物的防御都破不了,被怪物一巴掌给拍死了!')
            battleA.nowblood = 0
            battle_msg.QQ = 0
            break
        }
        battleB.nowblood = battleB.nowblood - battle_hurt.hurtA
        if (battleB.nowblood < 1) {
            battle_msg.msg.push(`经过${battle.Z}回合,你击败了怪物!`)
            break
        }
    }
    battle_msg.msg.push(`血量剩余:${battleA.nowblood}`)
    await Write_battle(e.user_id, battleA)
    return battle_msg
}

//暴击率
export const battle_probability = async (P) => {
    let newp = P
    if (newp > 100) {
        newp = 100
    }
    if (newp < 0) {
        newp = 0
    }
    const rand = Math.floor((Math.random() * (100 - 1) + 1))
    if (newp > rand) {
        return true
    }
    return false
}
//得到灵根
export const get_talent = async () => {
    const newtalent = []
    const talentacount = Math.round(Math.random() * (5 - 1)) + 1
    for (let i = 0; i < talentacount; i++) {
        const x = Math.round(Math.random() * (10 - 1)) + 1
        const y = newtalent.indexOf(x)
        if (y != -1) {
            continue
        }
        if (x <= 5) {
            const z = newtalent.indexOf(x + 5)
            if (z != -1) {
                continue
            }
        } else {
            const z = newtalent.indexOf(x - 5)
            if (z != -1) {
                continue
            }
        }
        newtalent.push(x)
    }
    return newtalent
}
/**
 * 得到灵根名字
 */
export const talentname = async (player) => {
    const talentname = []
    let name = ''
    const talent = player.talent
    for (let i = 0; i < talent.length; i++) {
        name = data.talent_list.find(item => item.id == talent[i]).name
        talentname.push(name)
    }
    return talentname
}

/**
 * 计算天赋
 */
const talentsize = async (player) => {
    const talent = {
        player: player.talent,
        talentsize: 250
    }
    //根据灵根数来判断
    for (let i = 0; i < talent.player.length; i++) {
        //循环加效率
        if (talent.player[i] <= 5) {
            talent.talentsize -= 50
        }
        if (talent.player[i] >= 6) {
            talent.talentsize -= 40
        }
    }
    return talent.talentsize
}

/**
 * 天赋综合计算
 */
export const player_efficiency = async (UID) => {
    const player = await Read_talent(UID)
    const the = {
        gongfa_efficiency: 0,
        linggen_efficiency: 0
    }
    the.gongfa_efficiency = 0
    player.AllSorcery.forEach((item) => {
        the.gongfa_efficiency = the.gongfa_efficiency + item.size
    })
    the.linggen_efficiency = await talentsize(player)
    player.talentsize = the.linggen_efficiency + the.gongfa_efficiency
    await Write_talent(UID, player)
    return
}

/**
 * 根据名字返回物品
 */
export const search_thing_name = async (thing) => {
    const ifexist0 = await nodefs.readFindName(__PATH['all'],'all',thing)
    if (!ifexist0) {
        return 1
    }
    return ifexist0
}
/**
 * 根据id返回物品
 */
export const search_thing_id = async (thing_id) => {
    const ifexist0 = await nodefs.readFindId(__PATH['all'],'all',thing_id)
    if (!ifexist0) {
        return 1
    } else {
        return ifexist0
    }
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
 * 对象数组排序
 * 从大到小
 */
export const sortBy = (field) => {
    return function (b, a) {
        return a[field] - b[field]
    }
}
/**
 * 输入概率随机返回布尔类型数据
 */
export const probability = (P) => {
    //概率为1-100
    if (P > 100) { P = 100 }
    if (P < 0) { P = 0 }
    const rand = Math.floor((Math.random() * (100 - 1) + 1))
    //命中
    if (rand < P) {
        return true
    }
    return false
}
//输入物品随机返回元素
export const Anyarray = (ARR) => {
    const randindex = Math.trunc(Math.random() * ARR.length)
    return ARR[randindex]
}
//沉睡
export const sleep = async (time) => {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}
/**
 * 强制修正至少为1
 */
export const Numbers = async (value) => {
    let size = value
    if (isNaN(parseFloat(size)) && !isFinite(size)) {
        size = 1
    }
    size = Number(Math.trunc(size))
    if (size == null || size == undefined || size < 1 || isNaN(size)) {
        size = 1
    }
    return Number(size)
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
    arr.action = '空闲'
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
//写入寿命表
export const Write_Life = async (wupin) => {
    await nodefs.Write(`life`, wupin, __PATH['user_life'])
    return
}
//读寿命表
export const Read_Life = async () => {
    const dir = PATH.join(`${__PATH['user_life']}/life.json`)
    let Life = await newRead(dir)
    if (Life == 1) {
        await Write_Life([])
        Life = await newRead(dir)
    }
    Life = await JSON.parse(Life)
    return Life
}
//新的写入
export const newRead = async (dir) => {
    try {
        const newdata = FS.readFileSync(dir, 'utf8', (err, data) => {
            if (err) {
                return 'error'
            }
            return data
        })
        return newdata
    } catch {
        return 1
    }
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
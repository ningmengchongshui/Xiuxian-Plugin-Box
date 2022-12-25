import algorithm from "../db/algorithm.js"
import nodefs from "../db/nodefs.js"
import { __PATH } from "./gamedata.js"
import userdata from "./userdata.js"
const NAME = {
    full: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
    name: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
}
class Useraction {
    createUser = async (UID) => {
        const id = 1
        const zero = 0
        const UserMsg = {
            'autograph': zero,
            'days': zero
        }
        const Level = await nodefs.readFindId(__PATH['level'], 'levellist0', id)
        const level = await nodefs.readFindId(__PATH['level'], 'levellist1', id)
        const UserBattle = {
            'blood_size': Level.blood + level.blood,  //时时血量
            /**
             * 数值加成
             */
            'basices': {
                'attack': Level.attack + level.attack,
                'blood': Level.blood + level.blood,
                'defense': Level.defense + level.defense,
                'probability': Level.probability + level.probability,
                'burst': Level.burst + level.burst,
                'master': Level.master + level.master,
                'speed': Level.speed + level.speed
            },
            /**
             * 百分比加成
             */
            'fixed': {
                'attack': zero,
                'blood': zero,
                'defense': zero,
                'probability': zero,
                'burst': zero,
                'master': zero,
                'speed': zero
            },
            /**
             * 百分比加成
             */
            'extra': {
                'attack': {
                    'size': zero,
                    'time': zero
                },
                'blood': {
                    'size': zero,
                    'time': zero
                },
                'defense': {
                    'size': zero,
                    'time': zero
                },
                'probability': {
                    'size': zero,
                    'time': zero
                },
                'burst': {
                    'size': zero,
                    'time': zero
                },
                'master': {
                    'size': zero,
                    'time': zero
                },
                'speed': {
                    'size': zero,
                    'time': zero
                }
            }
        }
        const UserLevel = {
            'level_id': id,
            'level_name': Level.name,
            'level_experience': id,
            'levelmax_id': id,
            'levelmax_name': level.name,
            'levelmax_experience': id,
            'rank_id': zero,
            'rankmax_id': zero,
            'prestige': zero
        }
        const UserWealth = {
            'lingshi': zero,
            'xianshi': zero
        }
        const position = await nodefs.readFindName(__PATH['position'], 'position', '极西')
        const positionID = position.id.split('-')
        const UserAction = {
            'x': Math.floor((Math.random() * (position.x2 - position.x1))) + Number(position.x1),
            'y': Math.floor((Math.random() * (position.y2 - position.y1))) + Number(position.y1),
            'z': positionID[0],
            'region': positionID[1],
            'address': positionID[2],
            'state': {} //存储状态：当有某一状态时，限制行为
        }
        const UserBag = {
            'bag_grade': 1,
            'lattice_size': 16, //格子数  1-16，2-18，3-20，4-22，5-24
            'money_max': 50000,
            'money_size': zero,
            'thing': []
        }
        const UserEquipment = {
            'panel': {
                'attack': zero,
                'blood': zero,
                'defense': zero,
                'probability': zero,
                'burst': zero,
                'master': zero,
                'speed': zero
            },
            'thing': []
        }
        await userdata.writeMsg(UID, UserMsg)
        await userdata.writeBattle(UID, UserBattle)
        await userdata.writeLevel(UID, UserLevel)
        await userdata.writeWealth(UID, UserWealth)
        await userdata.writeAction(UID, UserAction)
        await userdata.writeEquipment(UID, UserEquipment)
        await userdata.writeBag(UID, UserBag)
        //更新灵根
        this.updataTalent(UID)
        //更新寿命
        this.updataLife(UID)
        return
    }
    //更新装备面板
    updataEuipment = async (UID) => {
        const equipment = await userdata.readEquipment(UID)
        const panel = {
            'attack': 0,
            'blood': 0,
            'defense': 0,
            'probability': 0,
            'burst': 0,
            'master': 0,
            'speed': 0
        }
        //遍历计算
        equipment.thing.forEach((item) => {
            panel.attack += item.aattack
            panel.blood += item.blood
            panel.defense += item.defense
            panel.probability += item.probability
            panel.burst += item.burst
            panel.master += item.master
            panel.speed += item.speed
        })
        //替换新计算来的面板
        equipment.panel = panel
        await userdata.writeEquipment(UID, equipment)
        return
    }
    //更新寿命
    updataLife = async (UID) => {
        const LIFEMAP = {
            'qq': UID,
            'name': await algorithm.Anyarra(NAME['full']) + await algorithm.Anyarra(NAME['name']),
            'age_size': 1,
            'age_max': Math.floor((Math.random() * (100 - 60) + 60)),
            'create_time': new Date().getTime(),
            'status': 1
        }
        const life = await userdata.readLife()
        if (life.includes(UID)) {
            life.forEach((item) => {
                if (item['qq'] == UID) {
                    item['age_size'] = 1
                    item['age_max'] = LIFEMAP['age_max']
                    item['create_time'] = LIFEMAP['create_time']
                    item['status'] = 1
                }
            })
        } else {
            life.push(LIFEMAP)
        }
        return
    }
    //更新天赋
    updataEfficiency = async (UID) => {
        const Talent = await userdata.readTalent(UID)
        let AllSor_size = 0
        //计算功法加成
        Talent.AllSor_cery.forEach((item) => {
            AllSor_size += item.size
        })
        //计算灵根加成
        const talent_size = await algorithm.talentsize(Talent.talent_arr)
        Talent.AllSor_size = talent_size + AllSor_size
        await userdata.writeTalent(UID, Talent)
        return
    }
    //更新灵根
    updataTalent = async (UID) => {
        const UserTalent = {
            'talent_arr': algorithm.randomConditionNumber(),
            'talent_show': 1,
            'AllSor_size': 0,
            'AllSor_cery': []
        }
        await userdata.writeTalent(UID, UserTalent)
        return
    }
}
export default new Useraction()
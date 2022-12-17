import algorithm from "../db/algorithm.js"
import nodefs from "../db/nodefs.js"
import { __PATH } from "../yunzai.js"
import userdata from "./userdata.js"
const thename = {
    name1: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
    name2: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
}
const MAP = {
    'not': '无'
}
class Useraction {
    //创建存档
    createUser = async (UID) => {
        const id = 1
        const not = 0
        const new_player = {
            'autograph': MAP['not'],
            'days': 0
        }
        const level = await nodefs.readFindId(__PATH['level'], 'levellist0', id)
        const level1 = await nodefs.readFindId(__PATH['level'], 'levellist1', id)
        const new_battle = {
            'nowblood': level.blood,
            'extra_attack': '',
            'extra_blood': '',
            'extra_defense': '',
        }
        const new_level = {
            'prestige': not,
            'level_id': id,
            'level_name': level.name,
            'experience': id,
            'levelmax_id': id,
            'level_namemax': level1.name,
            'experiencemax': id,
            'rank_id': not,
            'rankmax_id': not
        }
        const new_wealth = {
            'lingshi': not,
            'xianshi': not
        }
        const position = await nodefs.readFindName(__PATH['position'], 'position', '极西')
        const positionID = position.id.split('-')
        const the = {
            mx: Math.floor((Math.random() * (position.x2 - position.x1))) + Number(position.x1),
            my: Math.floor((Math.random() * (position.y2 - position.y1))) + Number(position.y1)
        }
        const new_action = {
            'game': 1,
            'Couple': 1,
            'newnoe': 1,
            'x': the.mx,
            'y': the.my,
            'z': positionID[0],
            'region': positionID[1],
            'address': positionID[2],
            'Exchange': not
        }
        const new_najie = {
            'grade': 1,
            'lingshimax': 50000,
            'lingshi': not,
            'thing': []
        }
        const newtalent = await get_talent()
        const new_talent = {
            'talent': newtalent,
            'talent_show': 1,
            'talent_size': not,
            'AllSor_cery': []
        }

        const name = await algorithm.Anyarra(thename.name1) + await algorithm.Anyarra(thename.name2)

        const life = await Read_Life()
        const time = new Date()
        life.push({
            'qq': UID,
            'name': `${name}`,
            'age': 1,//年龄
            'life': Math.floor((Math.random() * (100 - 50) + 50)), //寿命
            'create_time': time.getTime(),
            'status': 1
        })
        await userdata.writeMsg(UID, new_player)
        await userdata.writeTalent(UID, new_talent)
        await userdata.writeBattle(UID, new_battle)
        await userdata.writeLevel(UID, new_level)
        await userdata.writeWealth(UID, new_wealth)
        await userdata.writeAction(UID, new_action)
        await userdata.writeEquipment(UID, [])
        await userdata.writeBag(UID, new_najie)

        //更新寿命
        await Write_Life(life)
        //更新天赋
        await player_efficiency(UID)
        //更新面板
        await updata_equipment(UID)
    }
    //更新装备
    updataEuipment = async (UID) => {

    }
    //更新寿命
    updataLife = async (UID) => {

    }
    //更新天赋
    updataEfficiency = async (UID) => {

    }

}
export default new Useraction()
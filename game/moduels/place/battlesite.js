import Cachemonster from '../../moduels/xiuxian/cachemonster.js'
import { Go } from '../../moduels/yunzai/xiuxian/index.js'
import { __PATH } from '../../moduels/yunzai/index.js'
import { Read_action, ForwardMsg, Read_battle, monsterbattle, Add_experiencemax, Add_experience, Add_lingshi, GenerateCD, Add_najie_thing, Read_najie, Write_najie, Read_talent } from '../../moduels/xiuxian/index.js'
import nodefs from '../../moduels/db/nodefs.js'
const MAP = {
    'bag_full': '背包满了',
    'no_serch': '这里并没有,到别处看看吧',
    'lingshi': '灵石',
    'qixue': '气血',
    'xiuwei': '修为'
}
export class battlesite {
    Kill = async (e) => {
        const good = await Go(e)
        if (!good) {
            return
        }
        const UID = e.user_id
        const name = e.msg.replace('#击杀', '')
        const action = await Read_action(UID)
        const monstersdata = await Cachemonster.monsterscache(action.region)
        const mon = monstersdata.find(item => item.name == name)
        if (!mon) {
            e.reply(MAP['no_serch'])
            return
        }
        const CD = await GenerateCD(e.user_id, '10', this.xiuxianConfigData.CD.Kill)
        if (CD != 0) {
            e.reply(CD)
            return
        }
        const acount = await Cachemonster.add(action.region, Number(1))
        const msg = [`${UID}[击杀]`]
        const buff = {
            "msg": 1
        }
        if (acount == 1) {
            buff.msg = Math.floor((Math.random() * (20 - 5))) + Number(5)
        }
        const MonsterLevel = nodefs.readFindId(__PATH['level'], 'levellist0',)
        const monsters = {
            'nowblood': MonsterLevel.blood * buff.msg,
            'attack': MonsterLevel.attack * buff.msg,
            'defense': MonsterLevel.defense * buff.msg,
            'blood': MonsterLevel.blood * buff.msg,
            'burst': MonsterLevel.burst + MonsterLevel.id * 5 * buff.msg,
            'burstmax': MonsterLevel.burstmax + MonsterLevel.id * 10 * buff.msg,
            'speed': MonsterLevel.speed + 5 + buff.msg
        }
        const battle = await Read_battle(UID)
        const talent = await Read_talent(UID)
        const mybuff = Math.floor(talent.talentsize / 100) + Number(1)
        //怪物战斗模型 tudo
        const battle_msg = await monsterbattle(e, battle, monsters)
        battle_msg.msg.forEach((item) => {
            msg.push(item)
        })
        if (battle_msg.QQ != 0) {
            const m = Math.floor((Math.random() * (100 - 1))) + Number(1)
            if (m < mon.level * 5) {
                const dropsItemList = nodefs.Read('dropsItem', __PATH['all'], mon.level)
                const random = Math.floor(Math.random() * dropsItemList.length)
                let najie = await Read_najie(UID)
                if (najie.thing.length <= 21) {
                    najie = await Add_najie_thing(najie, dropsItemList[random], 1)
                    msg.push(`[${dropsItemList[random].name}]`)
                    await Write_najie(UID, najie)
                } else {
                    e.reply(MAP['bag_full'])
                }
            }
            if (m < mon.level * 6) {
                msg.push(`${mon.level * 25 * mybuff}${MAP['qixue']}`)
                await Add_experiencemax(UID, mon.level * 25 * mybuff)
            }
            if (m < mon.level * 7) {
                msg.push(`${mon.level * 35 * mybuff}${MAP['lingshi']}`)
                await Add_lingshi(UID, mon.level * 35 * mybuff)
            }
            if (m < mon.level * 8) {
                msg.push(`${mon.level * 50 * mybuff}${MAP['xiuwei']}`)
                await Add_experience(UID, mon.level * 50 * mybuff)
            }
            if (m >= mon.level * 8) {
                msg.push(`${mon.level * 25}${MAP['lingshi']}`)
                await Add_lingshi(UID, mon.level * 25)
            }
        }
        await ForwardMsg(e, msg)
        return
    }

    Exploremonsters = async (e) => {
        const good = await Go(e)
        if (!good) {
            return
        }
        const action = await Read_action(e.user_id)
        const msg = []
        const monster = await Cachemonster.monsterscache(action.region)
        monster.forEach((item) => {
            msg.push(
                'name:' + item.name + '\n' +
                'grade:' + item.level + '\n'
            )
        })
        await ForwardMsg(e, msg)
        return
    }
}
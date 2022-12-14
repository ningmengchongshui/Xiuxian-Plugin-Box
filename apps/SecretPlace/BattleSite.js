import plugin from '../../../../lib/plugins/plugin.js'
import Cachemonster from '../../moduels/cachemonster.js'
import config from '../../moduels/config.js'
import { Gomini, Go } from '../../moduels/yunzai/index.js'
import { yunzaiConfig } from '../../moduels/yunzai/index.js'
import { Read_action, ForwardMsg, Read_battle, monsterbattle, Add_experiencemax, Add_experience, Add_lingshi, GenerateCD, Add_najie_thing, Read_najie, Write_najie, Read_talent } from '../../moduels/xiuxian/index.js'
export class battlesite extends plugin {
    constructor() {
        super(yunzaiConfig('battlesite', [
            {
                reg: '^#击杀.*$',
                fnc: 'Kill'
            },
            {
                reg: '^#探索怪物$',
                fnc: 'Exploremonsters'
            }
        ]))
        this.xiuxianConfigData = config.getConfig('xiuxian', 'xiuxian')
    }
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
            e.reply(`这里没有${name},去别处看看吧`)
            return
        }
        const CD = await GenerateCD(e.user_id, '10', this.xiuxianConfigData.CD.Kill)
        if (CD != 0) {
            e.reply(CD)
            return
        }
        const acount = await Cachemonster.add(action.region, Number(1))
        const msg = [`${UID}的[击杀结果]\n注:怪物每1小时刷新\n物品掉落率=怪物等级*5%`]
        const buff = {
            "msg": 1
        }
        if (acount == 1) {
            buff.msg = Math.floor((Math.random() * (20 - 5))) + Number(5)
            msg.push('怪物突然变异了!')
        }
        const LevelMax = ''  //tudo
        const monsters = {
            'nowblood': LevelMax.blood * buff.msg,
            'attack': LevelMax.attack * buff.msg,
            'defense': LevelMax.defense * buff.msg,
            'blood': LevelMax.blood * buff.msg,
            'burst': LevelMax.burst + LevelMax.id * 5 * buff.msg,
            'burstmax': LevelMax.burstmax + LevelMax.id * 10 * buff.msg,
            'speed': LevelMax.speed + 5 + buff.msg
        }
        const battle = await Read_battle(UID)
        const talent = await Read_talent(UID)
        const mybuff = Math.floor(talent.talentsize / 100) + Number(1)
        const battle_msg = await monsterbattle(e, battle, monsters)
        battle_msg.msg.forEach((item) => {
            msg.push(item)
        })
        if (battle_msg.QQ != 0) {
            const m = Math.floor((Math.random() * (100 - 1))) + Number(1)
            if (m < mon.level * 5) {
                const dropsItemList = ''  //tudo
                const random = Math.floor(Math.random() * dropsItemList.length)
                let najie = await Read_najie(UID)
                if (najie.thing.length <= 21) {
                    najie = await Add_najie_thing(najie, dropsItemList[random], 1)
                    msg.push(`得到[${dropsItemList[random].name}]`)
                    await Write_najie(UID, najie)
                } else {
                    e.reply('储物袋已满')
                }
            }
            if (m < mon.level * 6) {
                msg.push(`得到${mon.level * 25 * mybuff}气血`)
                await Add_experiencemax(UID, mon.level * 25 * mybuff)
            }
            if (m < mon.level * 7) {
                msg.push(`得到${mon.level * 35 * mybuff}灵石`)
                await Add_lingshi(UID, mon.level * 35 * mybuff)
            }
            if (m < mon.level * 8) {
                msg.push(`得到${mon.level * 50 * mybuff}修为`)
                await Add_experience(UID, mon.level * 50 * mybuff)
            }
            if (m >= mon.level * 8) {
                msg.push(`得到${mon.level * 25}灵石`)
                await Add_lingshi(UID, mon.level * 25)
            }
        }
        await ForwardMsg(e, msg)
        return
    }

    Exploremonsters = async (e) => {
        const good = await Gomini(e)
        if (!good) {
            return
        }
        const UID = e.user_id
        const action = await Read_action(UID)
        const msg = []
        const monster = await Cachemonster.monsterscache(action.region)
        monster.forEach((item) => {
            msg.push(
                '怪名:' + item.name + '\n' +
                '等级:' + item.level + '\n'
            )
        })
        await ForwardMsg(e, msg)
        return
    }
}
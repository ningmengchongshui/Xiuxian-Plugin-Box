import plugin from '../../../../lib/plugins/plugin.js'
import common from '../../../../lib/common/common.js'
import config from '../../moduels/xiuxian/config.js'
import { yunzaiConfig } from '../../moduels/yunzai/index.js'
import { segment } from 'oicq'
import { offaction, Add_experience, Add_blood, existplayer, Read_level, Read_talent, Add_experiencemax } from '../../moduels/xiuxian/index.js'
import { Go } from '../../moduels/yunzai/index.js'
export class control extends plugin {
    constructor() {
        super(yunzaiConfig('control', [
            {
                reg: '#降妖$',
                fnc: 'Dagong'
            },
            {
                reg: '#闭关$',
                fnc: 'Biguan'
            },
            {
                reg: '^#出关$',
                fnc: 'chuGuan'
            },
            {
                reg: '^#归来$',
                fnc: 'endWork'
            }
        ]))
        this.xiuxianConfigData = config.getConfig('xiuxian', 'xiuxian')
    }
    Biguan = async (e) => {
        const good = await Go(e)
        if (!good) {
            return
        }
        const UID = e.user_id
        const now_time = new Date().getTime()
        const actionObject = {
            'actionName': '闭关',
            'startTime': now_time
        }
        await redis.set(`xiuxian:player:${UID}:action`, JSON.stringify(actionObject))
        e.reply('开始两耳不闻窗外事...')
        return true
    }
    Dagong = async (e) => {
        const good = await Go(e)
        if (!good) {
            return
        }
        const UID = e.user_id
        const now_time = new Date().getTime()
        const actionObject = {
            'actionName': '降妖',
            'startTime': now_time
        }
        await redis.set(`xiuxian:player:${UID}:action`, JSON.stringify(actionObject))
        e.reply('开始外出...')
        return true
    }
    chuGuan = async (e) => {
        if (!e.isGroup) {
            return
        }
        const UID = e.user_id
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        let action = await redis.get(`xiuxian:player:${UID}:action`)
        if (action == undefined) {
            return
        }
        action = JSON.parse(action)
        if (action.actionName != '闭关') {
            return
        }
        const startTime = action.startTime
        const timeUnit = this.xiuxianConfigData.biguan.time
        const time = Math.floor((new Date().getTime() - startTime) / 60000)
        if (time < timeUnit) {
            e.reply('只是呆了一会儿...')
            await offaction(UID)
            return
        }
        await offaction(UID)
        if (e.isGroup) {
            await this.upgrade(UID, time, action.actionName, e.group_id)
            return
        }
        await this.upgrade(UID, time, action.actionName)
        return
    }
    endWork = async (e) => {
        if (!e.isGroup) {
            return
        }
        const UID = e.user_id
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        let action = await redis.get(`xiuxian:player:${UID}:action`)
        if (action == undefined) {
            return
        }
        action = JSON.parse(action)
        if (action.actionName != '降妖') {
            return
        }
        const startTime = action.startTime
        const timeUnit = this.xiuxianConfigData.work.time
        //分钟
        const time = Math.floor((new Date().getTime() - startTime) / 60000)
        if (time < timeUnit) {
            e.reply('只是呆了一会儿...')
            await offaction(UID)
            return
        }
        await offaction(UID)
        if (e.isGroup) {
            await this.upgrade(UID, time, action.actionName, e.group_id)
            return
        }
        await this.upgrade(UID, time, action.actionName)
        return
    }
    upgrade = async (user_id, time, name, group_id) => {
        const UID = user_id
        const level = await Read_level(UID)
        const talent = await Read_talent(UID)
        const mybuff = Math.floor(talent.talentsize / 100) + Number(1)
        let other = 0
        const msg = [segment.at(UID)]
        const rand = Math.floor((Math.random() * (100 - 1) + 1))
        if (name == '闭关') {
            if (rand < 20) {
                other = Math.floor(this.xiuxianConfigData.biguan.size * time * mybuff / 2)
                msg.push(`\n闭关迟迟无法入定,只得到了${other}修为`)
            } else {
                other = Math.floor(this.xiuxianConfigData.biguan.size * time * mybuff)
                msg.push(`\n闭关结束,得到了${other}修为`)
            }
            await Add_experience(UID, other)
            await Add_blood(UID, 90)
            msg.push('\n血量恢复至90%')
        } else {
            if (rand < 20) {
                other = Math.floor(this.xiuxianConfigData.work.size * time * mybuff / 2)
                msg.push(`\n降妖不专心,只得到了${other}气血`)
            } else {
                other = Math.floor(this.xiuxianConfigData.work.size * time * mybuff)
                msg.push(`\n降妖回来,得到了${other}气血`)
            }
            await Add_experiencemax(UID, other)
            await Add_blood(UID, 90)
            msg.push('\n血量恢复至90%')
        }
        msg.push('\n' + name + '结束')
        if (group_id) {
            await this.pushInfo(group_id, true, msg)
            return
        }
        await this.pushInfo(UID, false, msg)
        return
    }
    pushInfo = async (id, is_group, msg) => {
        if (is_group) {
            await Bot.pickGroup(id)
                .sendMsg(msg)
                .catch((err) => {
                    Bot.logger.mark(err)
                })
            return
        }
        await common.relpyPrivate(id, msg)
        return
    }
}
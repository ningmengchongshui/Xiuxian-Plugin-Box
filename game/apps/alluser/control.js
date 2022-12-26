import { segment } from 'oicq'
import { offaction, Add_experience, Add_blood, existplayer, Read_talent, Add_experiencemax } from '../../moduels/xiuxian/index.js'
import { Go } from '../../moduels/yunzai/xiuxian/index.js'
const MAP = {
    'action_biguan': '闭关',
    'action_work': '降妖',
    'biguan_go_out': '开始两耳不闻窗外事',
    'work_go_out': '开始外出',
    'time': '只是呆了一会儿',
    'lingshi': '灵石',
    'qixue': '气血',
    'xiuwei': '修为'
}
export class control {
    Biguan = async (e) => {
        const good = await Go(e)
        if (!good) {
            return
        }
        const UID = e.user_id
        const now_time = new Date().getTime()
        const actionObject = {
            'actionName': MAP['action_biguan'],
            'startTime': now_time
        }
        await redis.set(`xiuxian:player:${UID}:action`, JSON.stringify(actionObject))
        e.reply(MAP['biguan_go_out'])
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
            'actionName': MAP['action_work'],
            'startTime': now_time
        }
        await redis.set(`xiuxian:player:${UID}:action`, JSON.stringify(actionObject))
        e.reply(MAP['work_go_out'])
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
        if (action.actionName != MAP['action_biguan']) {
            return
        }
        const startTime = action.startTime
        const timeUnit = this.xiuxianConfigData.biguan.time
        const time = Math.floor((new Date().getTime() - startTime) / 60000)
        if (time < timeUnit) {
            e.reply(MAP['time'])
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
        if (action.actionName != MAP['action_work']) {
            return
        }
        const startTime = action.startTime
        const timeUnit = this.xiuxianConfigData.work.time
        const time = Math.floor((new Date().getTime() - startTime) / 60000)
        if (time < timeUnit) {
            e.reply(MAP['time'])
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
        const talent = await Read_talent(UID)
        const mybuff = Math.floor(talent.talentsize / 100) + Number(1)
        const rand = Math.floor((Math.random() * (100 - 80) + 80))
        const msg = [segment.at(UID)]
        let other = 0
        if (name == MAP['action_biguan']) {
            other = Math.floor(this.xiuxianConfigData.biguan.size * time * mybuff)
            msg.push(`\n+${other}${MAP['xiuwei']}`)
            await Add_experience(UID, other)
        } else {
            other = Math.floor(this.xiuxianConfigData.work.size * time * mybuff)
            msg.push(`\n+${other}${MAP['qixue']}`)
            await Add_experiencemax(UID, other)
        }
        await Add_blood(UID, rand)
        msg.push(`\n血量恢复至${rand}%`)
        if (group_id) {
            await this.pushInfo(group_id, true, msg)
            return
        }
        await this.pushInfo(UID, false, msg)
        return
    }
}
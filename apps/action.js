import plugin from '../../../lib/plugins/plugin.js'
import ActionApi from '../game/api/action.api.js'
import { yunzaiConfig } from '../moduels/index.js'
export class action extends plugin {
    constructor() {
        super(yunzaiConfig('action', [
            {
                reg: '^#攻击.*$',
                fnc: 'userAttack'
            },
            {
                reg: '^#洗手$',
                fnc: 'userWashHands'
            },
            {
                reg: '^#击杀.*$',
                fnc: 'userKill'
            },
            {
                reg: '^#探索怪物$',
                fnc: 'userExploreMonsters'
            },
            {
                reg: '^#前往.*$',
                fnc: 'userforward'
            },
            {
                reg: '^#回到原地$',
                fnc: 'userBackPiont'
            },
            {
                reg: '^#传送.*$',
                fnc: 'userDelivery'
            }
        ]))
    }
    userAttack = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await ActionApi.userAttack(UID)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userWashHands = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await ActionApi.userWashHands(UID)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userKill = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await ActionApi.userKill(UID)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userforward = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await ActionApi.userforward(UID)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userBackPiont = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await ActionApi.userBackPiont(UID)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userDelivery = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await ActionApi.userDelivery(UID)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
}
import plugin from '../../../lib/plugins/plugin.js'
import ActionApi from '../../../../xiuxian-game/gameback/game/api/action.api.js'
import { yunzaiConfig } from '../moduels/main.js'
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
        //有无AT
        const isat = e.message.some((item) => item.type === 'at');
        if (!isat) {
            return 0;
        };
        //获取对方e.user_id
        const AT = e.message.filter((item) => item.type === 'at')
        const arr = await ActionApi.userAttack(e.user_id, AT[0].qq)
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
        const arr = await ActionApi.userWashHands(e.user_id)
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
        const name = e.msg.replace('#击杀', '')
        const arr = await ActionApi.userKill(e.user_id, name)
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
        const name = e.msg.replace('#前往', '')
        const arr = await ActionApi.userforward(e.user_id, name)
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
        const arr = await ActionApi.userBackPiont(e.user_id)
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
        const name = e.msg.replace('#传送', '')
        const arr = await ActionApi.userDelivery(e.user_id, name)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
}
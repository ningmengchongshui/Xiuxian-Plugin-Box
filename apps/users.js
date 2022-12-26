import plugin from '../../../lib/plugins/plugin.js'
import UserApi from '../../../../xiuxian-game/gameback/game/api/user.api.js'
import { yunzaiConfig } from '../moduels/main.js'
export class users extends plugin {
    constructor() {
        super(yunzaiConfig('users', [
            //基础 
            {
                reg: '^#踏入仙途',
                fnc: 'userStart',
            },
            {
                reg: '^#再入仙途$',
                fnc: 'userReStart'
            },
            //背包
            {
                reg: '^#升级储物袋$',
                fnc: 'bagUpGrade'
            },
            //修炼
            {
                reg: '#闭关$',
                fnc: 'userShutUp'
            },
            {
                reg: '^#出关$',
                fnc: 'userGoToManchuria'
            },
            //物品
            {
                reg: '^#服用.*$',
                fnc: 'userTake'
            },
            {
                reg: '^#学习.*$',
                fnc: 'userStudy'
            },
            {
                reg: '^#忘去.*$',
                fnc: 'userForget'
            },
            {
                reg: '^#消耗.*$',
                fnc: 'userConume'
            },
            //升级
            {
                reg: '^#突破$',
                fnc: 'userLevelUp'
            },
            //修改个人信息
            {
                reg: '^#改名.*$',
                fnc: 'userRenaming'
            },
            {
                reg: '^#改道宣.*$',
                fnc: 'userAutograph'
            },
            //行为
            {
                reg: '^#装上.*$',
                fnc: 'userInstallEquipment'
            },
            {
                reg: '^#卸下.*$',
                fnc: 'userRemovingEquipment'
            },
            //交易
            {
                reg: '^#购买.*$',
                fnc: 'userBuy'
            },
            {
                reg: '^#出售.*$',
                fnc: 'userSell'
            },
            {
                reg: '^#一键出售所有$',
                fnc: 'userSellAll'
            },
            //赠送
            {
                reg: '^#赠送灵石.*$',
                fnc: 'userGiveMoney'
            }
        ]))
    }
    userStart = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await UserApi.userStart(e.user_id)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userReStart = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await UserApi.userReStart(e.user_id)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    bagUpGrade = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await UserApi.bagUpGrade(e.user_id)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userShutUp = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await UserApi.userShutUp(e.user_id)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userGoToManchuria = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await UserApi.userGoToManchuria(e.user_id)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userTake = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const thing = e.msg.replace('#服用', '')
        const arr = await UserApi.userTake(e.user_id, thing)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userStudy = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const thing = e.msg.replace('#学习', '')
        const arr = await UserApi.userStudy(e.user_id, thing)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userForget = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const thing = e.msg.replace('#忘去', '')
        const arr = await UserApi.userForget(e.user_id, thing)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userConume = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const thing = e.msg.replace('#忘去', '')
        const arr = await UserApi.userConume(e.user_id, thing)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userLevelUp = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await UserApi.userLevelUp(e.user_id)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userRenaming = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const name = e.msg.replace('#改名', '')
        const arr = await UserApi.userRenaming(e.user_id, name)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userAutograph = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const sentence = e.msg.replace('#改道宣', '')
        const arr = await UserApi.userAutograph(e.user_id, sentence)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userInstallEquipment = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const thing = e.msg.replace('#装上', '')
        const arr = await UserApi.userInstallEquipment(e.user_id, thing)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userRemovingEquipment = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const thing = e.msg.replace('#卸下', '')
        const arr = await UserApi.userRemovingEquipment(e.user_id, thing)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userBuy = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const thing = e.msg.replace('#购买', '')
        const arr = await UserApi.userBuy(e.user_id, thing)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userSell = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const thing = e.msg.replace('#出售', '')
        const arr = await UserApi.userSell(e.user_id, thing)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userSellAll = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await UserApi.userSellAll(e.user_id)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userGiveMoney = async e => {
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
        //赠送数量
        const number = e.msg.replace('#赠送', '')
        const arr = await UserApi.userGiveMoney(e.user_id, AT[0].qq, number)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
}
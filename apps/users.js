import plugin from '../../../lib/plugins/plugin.js'
import UserApi from '../xiuxian-game/api/user.api.js'
import { yunzaiConfig } from '../moduels/index.js'
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
            {
                reg: '^#存灵石.*$',
                fnc: 'saveMoney'
            },
            {
                reg: '^#取灵石.*$',
                fnc: 'withdrawMoney'
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
        const arr = await UserApi.userStart(UID)
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
        const arr = await UserApi.userReStart(UID)
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
        const arr = await UserApi.bagUpGrade(UID)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    saveMoney = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await UserApi.saveMoney(UID)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    withdrawMoney = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await UserApi.withdrawMoney(UID)
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
        const arr = await UserApi.userShutUp(UID)
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
        const arr = await UserApi.userGoToManchuria(UID)
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
        const arr = await UserApi.userTake(UID)
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
        const arr = await UserApi.userStudy(UID)
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
        const arr = await UserApi.userForget(UID)
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
        const arr = await UserApi.userConume(UID)
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
        const arr = await UserApi.userLevelUp(UID)
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
        const arr = await UserApi.userRenaming(UID)
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
        const arr = await UserApi.userAutograph(UID)
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
        const arr = await UserApi.userInstallEquipment(UID)
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
        const arr = await UserApi.userRemovingEquipment(UID)
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
        const arr = await UserApi.userBuy(UID)
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
        const arr = await UserApi.userSell(UID)
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
        const arr = await UserApi.userSellAll(UID)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    userGiveMoney = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await UserApi.userGiveMoney(UID)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
}
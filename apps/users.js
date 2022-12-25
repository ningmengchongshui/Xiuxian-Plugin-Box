import plugin from '../../../lib/plugins/plugin.js'
import api from '../xiuxian-game/api/admin.api.js'
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
                fnc: 'Take_lingshi'
            },
            {
                reg: '^#取灵石.*$',
                fnc: 'Take_lingshi'
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
            {
                reg: '^#购买.*$',
                fnc: 'userBuy'
            },
            {
                reg: '^#出售.*$',
                fnc: 'userSell'
            },
            //交易
            {
                reg: '^#赠送灵石.*$',
                fnc: 'userGiveMoney'
            },
            {
                reg: '^#一键出售所有$',
                fnc: 'userSellAll'
            }
        ]))
    }
    userStart = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await api.userStart(UID)
        arr.forEach(msg => {
            //循环反馈结果
            e.reply(mgs)
        });
        return
    }
}
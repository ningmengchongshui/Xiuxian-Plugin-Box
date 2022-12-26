import plugin from '../../../lib/plugins/plugin.js'
import ImgApi from '../../../../xiuxian-game/gameback/game/api/img.api.js'
import { yunzaiConfig } from '../moduels/main.js'
export class img extends plugin {
    constructor() {
        super(yunzaiConfig('img', [
            {
                reg: '^#修仙地图$',
                fnc: 'showMap',
            },
            {
                reg: '^#储物袋$',
                fnc: 'showBag'
            },
            {
                reg: '^#基础信息$',
                fnc: 'showUser'
            },
            {
                reg: '^#面板信息$',
                fnc: 'showEquipment',
            },
            {
                reg: '^#功法信息$',
                fnc: 'showExercises',
            },
            {
                reg: '^#凡仙堂$',
                fnc: 'showShop',
            }
        ]))
    }
    showMap = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await ImgApi.showMap()
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    showBag = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await ImgApi.showBag(e.user_id)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    showUser = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await ImgApi.showUser(e.user_id)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    showEquipment = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await ImgApi.showEquipment(e.user_id)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    showExercises = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await ImgApi.showExercises(e.user_id)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
    showShop = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        //接收消息
        const arr = await ImgApi.showShop(e.user_id)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
}
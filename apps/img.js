import plugin from '../../../lib/plugins/plugin.js'
import ImgApi from '../game/api/img.api.js'
import { yunzaiConfig } from '../moduels/index.js'
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
        const arr = await ImgApi.showMap(UID)
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
        const arr = await ImgApi.showBag(UID)
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
        const arr = await ImgApi.showUser(UID)
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
        const arr = await ImgApi.showEquipment(UID)
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
        const arr = await ImgApi.showExercises(UID)
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
        const arr = await ImgApi.showShop(UID)
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
}
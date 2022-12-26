import plugin from '../../../lib/plugins/plugin.js'
import { yunzaiConfig } from '../moduels/main.js'
export class help extends plugin {
    constructor() {
        super(yunzaiConfig('help', [
            {
                reg: '^#修仙帮助$',
                fnc: 'userAttack'
            }
        ]))
    }
    userAttack = async e => {
        //禁止私聊    
        if (!e.isGroup) {
            return
        }
        const arr = ['']
        //循环发送
        arr.forEach(msg => e.reply(msg))
        return
    }
}
import plugin from '../../../../lib/plugins/plugin.js'
import dataup from '../../model/dataup.js'
export class AdminDataUp extends plugin {
    constructor() {
        super({
            name: 'AdminDataUp',
            dsc: 'AdminDataUp',
            event: 'message',
            priority: 600,
            rule: [
                {
                    reg: '^#修仙数据升级$',
                    fnc: 'Xiuxiandataup'
                },
                {
                    reg: '^#修仙升级版本$',
                    fnc: 'dataupexplain'
                }
            ]
        })
    }
    Xiuxiandataup=async(e)=>{
        if (!e.isMaster) {
            return
        }
        e.reply(dataup.pluginupdata('xiuxian-emulator-plugin'))
        return
    }
    dataupexplain=async(e)=>{
        if (!e.isMaster) {
            return
        }
        const plain='[V1.2升级V2.0]\n1.同时安装V1.2与V2.0\n2.#修仙数据升级\nV2.0已有存档的玩家\n将会同步V1.2数据'
        e.reply(plain)
        return
    }
}
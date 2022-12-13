import plugin from '../../../../../lib/plugins/plugin.js'
import plugindata from '../model/plugindata.js'
plugindata.start()
export class NewLevel extends plugin {
    constructor() {
        super({
            name: 'NewLevel',
            dsc: 'NewLevel',
            event: 'message',
            priority: 100,
            rule: [
                {
                    reg: '#凝神$',
                    fnc: 'newleveup'
                }
            ]
        })
    }
    newleveup=async(e)=>{
        return;
    }
}
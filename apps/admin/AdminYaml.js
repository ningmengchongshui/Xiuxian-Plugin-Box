import plugin from '../../../../lib/plugins/plugin.js'
import XiuxianYaml from '../../moduels/XiuxianYaml.js'
import { yunzaiConfig } from '../../moduels/yunzai/index.js'
export class AdminYaml extends plugin {
    constructor() {
        super(yunzaiConfig('admin', [
            {
                reg: '^#修仙配置更改.*',
                fnc: 'configupdata',
            }
        ]))
    }
    configupdata = async (e) => {
        if (!e.isMaster) {
            return
        }
        const [name, size] = e.msg.replace('#修仙配置更改', '').split('\*')
        e.reply(XiuxianYaml.config(name, size))
        return
    }
}
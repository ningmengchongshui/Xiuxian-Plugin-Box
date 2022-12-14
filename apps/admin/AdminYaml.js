import plugin from '../../../../lib/plugins/plugin.js'
import XiuxianYaml from '../../moduels/xiuxian/yaml.js'
import { deletegame, deleteredis } from '../../moduels/xiuxian/index.js'
import { yunzaiConfig } from '../../moduels/yunzai/index.js'
export class adminyaml extends plugin {
    constructor() {
        super(yunzaiConfig('admin', [
            {
                reg: '^#修仙配置更改.*',
                fnc: 'configupdata',
            },
            {
                reg: '^#修仙删除世界$',
                fnc: 'deleteallusers'
            },
            {
                reg: '^#修仙删除数据$',
                fnc: 'deleteredis'
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
    deleteredis = async (e) => {
        if (!e.isMaster) {
            return
        }
        e.reply(await deleteredis())
    }
    deleteallusers = async (e) => {
        if (!e.isMaster) {
            return
        }
        e.reply(await deletegame())
        return
    }
}
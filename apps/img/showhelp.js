import plugin from '../../../../lib/plugins/plugin.js'
import Help from '../../moduels/yunzai/help.js'
import Cache from '../../moduels/yunzai/cache.js'
import { yunzaiConfig } from '../../moduels/yunzai/index.js'
export class showhelp extends plugin {
    constructor() {
        super(yunzaiConfig('showhelp', [
            {
                reg: '^#(修仙帮助|帮助)$',
                fnc: 'Xiuxianhelp'
            },
            {
                reg: '^#修仙管理$',
                fnc: 'adminsuper',
            }
        ]))
    }
    Xiuxianhelp = async (e) => {
        const data = await Help.gethelp('Help', 'Help')
        if (!data) {
            return
        }
        e.reply(await Cache.helpcache(data, 1))
    }
    adminsuper = async (e) => {
        const data = await Help.gethelp('Help', 'Admin')
        if (!data) {
            return
        }
        e.reply(await Cache.helpcache(data, 0))
    }
}
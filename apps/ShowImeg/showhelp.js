import plugin from '../../../../lib/plugins/plugin.js'
import Help from '../../moduels/yunzai/help.js'
import Cache from '../../moduels/cache.js'
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
        const data = await Help.gethelp(e, 'Help')
        if (!data) {
            return
        }
        const img = await Cache.helpcache(data, 1)
        await e.reply(img)
    }
    adminsuper = async (e) => {
        const data = await Help.gethelp(e, 'Admin')
        if (!data) {
            return
        }
        const img = await Cache.helpcache(data, 0)
        await e.reply(img)
    }
}
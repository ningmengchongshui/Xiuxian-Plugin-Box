import plugin from '../../../../lib/plugins/plugin.js'
import { deletegame, deleteredis } from '../../moduels/xiuxian/index.js'
import { yunzaiConfig } from '../../moduels/yunzai/index.js'
export class AdminDelete extends plugin {
    constructor() {
        super(yunzaiConfig('admin', [
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
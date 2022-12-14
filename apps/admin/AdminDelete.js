import plugin from '../../../../lib/plugins/plugin.js'
import { Write_Forum, Write_Exchange, __PATH, Write_Life } from '../../model/xiuxian/index.js'
import { yunzaiConfig } from '../../model/yunzai/index.js'
export class AdminDelete extends plugin {
    constructor() {
        super(yunzaiConfig('admin',[
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
        const allkey = await redis.keys('xiuxian:*', (err, data) => { })
        if (allkey) {
            allkey.forEach(async (item) => {
                await redis.del(item)
            })
            e.reply('删除完成')
            return
        }
        e.reply('世界无一花草')
        return
    }
    deleteallusers = async (e) => {
        if (!e.isMaster) {
            return
        }
        await Write_Exchange([])
        await Write_Forum([])
        await Write_Life([])
        await this.deleteredis(e)
        return
    }
}
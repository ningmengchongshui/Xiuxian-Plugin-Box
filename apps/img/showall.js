import plugin from '../../../../lib/plugins/plugin.js'
import { get_map_img, get_updata_img, get_bulletin_img, get_config_img } from '../../moduels/xiuxian/data.js'
import { yunzaiConfig } from '../../moduels/yunzai/index.js'
export class showall extends plugin {
    constructor() {
        super(yunzaiConfig('showall', [
            {
                reg: '^#修仙地图$',
                fnc: 'show_map',
            },
            {
                reg: '^#修仙公告$',
                fnc: 'show_bulletin',
            },
            {
                reg: '^#修仙版本$',
                fnc: 'show_updata',
            },
            {
                reg: '^#修仙配置$',
                fnc: 'show_config',
            }
        ]))
    }
    show_map = async (e) => {
        e.reply(await get_map_img(e.user_id))
        return
    }
    show_updata = async (e) => {
        e.reply(await get_updata_img(e.user_id))
        return
    }
    show_config = async (e) => {
        e.reply(await get_config_img(e.user_id))
        return
    }
    show_bulletin = async (e) => {
        e.reply(await get_bulletin_img(e.user_id))
        return
    }
}
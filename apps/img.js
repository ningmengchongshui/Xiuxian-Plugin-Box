import plugin from '../../../lib/plugins/plugin.js'
import { yunzaiConfig } from '../moduels/index.js'
export class img extends plugin {
    constructor() {
        super(yunzaiConfig('img', [
            {
                reg: '^#修仙地图$',
                fnc: 'showMap',
            },
            {
                reg: '^#储物袋$',
                fnc: 'showBag'
            },
            {
                reg: '^#基础信息$',
                fnc: 'showUser'
            },
            {
                reg: '^#面板信息$',
                fnc: 'showEquipment',
            },
            {
                reg: '^#功法信息$',
                fnc: 'showExercises',
            },
            {
                reg: '^#凡仙堂$',
                fnc: 'showShop',
            }
        ]))
    }
}
import plugin from '../../../lib/plugins/plugin.js'
import { yunzaiConfig } from '../moduels/index.js'
export class action extends plugin {
    constructor() {
        super(yunzaiConfig('action', [
            {
                reg: '^#攻击.*$',
                fnc: 'userAttack'
            },
            {
                reg: '^#洗手$',
                fnc: 'userWashHands'
            },
            {
                reg: '^#击杀.*$',
                fnc: 'userKill'
            },
            {
                reg: '^#探索怪物$',
                fnc: 'userExploreMonsters'
            },
            {
                reg: '^#前往.*$',
                fnc: 'userforward'
            },
            {
                reg: '^#回到原地$',
                fnc: 'userBackPiont'
            },
            {
                reg: '^#传送.*$',
                fnc: 'userDelivery'
            }
        ]))
    }
}
import nodefs from "../db/nodefs"
import { __PATH } from "../yunzai"
let DATAACOUNT = {}
let DATA = {}
class Cachemonster {
    monsterscache = async (i) => {
        const time = new Date()
        const map = await nodefs.Read('map', __PATH['fixed_monster'])
        const MonsterName = await nodefs.Read('name', __PATH['fixed_monster'])
        const MonsterLevel = await nodefs.Read('level', __PATH['fixed_monster'])
        const [mini, max] = map[i].split('.')
        if (DATA.hasOwnProperty(i)) {
            if (DATA[i]['time'] == time.getHours()) {
                return DATA[i]['data']
            }
        }
        DATA[i]['time'] = time.getHours()
        DATA[i]['data'] = []
        for (var j = 0; j < max; j++) {
            let y = Math.floor(Math.random() * (max - mini + 1) + Number(mini))
            await DATA[i]['data'].push({
                name: MonsterName[Math.floor(Math.random() * MonsterName.length)] + MonsterLevel[y - 1],
                killNum: 1,
                level: y
            })
        }
        return DATA[i]['data']
    }
    add = async (i, num) => {
        if (!DATAACOUNT.hasOwnProperty(i)) {
            DATAACOUNT[i] = 0
        }
        DATAACOUNT[i] = Number(DATAACOUNT[i]) + Number(num)
        const p = Math.floor((Math.random() * (50 - 30)) + Number(30))
        if (DATAACOUNT[i] > p) {
            DATAACOUNT[i] = 0
            return 1
        }
        return 0
    }
}
export default new Cachemonster()
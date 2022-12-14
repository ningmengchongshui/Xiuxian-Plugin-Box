import { __PATH } from './yunzai/index.js'
import nodefs from './db/nodefs.js'
class XiuxianData {
    constructor() {
        this.__PATH = __PATH;
        nodefs.newlist(__PATH['Level'], 'Level_list', [])
        nodefs.newlist(__PATH['Level'], 'Level_list', [
            ...nodefs.getlist(__PATH['fixedLevel'], 'Level_list.json')
        ])
        nodefs.newlist(__PATH['Level'], 'LevelMax_list', [])
        nodefs.newlist(__PATH['Level'], 'LevelMax_list', [
            ...nodefs.getlist(__PATH['fixedLevel'], 'LevelMax_list.json')
        ])
        nodefs.newlist(__PATH['all'], 'all', [])
        nodefs.newlist(__PATH['all'], 'all', [
            ...nodefs.getlist(__PATH['fixedequipment'], 'json'),
            ...nodefs.getlist(__PATH['fixedgoods'], 'json')
        ])
        nodefs.newlist(__PATH['all'], 'commodities', [])
        nodefs.newlist(__PATH['all'], 'commodities', [
            ...nodefs.getlist(__PATH['fixedgoods'], '0.json')
        ])
        nodefs.newlist(__PATH['all'], 'dropsItem', [])
        nodefs.newlist(__PATH['all'], 'dropsItem', [
            ...nodefs.getlist(__PATH['fixedequipment'], 'json'),
            ...nodefs.getlist(__PATH['fixedgoods'], 'json')
        ])
        nodefs.newlist(__PATH['position'], 'position', [])
        nodefs.newlist(__PATH['position'], 'position', [
            ...nodefs.getlist(__PATH['fixedposition'], 'json')
        ])
        nodefs.newlist(__PATH['position'], 'point', [])
        nodefs.newlist(__PATH['position'], 'point', [
            ...nodefs.getlist(__PATH['fixepoint'], 'json')
        ])
    }
}
export default new XiuxianData()
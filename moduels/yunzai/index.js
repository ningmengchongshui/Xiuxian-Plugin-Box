import nodefs from '../db/nodefs.js'
import noderequire from "../db/noderequire.js"
import { __dirname } from '../db/nodefs.js'
const PATH = noderequire.path()
//插件名字
export const appname = 'Xiuxian-Plugin-Box'
//插件配置
export const yunzaiConfig = (name, rule) => {
    return { name: name, dsc: name, event: 'message', priority: 400, rule: rule }
}
//修仙地址
export const NEW__dirname = `${__dirname}/plugins/${appname}`
//修仙数据
export const __PATH = {
    //基础
    'fixed_point': PATH.join(NEW__dirname, '/resources/data/fixed/point'),
    'fixed_position': PATH.join(NEW__dirname, '/resources/data/fixed/position'),
    'fixed_equipment': PATH.join(NEW__dirname, '/resources/data/fixed/equipment'),
    'fixed_goods': PATH.join(NEW__dirname, '/resources/data/fixed/goods'),
    'fixed_level': PATH.join(NEW__dirname, '/resources/data/fixed/level'),
    'fixed_occupation': PATH.join(NEW__dirname, '/resources/data/fixed/occupation'),
    'fixed_talent': PATH.join(NEW__dirname, '/resources/data/fixed/talent'),
    //生成
    'all': PATH.join(NEW__dirname, '/resources/data/birth/all'),
    'position': PATH.join(NEW__dirname, '/resources/data/birth/position'),
    'level': PATH.join(NEW__dirname, '/resources/data/birth/level'),
    //玩家
    'user_player': PATH.join(NEW__dirname, '/resources/data/birth/xiuxian/player'),
    'user_action': PATH.join(NEW__dirname, '/resources/data/birth/xiuxian/action'),
    'user_battle': PATH.join(NEW__dirname, '/resources/data/birth/xiuxian/battle'),
    'user_equipment': PATH.join(NEW__dirname, '/resources/data/birth/xiuxian/equipment'),
    'user_talent': PATH.join(NEW__dirname, '/resources/data/birth/xiuxian/talent'),
    'user_wealth': PATH.join(NEW__dirname, '/resources/data/birth/xiuxian/wealth'),
    'user_najie': PATH.join(NEW__dirname, '/resources/data/birth/xiuxian/najie'),
    'user_level': PATH.join(NEW__dirname, '/resources/data/birth/xiuxian/level'),
    //寿命
    'user_life': PATH.join(NEW__dirname, '/resources/data/birth/xiuxian/life')
}
//生成动态数据
nodefs.newlist(__PATH['level'], 'levellist0', [])
nodefs.newlist(__PATH['level'], 'levellist0', [
    ...nodefs.getlist(__PATH['fixed_level'], 'levellist0.json')
])
nodefs.newlist(__PATH['level'], 'levellist1', [])
nodefs.newlist(__PATH['level'], 'levellist1', [
    ...nodefs.getlist(__PATH['fixed_level'], 'levellist1.json')
])
nodefs.newlist(__PATH['all'], 'all', [])
nodefs.newlist(__PATH['all'], 'all', [
    ...nodefs.getlist(__PATH['fixed_equipment'], 'json'),
    ...nodefs.getlist(__PATH['fixed_goods'], 'json')
])
nodefs.newlist(__PATH['all'], 'commodities', [])
nodefs.newlist(__PATH['all'], 'commodities', [
    ...nodefs.getlist(__PATH['fixed_goods'], '0.json')
])
nodefs.newlist(__PATH['all'], 'dropsItem', [])
nodefs.newlist(__PATH['all'], 'dropsItem', [
    ...nodefs.getlist(__PATH['fixed_equipment'], 'json'),
    ...nodefs.getlist(__PATH['fixed_goods'], 'json')
])
nodefs.newlist(__PATH['position'], 'position', [])
nodefs.newlist(__PATH['position'], 'position', [
    ...nodefs.getlist(__PATH['fixed_position'], 'json')
])
nodefs.newlist(__PATH['position'], 'point', [])
nodefs.newlist(__PATH['position'], 'point', [
    ...nodefs.getlist(__PATH['fixed_point'], 'json')
])
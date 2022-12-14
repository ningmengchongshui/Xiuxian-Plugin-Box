import { __dirname } from "../nodefs"
//插件名字
export const appname = 'Xiuxian-Plugin-Box'
//插件优先级
export const NEW__dirname = `${__dirname}/plugins/${appname}`
export const __PATH = {
    'fixepoint': PATH.join(NEW__dirname, '/resources/data/fixed/point'),
    'fixedposition': PATH.join(NEW__dirname, '/resources/data/fixed/position'),
    'fixedequipment': PATH.join(NEW__dirname, '/resources/data/fixed/equipment'),
    'fixedgoods': PATH.join(NEW__dirname, '/resources/data/fixed/goods'),
    'fixedLevel': PATH.join(NEW__dirname, '/resources/data/fixed/Level'),
    'fixedoccupation': PATH.join(NEW__dirname, '/resources/data/fixed/occupation'),
    'fixedtalent': PATH.join(NEW__dirname, '/resources/data/fixed/talent'),
    'all': PATH.join(NEW__dirname, '/resources/data/birth/all'),
    'position': PATH.join(NEW__dirname, '/resources/data/birth/position'),
    'Level': PATH.join(NEW__dirname, '/resources/data/birth/Level'),
    player: path.join(__dirname, '/resources/data/birth/xiuxian/player'),
    action: path.join(__dirname, '/resources/data/birth/xiuxian/action'),
    battle: path.join(__dirname, '/resources/data/birth/xiuxian/battle'),
    equipment: path.join(__dirname, '/resources/data/birth/xiuxian/equipment'),
    level: path.join(__dirname, '/resources/data/birth/xiuxian/level'),
    talent: path.join(__dirname, '/resources/data/birth/xiuxian/talent'),
    wealth: path.join(__dirname, '/resources/data/birth/xiuxian/wealth'),
    najie: path.join(__dirname, '/resources/data/birth/xiuxian/najie'),
    Exchange: path.join(__dirname, '/resources/data/birth/Exchange'),
    Forum: path.join(__dirname, '/resources/data/birth/Forum'),
    life: path.join(__dirname, '/resources/data/birth/xiuxian/life')
}
export const yunzaiConfig = (name, rule) => {
    return { name: name, dsc: name, event: 'message', priority: 400, rule: rule }
}


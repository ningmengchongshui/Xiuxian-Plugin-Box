import Nodefs from '../db/nodefs.js'
import Noderequire from "../db/Noderequire.js"
import { __dirname } from '../db/nodefs.js'
const FS = Noderequire.fs()
const PATH = Noderequire.path()
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
Nodefs.newlist(__PATH['level'], 'levellist0', [])
Nodefs.newlist(__PATH['level'], 'levellist0', [
    ...Nodefs.getlist(__PATH['fixed_level'], 'levellist0.json')
])
Nodefs.newlist(__PATH['level'], 'levellist1', [])
Nodefs.newlist(__PATH['level'], 'levellist1', [
    ...Nodefs.getlist(__PATH['fixed_level'], 'levellist1.json')
])
Nodefs.newlist(__PATH['all'], 'all', [])
Nodefs.newlist(__PATH['all'], 'all', [
    ...Nodefs.getlist(__PATH['fixed_equipment'], 'json'),
    ...Nodefs.getlist(__PATH['fixed_goods'], 'json')
])
Nodefs.newlist(__PATH['all'], 'commodities', [])
Nodefs.newlist(__PATH['all'], 'commodities', [
    ...Nodefs.getlist(__PATH['fixed_goods'], '0.json')
])
Nodefs.newlist(__PATH['all'], 'dropsItem', [])
Nodefs.newlist(__PATH['all'], 'dropsItem', [
    ...Nodefs.getlist(__PATH['fixed_equipment'], 'json'),
    ...Nodefs.getlist(__PATH['fixed_goods'], 'json')
])
Nodefs.newlist(__PATH['position'], 'position', [])
Nodefs.newlist(__PATH['position'], 'position', [
    ...Nodefs.getlist(__PATH['fixed_position'], 'json')
])
Nodefs.newlist(__PATH['position'], 'point', [])
Nodefs.newlist(__PATH['position'], 'point', [
    ...Nodefs.getlist(__PATH['fixed_point'], 'json')
])
//所有接口导出
class index {
    toindex = async (input) => {
      let filepath = './plugins/Xiuxian-Plugin-Box/' + input;
      let apps = {};
      let name = [];
      let newsum = [];
      const travel = (dir, callback) => {
        FS.readdirSync(dir).forEach((file) => {
          let model = dir.search('moduels');
          if (model == -1) {
            let resources = dir.search('resources');
            if (resources == -1) {
              let temporary = file.search('.js');
              if (temporary != -1) {
                let y = file.replace('.js', '');
                name.push(y);
              }
              var pathname = PATH.join(dir, file);
              if (FS.statSync(pathname).isDirectory()) {
                travel(pathname, callback);
              } else {
                callback(pathname);
              };
            };
          };
        });
      };
      travel(filepath, (pathname) => {
        let temporary = pathname.search('.js');
        if (temporary != -1) {
          newsum.push(pathname);
        }
      });
      for (var j = 0; j < newsum.length; j++) {
        newsum[j] = newsum[j].replace(/\\/g, '/');
        newsum[j] = newsum[j].replace('plugins/Xiuxian-Plugin-Box', '');
        //重点：这里的路径需要随着文件地址深度而改变
        apps[name[j]] = (await import(`../..${newsum[j]}`))[name[j]];
      };
      return apps;
    };
  };
export default new index()
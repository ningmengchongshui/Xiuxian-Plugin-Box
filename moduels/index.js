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
//导入所有js文件
class index {
  toindex = async (input) => {
    let filepath = `./plugins/${appname}}/` + input;
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
      newsum[j] = newsum[j].replace(`plugins/${appname}`, '');
      //重点：这里的路径需要随着文件地址深度而改变
      apps[name[j]] = (await import(`..${newsum[j]}`))[name[j]];
    };
    return apps;
  };
};
export default new index()
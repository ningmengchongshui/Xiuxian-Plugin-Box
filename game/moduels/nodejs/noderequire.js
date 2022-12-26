import { createRequire } from 'module'
const require = createRequire(import.meta.url)
class noderequire {
    childProcess() {
        return require('child_process')
    }
    yaml(){
        return require('yaml')
    }
    yamlJs() {
        return require('yamljs')
    } 
    jsYaml() {
        return require('js-yaml')
    }
    nodeSchedule() {
        return require('node-schedule')
    }
    path(){
        return require('path')
    }
    artTemplate(){
        return require('art-template')
    }
    puppeteer(){
        return require('puppeteer')
    }
    fs(){
        return require('fs')
    }
    chokidar(){
        return require('chokidar')
    }
}
export default new noderequire()
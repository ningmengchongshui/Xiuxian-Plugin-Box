
import path from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
class noderequire {
    childProcess() {
        return require('child_process')
    }
    /**
     * @param {指令} cmd 
     * @param {插件名} name 
     */
    childProcessExec(cmd, name) {
        const { exec } = require('child_process')
        exec(cmd, { cwd: `${path.resolve()}${path.sep}plugins${path.sep}${name}` },
            (error, stdout, stderr) => {
                if (/(Already up[ -]to[ -]date|已经是最新的)/.test(stdout)) {
                    return `${name}已是最新版`
                } else if (error) {
                    return `更新失败\nError code: ${error.code}\n${error.stack}\n`
                } else {
                    return `更新${name}成功`
                }
            }
        )
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
}
export default new noderequire()
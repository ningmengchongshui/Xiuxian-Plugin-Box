
import path from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { exec } = require('child_process')
class noderequire {
    childProcess() {
        return require('child_process')
    }
    childProcessExecUpDate(cmd, name) {
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
    childProcessExecRestart(cmd,key) {
        exec(cmd, { cwd: `${path.resolve()}` },
            (error, stdout, stderr) => {
                if (error) {
                    redis.del(key) 
                    logger.error(`重启失败\n${error.stack}`)
                    return `重启失败\nError code: ${error.code}\n${error.stack}\n`
                } else if (stdout) {
                    return `重启成功`
                }
            }
        )
    }
    childProcessExecInstall(cmd, name) {
        exec(cmd, { cwd: `${path.resolve()}` },
            (error, stdout, stderr) => {
                if (error) {
                    return `安装失败\nError code: ${error.code}\n${error.stack}\n`
                } else {
                    return `安装${name}成功`
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
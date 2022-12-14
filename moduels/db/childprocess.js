import noderequire from "./noderequire.js"
const { exec } = noderequire.childProcess()
const PATH = noderequire.path()
class Childprocess{
    ExecUpDate(cmd, name) {
        exec(cmd, { cwd: `${PATH.resolve()}${PATH.sep}plugins${PATH.sep}${name}` },
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
    ExecRestart(cmd,key) {
        exec(cmd, { cwd: `${PATH.resolve()}` },
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
    ExecInstall(cmd, name) {
        exec(cmd, { cwd: `${PATH.resolve()}` },
            (error, stdout, stderr) => {
                if (error) {
                    return `安装失败\nError code: ${error.code}\n${error.stack}\n`
                } else {
                    return `安装${name}成功`
                }
            }
        )
    }
}
export default new Childprocess()
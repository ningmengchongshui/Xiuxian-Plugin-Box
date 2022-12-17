import noderequire from "./noderequire.js"
const { exec } = noderequire.childProcess()
const PATH = noderequire.path()
const MAP = {
    'updatasuccess': '更新成功',
    'updatafail': '更新失败',
    'resrartsuccess': '重启成功',
    'resrartfail': '重启失败',
    'stallsuccess': '安装成功',
    'stallfail': '安装失败',
    'newest': '已是最新'
}
class Childprocess {
    ExecUpDate(cmd, name) {
        exec(cmd, { cwd: `${PATH.resolve()}${PATH.sep}plugins${PATH.sep}${name}` },
            (error, stdout) => {
                if (/(Already up[ -]to[ -]date|已经是最新的)/.test(stdout)) {
                    return `${name}${MAP['newest']}`
                } else if (error) {
                    return `${MAP[updatafail]}\nError code: ${error.code}\n${error.stack}\n`
                } else {
                    return `${name}${MAP['updatasuccess']}`
                }
            }
        )
    }
    ExecRestart(cmd, key) {
        exec(cmd, { cwd: `${PATH.resolve()}` },
            (error, stdout) => {
                if (error) {
                    redis.del(key)
                    logger.error(`${MAP['resrartfail']}\n${error.stack}`)
                    return `${MAP['resrartfail']}\nError code: ${error.code}\n${error.stack}\n`
                } else if (stdout) {
                    return MAP['resrartsuccess']
                }
            }
        )
    }
    ExecInstall(cmd, name) {
        exec(cmd, { cwd: `${PATH.resolve()}` },
            (error) => {
                if (error) {
                    return `${MAP['stallfail']}\nError code: ${error.code}\n${error.stack}\n`
                } else {
                    return `${name}${MAP['stallsuccess']}`
                }
            }
        )
    }
}
export default new Childprocess()
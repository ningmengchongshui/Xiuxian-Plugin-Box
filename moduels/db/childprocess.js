import noderequire from "./noderequire.js"
const { exec } = noderequire.childProcess()
const PATH = noderequire.path()
const map = {
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
                    return `${name}${map['newest']}`
                } else if (error) {
                    return `${map[updatafail]}\nError code: ${error.code}\n${error.stack}\n`
                } else {
                    return `${name}${map['updatasuccess']}`
                }
            }
        )
    }
    ExecRestart(cmd, key) {
        exec(cmd, { cwd: `${PATH.resolve()}` },
            (error, stdout) => {
                if (error) {
                    redis.del(key)
                    logger.error(`${map['resrartfail']}\n${error.stack}`)
                    return `${map['resrartfail']}\nError code: ${error.code}\n${error.stack}\n`
                } else if (stdout) {
                    return map['resrartsuccess']
                }
            }
        )
    }
    ExecInstall(cmd, name) {
        exec(cmd, { cwd: `${PATH.resolve()}` },
            (error) => {
                if (error) {
                    return `${map['stallfail']}\nError code: ${error.code}\n${error.stack}\n`
                } else {
                    return `${name}${map['stallsuccess']}`
                }
            }
        )
    }
}
export default new Childprocess()
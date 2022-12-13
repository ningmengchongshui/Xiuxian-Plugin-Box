import plugin from '../../../../lib/plugins/plugin.js'
import filecp from '../../model/filecp.js'
import nodefs from '../../model/nodefs.js'
import noderequire from '../../model/noderequire.js'
const { exec } = noderequire.childProcess()
let timer = ''
export class AdminAction extends plugin {
    constructor() {
        super({
            name: 'admin',
            dsc: 'admin',
            event: 'message',
            priority: 400,
            rule: [
                {
                    reg: '^#修仙更新',
                    fnc: 'checkout',
                }
            ],
        })
        this.key = 'xiuxian:restart'
    }
    checkout = async (e) => {
        if (!e.isMaster) {
            return
        }
        const that = this
        const command = 'git  pull'
        const sum = await nodefs.returnPathName('./plugins/Xiuxian-Plugin-Box/plugins/')
        //更新box
        e.reply(noderequire.childProcessExec(command, 'Xiuxian-Plugin-Box'))
        //更新插件
        sum.forEach(async (item) => {
            if (item != 'xiuxian-plugin') {
                e.reply(noderequire.childProcessExec(command, `Xiuxian-Plugin-Box/plugins/${item}`))
            }
        })
        //重启
        timer && clearTimeout(timer)
        timer = setTimeout(async () => {
            try {
                const data = JSON.stringify({
                    isGroup: !!e.isGroup,
                    id: e.isGroup ? e.group_id : e.user_id,
                })
                await redis.set(that.key, data, { EX: 120 })
                let cm = 'npm run start'
                if (process.argv[1].includes('pm2')) {
                    cm = 'npm run restart'
                }
                exec(cm, (error, stdout, stderr) => {
                    if (error) {
                        redis.del(that.key)
                        e.reply(`重启失败\nError code: ${error.code}\n${error.stack}\n`)
                        logger.error(`重启失败\n${error.stack}`)
                    } else if (stdout) {
                        logger.mark('重启成功,运行已转为后台')
                        logger.mark('查看日志请用命令:npm run log')
                        logger.mark('停止后台运行命令:npm stop')
                        process.exit()
                    }
                })
                filecp.upfile()
            }
            catch (error) {
                redis.del(that.key)
                const ise = error.stack ?? error
                e.reply(`重启失败了\n${ise}`)
            }
        }, 1000)
        return
    }
    init = async () => {
        let restart = await redis.get(this.key)
        if (restart) {
            restart = JSON.parse(restart)
            if (restart.isGroup) {
                Bot.pickGroup(restart.id).sendMsg('重启成功!\n【#修仙版本】\n以确保正常使用\n')
            } else {
                Bot.pickGroup(restart.id).sendMsg('重启成功!\n【#修仙版本】\n以确保正常使用\n')
            }
            redis.del(this.key)
        }
    }
}
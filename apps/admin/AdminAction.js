import plugin from '../../../../lib/plugins/plugin.js'
import filecp from '../../moduels/filecp.js'
import nodefs from '../../moduels/db/nodefs.js'
import noderequire from '../../moduels/db/noderequire.js'
import dataup from '../../moduels/dataup.js'
import { appname, yunzaiConfig } from '../../moduels/yunzai/index.js'
let timer = ''
export class AdminAction extends plugin {
    constructor() {
        super(yunzaiConfig('admin', [
            {
                reg: '^#修仙更新',
                fnc: 'checkout',
            },
            {
                reg: '^#修仙安装.*',
                fnc: 'xiuxianSystem',
            },
            {
                reg: '^#修仙数据升级$',
                fnc: 'Xiuxiandataup'
            },
            {
                reg: '^#修仙升级版本$',
                fnc: 'dataupexplain'
            }
        ]))
        this.key = 'xiuxian:restart'
    }
    checkout = async (e) => {
        if (!e.isMaster) {
            return
        }
        const sum = await nodefs.returnPathName(`./plugins/${appname}/plugins/`)
        const that = this
        e.reply(noderequire.childProcessExecUpDate('git  pull', `${appname}`))
        sum.forEach((item) => {
            e.reply(noderequire.childProcessExecUpDate('git  pull', `${appname}/plugins/${item}`))
        })
        timer && clearTimeout(timer)
        timer = setTimeout(async () => {
            try {
                const data = JSON.stringify({ isGroup: !!e.isGroup, id: e.isGroup ? e.group_id : e.user_id, })
                await redis.set(that.key, data, { EX: 120 })
                let cmd = 'npm run start'
                if (process.argv[1].includes('pm2')) {
                    cmd = 'npm run restart'
                }
                e.reply(noderequire.childProcessExecRestart(cmd, that.key))
                filecp.upfile()
            }
            catch (error) {
                redis.del(that.key)
                e.reply(`重启失败了\n${error.stack ?? error}`)
            }
        }, 1000)
        return
    }
    xiuxianSystem = async (e) => {
        if (!e.isMaster) {
            return
        }
        const name = e.msg.replace('#修仙安装', '')
        const map = {
            '宗门': 'git clone  https://gitee.com/mg1105194437/xiuxian-association-pluging.git ./plugins/Xiuxian-Plugin-Box/plugins/xiuxian-association-pluging/',
            '家园': 'git clone  https://gitee.com/mmmmmddddd/xiuxian-home-plugin.git ./plugins/Xiuxian-Plugin-Box/plugins/xiuxian-home-plugin/',
            '黑市': 'git clone  https://gitee.com/waterfeet/xiuxian-yihongyuan-plugin.git ./plugins/Xiuxian-Plugin-Box/plugins/xiuxian-yihongyuan-plugin/',
        }
        if (map.hasOwnProperty(name)) {
            e.reply(noderequire.childProcessExecInstall(map[name], name))
        } else {
            e.reply('扩展名不存在')
        }
        return true
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
    Xiuxiandataup = async (e) => {
        if (!e.isMaster) {
            return
        }
        e.reply(dataup.pluginupdata('xiuxian-emulator-plugin'))
        return
    }
    dataupexplain = async (e) => {
        if (!e.isMaster) {
            return
        }
        e.reply('[V1.2升级V2.0]\n1.同时安装V1.2与V2.0\n2.#修仙数据升级\nV2.0已有存档的玩家\n将会同步V1.2数据')
        return
    }
}
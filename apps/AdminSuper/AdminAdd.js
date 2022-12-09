import plugin from '../../../../lib/plugins/plugin.js';
import { createRequire } from 'module';
import { ForwardMsg } from '../Xiuxian/Xiuxian.js';
import filecp from '../../model/filecp.js';
const require = createRequire(import.meta.url);
const { exec } = require('child_process');
const _path = process.cwd();
const the = {
    'timer': ''
};
export class AdminAdd extends plugin {
    constructor() {
        super({
            name: 'admin',
            dsc: 'admin',
            event: 'message',
            priority: 400,
            rule: [
                {
                    reg: '^#修仙安装.*',
                    fnc: 'xiuxianSystem',
                }
            ],
        });
        this.key = 'xiuxian:restart';
    };
    xiuxianSystem = async (e) => {
        if (!e.isMaster) {
            return;
        };
        const msg = ['————[安装消息]————'];
        let command = '';
        const name = e.msg.replace('#修仙安装', '');
        if (name == '宗门系统') {
            command = 'git clone  https://gitee.com/mg1105194437/xiuxian-association-pluging.git ./plugins/Xiuxian-Plugin-Box/plugins/xiuxian-association-pluging/';
        } else if (name == '家园系统') {
            command = 'git clone  https://gitee.com/mmmmmddddd/xiuxian-home-plugin.git ./plugins/Xiuxian-Plugin-Box/plugins/xiuxian-home-plugin/';
        } else if (name == '怡红院') {
            command = 'git clone  https://gitee.com/waterfeet/xiuxian-yihongyuan-plugin.git ./plugins/Xiuxian-Plugin-Box/plugins/xiuxian-yihongyuan-plugin/';
            ForwardMsg(e, msg);
        } else if (name == '职业系统') {
            const msg = ['待上线'];
            ForwardMsg(e, msg);
            return;
        } else {
            msg.push('非【三点水】提供的玩法无法使用指令安装');
            ForwardMsg(e, msg);
            return;
        };
        msg.push('正在安装...');
        const that = this;
        exec(command,{ cwd: `${_path}` },
            (error, stdout, stderr) => {
                if (error) {
                    msg.push(`安装失败\nError code: ${error.code}\n${error.stack}\n`);
                    ForwardMsg(e, msg);
                    return;
                };
                msg.push('安装成功,正在重启更新...');
                the.timer && clearTimeout(the.timer);
                the.timer = setTimeout(async () => {
                    try {
                        const data = JSON.stringify({
                            isGroup: !!e.isGroup,
                            id: e.isGroup ? e.group_id : e.user_id,
                        });
                        await redis.set(that.key, data, { EX: 120 });
                        let cm = 'npm run start';
                        if (process.argv[1].includes('pm2')) {
                            cm = 'npm run restart';
                        }
                        else {
                            msg.push('正在转为后台运行...');
                        };
                        exec(cm, (error, stdout, stderr) => {
                            if (error) {
                                redis.del(that.key);
                                msg.push(`重启失败\nError code: ${error.code}\n${error.stack}\n`);
                                logger.error(`重启失败\n${error.stack}`);
                            } else if (stdout) {
                                logger.mark('重启成功,运行已转为后台');
                                logger.mark('查看日志请用命令:npm run log');
                                logger.mark('停止后台运行命令:npm stop');
                                process.exit();
                            }
                        });
                    }
                    catch (error) {
                        redis.del(that.key);
                        const e = error.stack ?? error;
                        msg.push('重启失败了\n' + e);
                    };
                }, 1000);
                filecp.upfile();
                ForwardMsg(e, msg);
            }
        );
        return true;
    };
    init = async () => {
        const the = { restart: '' };
        the.restart = await redis.get(this.key);
        if (the.restart) {
            the.restart = JSON.parse(the.restart);
            if (the.restart.isGroup) {
                Bot.pickGroup(the.restart.id).sendMsg('重启成功!\n【#修仙版本】\n以确保正常使用\n');
            } else {
                Bot.pickGroup(the.restart.id).sendMsg('重启成功!\n【#修仙版本】\n以确保正常使用\n');
            }
            redis.del(this.key);
        };
    };
};
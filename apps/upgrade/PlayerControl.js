
import plugin from '../../../../lib/plugins/plugin.js'
import common from "../../../../lib/common/common.js"
import config from "../../model/Config.js"
import { segment } from "oicq"
import { Gomini, Go, offaction, Add_experience, Add_blood, Add_lingshi, existplayer, Read_level } from '../Xiuxian/Xiuxian.js'
export class PlayerControl extends plugin {
    constructor() {
        super({
            name: 'PlayerControl',
            dsc: 'PlayerControl',
            event: 'message',
            priority: 600,
            rule: [
                {
                    reg: '#降妖$',
                    fnc: 'Dagong'
                },
                {
                    reg: '#闭关$',
                    fnc: 'Biguan'
                },
                {
                    reg: '^#出关$',
                    fnc: 'chuGuan'
                },
                {
                    reg: '^#归来$',
                    fnc: 'endWork'
                }
            ]
        });
        this.xiuxianConfigData = config.getConfig("xiuxian", "xiuxian");
    }

    //闭关
    async Biguan(e) {
        let good = await Gomini(e);
        if (!good) {
            return;
        }
        let usr_qq = e.user_id;
        let now_time = new Date().getTime();
        let actionObject = {
            "actionName": "闭关",
            "startTime": now_time
        }
        await redis.set("xiuxian:player:" + usr_qq + ":action", JSON.stringify(actionObject));
        e.reply(`现在开始闭关,两耳不闻窗外事了`);
        return true;
    }

    //降妖
    async Dagong(e) {
        let good = await Go(e);
        if (!good) {
            return;
        }
        let usr_qq = e.user_id;
        let now_time = new Date().getTime();
        let actionObject = {
            "actionName": "降妖",
            "startTime": now_time
        }
        await redis.set("xiuxian:player:" + usr_qq + ":action", JSON.stringify(actionObject));
        e.reply(`现在开始外出降妖赚取灵石`);
        return true;
    }

    async chuGuan(e) {
        if (!e.isGroup) {
            return;
        }
        let usr_qq = e.user_id;
        let ifexistplay = await existplayer(usr_qq);
        if (!ifexistplay) {
            return;
        }
        let action = await redis.get("xiuxian:player:" + usr_qq + ":action");
        if (action == undefined) {
            return;
        }
        action = JSON.parse(action);
        if (action.actionName != "闭关") {
            return;
        }
        //开始时间
        let startTime = action.startTime;
        //最低收益时间
        var timeUnit = this.xiuxianConfigData.biguan.time;
        //时间差值（）
        let time = Math.floor((new Date().getTime() - startTime) / 60000);
        //判断是否够最低收益时间
        if (time < timeUnit) {
            e.reply("你只是呆了一会儿，什么也没得到。");
            await offaction(usr_qq);
            return;
        }
        if (e.isGroup) {
            await this.upgrade(usr_qq, time, action.actionName, e.group_id);
        } else {
            await this.upgrade(usr_qq, time, action.actionName);
        }
        await offaction(usr_qq);
        return;
    }


    async endWork(e) {
        if (!e.isGroup) {
            return;
        }
        let usr_qq = e.user_id;
        let ifexistplay = await existplayer(usr_qq);
        if (!ifexistplay) {
            return;
        }
        let action = await redis.get("xiuxian:player:" + usr_qq + ":action");
        if (action == undefined) {
            return;
        }
        action = JSON.parse(action);
        if (action.actionName != "降妖") {
            return;
        }
        let startTime = action.startTime;
        var timeUnit = this.xiuxianConfigData.work.time;
        //时间差值（）
        let time = Math.floor((new Date().getTime() - startTime) / 60000);
        //判断是否够最低收益时间
        if (time < timeUnit) {
            e.reply("你只是呆了一会儿，什么也没得到。");
            await offaction(usr_qq);
            return;
        }
        if (e.isGroup) {
            await this.upgrade(usr_qq, time, action.actionName, e.group_id);
        } else {
            await this.upgrade(usr_qq, time, action.actionName);
        }
        await offaction(usr_qq);
        return;
    }

    async upgrade(user_id, time, name, group_id) {
        let usr_qq = user_id;
        let level = await Read_level(usr_qq);
        let other = 0;
        let msg = [segment.at(usr_qq)];
        let rand = Math.floor((Math.random() * (100 - 1) + 1));
        if (name == "闭关") {
            if (rand > 30) {
                other = Math.floor(this.xiuxianConfigData.biguan.size*time * level.level_id / 2);
                msg.push("\n你闭关迟迟无法入定,只得到了" + other+"修为");
            }
            else {
                other = Math.floor(this.xiuxianConfigData.biguan.size*time * level.level_id);
                msg.push("\n闭关结束,得到了" + other+"修为");
            }
            await Add_experience(usr_qq, other);
            await Add_blood(usr_qq, 100);
            msg.push("\n血量恢复至100%");
        }
        else {
            if (rand > 30) {
                other = Math.floor(this.xiuxianConfigData.biguan.size*time * level.level_id / 2);
                msg.push("\n你降妖不专心,只得到了" + other);
            }
            else {
                other = Math.floor(this.xiuxianConfigData.biguan.size*time * level.level_id);
                msg.push("\n降妖回来,得到了" + other);
            }
            await Add_lingshi(usr_qq, other);
        }
        msg.push("\n" + name + "结束");
        if (group_id) {
            await this.pushInfo(group_id, true, msg)
        } else {
            await this.pushInfo(usr_qq, false, msg);
        }
        return;
    }

    async pushInfo(id, is_group, msg) {
        if (is_group) {
            await Bot.pickGroup(id)
                .sendMsg(msg)
                .catch((err) => {
                    Bot.logger.mark(err);
                });
        } else {
            await common.relpyPrivate(id, msg);
        }
    }

}

import plugin from '../../../../lib/plugins/plugin.js'
import defset from '../../moduels/xiuxian/defset.js'
import { yunzaiConfig } from '../../moduels/yunzai/index.js'
export class adrobot extends plugin {
    constructor() {
        super(yunzaiConfig('admin', [
            {
                reg: '^#修仙关闭云崽',
                fnc: 'CloseRobot',
            },
            {
                reg: '^#修仙关闭云崽帮助',
                fnc: 'CloseRobothelp',
            },
            {
                reg: '^#修仙添加主人.*',
                fnc: 'AddMaster',
            },
            {
                reg: '^#修仙删除主人.*',
                fnc: 'DeleteMaster',
            },
            {
                reg: '^#修仙开启云崽私聊',
                fnc: 'OnGroup',
            },
            {
                reg: '^#修仙关闭云崽私聊',
                fnc: 'OffGroup',
            }
        ]))
    }
    OffGroup = async (e) => {
        if (!e.isMaster) {
            return
        }
        e.reply(defset.OffGroup())
        return
    }
    OnGroup = async (e) => {
        if (!e.isMaster) {
            return
        }
        e.reply(defset.OnGroup())
        return
    }
    AddMaster = async (e) => {
        if (!e.isMaster) {
            return
        }
        e.reply(defset.AddMaster(e.msg.replace('#修仙添加主人', '')))
        return
    }
    DeleteMaster = async (e) => {
        if (!e.isMaster) {
            return
        }
        e.reply(defset.DeleteMaster(e.msg.replace('#修仙删除主人', '')))
        return
    }
    CloseRobot = async (e) => {
        if (!e.isMaster) {
            return
        }
        e.reply(defset.ReadConfig())
        return
    }
    CloseRobothelp = async (e) => {
        if (!e.isMaster) {
            return
        }
        e.reply(defset.ReadConfighelp())
        return
    }
}
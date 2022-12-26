const MAP = {
    'action_biguan': '闭关',
    'action_work': '降妖',
    'biguan_go_out': '开始两耳不闻窗外事',
    'work_go_out': '开始外出',
    'time': '只是呆了一会儿',
    'lingshi': '灵石',
    'qixue': '气血',
    'xiuwei': '修为'
}
export class control {
    Biguan = async (UID) => {
        const now_time = new Date().getTime()
        const actionObject = {
            'actionName': MAP['action_biguan'],
            'startTime': now_time
        }
        await redis.set(`xiuxian:player:${UID}:action`, JSON.stringify(actionObject))
        return [MAP['biguan_go_out']]
    }
    Dagong = async (UID) => {
        const now_time = new Date().getTime()
        const actionObject = {
            'actionName': MAP['action_work'],
            'startTime': now_time
        }
        await redis.set(`xiuxian:player:${UID}:action`, JSON.stringify(actionObject))
        return [MAP['work_go_out']]
    }
    chuGuan = async (UID) => {
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return []
        }
        let action = await redis.get(`xiuxian:player:${UID}:action`)
        if (action == undefined) {
            return []
        }
        action = JSON.parse(action)
        if (action.actionName != MAP['action_biguan']) {
            return []
        }
        const startTime = action.startTime
        const timeUnit = this.xiuxianConfigData.biguan.time
        const time = Math.floor((new Date().getTime() - startTime) / 60000)
        if (time < timeUnit) {
            await offaction(UID)
            return [MAP['time']]
        }
        await offaction(UID)
        //tudo
        return []
    }
    endWork = async (UID) => {
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return []
        }
        let action = await redis.get(`xiuxian:player:${UID}:action`)
        if (action == undefined) {
            return []
        }
        action = JSON.parse(action)
        if (action.actionName != MAP['action_work']) {
            return []
        }
        const startTime = action.startTime
        const timeUnit = this.xiuxianConfigData.work.time
        const time = Math.floor((new Date().getTime() - startTime) / 60000)
        if (time < timeUnit) {
            await offaction(UID)
            return [MAP['time']]
        }
        await offaction(UID)
        //tudo
        return []
    }
}
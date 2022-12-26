const MAP = {
    'no_search': '无法探查',
    'return_point': '回到原地',
    'refuse_to_go': '[修仙联盟]守境者\n道友请留步',
    'successfully_arrived': '成功抵达',
    'going': '正在前往',
    'need_money': '[修仙联盟]守阵者\n需要花费',
    'need_time': '[修仙联盟]守阵者\n传送需要'
}
const forwardsetTime = []
const deliverysetTime = []
const useraction = []
export class secretplace {
    show_city = async (UID) => {
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return []
        }
        const action = await Read_action(UID)
        if (action.address != 1) {
            return [MAP['no_search']]
        }
        const addressId = `${action.z}-${action.region}-${action.address}`
        const point = ''
        const address = []
        const msg = []
        point.forEach((item) => {
            if (item.id.includes(addressId)) {
                address.push(item)
            }
        })
        address.forEach((item) => {
            msg.push(`${item.name}\n(${item.x},${item.y})`)
        })
        return msg
    }
    returnpiont = async (UID) => {
        forwardsetTime[UID] = 0
        clearTimeout(useraction[UID])
        return [MAP['return_point']]
    }
    xyzaddress = async (UID) => {
        const ifexistplay = await existplayer(UID)
        if (!ifexistplay) {
            return
        }
        const action = await Read_action(UID)
        return [`(${action.x},${action.y},${action.z})`]
    }
    forward = async (UID) => {
        if (forwardsetTime[UID] == 1) {
            return
        }
        const action = await Read_action(UID)
        const x = action.x
        const y = action.y
        const address = e.msg.replace('#前往', '')
        const point = ''
        if (!point) {
            return []
        }
        const mx = point.x
        const my = point.y
        const PointId = point.id.split('-')
        const level = await Read_level(UID)
        if (level.level_id < PointId[3]) {
            return [MAP['refuse_to_go']]
        }
        const a = x - mx >= 0 ? x - mx : mx - x
        const b = y - my >= 0 ? y - my : my - y
        const battle = await Read_battle(UID)
        const the = Math.floor((a + b) - (a + b) * battle.speed * 0.01)
        const time = the >= 0 ? the : 1
        useraction[UID] = setTimeout(async () => {
            forwardsetTime[UID] = 0
            action.x = mx
            action.y = my
            action.region = PointId[1]
            action.address = PointId[2]
            await Write_action(UID, action)
            e.reply([segment.at(UID), `${MAP['successfully_arrived']}${address}`])
        }, 1000 * time)
        forwardsetTime[UID] = 1
        return [`${MAP['going']}${address}:${time}s`]
    }
    delivery = async (UID, address) => {
        if (deliverysetTime[UID] == 1) {
            return
        }
        const action = await Read_action(UID)
        const x = action.x
        const y = action.y
        const position = await nodefs.readFindName(__PATH['position'], 'position', address)
        if (!position) {
            return []
        }
        const positionID = position.id.split('-')
        const level = await Read_level(UID)
        if (level.level_id < positionID[3]) {
            e.reply(MAP['refuse_to_go'])
            return
        }
        //
        const point = await nodefs.readFindName(__PATH['position'], 'point', address)
        let key = 0
        point.forEach((item) => {
            const pointID = item.id.split('-')
            if (pointID[4] == 2) {
                if (item.x == x) {
                    if (item.y = y) {
                        key = 1
                    }
                }
            }
        })
        if (key == 0) {
            return
        }
        const wealth = await Read_wealth(UID)
        const lingshi = 1000
        if (wealth.lingshi < lingshi) {
            e.reply(`${MAP['need_money']}${lingshi}`)
            return
        }
        wealth.lingshi -= lingshi
        await Write_wealth(UID, wealth)
        const mx = Math.floor((Math.random() * (position.x2 - position.x1))) + Number(position.x1)
        const my = Math.floor((Math.random() * (position.y2 - position.y1))) + Number(position.y1)
        const the = Math.floor(((x - mx >= 0 ? x - mx : mx - x) + (y - my >= 0 ? y - my : my - y)) / 100)
        const time = the > 0 ? the : 1
        msg=[]
        setTimeout(async () => {
            deliverysetTime[UID] = 0
            action.x = mx
            action.y = my
            action.region = positionID[1]
            action.address = positionID[2]
            await Write_action(UID, action)
            msg.push([segment.at(UID), `${MAP['successfully_arrived']}${address}`])
        }, 1000 * time)
        deliverysetTime[UID] = 1
        msg.push([`${MAP['need_time']}${time}s`])
        return msg
    }
}
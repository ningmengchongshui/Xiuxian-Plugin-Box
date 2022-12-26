import nodefs from "../nodejs/nodefs.js"
import { __PATH } from "./gamedata.js"
export class Userdata {
    readMsg = async () => {
        return await nodefs.Read(UID, __PATH['user_player'])
    }
    readTalent = async () => {
        return await nodefs.Read(UID, __PATH['user_talent'])
    }
    readBattle = async (UID) => {
        return await nodefs.Read(UID, __PATH['user_battle'])
    }
    readLevel = async (UID) => {
        return await nodefs.Read(UID, __PATH['user_level'])
    }
    readWealth = async (UID) => {
        return await nodefs.Read(UID, __PATH['user_wealth'])
    }
    readAction = async (UID) => {
        return await nodefs.Read(UID, __PATH['user_action'])
    }
    readBag = async (UID) => {
        return await nodefs.Read(UID, __PATH['user_najie'])
    }
    readEquipment = async (UID) => {
        return await nodefs.Read(UID, __PATH['user_equipment'])
    }
    readLife = async (UID) => {
        const life = await nodefs.Read(UID, __PATH['user_life'])
        if (life == 'err') {
            await nodefs.Write(UID, [], __PATH['user_life'])
            return []
        }
        return life
    }

    writeMsg = async () => {
        await nodefs.Write(UID, data, __PATH['user_player'])
        return
    }
    writeTalent = async (UID, data) => {
        await nodefs.Write(UID, data, __PATH['user_talent'])
        return
    }
    writeBattle = async (UID, data) => {
        await nodefs.Write(UID, data, __PATH['user_battle'])
        return
    }
    writeLevel = async (UID, data) => {
        await nodefs.Write(UID, data, __PATH['user_level'])
        return
    }
    writeWealth = async (UID, data) => {
        await nodefs.Write(UID, data, __PATH['user_wealth'])
        return
    }
    writeAction = async (UID, data) => {
        await nodefs.Write(UID, data, __PATH['user_action'])
        return
    }
    writeBag = async (UID, data) => {
        await nodefs.Write(UID, data, __PATH['user_najie'])
        return
    }
    writeBag = async (UID, data) => {
        await nodefs.Write(UID, data, __PATH['user_najie'])
        return
    }
    writeEquipment = async (UID, data) => {
        await nodefs.Write(UID, data, __PATH['user_equipment'])
        return
    }
    writeLife = async (UID, data) => {
        await nodefs.Write(UID, data, __PATH['user_life'])
        return
    }
}
export default new Userdata()


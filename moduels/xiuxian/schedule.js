import fs from 'node:fs'
import path from 'path'
import { __dirname } from '../nodefs'
import { offaction, Read_Life, Write_Life, __PATH } from './index.js'
import noderequire from '../noderequire'
const schedule = noderequire.nodeSchedule()
class Schedule {
    scheduleJobflie = (time) => {
        schedule.scheduleJob(time, () => {
            const myDate = new Date()
            const Y = myDate.getFullYear()
            const M = myDate.getMonth() + 1
            const D = myDate.getDate()
            const h = myDate.getHours()
            const m = myDate.getMinutes()
            const s = myDate.getSeconds()
            const PATH = `${__dirname}${path.sep}resources${path.sep}data${path.sep}birth${path.sep}xiuxian`
            const NEW_PATH = `${path.resolve()}${path.sep}plugins${path.sep}XiuxianData${path.sep}${Y}${M}${D}${h}${m}${s}`
            fs.cp(PATH, NEW_PATH, { recursive: true }, (err) => {
                if (err) {
                    console.error(err)
                }
            })
        })
    }
    allLife = async (time) => {
        schedule.scheduleJob(time, async () => {
            const life = await Read_Life()
            const x = []
            life.forEach((item) => {
                item.Age = item.Age + 1
                if (item.Age >= item.life) {
                    item.status = 0
                    x.push(item.qq)
                }
            })
            for (var i = 0; i < x.length; i++) {
                await offaction(x[i])
            }
            await Write_Life(life)
        })
    }
}
export default new Schedule()
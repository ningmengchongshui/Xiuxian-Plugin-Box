import { __dirname } from '../db/nodefs.js'
import { offaction, Read_Life, Write_Life } from './index.js'
import noderequire from '../db/noderequire.js'
const FS = noderequire.fs()
const schedule = noderequire.nodeSchedule()
const path = noderequire.path()
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
            FS.cp(PATH, NEW_PATH, { recursive: true }, (err) => {
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
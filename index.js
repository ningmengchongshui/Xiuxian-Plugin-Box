import Config from './moduels/xiuxian/config.js'
import Index from './moduels/index.js'
import Schedule from './moduels/xiuxian/schedule.js'
const version = Config.getdefSet('version', 'version')
const task = Config.getdefSet('task', 'task')
const xiuxain = await Index.toindex('apps')
const plugin = await Index.toindex('plugins')
const apps = { ...xiuxain, ...plugin }
Schedule.scheduleJobflie(task.DataTask)
Schedule.allLife(task.LifeTask)
logger.info(`Yunzai-Bot[V3]`)
logger.info(`Game-Box[V1]`)
logger.info(`Xiuxian-plugin[V${version[0].version}]`)
export { apps } 
import Config from './model/Config.js'
import index from './model/index.js'
import Schedule from './model/xiuxian/schedule.js'
const version = Config.getdefSet('version', 'version')
const task = Config.getdefSet('task', 'task')
const xiuxain = await index.toindex('apps')
const plugin = await index.toindex('plugins')
const apps = { ...xiuxain, ...plugin }
Schedule.scheduleJobflie(task.DataTask)
Schedule.allLife(task.LifeTask)
logger.info(`Game-Box&&xiuxian-plugin[V${version[0].version}]`)
export { apps } 
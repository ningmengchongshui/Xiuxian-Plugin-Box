import config from "../config"
class Config{
    configHelp=()=>{
        return config.getConfig('help', 'help')
    }
    configAdmin=()=>{
        return config.getConfig('help', 'admin')
    }
    configTask=()=>{
        return config.getConfig('task', 'task')
    }
    configXiuxian=()=>{
        return config.getConfig('xiuxian', 'xiuxian')
    }
} 
export default new Config() 
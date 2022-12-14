import { appname } from '../yunzai/index.js'
import noderequire from '../db/noderequire.js'
const FS = noderequire.fs()
class filecp {
  constructor() {
    this.file(['xiuxian', 'help', 'admin'])
    this.help()
  }
  Pluginfile = (name, config) => {
    let cf = []
    const filepath = `./plugins/${appname}/plugins/${name}/defSet/`
    const readdirectory = (dir) => {
      let files = FS.readdirSync(dir)
      files.forEach(async item => {
        let filepath1 = `${dir}/${item}`
        let stat = FS.statSync(filepath1)
        if (!stat.isFile()) {
          let file = filepath1.replace(`${filepath}/`, '')
          cf.push(file)
        }
      })
    }
    readdirectory(filepath)
    const filepath0 = `./plugins/${appname}/config/`
    for (var j = 0; j < cf.length; j++) {
      for (var i = 0; i < config.length; i++) {
        let x = `${filepath0}${cf[j]}/${config[i]}.yaml`
        let y = `${filepath}${cf[j]}/${config[i]}.yaml`
        if (!FS.existsSync(x)) {
          FS.cp(y, x, (err) => {
            if (err) { }
          })
        } else {
          FS.rmSync(`${x}`)
          FS.cp(y, x, (err) => {
            if (err) { }
          })
        }
      }
    }
    return
  }
  upfile = () => {
    let cf = []
    const filepath = `./plugins/${appname}/defSet/`
    const config = ['xiuxian', 'help', 'admin']
    const readdirectory = (dir) => {
      let files = FS.readdirSync(dir)
      files.forEach(async item => {
        let filepath1 = `${dir}/${item}`
        let stat = FS.statSync(filepath1)
        if (!stat.isFile()) {
          let file = filepath1.replace(`${filepath}/`, '')
          cf.push(file)
        }
      })
    }
    readdirectory(filepath)
    const filepath0 = `./plugins/${appname}/config/`
    for (var j = 0; j < cf.length; j++) {
      for (var i = 0; i < config.length; i++) {
        let x = `${filepath0}${cf[j]}/${config[i]}.yaml`
        let y = `${filepath}${cf[j]}/${config[i]}.yaml`
        if (FS.existsSync(y)) {
          FS.cp(y, x, (err) => {
            if (err) { }
          })
        }
      }
    }
    return
  }
  file = (config) => {
    let cf = []
    const filepath = `./plugins/${appname}/defSet/`
    const readdirectory = (dir) => {
      let files = FS.readdirSync(dir)
      files.forEach(async item => {
        let filepath1 = `${dir}/${item}`
        let stat = FS.statSync(filepath1)
        if (!stat.isFile()) {
          let file = filepath1.replace(`${filepath}/`, '')
          cf.push(file)
        }
      })
    }
    readdirectory(filepath)
    const filepath0 = `./plugins/${appname}/config/`
    for (var j = 0; j < cf.length; j++) {
      for (var i = 0; i < config.length; i++) {
        let x = `${filepath0}${cf[j]}/${config[i]}.yaml`
        let y = `${filepath}${cf[j]}/${config[i]}.yaml`
        if (!FS.existsSync(x)) {
          FS.cp(y, x, (err) => {
            if (err) { }
          })
        }
      }
    }
    return
  }
  help = () => {
    const config1 = ['help']
    const config2 = ['help']
    const cphelp = (cf1, cf2) => {
      for (var i = 0; i < cf1.length; i++) {
        let x = `./plugins/${appname}/resources/${cf1[i]}/${cf2[i]}.jpg`
        if (!FS.existsSync(x)) {
          let y = `./plugins/${appname}/resources/img/${cf1[i]}/${cf2[i]}.jpg`
          FS.cp(y, x,
            (err) => {
              if (err) {
                console.error(x)
              }
            })
        }
      }
    }
    cphelp(config1, config2)
    return
  }
}
export default new filecp()
import noderequire from "./noderequire.js"
const PATH = noderequire.path()
const FS = noderequire.fs()
export const __dirname = `${PATH.resolve()}`
class nodefs {
    /**
     * @param {地址} filepath 
     * @returns 所有子目录 
     */
    returnPathName = async (filepath) => {
        const sum = []
        const files = FS.readdirSync(filepath)
        files.forEach((item) => {
            const newfilepath = filepath + '/' + item
            const stat = FS.statSync(newfilepath)
            if (!stat.isFile()) {
                const file = newfilepath.replace(filepath + '/', '')
                sum.push(`${file}`)
            }
        })
        return sum
    }
    /**
     * 
     * @param {地址} path 
     * @returns 子目录名
     */
    //得到该目录下所有json文件的文件名
    jsonName = async (path) => {
        const playerList = []
        const files = FS
            .readdirSync(path)  //tudo
            .filter((file) => file.endsWith('.json'))
        files.forEach((item) => {
            const file = item.replace('.json', '')
            playerList.push(file)
        })
        return playerList
    }

    /**
     * @param {地址} path 
     * @param {表名} name 
     * @param {原数据} sum 
     * @param {新数据} newsum 
     */
    list = (path, name, sum, newsum) => {
        const dir = PATH.join(path, `${name}.json`)
        const new_ARR = JSON.stringify([...sum, ...newsum], '', '\t')
        FS.writeFileSync(dir, new_ARR, 'utf8', (err) => { })
    }
    /**
     * @param {地址} path 
     * @param {表名} name 
     * @param {数据} sum 
     */
    newlist = (path, name, sum) => {
        const dir = PATH.join(path, `${name}.json`)
        const new_ARR = JSON.stringify(sum, '', '\t')
        FS.writeFileSync(dir, new_ARR, 'utf8', (err) => { })
    }
    /**
     * @param {地址} PATH 
     * @param {检索条件} type 
     */
    getlist = (path, type) => {
        const newsum = []
        const data = []
        const travel = (dir, callback) => {
            FS.readdirSync(dir).forEach((file) => {
                var pathname = PATH.join(dir, file)
                if (FS.statSync(pathname).isDirectory()) {
                    travel(pathname, callback)
                } else {
                    callback(pathname)
                }
            })
        }
        travel(path, (pathname) => {
            let temporary = pathname.search(type)
            if (temporary != -1) {
                newsum.push(pathname)
            }
        })
        newsum.forEach((file) => {
            data.push(...JSON.parse(FS.readFileSync(file)))
        })
        return data
    }

    /**
     * @param {地址} patg
     * @param {表名} listname 
     * @param {查询条件} result 
     */
    readFindName(path, listname, result){
        return  JSON.parse(FS.readFileSync(`${path}/${listname}.json`)).find(item => item.name == result)
    }

    /**
     * @param {地址} patg
     * @param {表名} listname 
     * @param {查询条件} result 
     */
    readFindId(path, listname, result) {
        return JSON.parse(FS.readFileSync(`${path}/${listname}.json`)).find(item => item.id == result)
    }

    /**
     * @param {UID} UID 
     * @param {数据} arr 
     * @param {地址} path 
     * @returns 
     */
    Write = async (UID, arr, path) => {
        const dir = PATH.join(path, `${UID}.json`)
        const new_ARR = JSON.stringify(arr, '', '\t')
        FS.writeFileSync(dir, new_ARR, 'utf8', (err) => {
        })
        return
    }


    /**
     * @param {UId} UID 
     * @param {地址} path 
     * @returns 
     */
    Read = async (UID, path) => {
        const dir = PATH.join(`${path}/${UID}.json`)
        const the = {
            player: ''
        }
        the.player = FS.readFileSync(dir, 'utf8', (err, data) => {
            if (err) {
                return 'error'
            }
            return data
        })
        the.player = JSON.parse(the.player)
        return the.player
    }
}
export default new nodefs()
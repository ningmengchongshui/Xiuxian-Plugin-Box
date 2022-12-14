
import FS from 'node:fs'
import PATH from 'path'
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
     * @param {选择} choice 
     * @param {表名} listname 
     * @param {查询条件} result 
     */
    readFind(choice, listname, result) {
        JSON.parse(FS.readFileSync(`${__PATH[choice]}/${listname}.json`)).find(result)
    }

}
export default new nodefs()
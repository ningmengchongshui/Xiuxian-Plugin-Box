
import fs from 'node:fs'
class nodefs{
    /**
     * @param {地址} filepath 
     * @returns 所有子目录
     */
    returnPathName=async(filepath)=>{
        const sum = []
        const files = fs.readdirSync(filepath)
        files.forEach((item) => {
            const newfilepath = filepath + '/' + item
            const stat = fs.statSync(newfilepath)
            if (!stat.isFile()) {
                const file = newfilepath.replace(filepath + '/', '')
                sum.push(`${file}`)
            }
        })
        return sum
    }
}
export default new nodefs()
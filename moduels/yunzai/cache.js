import picture from './picture.js'
import md5 from 'md5'
const helpData = []
class Cache {
    helpcache = async (data, i) => {
        let tmp = md5(JSON.stringify(data))
        while (true) {
            if (helpData.length <= i) {
                helpData.push({
                    md5: '',
                    img: '',
                })
            } else {
                break
            }
        }
        if (helpData[i].md5 == tmp) {
            return helpData[i].img
        }
        //图片生成直接用yunzai的还是不够好，隔离
        helpData[i].img = await picture.puppeteer().screenshot('help', data)
        helpData[i].md5 = tmp
        return helpData[i].img
    }
}
export default new Cache()
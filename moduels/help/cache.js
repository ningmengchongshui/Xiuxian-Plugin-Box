import picture from './picture.js'
import md5 from 'md5'
let DATA = {}
class Cache {
    helpcache = async (data, i) => {
        const tmp = md5(JSON.stringify(data))
        if (DATA.hasOwnProperty(i)) {
            if (DATA[i]['md5'] == tmp) {
                return DATA[i]['img']
            }
        }
        DATA[i]['img'] = await picture.puppeteer('help', data)
        DATA[i]['md5'] = tmp
        return DATA[i]['img']
    }
}
export default new Cache()
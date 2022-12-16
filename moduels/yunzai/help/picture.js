//定义一个类来处理图片，这个图片不一定要用云仔，我可能会使用自己的
import puppeteer from '../../../../../lib/puppeteer/puppeteer.js'
class Picture {
    puppeteer = async (name, data) => {
        return await puppeteer.screenshot(name, { ...data, })
    }
}
export default new Picture()
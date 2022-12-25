import puppeteer from '../../../../lib/puppeteer/puppeteer.js'
class Picture {
    puppeteer = async (name, data) => {
        return await puppeteer.screenshot(name, { ...data, })
    }
}
export default new Picture()
//定义一个类来处理图片，这个图片不一定要用云仔，我可能会使用自己的
import puppeteer from '../../../../lib/puppeteer/puppeteer.js'
class Picture {
    gamePicture = async () => {
        return
    }
    puppeteer = async () => {
        //这里报错，就将返回的方法改成自己的
        return puppeteer
    }
}
export default new Picture()
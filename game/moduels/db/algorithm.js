class Algorithm {
    /**
     * @param {数组} arr 
     * @returns 随机一个元素
     */
    Anyarra = async (arr) => {
        return arr[Math.trunc(Math.random() * arr.length)]
    }
    /**
     * @param {任意值} number 
     * @returns 大于1的整数
     */
    Numbers = async (number) => {
        let numbers = number
        if (numbers == null || numbers == undefined || numbers < 1 || isNaN(numbers)) {
            numbers = 1
        }
        if (isNaN(parseFloat(numbers)) && !isFinite(numbers)) {
            numbers = 1
        }
        numbers = Number(Math.trunc(numbers))
        return Number(numbers)
    }
    /**
    * 随机分配（1-10）
    * 当x=x+5||x=x-5||x=x时
    * 放弃该元素
    * @returns 
    */
    randomConditionNumber = async () => {
        const newtalent = []
        //随机（1-5的大小）
        const talentacount = Math.round(Math.random() * (5 - 1)) + 1
        for (let i = 0; i < talentacount; i++) {
            //随机获得一个（1-10）的数
            const x = Math.round(Math.random() * (10 - 1)) + 1
            //检查是否存在
            let y = newtalent.indexOf(x)
            if (y != -1) {
                continue
            }
            y = newtalent.indexOf(x + 5)
            if (y != -1) {
                continue
            }
            y = newtalent.indexOf(x - 5)
            if (y != -1) {
                continue
            }
            newtalent.push(x)
        }
        return newtalent
    }
    /**
     * @param {1-100的概率值} P 
     * @returns true|false
     */
    battle_probability = async (P) => {
        let newp = P
        if (newp > 100) {
            newp = 100
        }
        if (newp < 0) {
            newp = 0
        }
        const rand = Math.floor((Math.random() * (100 - 1) + 1))
        if (newp > rand) {
            return true
        }
        return false
    }
    /**
     * 根据组合计算天赋值
     * @param {计算} arr 
     * @returns 
     */
    talentsize = async (arr) => {
        let talentsize = 250
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] <= 5) {
                talentsize -= 50
            }
            if (arr[i] >= 6) {
                talentsize -= 35
            }
        }
        return talentsize
    }
    /**
     * 对象数组排序
     * 从大到小
     */
    sortBy = (field) => {
        return function (b, a) {
            return a[field] - b[field]
        }
    }
}
export default new Algorithm()
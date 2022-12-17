class Algorithm {
    /**
     * @param {数组} arr 
     * @returns 随机一个元素
     */
    Anyarra = async (arr) => {
        return arr[Math.trunc(Math.random() * arr.length)]
    }
    /**
     * 
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
}
export default new Algorithm()
class dataEuipment {
    constructor() {
        //武器
        const name1 = ["烂铁匕首", "开山剑", "逆天剑", "轮回枪"]
        const data1 = this.generateEuipment(1, 1, name1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
        //护甲
        const name2 = ["烂铜护甲", "开山甲", "逆天甲", "轮回甲"]
        const data2 = this.generateEuipment(1, 2, name2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
        //法宝
        const name3 = ["烂宝具", "开山宝", "逆天宝", "轮回宝"]
        const data3 = this.generateEuipment(1, 3, name3, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0)
    }
    generateEuipment(a, b, arr, attack, defense, blood, probability, burst, size, experience, experiencemax, element, talent, master, speed) {
        const data = []
        arr.forEach((item, index, arr) => {
            const NEW = {
                "id": `${a}-${b}-${index}`,
                "name": item,
                "explain": "",
                "attack": attack * index,
                "defense": defense * index,
                "blood": blood * index,
                "probability": probability * index,
                "burst": burst * index,
                "size": size * index,
                "experience": experience * index,
                "experiencemax": experiencemax * index,
                "element": element * index,
                "talent": talent * index,
                "master": master * index,
                "speed": speed * index,
                "acount": 1,
                "price": price * index
            }
            data.push(NEW)
        })
        return data
    }
}
module.exports = new dataEuipment()
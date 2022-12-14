import plugin from '../../../../lib/plugins/plugin.js'
import config from '../../moduels/config.js'
import { yunzaiConfig } from '../../moduels/yunzai/index.js'
import { Write_player, point_map, Read_action, GenerateCD, Read_player, Read_wealth, Write_Life, Read_Life, Add_lingshi } from '../../moduels/xiuxian/index.js'
import { Go } from '../../moduels/yunzai/index.js'
import { get_player_img } from '../../moduels/yunzai/showData.js'
export class modify extends plugin {
    constructor() {
        super(yunzaiConfig('', [
            {
                reg: '^#改名.*$',
                fnc: 'Change_name'
            },
            {
                reg: '^#设置道宣.*$',
                fnc: 'Change_autograph'
            }
        ]))
        this.xiuxianConfigData = config.getConfig('xiuxian', 'xiuxian')
    }
    Change_name = async (e) => {
        const good = await Go(e)
        if (!good) {
            return
        }
        const UID = e.user_id
        const action = await Read_action(UID)
        const address_name = '联盟'
        const map = await point_map(action, address_name)
        if (!map) {
            e.reply(`需[#城池名+${address_name}]`)
            return
        }
        const lingshi = 5
        let new_name = e.msg.replace('#改名', '')
        if (new_name.length == 0) {
            return
        }
        const name = ['尼玛', '妈的', '他妈', '卧槽', '操', '操蛋', '麻痹', '傻逼', '妈逼']
        name.forEach((item) => {
            new_name = new_name.replace(item, '')
        })
        if (new_name.length > 8) {
            e.reply('[修仙联盟]白老\n小友的这名可真是稀奇')
            return
        }
        const wealth = await Read_wealth(UID)
        if (wealth.lingshi < lingshi) {
            e.reply(`需${lingshi}灵石`)
            return
        }
        const CD = await GenerateCD(UID, '3', this.xiuxianConfigData.CD.Name)
        if (CD != 0) {
            e.reply(CD)
            return
        }
        await Add_lingshi(UID, -lingshi)
        const life = await Read_Life()
        life.forEach((item) => {
            if (item.qq == UID) {
                item.name = new_name
            }
        })
        await Write_Life(life)
        const img = await get_player_img(e)
        e.reply(img)
        return
    }
    Change_autograph = async (e) => {
        const good = await Go(e)
        if (!good) {
            return
        }
        const UID = e.user_id
        const player = await Read_player(UID)
        let new_msg = e.msg.replace('#设置道宣', '')
        new_msg = new_msg.replace(' ', '')
        const name = ['尼玛', '妈的', '他妈', '卧槽', '操', '操蛋', '麻痹', '傻逼', '妈逼']
        name.forEach((item) => {
            new_msg = new_msg.replace(item, '')
        })
        if (new_msg.length == 0 || new_msg.length > 50) {
            e.reply('请正确设置,且道宣最多50字符')
            return
        }
        const CD = await GenerateCD(UID, '4', this.xiuxianConfigData.CD.Autograph)
        if (CD != 0) {
            e.reply(CD)
            return
        }
        player.autograph = new_msg
        await Write_player(UID, player)
        const img = await get_player_img(e)
        e.reply(img)
        return
    }
}
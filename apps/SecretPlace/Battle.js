import plugin from '../../../../lib/plugins/plugin.js';
import Cachemonster from "../../model/cachemonster.js";
import { Go,Read_action, GenerateCD, __PATH, At, battle, interactive, distance, Read_equipment, Anyarray, Write_equipment, Read_najie, Add_najie_thing, Write_najie } from '../Xiuxian/Xiuxian.js';
export class Battle extends plugin {
    constructor() {
        super({
            name: 'Battle',
            dsc: 'Battle',
            event: 'message',
            priority: 600,
            rule: [
                {
                    reg: '^#攻击.*$',
                    fnc: 'Attack'
                }
            ]
        });
    };
    async Attack(e) {
        const good = await Go(e);
        if (!good) {
            return;
        };
        let A = e.user_id;
        let B = await At(e);
        if (B == 0 || B == A) {
            return;
        };
        const actionA = await Read_action(A);
        //非安全区判断
        const pA = await Cachemonster.monsters(actionA.x, actionA.y, actionA.z);
        if (pA == -1) {
            return;
        };
        const actionB = await Read_action(B);
        //非安全区判断
        const pB = await Cachemonster.monsters(actionB.x, actionB.y, actionB.z);
        if (pB == -1) {
            return;
        };
        //攻击CD
        const CDid = "0";
        const now_time = new Date().getTime();
        const CDTime = 5;
        const CD = await GenerateCD(A, CDid);
        if (CD != 0) {
            e.reply(CD);
        };
        let qq = 0;
        //是否交互
        if (await interactive(A, B)) {
            qq = await battle(e, A, B);
        };
        //先斩后奏
        await redis.set("xiuxian:player:" + A + ':' + CDid, now_time);
        await redis.expire("xiuxian:player:" + A + ':' + CDid, CDTime * 60);
        if (qq == 0) {
            //距离
            let h = await distance(A, B);
            e.reply("他离你" + Math.floor(h) + "千里！");
            return;
        };
        const q = Math.floor((Math.random() * (99 - 1) + 1));
        //根据魔力来判断概率
        const MP=80;
        if (q > MP) {
            if (qq != A) {
                let C = A;
                A = B;
                B = C;
            };
            let equipment = await Read_equipment(B);
            if (equipment.length > 0) {
                const thing = await Anyarray(equipment);
                equipment = equipment.filter(item => item.name != thing.name);
                await Write_equipment(B, equipment);
                let najie = await Read_najie(A);
                najie = await Add_najie_thing(najie, thing, 1);
                await Write_najie(A, najie);
                e.reply(A + "夺走了" + thing.name);
            };
        };
        return;
    };
};
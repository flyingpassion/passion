/**
 * Created by passionflying@126.com on 2018/1/18.
 */
const path = require("path");
const _secret = require("crypto");
const fs = require("fs");

const validate = require("parameter");

class objects {

    static isBlank(target) {

        if (typeof target == "number") return false;//是数字，一定不为空

        if (Array.isArray(target)) {
            if (target.length <= 0) {
                return true;//数组长度小于等0 ，一定为空。
            } else {
                return false;
            }
        }

        if (target instanceof Set || target instanceof WeakSet
            || target instanceof Map || target instanceof WeakMap) {
            if (target.size <= 0) {
                return true;
            } else {
                return false;
            }
        }


        if (!target) return true;//表示没有传递参数

        if (Object.keys(target).length <= 0) return true;//验证对象没有属性

        return false;
    }

    static isNotBlank(target) {
        return !objects.isBlank(target);
    }

    static isDeepBlank(target, fields = []) {

        if (objects.isBlank(target)) return true;

        if (typeof target == "object" && !Array.isArray(target)) {
            if (!Array.isArray(fields)) fields = [];
            if (fields.length <= 0) fields = Object.keys(target);

            for (let i = 0; i < fields.length; i++) {
                //console.log(fields[i]);
                if (!target[fields[i]] && !isNaN(target[fields[i]])) {
                    return true
                }
            }
        } else {
            throw new TypeError("arguments is must to Object and not array.")
        }
        return false;
    }

    static isNotDeepBlank(target, fields = []) {
        return !objects.isDeepBlank(target, fields)
    }

    /**
     * 加载读取插件
     * @returns {}
     */
    static loadFileObject(name = "") {
        let data = {};
        try {
            let dirPath = path.join(__dirname, name);
            if (!fs.existsSync(dirPath)) {
                return data;
            }

            fs.readdirSync(dirPath).filter((f) => {
                return f.endsWith(".js");
            }).forEach(async (f) => {
                let mapping = require(dirPath + "/" + f);
                Object.assign(data, mapping);
            });
            return data;
        } catch (e) {
            throw e;
        }
    }
}

class secrets {

    /**
     * @aes192加密模块
     * @param str string 要加密的字符串
     * @param secret string 要使用的加密密钥(要记住,不然就解不了密啦)
     * @retrun string 加密后的字符串
     * */
    static getEncAse192(str, secret, option = {encoding: "utf8", type: "aes192", target: "hex"}) {

        let cipher = _secret.createCipher(option.type, secret); //设置加密类型 和 要使用的加密密钥
        let enc = cipher.update(str, option.encoding, option.target);    //编码方式从utf-8转为hex;
        enc += cipher.final(option.target); //编码方式从转为hex;
        return enc; //返回加密后的字符串
    }

    /**
     * @aes192解密模块
     * @param str string 要解密的字符串
     * @param secret string 要使用的解密密钥(要和密码的加密密钥对应,不然就解不了密啦)
     * @retrun string 解密后的字符串
     * */
    static getDecAse192(str, secret, option = {encoding: "utf8", type: "aes192", target: "hex"}) {
        let decipher = _secret.createDecipher(option.type, secret);
        let dec = decipher.update(str, option.target, option.encoding);//编码方式从hex转为utf-8;
        dec += decipher.final(option.encoding);//编码方式从utf-8;
        return dec;
    }

    /**
     * @Hmac-sha1加密模块 (每次加密随机,不可逆)
     * @param str string 要加密的字符串
     * @param secret string 要使用的加密密钥
     * @retrun string 加密后的字符串
     * */
    static getHmac(str, secret) {
        let buf = _secret.randomBytes(16);
        secret = buf.toString("hex");//密钥加密；
        let Signture = _secret.createHmac("sha1", secret);//定义加密方式
        Signture.update(str);
        return Signture.digest().toString("base64");//生成的密文后将再次作为明文再通过pbkdf2算法迭代加密；
    }

    /**
     * @sha1加密模块 (加密固定,不可逆)
     * @param str string 要加密的字符串
     * @retrun string 加密后的字符串
     * */
    static getSha1(str) {
        let sha1 = _secret.createHash("sha1");//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
        sha1.update(str);
        let res = sha1.digest("hex");  //加密后的值d
        return res;
    }

    /**
     * 获取指定内容md5数字认证
     * @param content
     * @returns {*}
     */
    static md5(content) {
        let md5 = _secret.createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
        md5.update(content);
        return md5.digest('hex');  //加密后的值d
    }
}

class rules {

    /**
     * 生成校验规则
     * @param target 接受Object 和Array<string>
     * @param rule
     * @param option
     * @returns {{}}
     */
    static makeRules(target, rule = [{type: 'string'}], option = {recursive: 0, exclusion: []}) {

        if (!Array.isArray(rule) && typeof rule === 'object') {
            let temp = [];

            for (let key of Object.keys(rule)) {
                if (typeof rule[key] ==='object'){
                    temp.push({[key]: rule[key]})
                }else {
                    temp.push({[key]: {type: rule[key]}})
                }
            }
            rule = temp;
        }
        console.log(rule);
        if (typeof rule === 'string') {
            rule = {type: rule}
        }

        const makeHandler = {
            makeItem: function (rule = [], name = "", value = undefined) {
                if (!rule || rule.length <= 0) {
                    return {};
                }
                let ruleItem = {};
                rule.forEach(temp => {
                    //console.log(temp);
                    if (temp.hasOwnProperty(name)) {
                        console.log(temp[name]);
                        Object.assign(ruleItem, temp[name])//增加指定验证规则
                    } else {
                        if (value) {
                            //g

                        } else if (!(Object.values(temp).some(n => typeof n === 'object'))) {
                            Object.assign(ruleItem, temp)//追加公共的验证规则
                        }
                    }
                });
                return {[name]: ruleItem};
            },
            recursive: 0,
            makeProperty: function (target, rule = [], option, self = this) {
                let ruleResult = {};
                //判断递归深度
                if (option.recursive && (option.recursive <= self.recursive)) {
                    return {type: 'object'};
                }
                let ruleEnable = rule.filter(name => name.hasOwnProperty("type") || !Object.is(name.type, 'array')) || rule;
                //获取对象的属性
                let property = Object.keys(target).filter(name => !option.exclusion.includes(name));
                property.forEach(name => {
                    //判断当前属性的值是不是对象
                    if (Array.isArray(target[name])) {
                        let [itemFirst] = target[name];
                        ruleResult[name] = makeHandler.makeArray(rule, itemFirst)
                    } else if (typeof target[name] === 'object') {
                        //在一递归调用
                        self.recursive += 1;
                        ruleResult[name] = self.makeProperty(target[name], rule, option, self);
                    } else {
                        //console.log(name)
                        Object.assign(ruleResult, self.makeItem(rule, name));
                    }

                });
                return ruleResult;
            },
            makeArray: function (rule = [], item = {}, self = this) {
                let ruleTemp = rule.find(na => (na.hasOwnProperty('type') && na.type === 'array')
                    || (Object.values(na).every(n => n.hasOwnProperty('type') && n.type === 'array'))) || {};

                if (Object.values(ruleTemp).every(nam => typeof nam === "object")) {
                    [ruleTemp] = Object.values(ruleTemp);
                }

                let arrayRule = {
                    itemType: ruleTemp.itemType || 'object',
                    required: ruleTemp.required || false,
                    type: ruleTemp.type || "array"
                };
                let property = Object.keys(item);
                let ruleItem = {};
                let ruleEnable = rule.filter(name => name.hasOwnProperty("type") && !Object.is(name.type, 'array'));
                property.forEach(name => {
                    Object.assign(ruleItem, self.makeItem(ruleEnable, name));
                });
                arrayRule['rule'] = ruleItem;
                return arrayRule;
            }
        };
        //option 参数处理
        option.exclusion = option.exclusion || [];
        option.recursive = option.recursive || 0;
        let ruleData = {};
        if (Array.isArray(target)) {
            if (target.some(item => typeof item === 'object')) {
                //生产数组校验规则
                let [itemFirst] = target;
                return makeHandler.makeArray(rule, itemFirst);
            }
            //target 是数组，则使用每一个元素为对象属性生产校验规则
            target.forEach(item => {
                if (typeof item === 'string') {
                    Object.assign(ruleData, makeHandler.makeItem(rule, item));
                }
            });
        }
        //target 是object ,则扫描对象属性
        if (!Array.isArray(target) && typeof target === "object") {
            ruleData = makeHandler.makeProperty(target, rule, option);
        }
        return ruleData;
    }

}

let data1 = ['username', "admin"];
let data2 = {
    username: "12122",
    admin: "addsds",
    id: 1222222222221,
    // permission: {
    //     id: 1212,
    //     name: "管理员",
    //     permission: 23,
    //     role: {
    //         id: 123,
    //         name: "业务员"
    //     }
    // },
    //array: [{username: 123}]
};

let ddd = data2;

let data = rules.makeRules(ddd, {
    username: {type: 'string', min: 12},
    admin: {type: 'string', min: 12},
});
//let data12 = rules.makeRules(data1, [{type: "string"}, {admin: {type: "password"}}, {username: {required: false}}], {exclusion: ["id"]});
//console.log(data);

function tag(literals, ...subs) {
    let result = "";
    for (let index = 0; index < subs.length; index++) {
        result += literals[index];
        result += subs[index];
    }
    result += literals[literals.length - 1];
    return result;
}


module.exports = {objects, secrets, rules};
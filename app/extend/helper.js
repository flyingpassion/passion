
/**
 * 解析webResult参数，分析前三个参数，根据参数类型设置对应的数据。
 * 前三个参数String,object,number 其中顺序可以随意变化。
 * string类型参数会设置到msg上，
 * object,array设置到data上，
 * @param target
 * @param argument
 * @param len
 */
function analyseArguments(target, argument = [], len = 3) {

    let index = argument.length >= len ? len : argument.length;
    let msgTemp = [];

    for (let i = 0; i < index; i++) {
        if (typeof argument[i] == "object") {
            target.data = argument[i];
        }
        if (typeof argument[i] == "string") {
            msgTemp.push(argument[i]);
        }
        if (typeof argument[i] == "number" && i==0) {
            target.code = argument[i];
        }
    }
    target.msg = msgTemp.join(",");

    /*
     * 拼接超过三个以后的数据，将其拼接到msg之上
     */

    for (let x = len; x < argument.length; x++) {
        target.msg += ";" + argument[x];
    }
    return target;
}


class helper{
    /**
     * @desc 系统Web交互数据对象，转换为json格式的数据。
     * @author passionflying@126.com
     * @since 2018/1/17 21:01
     * @version 1.0.0
     */
    static webResult(){
        let result = {
          code:-1,
          msg:"",
          data:null,
          time:new Date().getTime(),
        };

        return analyseArguments(result,arguments);
    }
}

module.exports = helper;
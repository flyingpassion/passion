
const pluginDir = "../plugin";

/**
 * 系统插件配置
 */
const {objects} = require("../app/util/objects");


module.exports = objects.loadFileObject(pluginDir);

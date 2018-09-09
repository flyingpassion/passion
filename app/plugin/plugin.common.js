/**
 * 插件配置
 * @author passionflying@126.com
 * @since 2018年7月28
 */

const pluginCommon = {
    /**
     * 系统参数校验
     * @type {{enable: boolean, package: string}}
     */
    validate: {
        enable: true,
        package: 'egg-validate',
    },
    /**
     * 数据库配置
     * @type {{clients: {}}}
     */
    mysql: {
        enable: true,
        package: 'egg-mysql',
    },
    /**
     * 国际化插件配置
     */
    i18n: {
        enable: true,
        package: 'egg-i18n',
    },
    onerror:{
        enable:true,
        package:'egg-onerror',
    }

};

module.exports = pluginCommon;


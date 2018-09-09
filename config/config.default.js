'use strict';

const {objects} = require("../app/util/objects");


module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1532714748203_6095';

    // // add your config here
    // config.middleware = ['gzip'];
    // config.gzip = {
    //     threshold: 1024, // 小于 1k 的响应体不压缩
    // };

    let tempConfig = objects.loadFileObject("../config");
    //console.info("加载到的配置是",tempConfig);
    Object.assign(config,tempConfig);
    return config;
};

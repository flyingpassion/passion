/**
 * 数据库配置
 * @type {{clients: {db1: {host: string, port: string, user: string, password: string, database: string}}}}
 */
const mysqlConfig = {
    client: {
        // host
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '123456',
        // 数据库名
        database: 'passion_authority',
    }
};

module.exports = {
    mysql:mysqlConfig,
};
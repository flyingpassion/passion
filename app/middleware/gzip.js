/**
 * 将json响应的内容全部转换为压缩包
 * 修改响应头
 */

const isJson = require("koa-is-json");
const zlib = require("zlib");
module.exports = options => {
    return async function gzip(ctx, next) {
        await next();

        ctx.coreLogger.info("json响应编码转换");
        // 后续中间件执行完成后将响应体转换成 gzip
        let body = ctx.body;
        if (!body) return;
        if (isJson(body)) body = JSON.stringify(body);

        // 设置 gzip body，修正响应头
        const stream = zlib.createGzip();

        stream.end(body);
        ctx.body = stream;
        ctx.set('Content-Encoding', 'gzip');

    }
};
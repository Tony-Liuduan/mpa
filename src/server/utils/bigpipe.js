/**
 * @fileoverview bigpipe ssr big html file
 * @author liuduan
 * @Date 2020-05-22 14:17:30
 * @LastEditTime 2020-05-24 15:13:34
 */
import { Readable } from 'stream';


/**
 * @description 响应大文件html，分块输出给浏览器方式
 * @param {ctx} ctx
 * @return {string} html
 */
export default function bigpipeResponseHtml(ctx, html) {
    // 注意：这里必须返回promise
    // 如果直接pipe给ctx.res，前端只是显示ok
    // 经测试，使用原生nodejs不需要Promise包装，可以直接pipe
    return new Promise((resolve, reject) => {
        const rs = new Readable();
        rs.push(html);
        rs.push(null);
        ctx.status = 200;
        ctx.type = 'html';
        rs.on('error', reject);
        rs.on('end', resolve);
        rs.pipe(ctx.res);
    });
}

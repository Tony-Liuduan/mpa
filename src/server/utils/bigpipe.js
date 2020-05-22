/**
 * @fileoverview bigpipe ssr big html file
 * @author liuduan
 * @Date 2020-05-22 14:17:30
 * @LastEditTime 2020-05-22 14:19:53
 */
import { Readable } from 'stream';


export function bigpipeResponseHtml(ctx, html) {
    // 这里必须返回promise，如果直接pipe给ctx.res，前端只是显示ok
    return new Promise((resolve, reject) => {
        const rs = new Readable();
        rs.push(html);
        rs.push(null);
        ctx.status = 200;
        ctx.type = 'html';
        rs.on('error', reject);
        rs.on('end', resolve);
        rs.pipe(ctx.res);
    })
}
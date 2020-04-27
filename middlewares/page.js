const { ApiRespnse, isHtmlRequset, isApiRequset } = require('../utils');
const ChainOfResponsibility = require('../utils/chainOfResponsibility');




function handlePage(fn) {
    return (ctx) => {
        if (isHtmlRequset(ctx)) {
            // 若不设置则浏览器或自动转为状态码200
            ctx.status = ctx.status;
            ctx.body = fn();
            return;
        }

        return 'next';
    }
}
function handleApi(fn) {
    return (ctx) => {
        if (isApiRequset(ctx)) {
            ctx.status = 200;
            ctx.body = fn()
            return;
        }

        return 'next';
    }
}




async function responseIndex(ctx, next) {
    if (/^\/(?:(index)?)(?:(\.html)?)$/.test(ctx.path)) {
        ctx.body = await ctx.render(`index/index`);
        return;
    }
    await next();
}



async function response5xx(ctx, next) {
    try {
        await next();
    } catch (error) {
        const status = ctx.status;
        if (status !== 404) {
            return;
        }

        const chainHtml = new ChainOfResponsibility(handlePage(() => `${status} page`));
        const chainApi = new ChainOfResponsibility(handleApi(() => new ApiRespnse(ctx.status, error.message)));

        chainHtml.setNexter(chainApi);
        chainHtml.execute(ctx);
    }
}





async function response404(ctx, next) {
    await next();
    const status = ctx.status;
    if (status !== 404) {
        return;
    }

    const chainHtml = new ChainOfResponsibility(handlePage(() => `${status} page`));
    const chainApi = new ChainOfResponsibility(handleApi(() => new ApiRespnse(ctx.status, 'not fond')));

    chainHtml.setNexter(chainApi);
    chainHtml.execute(ctx);
}




module.exports = {
    responseIndex,
    response5xx,
    response404,
};
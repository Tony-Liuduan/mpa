async function pageIndex(ctx, next) {
    console.log(ctx.path)
    if (/(?:index(\.html)?|\/)$/.test(ctx.path)) {
        ctx.body = await ctx.render(`index/index`);
        return;
    }
    await next();
}


async function page404(ctx, next) {
    if (/^(?!\/api)/.test(ctx.path)) {
        ctx.body = `sorry: 404\npath: ${ctx.path}`;
        return;
    }
    await next();
}


module.exports = {
    pageIndex,
    page404,
};
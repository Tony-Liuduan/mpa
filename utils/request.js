const http = require('http');
const url = require('url');




function httpGet(options, query) {
    if (query) {
        options.path = url.format({
            pathname: options.path,
            query,
        });
    }

    return new Promise((resolve, reject) => {
        http.get(options, (res) => {
            const { statusCode } = res;

            let error;
            if (statusCode !== 200) {
                error = new Error('请求失败\n' +
                    `状态码: ${statusCode}`);
            }

            if (error) {
                reject(error);
                // 消费响应数据来释放内存。
                res.resume();
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                resolve(rawData);
            });
        }).on('error', (e) => {
            reject(e);
        });
    })
}




function httpPost(options, postData) {
    return new Promise((resolve, reject) => {
        const _postData = querystring.stringify(postData);

        const _options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            },
            ...options,
        };

        const req = http.request(_options, (res) => {
            let error;
            if (statusCode !== 200) {
                error = new Error('请求失败\n' +
                    `状态码: ${statusCode}`);
            }

            if (error) {
                reject(error);
                // 消费响应数据来释放内存。
                res.resume();
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    reject(e);
                }
            });
        });

        req.on('error', (e) => {
            console.error(`请求遇到问题: ${e.message}`);
        });

        // 将数据写入请求主体。
        req.write(_postData);
        req.end();
    });
}



module.exports = {
    httpGet,
    httpPost,
}

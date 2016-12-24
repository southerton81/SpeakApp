var DatabaseError = require('./../error/errors.js').HttpError;

var HttpUtils = {}

HttpUtils.get = function(url) {
    return new Promise((resolve, reject) => {
        const httpLib = url.startsWith('https') ? require('https') : require('http');
        const request = httpLib.get(url, (response) => {
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new HttpError(response.statusCode, 'getContent failed'));
            }
            const body = [];
            response.on('data', (chunk) => body.push(chunk));
            response.on('end', () => resolve(body.join('')));
        });
        request.on('error', (err) => reject(err))
    })
};

module.exports = HttpUtils;
const Defer = require('./Defer')
const http = require('http')

class Request extends Defer {

    constructor(url) {
        super()

        if (!url) {
            throw new Error('url不能为空！')
        }

        this.url = url

        // 待处理队列，调用resolve后进行处理
        this.queue = []

        // 返回结构
        this.responseObj = {
            retcode: null, // 0：正常、1：请求失败
            msg: null,
            res: null
        }
    }

    get(args) {
        this.queue.push(() => {
            // 默认参数
            let opts = {
                data: {},
                lazy: true,
                maxAge: 1000 * 60
            }

            Object.assign(opts, args)

            //追加query参数
            let appendParams = []
            for (let key in opts.data) {
                appendParams.push(`${key}=${opts.data[key]}`)
            }

            if (appendParams.length > 0) {
                if (/\?$/.test(this.url) == false && /&$/.test(this.url) == false) {
                    this.url += /\?./.test(this.url) ? '&' : '?'
                }

                this.url += appendParams.join('&')
            }

            http.get(this.url, (res) => {
                const { statusCode } = res;
                const contentType = res.headers['content-type'];

                if (statusCode !== 200) {
                    const errorOpts = JSON.parse(JSON.stringify(this.responseObj))
                    errorOpts.retcode = 1
                    errorOpts.msg = `请求失败。状态码：${statusCode}`

                    this.reject(errorOpts)
                }

                res.setEncoding('utf-8')

                let rawData = ''
                res.on('data', (chunk) => {
                    rawData += chunk
                })

                res.on('end', () => {
                    super.resolve(rawData)
                })
            })
        });

        return this
    }

    resolve() {
        this.queue.forEach((fn) => {
            fn.call(this)
        })
    }

}

module.exports = Request
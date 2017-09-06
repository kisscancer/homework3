const Request = require('../lib/Request')

describe('request测试', function () {
    it('get', function (done) {
        const request = new Request("http://www.baidu.com")

        request
            .get({ data: { key1: "v1" } })
            .done((res) => {
                done()
            })
            .resolve()
    })
})
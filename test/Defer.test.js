const Defer = require('../lib/Defer')

describe('Defer测试', function () {
    
    // resolve
    it('应执行done回调', function (done) {
        const defer = new Defer

        defer.done(() => {
            done()
        })

        defer.resolve()
    })

    it('如果存在多个done回调，应调用全部的done回调，并且是按定义的顺序执行', function (done) {
        const defer = new Defer
        let times = 0
        defer
            .done(() => {
                times++
            })
            .done(() => {
                if (times === 1) {
                    done()
                }
            })

        defer.resolve()
    })

    it('执行done回调时遇到异常，应调用catch回调', function (done) {
        const defer = new Defer

        defer
            .done(() => {
                throw new Error('遇到一个错误')
            })
            .catch(() => {
                done()
            })

        defer.resolve()
    })

    it('执行done函数时遇到异常，如果存在多个catch回调，应调用全部的catch回调，并且是按定义的顺序执行', function (done) {
        const defer = new Defer
        let catchTimes = 0

        defer
            .done(() => {
                throw new Error('遇到一个错误')
            })
            .catch(() => {
                catchTimes++
            })
            .catch(() => {
                if (catchTimes === 1) {
                    done()
                }
            })

        defer.resolve()
    })

    // reject
    it('应执行fail回调', function (done) {
        const defer = new Defer

        defer
            .fail(() => {
                done()
            })

        defer.reject()
    })

    it('如果存在多个fail回调，应调用全部的fail回调，并且是按定义的顺序执行', function (done) {
        const defer = new Defer
        let times = 0

        defer
            .fail(() => {
                times++
            })
            .fail(() => {
                if (times === 1) {
                    done()
                }
            })

        defer.reject()
    })

    it('执行fail回调时遇到异常，应调用catch回调', function (done) {
        const defer = new Defer

        defer
            .fail(() => {
                throw new Error('遇到一个错误')
            })
            .catch(() => {
                done()
            })

        defer.reject()
    })

    it('执行fail函数时遇到异常，如果存在多个catch回调，应调用全部的catch回调，并且是按定义的顺序执行', function (done) {
        const defer = new Defer
        let times = 0

        defer
            .fail(() => {
                throw new Error('遇到一个错误')
            })
            .catch(() => {
                times++
            })
            .catch(() => {
                if (times === 1) {
                    done()
                }
            })

        defer.reject()
    })

})
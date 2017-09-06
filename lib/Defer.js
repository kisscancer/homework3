class Defer {
    constructor() {
        this.doneCbs = []
        this.failCbs = []
        this.catchCbs = []
    }

    done(fn) {
        this.doneCbs.push(fn)
        return this
    }

    fail(fn) {
        this.failCbs.push(fn)
        return this
    }

    catch(fn) {
        this.catchCbs.push(fn)
        return this
    }

    fire(cbs, args) {
        cbs.forEach((fn) => {
            try {
                fn.call(this, args)
            }
            catch (e) {
                this.fire(this.catchCbs, e)
            }
        })

        return this
    }

    resolve(args) {
        this.fire(this.doneCbs, args)
    }

    reject(args) {
        this.fire(this.failCbs, args)
    }
}

module.exports = Defer
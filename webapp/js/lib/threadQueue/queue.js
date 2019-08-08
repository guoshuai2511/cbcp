/*!
 * 多线程异步队列
 * 依赖 jQuery 1.8+ (如果你用的是 1.6或1.7, 只要将源码中的 then方法替换为pipe方法 即可)
 */

/**
 * @n {Number} 正整数, 线程数量
 */
function Queue(n) {
    n = parseInt(n, 10);
    return new Queue.prototype.init((n && n > 0) ? n : 1)
}

Queue.prototype = {
    init: function (n) {
        this.threads = [];
        this.taskList = [];

        while (n--) {
            this.threads.push(new this.Thread)
        }
    },

    /**
     * @callback {Fucntion} promise对象done时的回调函数，它的返回值必须是一个promise对象
     */
    push: function (callback) {
        if (typeof callback !== 'function') return;

        var index = this.indexOfIdle();

        if (index != -1) {
            this.threads[index].idle(callback)
            // try { console.log('Thread-' + (index + 1) + ' accept the task!') } catch (e) { }
        }
        else {
            this.taskList.push(callback);

            for (var i = 0, l = this.threads.length; i < l; i++) {

                (function (thread, self, id) {
                    thread.idle(function () {
                        if (self.taskList.length > 0) {
                            try { console.log('Thread-' + (id + 1) + ' accept the task!') } catch (e) { }

                            var promise = self.taskList.shift()();    // 正确的返回值应该是一个promise对象
                            return promise.promise ? promise : $.Deferred().resolve().promise();
                        } else {
                            return $.Deferred().resolve().promise();
                        }
                    })
                })(this.threads[i], this, i);

            }
        }
    },
    indexOfIdle: function () {
        var threads = this.threads,
            thread = null,
            index = -1;

        for (var i = 0, l = threads.length; i < l; i++) {
            thread = threads[i];

            if (thread.promise.state() === 'resolved') {
                index = i;
                break;
            }
        }

        return index;
    },
    Thread: function () {
        this.promise = $.Deferred().resolve().promise();

        this.idle = function (callback) {
            this.promise = this.promise.then(callback)
        }
    }
};

Queue.prototype.init.prototype = Queue.prototype;
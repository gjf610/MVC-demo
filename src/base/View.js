import $ from 'jquery'
import EventsBus from './EventBus';

class View extends EventsBus {
    constructor(options) {
        super()
        Object.assign(this, options)
        this.el = $(this.el)
        this.render(this.data);
        this.autoBindEvents();
        this.on('m:updated', () => {
            this.render(this.data)
        })
    }
    autoBindEvents() {
        // 绑定事件
        for (let key in this.events) {
            const value = this[this.events[key]]
            const spaceIndex = key.indexOf(' ')
            const action = key.slice(0, spaceIndex)
            const ids = key.slice(spaceIndex + 1)
            this.el.on(action, ids, value)

        }
    }
}

export default View
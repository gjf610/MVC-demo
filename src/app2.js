import $ from "jquery";
import './app2.css';
import Model from "./base/Model";

const eventBus = $({})

const localKey = 'app2.index';
const m = new Model({
    data: {
        index: parseInt(localStorage.getItem(localKey)) || 0
    },
    update: function (data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:updated')
        localStorage.setItem(localKey, m.data.index)
    },
})

const vue = {
    el: null,
    html: (index) => {
        console.log('index', index)
        return `
        <div>
            <ol class="tab-bar">
                <li class="${index === 0 ? 'selected' : ''}" data-index="0"><span>1111</span></li>
                <li class="${index === 1 ? 'selected' : ''}" data-index="1"><span>2222</span></li>
            </ol>
            <ol class="tab-content">
                <li class="${index === 0 ? 'active' : ''}">内容1</li>
                <li class="${index === 1 ? 'active' : ''}">内容2</li>
            </ol>
        </div>
        `
    },
    init(container) {
        // 初始化渲染
        vue.el = $(container);
        vue.render(m.data.index);
        vue.autoBindEvents();
        eventBus.on('m:updated', () => {
            vue.render(m.data.index)
        })
    },
    render(index) {
        if (vue.el.children.length !== 0) vue.el.empty()
        $(vue.html(index)).appendTo(vue.el)

    },
    events: {
        'click .tab-bar li': 'x',
    },
    x(e) {
        const index = parseInt(e.currentTarget.dataset.index);
        m.update({ index })
    },
    autoBindEvents() {
        // 绑定事件
        for (let key in vue.events) {
            const value = vue[vue.events[key]]
            const spaceIndex = key.indexOf(' ')
            const action = key.slice(0, spaceIndex)
            const ids = key.slice(spaceIndex + 1)
            vue.el.on(action, ids, value)

        }
    }
}

export default vue;

import $ from 'jquery'
import './app1.css';
import Model from './base/Model';

const eventBus = $({})



const m = new Model({
    data: {
        num: parseInt(localStorage.getItem('num')) || 100
    },
    update: function (data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:updated')
        localStorage.setItem('num', m.data.num)
    }
})

console.dir(m)

const vue = {
    el: null,
    html: `
    <div>
        <div class="output">
            <span id="number">{{num}}</span>
        </div>
        <div class="actions">
            <button id="add1">+1</button>
            <button id="minus1">-1</button>
            <button id="mul2">×2</button>
            <button id="divide2">÷2</button>
        </div>
    </div>
    `,
    init(container) {
        // 初始化渲染
        vue.el = $(container);

        vue.render(m.data.num); // view = render(data)
        vue.autoBindEvents();
        eventBus.on('m:updated', () => {
            vue.render(m.data.num)
        })
    },
    render(num) {
        if (vue.el.children.length !== 0) vue.el.empty()
        $(vue.html.replace('{{num}}', num))
            .appendTo(vue.el)

    },
    events: {
        'click #add1': 'add',
        'click #minus1': 'minus',
        'click #mul2': 'mul',
        'click #divide2': 'divide',
    },
    add() {
        m.update({ num: m.data.num + 1 })
    },
    minus() {
        m.update({ num: m.data.num - 1 })

    },
    mul() {
        m.update({ num: m.data.num * 2 })

    },
    divide() {
        m.update({ num: m.data.num / 2 })
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




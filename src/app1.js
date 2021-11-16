import $ from 'jquery'
import './app1.css';

const eventBus = $({})


const m = {
    data: {
        num: parseInt(localStorage.getItem('num')) || 100
    },
    create() { },
    delete() { },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:updated')
        localStorage.setItem('num', m.data.num)
    },
    get() { }
}


const v = {
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
        v.el = $(container);
    },
    render(num) {
        if (v.el.children.length !== 0) v.el.empty()
        $(v.html.replace('{{num}}', num))
            .appendTo(v.el)

    },
}

const c = {
    init(container) {
        // 初始化渲染
        v.init(container)
        v.render(m.data.num); // view = render(data)
        c.autoBindEvents();
        eventBus.on('m:updated', () => {
            v.render(m.data.num)
        })
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
        for (let key in c.events) {
            const value = c[c.events[key]]
            const spaceIndex = key.indexOf(' ')
            const action = key.slice(0, spaceIndex)
            const ids = key.slice(spaceIndex + 1)
            v.el.on(action, ids, value)

        }
    }
}

export default c;




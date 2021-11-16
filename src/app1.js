import $ from 'jquery'
import './app1.css';
import Model from './base/Model';
import View from './base/View';

const m = new Model({
    data: {
        num: parseFloat(localStorage.getItem('num')) || 100
    },
    update: function (data) {
        Object.assign(m.data, data)
        m.trigger('m:updated')
        localStorage.setItem('num', m.data.num)
    }
})


const init = (el) => {
    new View({
        el,
        data: m.data,
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
        render(data) {
            if (this.el.children.length !== 0) this.el.empty()
            $(this.html.replace('{{num}}', data.num))
                .appendTo(this.el)
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
    })
}


export default init;




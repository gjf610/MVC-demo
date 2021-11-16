import $ from "jquery";
import './app2.css';
import EventsBus from './base/EventBus';
import Model from "./base/Model";
import View from "./base/View";

const eventBus = new EventsBus()

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

const init = (el) => {
    new View({
        el,
        data: m.data,
        html: (index) => {
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
        render(data) {
            if (this.el.children.length !== 0) this.el.empty()
            $(this.html(data.index)).appendTo(this.el)
        },
        events: {
            'click .tab-bar li': 'x',
        },
        x(e) {
            const index = parseInt(e.currentTarget.dataset.index);
            m.update({ index })
        },
    })
}
export default init;

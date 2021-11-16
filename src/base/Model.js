class Model {
    constructor(options) {
        ['data', 'update', 'create', 'delete', 'get'].forEach((key) => {
            if (key in options) {
                this[key] = options[key]
            }
        })
    }
    create() {
        console?.error?.('你还没有实现 create');
    }
    delete() {
        console?.error?.('你还没有实现 delete');
    }
    update() {
        console?.error?.('你还没有实现 update');
    }
    get() {
        console?.error?.('你还没有实现 get');
    }
}

export default Model
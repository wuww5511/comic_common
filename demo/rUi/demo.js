define([
    'pro/ui',
    './view.js'
], function (ui, view, p) {
    
    var pro = {};
    
    pro.__reset = function (opts) {
        this.__super(opts);
        this.__initEvent();
        this.__view = view._$$Ui._$render(this.__body, {
            data: {
                v1: 1,
                v2: 2,
                v3: 3,
                list: [1, 2, 3, 4, 5]
            }
        })
    };
    
    pro.__onAdd = function (opts) {
        this.__view.setState({
            v1: this.__view.state.v1 + 1,
            v2: this.__view.state.v2 + 1,
            v3: this.__view.state.v3 + 1
        })
    };
    
    p._$$Ui = ui._$$Ui._$getSub(pro);
    
    p._$$Ui._$doWithNode(document.getElementById('container'));
    
});
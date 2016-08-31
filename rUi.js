define([
    './extend.js',
    'base/util'
], function (extend, u, p) {
    
    var pro = {};
    
    pro.__init = function (props, context, updater) {
        React.Component.call(this, props, context, updater);
        var data = props.data || {};
        this.state = u._$merge({}, this.constructor.__data, data);
        this.__parent = props.parent || null;
        this.__reset();
    };
    
    pro.__reset = function () {
        
    };
    
    pro.__render = function () {
        
    };
    
    pro.render = function () {
        return this.__render();
    };
    
    p._$$Ui = React.Component._$getSub(pro);
    
    p._$$Ui._$render = function (parent, opts) {
        opts = opts || {};
        return ReactDOM.render(React.createElement(this, opts), parent);
    };
    
    p._$$Ui.__data = {};
    
});
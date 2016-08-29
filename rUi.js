define([
    './extend.js'
    'base/util',
    './widget/event/proxy.js'
], function (extend, u, proxy, p) {
    
    var pro = {};
    
    pro.__init = function (props, context, updater) {
        React.Component.call(this, props, context, updater);
        this.__eventProxy = proxy._$$Proxy._$allocate({
            
        });
        this.state = u._$merge({}, this.constructor.__data);
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
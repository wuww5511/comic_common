/**
 *  为什么要用react(现在的项目中有哪些不好的地方，react能做什么)
 *  react怎么嵌入到nej中（编译、类封装）
 **/
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
    };
    
    pro.render = function () {
        
    };
    
    p._$$Ui = React.Component._$getSub(pro);
    
    p._$$Ui._$render = function (parent, opts) {
        opts = opts || {};
        ReactDOM.render(React.createElement(this, opts), parent);
    };
    
    p._$$Ui.__data = {};
    
});
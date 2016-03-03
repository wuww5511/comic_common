/**
 *本模块实现ui组件中一些常用的功能
 *1，绑定事件（事件代理）
 *2，选取元素
 *
 */

define([
    './extend.js',
    'base/element',
    'ui/base',
    'util/event',
    'util/template/tpl',
    'util/template/jst',
    'base/util'
], function (_extend, _el, _ui, _event, _tpl, _jst, _u, _p, _o, _f) {
    
    var _pro = {};
    
    _pro.__initXGui = function () {
        if(this.__html) this.__seed_html = _tpl._$addNodeTemplate(this.__html);
        if(this.__css && !this.constructor.__isCssInited) {
            this.__css = _el._$addStyle(this.__css);
            this.constructor.__isCssInited = true;
        }
    };
    
    _pro.__init = function () {
        this.__super();
        if(this.__bd){
            this.__body = this.__bd;
        }
    };
    
    _pro.__initEvent = function (_type) {
        _type = _type || 'click';
        
        if(_u._$isArray(_type)){
            _u._$forEach(_type, function (_type) {
                this.__initEvent(_type);
            }._$bind(this));
            return;
        }
        
        this.__doInitDomEvent([
            [this.__body, _type, this.___getHandle(_type) ]
        ]);
        
    };
    
    _pro.__exec = function (_str, _opts) {
        if(_str.indexOf(" ")>=0){
            var _reg = /[a-zA-Z0-9$_,\|:]+/g;
            var _res = _str.match(_reg);
            _u._$forEach(_res, function (_str) {
                this.__exec(_str);
            }._$bind(this));
            return;
        }
        this.___execOne(_str, _opts);
    };
    
    //通过class获取ui控件内的元素,获取第一个
    _pro.__el = function (_str) {
        return this.__els(_str)[0];
    };

    //通过class获取ui控件内的元素,获取数组
    _pro.__els = function (_str) {
        var _pre = 'js-',
            _clazz = _pre + _str;
        var _res = _el._$getByClassName(this.__body, _clazz);
        return _res;
        
    };
    
    _pro.___getHandle = function (_type) {
        return function (_e) {
            _e = _e || window.event;
            _e.target = _e.target || _e.srcElement;
            if (!_e.stopPropagation) {
                _e.stopPropagation = function () {
                    this.cancelBubble = true;
                }
            }
            var _opts = {
                event: _e
            };
            var _target = _e.target;
            var _attrName = 'data-' + _type;
            var _attr = _el._$attr(_target, _attrName);
            if(!_attr) return;
            this.__exec(_attr, _opts);
            
        }._$bind(this);
    };
    
    _pro.___execOne = function (_str, _opts) {
        if(_u._$isFunction(this["__"+_str])){
            this["__"+_str].call(this, _opts);
        }
    };
    
    _p._$$Ui = _ui._$$Abstract._$getSub(_pro);
    
    _p._$$Ui.__isCssInited = false;
    
    return _p;
    
    
});
/**
 *本模块实现ui组件中一些常用的功能
 *1，绑定事件（事件代理）
 *2，选取元素
 *
 */

define([
    './extend.js'
    
    , 'base/element'
    
    , 'ui/base'
    
    , 'util/event'
    
    , 'util/template/tpl'
    
    , 'util/template/jst'
    
    , 'base/util'
], function (_extend, _el, _ui, _event, _tpl, _jst, _u, _p, _o, _f) {

    var _pro = {};

    _pro.__initXGui = function () {
        if (this.__html) this.__seed_html = _tpl._$addNodeTemplate(this.__html);
        if (this.__css && !this.constructor.__isCssInited) {
            this.__css = _el._$addStyle(this.__css);
            this.constructor.__isCssInited = true;
        }
    };

    _pro.__init = function () {
        this.___cache = {};
        this.__super();
        if (this.__bd) {
            this.__body = this.__bd;
        }
    };

    _pro.__initEvent = function (_type) {
        _type = _type || 'click';

        if (_u._$isArray(_type)) {
            _u._$forEach(_type, function (_type) {
                this.__initEvent(_type);
            }._$bind(this));
            return;
        }
        
        if(!this.___cache.event) this.___cache.event = {};
        
        if(this.___cache.event[_type]) return;

        this.__doInitDomEvent([
            [this.__body, _type, this.___getHandle(_type)]
        ]);
        
        this.___cache.event[_type] = true;

    };

    _pro.__exec = function (_str, _opts) {
        if (_str.indexOf(" ") >= 0) {
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
    _pro.__el = function (_str, _refresh) {
        return this.__els(_str, _refresh)[0];
    };

    //通过class获取ui控件内的元素,获取数组;_refresh为true时刷新缓存。
    _pro.__els = function (_str, _refresh) {
        
        if(!this.___cache.el) this.___cache.el = {};
        
        if(this.___cache.el[_str] && !_refresh) return this.___cache.el[_str];
        
        var _pre = 'js-'
            , _clazz = _pre + _str;
        var _res = _el._$getByClassName(this.__body, _clazz);
        
        if(_el._$hasClassName(this.__body, _clazz))
            _res.push(this.__body);
        
        this.___cache.el[_str] = _res;
        
        return this.___cache.el[_str];

    };

    _pro.__isChildOf = function (_target, _parent) {
        var _tmp = _target.parentNode;
        while (_tmp) {
            if (_tmp === _parent)
                return true;
            _tmp = _tmp.parentNode;
        }
        return false;
    };

    _pro.__isLe = function (_target, _parent) {
        if (_target === _parent)
            return true;
        return this.__isChildOf(_target, _parent);
    };

    _pro.___getHandle = function (_type) {
        return function (_e) {
            _e = _e || window.event;
            _e.target = _e.target || _e.srcElement;
            if (!_e.stopPropagation) {
                _e.stopPropagation = function () {
                    _e.cancelBubble = true;
                }
            }
            var _opts = {
                event: _e
            };

            var _attrName = 'data-' + _type
                , _attr;

            var _tmp = _e.target;
            while (this.__isLe(_tmp, this.__body)) {
                _attr = _el._$attr(_tmp, _attrName);
                if (_attr) {
                    _opts.event.currentTarget = _tmp;
                    this.__exec(_attr, _opts);
                }

                if (_opts.stop) break;
                _tmp = _tmp.parentNode;
            }

        }._$bind(this);
    };

    _pro.___execOne = function (_str, _opts) {
        var _name = _str;
        
        _opts.args = [];
        
        if(_str.indexOf(":") > 0){
            var _arr = _str.split(":");
            _name = _arr[0];
            _opts.args = _arr[1].split(',');
        }
        
        if (_u._$isFunction(this["__" + _name])) {
            this["__" + _name].call(this, _opts);
        }
    };
    
    _pro.__destroy = function () {
        this.__super();
        this.___cache = {};
    };


    _p._$$Ui = _ui._$$Abstract._$getSub(_pro);

    _p._$$Ui.__isCssInited = false;

    return _p;


});
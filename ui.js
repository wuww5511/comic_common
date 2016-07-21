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
        this.constructor.__isCssInited = false;
        this.___cache = {};
        this.__super();
        if (this.__bd) {
            this.__body = this.__bd;
        }
    };
    
    _pro.__reset = function (_opts) {
        this.__super(_opts);
        if(this.__bd) {
            this.__parent = this.__body.parentNode;
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
        
        var _actions = this.__parseAction(_str);
        
        for(var _i in _actions) {
            this.___execOne(_i, _actions[_i], _opts);
        }
        
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
    
    _pro.__getProxyEvent = function (_ele, _event) {
        return _el._$attr(_ele, "data-" + _event) || "";
    };
    
    _pro.__setProxyEvent = function (_ele, _event, _action) {
        _el._$attr(_ele, "data-" + _event, _action);
    };
    
    _pro.__addProxyEvent = function (_ele, _event, _action) {
        var _toAdd = this.__parseAction(_action),
            _pre = this.__parseAction(this.__getProxyEvent(_ele, _event));
        
        for(var _i in _toAdd) {
            _pre[_i] = _toAdd[_i];
        }
        
        this.__setProxyEvent(_ele, _event, this.__stringifyAction(_pre));
    };
    
    _pro.__doWithEvent = function (_e) {
        _e = _e || window.event;
        _e.target = _e.target || _e.srcElement;

        if (!_e.stopPropagation) {
            _e.stopPropagation = function () {
                _e.cancelBubble = true;
            }
        }

        if(!_e.preventDefault){
            _e.preventDefault = function () {
                _e.returnValue = false;
            };
        }
        
        return _e;
    };
    
    //将一个action解析成对象; "a:1,2,3 b:2,3,4" => [{a:['1','2','3']},{b:['2','3','4']}]
    _pro.__parseAction = function (_str) {
        var _result = {};
        
        var _actions = _str.match(/\S+/g);
        
        _u._$forEach(_actions, function (_action) {
            var _arr = _action.split(":");
            var _fn = _arr[0];
            var _args = _arr[1] && _arr[1].split(',') || [];
            
            _result[_fn] = _args;
        });
        
        return _result;
        
    };
    
    _pro.__stringifyAction = function (_action) {
        var _actions = [];
        
        for(var _i in _action) {
            if(_action[_i].length == 0) {
                _actions.push(_i);
            }
            else {
                _actions.push(_i + ":" + _action[_i].join(','));
            }
        }
        
        return _actions.join(" ");
    };

    _pro.___getHandle = function (_type) {
        return function (_e) {
            
            
            var _opts = {
                event: this.__doWithEvent(_e)
            };

            var _attrName = 'data-' + _type
                , _attr;

            var _tmp = _e.target;
            while (this.__isLe(_tmp, this.__body)) {
                _attr = _el._$attr(_tmp, _attrName);
                if (_attr) {
                    _opts.event.current = _tmp;
                    this.__exec(_attr, _opts);
                }

                if (_opts.stop) break;
                _tmp = _tmp.parentNode;
            }

        }._$bind(this);
    };

    _pro.___execOne = function (_fn, _args, _opts) {
        
        _opts.args = _args;
        
        if (_u._$isFunction(this["__" + _fn])) {
            this["__" + _fn].call(this, _opts);
        }
    };
    
    _pro.__destroy = function () {
        this._$dispatchEvent('onbeforedestroy');
        this.__super();
        this.___cache = {};
    };


    _p._$$Ui = _ui._$$Abstract._$getSub(_pro);
    
    /**
     *  生成绑定节点_node的UI类对象。即生成的UI类对象的__body为_node
     */
    _p._$$Ui._$doWithNode = function (_node, _opts) {
        var _klass = _p._$$Ui._$getSub({
            __bd: _node
        });
        
        return _klass._$allocate(_opts);
    };


    return _p;


});
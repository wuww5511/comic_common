define([
    'util/event',
    '../../extend.js',
    'base/element',
    './event.js',
    '../util.js',
    'base/util'
], function (t, extend, e, event, u, util, p) {
    
    var pro = {};
    
    /**
     *  opts {Object}
     *      - body {HTMLElement}
     *      - events {Array|String} 需要代理的事件
     *      - cxt {Object} 实现具体action的对象
     */
    pro.__reset = function (opts) {
        this.__super(opts);
        this.__body = opts.body;
        this.__cxt = opts.cxt || this;
        this.__event = event._$$Event._$allocate();
        this.__initEvent(opts.events);
    };
    
    pro.__getProxyEvent = function (_ele, _event) {
        return e._$attr(_ele, "data-" + _event) || "";
    };
    
    pro.__setProxyEvent = function (_ele, _event, _action) {
        e._$attr(_ele, "data-" + _event, _action);
    };
    
    pro.__addProxyEvent = function (_ele, _event, _action) {
        var _toAdd = this.__parseAction(_action),
            _pre = this.__parseAction(this.__getProxyEvent(_ele, _event));
        
        for(var _i in _toAdd) {
            _pre[_i] = _toAdd[_i];
        }
        
        this.__setProxyEvent(_ele, _event, this.__stringifyAction(_pre));
    };
    
    pro.__initEvent = function (_type) { 

        if (util._$isArray(_type)) {
            util._$forEach(_type, function (_type) {
                this.__initEvent(_type);
            }._$bind(this));
        }
        else {
           this.__event._$addEvent(this.__body, _type, this.__getHandle(_type));
        }    

    };
    
    pro.__getHandle = function (_type) {
        
        return function (_e) {
        
            var _opts = {
                event: this.__doWithEvent(_e)
            };

            var _attrName = 'data-' + _type
                , _attr;

            var _tmp = _e.target;
            while (u._$isLe(_tmp, this.__body)) {
                _attr = e._$attr(_tmp, _attrName);
                if (_attr) {
                    _opts.event.current = _tmp;
                    this.__exec(_attr, _opts);
                }

                if (_opts.stop) break;
                _tmp = _tmp.parentNode;
            }

        }._$bind(this);
    };
    
    pro.__doWithEvent = function (_e) {
        
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
    
    pro.__exec = function (_str, _opts) {
        
        var _actions = this.__parseAction(_str);
        
        for(var _i in _actions) {
            this.__execOne(_i, _actions[_i], _opts);
        }
        
    };
    
    pro.__execOne = function (_fn, _args, _opts) {
        
        _opts.args = _args;
        
        if (util._$isFunction(this.__cxt["__" + _fn])) {
            this.__cxt["__" + _fn].call(this.__cxt, _opts);
        }
    };
    
    //将一个action解析成对象; "a:1,2,3 b:2,3,4" => [{a:['1','2','3']},{b:['2','3','4']}]
    pro.__parseAction = function (_str) {
        var _result = {};
        
        var _actions = _str.match(/\S+/g);
        
        util._$forEach(_actions, function (_action) {
            var _arr = _action.split(":");
            var _fn = _arr[0];
            var _args = _arr[1] && _arr[1].split(',') || [];
            
            _result[_fn] = _args;
        });
        
        return _result;
        
    };
    
    pro.__stringifyAction = function (_action) {
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
    
    pro.__destroy = function () {
        this.__super();
        this.__event._$recycle();
    };
    
    p._$$Proxy = t._$$EventTarget._$getSub(pro);
});
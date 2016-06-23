define([
    '../../extend.js',
    'util/event',
    'base/event'
], function (_extend, _t, _v, _p) {
    var _pro = {};
    
    _pro.__reset = function (_opts) {
        this.__super(_opts);
        this.___events = [];
    };
    
    _pro._$addEvent = function () {
        var _args = arguments;
        _v._$addEvent.apply(_v, _args);
        this.___events.push(_args);
    };
    
    _pro._$removeAllEvent = function () {
        var _events = this.___events;
        for(var _i = 0; _i < _events.length; _i++) {
            _v._$delEvent.apply(_v, _events[_i]);
        }
    };
    
    _pro.__destroy = function () {
        this.__super();
        this._$removeAllEvent();
        delete this.___events;
    };
    
    _p._$$Event = _t._$$EventTarget._$getSub(_pro);
});
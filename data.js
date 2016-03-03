define([
    'util/event'
    
    , './extend.js'
], function (_e, _extend, _p) {
    var _pro = {};

    _pro.__reset = function (_opts) {
        this.__super(_opts);
        this.___data = {};
    };

    _pro.__set = function (_key, _val) {
        this.___data[_key] = _val;
        this.__onSet(_key, _val);
    };

    _pro.__get = function (_key) {
        this.__onGet(_key);
        return this.___data[_key];
    };

    _pro.__onSet = function (_key, _val) {
        //子类实现
    };

    _pro.__onGet = function (_key) {
        //子类实现
    };

    _p._$$Data = _e._$$EventTarget._$getSub(_pro);
})
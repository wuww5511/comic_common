define([
    'base/klass',
    'base/event'
], function (_k, _v, _p) {
    _p._$$Widget = _k._$klass();
    
    var _pro = _p._$$Widget.prototype;
    
    _pro.__init = function (_cxt) {
        this.___func = null;
        this.__cxt = _cxt;
        if(!this.__cxt["_$setPos"]){
            throw new Error("传入的对象必须实现_$setPos方法！！");
        }
    };
    
    _pro._$setPos = function () {
        if(!this.___func){
            this.___func = this.__initEvent();
        }
        this.__setPosAction();
    };
    
    _pro.__initEvent = function () {
        
        var _fn = this.__onResize._$bind(this);
        
        _v._$addEvent(window, 'resize', _fn);
        
        return _fn;
    };
    
    _pro._$destroy = function () {
        _v._$delEvent(window, 'resize', this.___func);
    };
    
    _pro.__onResize = function () {
        this.__setPosAction();
    };
    
    _pro.__setPosAction = function () {
        this.__cxt._$setPos();
    };
});
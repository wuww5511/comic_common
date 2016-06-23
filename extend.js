/**
 *NEJ扩展
 */
define([
    'base/klass',
    'base/util'
], function (_k, _u, _p, _o, _f) {
    //类的继承
    Function.prototype._$getSub = function (_opts) {
        
        var _$$Sub = _k._$klass(),
            _pro = _$$Sub._$extend(this);
        
        _u._$merge(_pro, _opts);
        
        if(!_u._$isFunction(this.prototype.__init)) this.prototype.__init = _f;
        
        return _$$Sub;
    };
    
    //实现接口
    Function.prototype._$implement = function (_$$Interface) {
        var _pro = this.prototype,
            _toAdd = _$$Interface.prototype;
        
        for(var _i in _toAdd) {
            if(!_pro[_i])
                _pro[_i] = _toAdd[_i];
        }
    };
})
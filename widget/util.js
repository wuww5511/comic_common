define([], function (p) {
    
    p._$isChildOf = function (_target, _parent) {
        var _tmp = _target.parentNode;
        while (_tmp) {
            if (_tmp === _parent)
                return true;
            _tmp = _tmp.parentNode;
        }
        return false;
    };
    
    p._$isLe = function (_target, _parent) {
        if (_target === _parent)
            return true;
        return this._$isChildOf(_target, _parent);
    };
    
    /**
     *  使函数只执行一次
     *  @param {Function}
     *  @return {Function}
     */
    p._$once = function (fn) {
        var isDone = false;
        
        var res = function () {
            if(isDone) return;
            fn.apply(this, arguments);
            isDone = true;
        };
        
        return res;
    };
});
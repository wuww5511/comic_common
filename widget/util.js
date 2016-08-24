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
});
define([
    '../ui.js'
], function (_ui, _p) {
    
    var _pro = {};
      
    _pro.__close = function () {
        setTimeout(function () {
            this._$recycle();
        }._$bind(this));
        this._$dispatchEvent('onbeforeclose');
    };
    
    _p._$$Alert = _ui._$$Ui._$getSub(_pro);
});
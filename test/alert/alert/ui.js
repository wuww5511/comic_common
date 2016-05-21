define([
    'pro/ui',
    'text!./view.html'
], function (_ui, _html, _p) {
    var _pro = {};
    
    _pro.__html = _html;
    
    _p._$$Ui = _ui._$$Ui._$getSub(_pro);
})
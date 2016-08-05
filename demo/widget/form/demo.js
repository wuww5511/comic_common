define([
    'pro/ui',
    'pro/widget/form'
], function (_ui, _form, _p) {
    
    var _pro = {};
    
    _pro.__reset = function (_opts) {
        this.__super(_opts);
        this.__initEvent();
        this.__form = _form._$$Form._$doWithNode(
            this.__el('form')
        );
    };
    
    _pro.__onValidate = function (_opts) {
        var _res = this.__form._$validate();
        
        alert(JSON.stringify(_res));
        
    };
    
    _p._$$Ui = _ui._$$Ui._$getSub(_pro);
    
    _p._$$Ui._$doWithNode(document.body);
})
define([
    'pro/ui',
    'pro/widget/util'
], function (_ui, _u, _p) {
    
    var _pro = {};
    
    _pro.__reset = function (_opts) {
        this.__super(_opts);
        
        function alert () {
            console.log('alert');
        }
        
        setInterval(_u._$interval(alert, 2000), 10);
    };
    
    _p._$$Ui = _ui._$$Ui._$getSub(_pro);
    
    _p._$$Ui._$doWithNode(document.body);
})
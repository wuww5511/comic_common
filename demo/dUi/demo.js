define([
    '../../dUi.js',
    'text!./view.html'
], function (_ui, _html, _p) {
    var _pro = {};
    
   _pro.__jst = _html;
    
    _pro.__data = {
        value: "test1"
    };
    
    _pro.__bd = document.getElementById('container');
    
    _pro.__extends = {
        calcu: function (_value) {
            return _value + "calculated!!!";
        }
    };
    
    _pro.__repaint = function () {
        this.__super();
    };
    
    _pro.__a = function (_opts) {
        console.log(_opts.event.currentTarget.className);
    };
    
    var _$$Demo = _ui._$$Ui._$getSub(_pro);
    
    window.test = _$$Demo._$allocate({
        
        clazz: "body"
    })
})
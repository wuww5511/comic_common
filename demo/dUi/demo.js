define([
    '../../dUi.js',
    'text!./view.html'
], function (_ui, _html, _p) {
    var _pro = {};
    
   _pro.__jst = _html;
    
    _pro.__data = {
        value: "test1",
        a: 'a',
        b: 'b'
    };
    
    _pro.__bd = document.getElementById('container');
    
    _pro.__exts = {
        calcu: function (_value) {
            return _value + "calculated!!!";
        }
    };
    
    _pro.__repaint = function () {
        this.__super();
        this.__bindEvent();
        console.log('repaint')
    };
    
    _pro.__a = function (_opts) {
        this._$recycle();
    };
    
    var _$$Demo = _p._$$Ui = _ui._$$Ui._$getSub(_pro);
    
    window.test = _$$Demo._$allocate();
    
})
define([
    '../../ui.js',
    'text!./view.html',
    'text!./main.css'
], function (_ui, _html, _css, _p) {

    var _pro = {};
    
    //ui模块控制的dom已存在时
    _pro.__bd = document.querySelector('#test');
    
    _pro.__reset = function (_opts) {
        this.__super(_opts);
        this.__initEvent(['click', 'mouseover']);
    }
    
    _pro.__alert = function () {
        alert('lalla');
    };
    
    _pro.__log = function () {
        console.log('lalal');
    };
    
    var _$$UiTest = _ui._$$Ui._$getSub(_pro);
    
    _$$UiTest._$allocate();
    
})
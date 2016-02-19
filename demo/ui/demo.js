define([
    '../../ui.js',
    'text!./view.html',
    'text!./main.css'
], function (_ui, _html, _css, _p) {
    var _pro = {};
    
    //ui模块控制的DOM动态生成
    _pro.__html = _html;
    
    _pro.__css = _css;
    
    _pro.__reset = function (_opts) {
        this.__super(_opts);
        this.__initEvent(['click','mouseover']);
    };
    
    _pro.__a1 = function () {
        console.log('a1');
    };
    
    _pro.__a2 = function () {
        var _btn = this.__el('btn');
        _btn.parentNode.removeChild(_btn);
    };
    
    var _$$UiTest = _ui._$$Ui._$getSub(_pro);
    
    _$$UiTest._$allocate({
        parent:'container'
    });
})
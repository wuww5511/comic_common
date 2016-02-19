define([
    '../../ui.js',
    'text!./view.html',
    'text!./main.css'
], function (_ui, _html, _css, _p) {
    var _pro = {};
    
    //设置html
    _pro.__html = _html;
    
    //设置css
    _pro.__css = _css;
    
    _pro.__reset = function (_opts) {
        this.__super(_opts);
        //设置需要代理的事件
        this.__initEvent(['click','mouseover']);
    };
    
    //操作1，在html中设置执行
    _pro.__a1 = function () {
        console.log('a1');
    };
    
    //操作2，在html中设置执行
    _pro.__a2 = function () {
        var _btn = this.__el('btn');
        _btn.parentNode.removeChild(_btn);
    };
    
    //生成子类
    var _$$UiTest = _ui._$$Ui._$getSub(_pro);
    
    //实例化
    _$$UiTest._$allocate({
        parent:'container'
    });
    
    var _pro2 = {};
    
    _pro2.__bd = document.querySelector('#test');
    
    _pro2.__reset = function (_opts) {
        this.__super(_opts);
        this.__initEvent('click');
    }
    
    _pro2.__alert = function () {
        alert('lalla');
    };
    
    var _$$UiTest2 = _ui._$$Ui._$getSub(_pro2);
    
    _$$UiTest2._$allocate();
    
})
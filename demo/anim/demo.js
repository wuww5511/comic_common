define([
    '../../ui.js',
    '../../anim/animList.js'
], function (_ui, _al, _p) {
    
    var _pro = {};
    
    _pro.__reset = function (_opts) {
        this.__super(_opts);
        var _a = _al._$$AnimList._$allocate({
            ifinite: true,
            list: [
                ['easeout', 1000, {top: 0, left: 0}, {top:  100, left: 100}],
                ['easein', 3000, {top: 100, left: 100}, {top: 400,left: 200}],
                ['easeout', 1000, {top: 400, left: 200}, {top: 100,left: 400}],
                ['easeout', 2000, {top: 100, left: 400}, {top: 0, left: 0}]
            ],
            onstep: function (_data, _index) {
                this.__el('box').style.top = _data.top + "px";
                this.__el('box').style.left = _data.left + "px";
                this.__el('box').innerHTML = _index;
            }._$bind(this),
            onstop: function () {
                console.log('动画结束了!');
            },
            onstepend: function (_index) {
                console.log('动画' + _index + "结束了!");
            }
        });
        _a._$play();
        
        setTimeout(function () {
            _a._$stop();
        }, 10000)
    };
    
    _p._$$Ui = _ui._$$Ui._$getSub(_pro);
    
    _p._$$Ui._$doWithNode(document.body);
})
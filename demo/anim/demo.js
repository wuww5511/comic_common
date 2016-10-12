define([
    '../../ui.js',
    '../../anim/animList.js',
    '../../anim/animParallel.js'
], function (_ui, _al, ap, _p) {
    
    var _pro = {};
    
    _pro.__reset = function (_opts) {
        this.__super(_opts);
        var _a1 = _al._$$AnimList._$allocate({
            //ifinite: true,
            list: [
                ['easeout', 1000, {top: 0, left: 0}, {top:  100, left: 100}],
                ['easein', 3000, {top: 100, left: 100}, {top: 400,left: 200}],
                ['easeout', 1000, {top: 400, left: 200}, {top: 100,left: 400}],
                ['easeout', 2000, {top: 100, left: 400}, {top: 0, left: 0}]
            ],
            onstep: function (_data, _index) {
                this.__el('box').style.top = _data.top + "px";
                this.__el('box').style.left = _data.left + "px";
            }._$bind(this),
            onstop: function () {
                //console.log('动画结束了!');
            },
            onstepend: function (_index) {
                //console.log('动画' + _index + "结束了!");
            }
        });
        
        var a2 = _al._$$AnimList._$allocate({
            //ifinite: true,
            list: [
                ['easein', 5000, {index: 0}, {index: 1000}]
            ],
            onstep: function (data, index) {
                this.__el('box').innerHTML = data.index;
            }._$bind(this)
        });
        
        _a1._$play();
        
        setTimeout(function () {
            _a1._$play();
        }, 1000);
        
        
        /*var api = ap._$$Anim._$allocate({
            anims: [_a1, a2]
        });
        
        api._$play(function () {
            console.log('end');
        });*/
        
    };
    
    _p._$$Ui = _ui._$$Ui._$getSub(_pro);
    
    _p._$$Ui._$doWithNode(document.body);
})
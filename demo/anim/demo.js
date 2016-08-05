define([
    '../../ui.js',
    '../../anim/animList.js'
], function (_ui, _al, _p) {
    
    var _pro = {};
    
    _pro.__reset = function (_opts) {
        this.__super(_opts);
        _al._$$AnimList._$allocate({
            ifinite: true,
            list: [
                ['easeout', 1000, {top: 0, left: 0}, {top:  100, left: 100}],
                ['easein', 3000, {top: 100, left: 100}, {top: 400,left: 200}],
                ['easeout', 1000, {top: 400, left: 200}, {top: 100,left: 400}],
                ['easeout', 2000, {top: 100, left: 400}, {top: 0, left: 0}]
            ],
            onstep: function (_data) {
                this.__el('box').style.top = _data.top + "px";
                this.__el('box').style.left = _data.left + "px";
            }._$bind(this)
        })._$play();
    };
    
    _p._$$Ui = _ui._$$Ui._$getSub(_pro);
    
    _p._$$Ui._$doWithNode(document.body);
})
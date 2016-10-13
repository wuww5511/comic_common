define([
    '../../ui.js',
    '../../anim/anim.js',
    'util/animation/easein'
], function (ui, anim, easein, p) {
    
    var pro = {};
    
    pro.__reset = function (opts) {
        this.__super(opts);
        this.__anim = anim._$$Anim._$allocate({
            list: [
                ['easein', 1000, {index: 0}, {index: 100}],
                ['easein', 1000, {index: 200}, {index: 300}],
                ['easein', 1000, {index: 400}, {index: 500}],
                ['easein', 1000, {index: 600}, {index: 700}]
            ],
            onstep: function (data) {
                this.__el('box').innerHTML = data.index;
            }._$bind(this)
        });
        
        this.__anim._$play(function () {
            console.log('out');
        });
        this.__anim._$play(function () {
            console.log('out2');
        });
        /*this.__anim._$stop();
        this.__anim._$stop();*/
        
    };
    
    p._$$Ui = ui._$$Ui._$getSub(pro);
    
    p._$$Ui._$doWithNode(document.body);
});
define([
    '../../ui.js',
    '../../anim/anim.js',
    '../../anim/animParallel.js',
    '../../anim/animSerial.js'
], function (ui, anim, ap, as, p) {
    
    var pro = {};
    
    pro.__reset = function (opts) {
        this.__super(opts);
        var a1 = anim._$$Anim._$allocate({
            list: [
                ['easein', 2000, {index: 0}, {index: 100}],
            ],
            onstep: function (data) {
                this.__el('box').innerHTML = data.index;
            }._$bind(this)
        });
        
        var a2 = anim._$$Anim._$allocate({
            list: [
                ['easein', 1000, {index: 100}, {index: 200}],
            ],
            onstep: function (data) {
                this.__el('box1').innerHTML = data.index;
            }._$bind(this)
        });
        
        var a3 = anim._$$Anim._$allocate({
            list: [
                ['easein', 1000, {index: 300}, {index: 400}],
            ],
            onstep: function (data) {
                this.__el('box2').innerHTML = data.index;
            }._$bind(this)
        });
        
        var a4 = ap._$$Anim._$allocate({
            anims: [a1, a2]
        });
        
        var a5 = as._$$Anim._$allocate({
            anims: [a4, a3]
        });
        
        a5._$play(function () {
            console.log('end');
        });
        
        a5._$stop();
        
        a5._$play();
        
        /*a4._$play(function () {
            console.log('end');
        });
        a4._$stop();*/
    };
    
    p._$$Ui = ui._$$Ui._$getSub(pro);
    
    p._$$Ui._$doWithNode(document.body);
});
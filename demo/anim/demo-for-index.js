define([
    '../../ui.js',
    '../../anim/index.js',
    'util/animation/easein'
], function (ui, anim, easein, p) {
    
    var pro = {};
    
    pro.__reset = function (opts) {
        this.__super(opts);
        this.__el('box').style.transformOrigin = "top left";
        var a1 = anim._$anim(this.__el('box'), [{
            from: {
                opacity: 0,
                translateX: 0,
                scale: 0
            },
            to: {
                opacity: 1,
                translateX: 200,
                scale: 2
            }
        }, {
            to: {
                opacity: 0.5,
                translateX: 300,
                scale: 1
            }
        }]);
        
        var a2 = anim._$anim([this.__el('box1'), this.__el('box2')], [{
            from: {
                opacity: 0,
                translateX: 0,
                scale: 0
            },
            to: {
                opacity: 1,
                translateX: 200,
                scale: 2
            }
        }, {
            to: {
                opacity: 0.5,
                translateX: 300,
                scale: 1,
                function: "easeout"
            }
        }]);
        
       a1._$multiply(a2)._$play();
        
    };
    
    p._$$Ui = ui._$$Ui._$getSub(pro);
    
    p._$$Ui._$doWithNode(document.body);
});
define([
    'util/event',
    'base/klass',
    '../extend.js',
    './animAbstract.js',
    '../widget/util.js'
], function (u, k, ext, anim, util, p) {
    p._$$Anim = k._$klass();
    
    var pro = p._$$Anim._$extend(anim._$$Anim);
    
    /**
     *  将若干个动画合成一个并发执行的新动画
     *  @param {Object}
     *      -   anims {Array|"./animAbstract.js"._$$Anim} 需要组装在一起的动画
     */
    pro.__reset = function (opts) {
        this.__super(opts);
        this.__anims = opts.anims;
        this.__total = this.__anims.length;
        this.__ended = 0;
        
        this.__initAnims();
    };
    
    pro.__doPlay = function () {
        util._$each(this.__anims, "_$play");
    };
    
    pro.__doStop = function () {
        util._$each(this.__anims, "_$stop");
    };
    
    pro.__doEnd = function () {
        this.__super();
        this.__ended = 0;
    };
    
    pro.__onOneEnd = function () {
        this.__ended++;
        if(this.__ended >= this.__total)
            this.__onExecutedEnd();
    };
    
    pro.__initAnims = function () {
        util._$each(this.__anims, "_$addEvent", 'onstop', this.__onOneEnd._$bind(this));
    };
    
    pro.__destroy = function () {
        this.__super();
        
        for(var i = 0; i < this.__anims.length; i++)
            this.__anims._$recycle();
        
        delete this.__anims;
        delete this.__total;
        delete this.__ended;
    };
});
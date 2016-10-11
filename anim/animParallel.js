define([
    'util/event',
    'base/klass',
    '../extend.js',
    './animAbstract.js',
    '../widget/util.js'
], function (u, k, ext, anim, util, p) {
    p._$$Anim = k._$klass();
    
    var pro = p._$$Anim._$extend(u._$$EventTarget);
    
    p._$$Anim._$implement(anim._$$Anim);
    
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
        this.__cbEnd = null;
        
        this.__initAnims();
    };
    
    /**
     *  @param {Function} 动画执行完成时执行的函数(可选)
     */
    pro._$play = function (cb) {

        this.__cbEnd = cb;
        
        util._$each(this.__anims, "_$play");
    };
    
    pro._$stop = function () {
        util._$each(this.__anims, "_$stop");
    };
        
    pro.__onOneEnd = function () {
        this.__ended++;
        if(this.__ended >= this.__total)
            this.__onEnd();
    };
    
    pro.__onEnd = function () {
        this.__cbEnd && this.__cbEnd();
        this._$dispatchEvent('onstop');
    };
    
    pro.__initAnims = function () {
        util._$each(this.__anims, "_$addEvent", 'onstop', this.__onOneEnd._$bind(this));
    };
});
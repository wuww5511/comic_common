define([
    './animAbstract.js'
], function (anim, p) {
    
    var pro = {};
    
    /**
     *  @param {Object}
     *      -   anims {Array|"./animAbstract.js"._$$Anim}
     */
    pro.__reset = function (opts) {
        this.__super(opts);
        this.__anims = opts.anims;
        this.__now = -1;
    };
    
    pro.__doStop = function () {
        this.__now = -1;
        for(var i = 0; i < this.__anims.length; i++) {
            this.__anims[i]._$clearEvent('onstop');
            this.__anims[i]._$stop();
        }
            
        
    };
    
    pro.__doPlay = function () {
        for(var i = 0; i < this.__anims.length; i++) {
            this.__anims[i]._$addEvent('onstop', this.__onOneEnd._$bind(this));
        }
        this.__playNext();
    };
    
    pro.__playNext = function () {
        this.__now++;
        if(this.__anims[this.__now]) {
            this.__anims[this.__now]._$play();
        }
        else {
            this.__onExecutedEnd();
        }
    };
    
    pro.__doEnd = function () {
        this.__super();
        this.__now = -1;
    };
    
    pro.__onExecutedEnd = function () {
        this.__super();
        for(var i = 0; i < this.__anims.length; i++) {
            this.__anims[i]._$clearEvent('onstop');
        }
    };
    
    pro.__onOneEnd = function () {
        this.__playNext();
    };
    
    pro.__destroy = function () {
        this.__super();
        delete this.__anims;
        delete this.__now;
    };
    
    p._$$Anim = anim._$$Anim._$getSub(pro);
});
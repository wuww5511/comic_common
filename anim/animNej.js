define([
    './animAbstract.js',
    'util/animation/easein',
    'util/animation/easeout',
    'util/animation/linear'
], function (anim, easein, easeout, linear, p) {
   
    var pro = {};
    
    var klassMap = {
        "easein": easein._$$AnimEaseIn,
        "easeout": easeout._$$AnimEaseOut,
        "linear": linear._$$AnimLinear
    };
    
    /**
     *  @param {Object} 
     *      -   data {Array} 形如['easein', 1000, {}， {}]的数据
     */
    pro.__reset = function (opts) {
        this.__super(opts);
        this.__klass = klassMap[opts.data[0]];
        this.__during = opts.data[1];
        this.__from = opts.data[2];
        this.__to = opts.data[3];
        this.__anim = this.__getAnim();
        
    };
    
    pro.__doPlay = function () {
        this.__anim._$play();
    };
    
    pro.__doStop = function () {
        this.__anim.__destroy();
        this.__anim = this.__getAnim();
        this.__doStep(this.__to);
    };
    
    pro.__doStep = function (data) {
        this._$dispatchEvent('onstep', data);
    };
    
    pro.__onAnimStop = function () {
        this.__onExecutedEnd();
    };
    
    pro.__onStep = function (from, to, event) {
        var percent = event.offset / 100;
        var data = {};
        
        for(var i in from) {
            data[i] = (to[i] - from[i]) * percent + from[i];
        }
        
        this.__doStep(data);
    };
     
    pro.__getAnim = function () {
        return this.__klass._$allocate({
            from: {
                offset: 0
            },
            to: {
                offset: 100
            },
            duration: this.__during,
            onupdate: this.__onStep._$bind(this, this.__from, this.__to),
            onstop: this.__onAnimStop._$bind(this)
        });
    };
    
    pro.__destroy = function () {
        this.__super();
        this.__anim._$recycle();
        delete this.__klass;
        delete this.__during;
        delete this.__from;
        delete this.__to;
    };
    
    p._$$Anim = anim._$$Anim._$getSub(pro);
});
define([
    './animSerial.js',
    './animNej.js'
], function (anim, anim2, p) {
    
    var pro = {};
    
    /**
     *  _opts {Object}
     *      - list {Array|Array}动画配置参数数组
     *          [
     *                [
     *                  'easein', //动画类标识
                        1000, //持续时间(ms)
                        {
                            
                        }, // from
                        {
                        
                        } // to
                    ]
                    
                ]
     *
     */
    pro.__reset = function (opts) {
        opts.anims = this.__genAnims(opts.list);
        this.__super(opts);
    };
    
    pro.__genAnims = function (list) {
        var res = [];
        for(var i = 0; i < list.length; i++)
            res.push(this.__genAnim(list[i], i));
        
        return res;
    };
    
    pro.__genAnim = function (arr, i) {
        return anim2._$$Anim._$allocate({
            data: arr,
            onstep: this.__stepAction._$bind(this, i)
        });
    };
    
    pro.__stepAction = function (index, data) {
        this._$dispatchEvent('onstep', data, index);
    };
    
    p._$$Anim = anim._$$Anim._$getSub(pro);
})
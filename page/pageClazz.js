define([
    './page.js',
    'base/element'
], function (page, ele, p) {
    
    var pro = {};
    
    pro.__reset = function (opts) {
        this.__super(opts);
        this.__animClazz = "";
    };
    
    pro.__doPageOut = function (next, opts) {
        var clazz = "";
        if(opts.next > opts.pre)
            clazz = "cpage-toStart";
        else
            clazz = "cpage-toEnd"
           
        this.__addAnimation(clazz);
        
        next();
    };
    
    pro.__doPageIn = function (opts) {
        
        if(opts.pre == null) return;
        
        var clazz = "";
        
        if(opts.next > opts.pre)
            clazz = "cpage-fromEnd"
        else
            clazz = "cpage-fromStart"
           
        this.__addAnimation(clazz);
        
    };
    
    pro.__addAnimation = function (clazz) {
        ele._$delClassName(this.__body, this.__animClazz);
        ele._$addClassName(this.__body, clazz);
        this.__animClazz = clazz;
    };
    
    p._$$Page = page._$$Page._$getSub(pro);
});
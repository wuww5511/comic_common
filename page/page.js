define([
    "base/klass", "../ui.js"
], function (k, ui, p) {
    
    p._$$Page = k._$klass();
    
    var pro = p._$$Page._$extend(ui._$$Ui);
    
    /**
     *  @param {Object}
     *      -   manager {Object} "./pageManager.js"._$$pageManager的实例
     *
     */
    pro.__reset = function (opts) {
        this.__super(opts);
        
        this.__manager = opts.manager;
    };
    
    pro._$preload = function (opts) {
        this.__doPreload(opts);
    };
    
    pro._$pageIn = function (opts) {
        this.__doPageIn(opts);
        this.__manager._$dispatchEvent('onPageIn', opts);
    };                                             
    

    pro._$pageOut = function (opts) {
        this.__doPageOut(this.___toNextPage._$bind(this, opts), opts);
    };                                             
    
    pro._$next = function () {
        this.__manager._$next();
    };
    
    pro._$pre = function () {
        this.__manager._$pre();
    };

    pro.__doPageOut = function (next, opts) {
        next();
    };                                             
    

    pro.__doPageIn = function (opts) {
        
    };
    
    pro.__doPreload = function (opts) {
        
    };
    
    pro.___toNextPage = function (opts) {
        this.__manager._$dispatchEvent('onPrepageOut', opts);
    };
    
                                                 
    
});
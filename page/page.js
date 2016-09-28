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
    
    

    pro._$onPageIn = function (opts) {
        this.__doPageIn();
        this.__manager._$dispatchEvent('onPageIn', opts);
    };                                             
    

    pro._$onPageOut = function (opts) {
        this.__doPageOut(this.__toNextPage._$bind(this, opts));
    };                                             
    

    pro.__doPageOut = function (next) {
        next();
    };                                             
    

    pro.__doPageIn = function () {
        
    };
    
    pro.__toNextPage = function (opts) {
        this.__manager._$dispatchEvent('onPrepageOut', opts);
        this._$recycle();
    };
                                                 
    
});
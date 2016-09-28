define([
    "base/klass", "../ui.js"
], function (k, ui, p) {
    

    p._$$Pager = k._$klass();
    
    var pro = p._$$Pager._$extend(ui._$$Ui);
    
    /**
     *  @param {Object}
     *      -   manager {Object} "./pageManager.js"._$$PageManager的实例
     */
    pro.__reset = function (opts) {
        this.__super(opts);
        
        this.__manager = opts.manager;
    };
    
    

    pro._$setPageIndex = function (index) {
        this.__doSetPageIndex(index);
    };
    
    pro.__turnTo = function (index) {
        this.__manager._$turnTo(index);
    };
    
    pro.__doSetPageIndex = function (index) {
        
    };
                                                 
    
});
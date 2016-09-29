define([
    "base/klass", "util/event", "base/util"
], function (k, u, util, p) {
    

    p._$$PageManager = k._$klass();
    
    var pro = p._$$PageManager._$extend(u._$$EventTarget);
    
    /**
     *  @param {Object}
     *      -   pages {Array|Klass} Klass 为 "./page.js"._$$Page子类
     *      -   pager 
     *              -   klass   {Object} "./pager.js"._$$Pager子类
     *              -   ... 其他项作为Pager类实例化时的参数
     *
     *      -   box {HTMLElement} 页面的父元素
     *
     */
    pro.__reset = function (opts) {
        this.__super(opts);
        
        this.__pbox = opts.box;
        
        //当前页序号
        this.__pageIndex = null;
        
        this.__isSwitching = false;
        
        if(opts.pager) {
            var popts = util._$merge({}, opts.pager);
            var pklass = popts.klass;
            delete popts.klass;
            
            popts.manager = this;
            
            this.__pager = pklass._$allocate(popts);
        }
        else
            this.__pager = null;
        
        /*
         *管理的所有页面类
         */
        this.__pages = opts.pages;
        
        //已经实例化的页面对象
        this.__pageIns = {};
        
       
        this._$addEvent('onPrepageOut', this.__onPrepageOut._$bind(this));
        this._$addEvent('onPageIn', this.__onPageIn._$bind(this));
    };
    
    

    pro._$turnTo = function (index) {
        
        if(index < 0 || index >= this.__pages.length)
            return;
        
        if(this.__isSwitching) return;
        
        var opts = {
            pre: this.__pageIndex,
            next: index
        };
        
        this.__makePagePreload(index, opts);
        
        if(this.__pageIndex !== null) {
            this.__isSwitching = true;
            this.__pageIns[this.__pageIndex]._$pageOut(opts);
        }
        else{
            
            this.__makePageIn(index, opts);
        }
    };                                             
    

    pro._$next = function () {
        this._$turnTo(this.__pageIndex + 1);
    };                                             
    

    pro._$pre = function () {
        this._$turnTo(this.__pageIndex - 1);
    };  
    
    pro.__onPrepageOut = function (opts) {
        this.__makePageIn(opts.next, opts);
        this.__isSwitching = false;
    };
    
    pro.__onPageIn = function (opts) {
        this.__pager && this.__pager._$setPageIndex(opts.next);
    };
    
    pro.__makePageIn = function (index, opts) {
       
        var page = this.__pageIns[index];
            
        page._$pageIn(opts);
        
        this.__pageIndex = index;
    };
    
    pro.__makePagePreload = function (index, opts) {
        
        var page = this.__pageIns[index];
        
        if(!page) {
            page = this.__pages[index]._$allocate({
                manager: this,
                parent: this.__pbox
            });
            
            this.__pageIns[index] = page;
        }
            
        page._$preload(opts);
        
    };
    
                                                 
    
});
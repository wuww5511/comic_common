define([
    '../../ui.js',
    '../../page/pageManager.js',
    './page1.js',
    './pager.js',
    './page2.js'
], function (ui, pm, page1, pager, page2, p) {
    
    var pro = {};
    
    pro.__reset = function (opts) {
        this.__super(opts);
        
        this.__initEvent();
        
        this.__pmi = pm._$$PageManager._$allocate({
            box: this.__el('box'),
            pager: {
                klass: pager._$$Pager,
                parent: this.__el("pager")
            },
            pages: [page1._$$Page, page2._$$Page, page1._$$Page, page2._$$Page, page1._$$Page]
        });
        
        this.__pmi._$turnTo(0);
    };
    
    pro.__onNext = function (opts) {
        this.__pmi._$next();
    };
    
    pro.__onPre = function (opts) {
        this.__pmi._$pre();
    };
    
    p._$$Ui = ui._$$Ui._$getSub(pro);
    
    p._$$Ui._$doWithNode(document.body);
});
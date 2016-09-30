define([
    '../../page/pager.js',
    'text!./pager.html'
], function (pager, pagerHtml, p) {
    
    var pro = {};
    
    pro.__html = pagerHtml;
    
    pro.__reset = function (opts) {
        this.__super(opts);
        this.__el('total').innerHTML = opts.total;
    };
    
    pro.__doSetPageIndex = function (index) {
        this.__el('num').innerHTML = index + 1;
    };
    
    p._$$Pager = pager._$$Pager._$getSub(pro);
})
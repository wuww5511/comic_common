define([
    '../../page/pager.js',
    'text!./pager.html'
], function (pager, pagerHtml, p) {
    
    var pro = {};
    
    pro.__html = pagerHtml;
    
    pro.__doSetPageIndex = function (index) {
        this.__el('num').innerHTML = index;
    };
    
    p._$$Pager = pager._$$Pager._$getSub(pro);
})
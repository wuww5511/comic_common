define([
    '../../page/pager.js'
], function (pager, p) {
    
    var pro = {};
    
    pro.__doSetPageIndex = function (index) {
        this.__body.innerHTML = index;
    };
    
    p._$$Pager = pager._$$Pager._$getSub(pro);
})
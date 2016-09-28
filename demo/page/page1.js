define([
    '../../page/page.js',
    'text!./page1.html'
], function (page, pageHtml, p) {
    
    var pro = {};
    
    pro.__html = pageHtml;
    
    pro.__reset = function (opts) {
        this.__super(opts);
    };
    
    pro.__doPageOut = function (next) {
        console.log('page1 out');
        next();
    };
    
    pro.__doPageIn = function () {
        console.log('page1 in');
    };
    
    p._$$Page = page._$$Page._$getSub(pro);
    
});
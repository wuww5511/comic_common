define([
    '../../page/page.js',
    'text!./page1.html'
], function (page, pageHtml, p) {
    
    var pro = {};
    
    pro.__html = pageHtml;
    
    pro.__reset = function (opts) {
        this.__super(opts);
    };
    
    pro.__doPageOut = function (next, opts) {
        console.log('page1 out: %s to %s', opts.pre, opts.next);
        this.__body.style.display = "none";
        next();
    };
    
    pro.__doPageIn = function () {
        console.log('page1 in');
        this.__body.style.display = "block";
        this.__body.parentNode.appendChild(this.__body);
    };
    
    p._$$Page = page._$$Page._$getSub(pro);
    
});
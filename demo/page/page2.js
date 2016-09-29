define([
    '../../page/page.js',
    'text!./page2.html'
], function (page, pageHtml, p) {
    
    var pro = {};
    
    pro.__html = pageHtml;
    
    pro.__reset = function (opts) {
        this.__super(opts);
        this.__num = 0;
        this.__el('content').innerHTML = "page2";
    };
    
    pro.__doPageOut = function (next) {
        console.log('page2 out');

        var handle = setInterval(function () {
            this.__do();
        }._$bind(this), 50);
        
        this.__do();
        
        setTimeout(function () {
            clearInterval(handle);
            next();
        }._$bind(this), 3000);
        
        
    };
    
    pro.__do = function () {
        this.__el('content').innerHTML = this.__num++;
    };
    
    pro.__doPageIn = function () {
        console.log('page2 in');
    };
    
    p._$$Page = page._$$Page._$getSub(pro);
    
});
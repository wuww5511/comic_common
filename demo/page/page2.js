define([
    '../../page/pageClazz.js',
    'text!./page2.html'
], function (page, pageHtml, p) {
    
    var pro = {};
    
    pro.__html = pageHtml;
       
    p._$$Page = page._$$Page._$getSub(pro);
    
});
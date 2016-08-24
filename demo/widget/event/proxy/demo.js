define([
    'pro/widget/event/proxy'
], function (proxy, p) {
    
    var pi = proxy._$$Proxy._$allocate({
        body: document.querySelector('#container'),
        cxt: p,
        events: ['click']
    });
    
    p.__a1 = function (opts) {
        alert('a1');
    };
    
    p.__a2 = function (opts) {
        alert('a2');
    };
    
    p.__a3 = function (opts) {
        opts.stop = true;
        alert('a3');
    };
})
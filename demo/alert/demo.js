define([
    '../../alert/alert.js'
], function (_alert, _p) {
    
    var _pro = {};
    
    _pro.__inner = "<div>asdfasdf</div>";
    
    _pro._$setPos = function () {
        this.__super();
        console.log("lalala");
    };
    
    var _$$Demo = _alert._$$Alert._$getSub(_pro);
    
    window.demo = _$$Demo._$allocate();
});
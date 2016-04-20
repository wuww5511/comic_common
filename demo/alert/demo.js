define([
    '../../alert/alert.js',
    '../dUi/demo.js'
], function (_alert, _dui, _p) {
    
    var _pro = {};
    
    _pro.__inner = _dui._$$Ui;
    
    _pro._$setPos = function () {
        this.__super();
        console.log("lalala");
    };
    
    var _$$Demo = _alert._$$Alert._$getSub(_pro);
    
    window.demo = _$$Demo._$allocate();
});
define([
    'pro/widget/event/event',
    'base/event',
    'pro/widget/util'
], function (_event, _v, _util, _p) {
    
    chai.should();
    
    var value = 0;
    
    function plus (arg1, arg2) {
        value = value + arg1 + arg2;
    };
    
    function minus (arg1) {
        value = value - arg1;
    }
    
    describe("测试", function () {
       it("_$once", function () {
           var tmpPlus = _util._$once(plus);
           var tmpMinus = _util._$once(minus);
           
           tmpPlus(1, 2);
           tmpPlus(3, 4);
           tmpPlus(5, 6);
           
           value.should.equal(3);
           
           tmpMinus(2, 3);
           tmpMinus(3, 5);
           tmpMinus(1, 7);
           
           value.should.equal(1);
           
       }); 
    });
    
    mocha.run();
});
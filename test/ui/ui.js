define([
    '../../ui.js'
], function (_ui) {
    
    describe('私有函数测试', function () {
        
        var pro;
        
        beforeEach(function () {
            _pro = {};
        });
    
        it('操作拆分', function () {
            
            var _res = [];
            
            _pro.___execOne = function (_str) {
                _res.push(_str);
            };
            
            var _ins = _ui._$$Ui._$getSub(_pro)._$allocate();
            
            _ins.__exec("    a:q,b,e   b|b|s|d   c:a,s  d:s,f e s|d s f   fsfd    ");
            
            expect(_res).toEqual([
                "a:q,b,e",
                "b|b|s|d",
                "c:a,s",
                "d:s,f",
                "e",
                "s|d",
                "s",
                "f",
                "fsfd"
            ]);
        });
        
        
    });
});
define([
    'pro/widget/event/event',
    'base/event'
], function (_event, _v, _p) {
    
    chai.should();
    
    describe("测试事件绑定和注销", function () {
        
        var _eventManager,
            _result,
            _test = 0;
        
        function _onClick () {
            _result++;
        }
        
        beforeEach(function () {
            _eventManager = _event._$$Event._$allocate();
            _result = 0;
            
        });
        
        it("测试:1", function () {
            _result.should.equal(0);
            _eventManager._$addEvent('test', 'click', _onClick._$bind(this));
            _v._$dispatchEvent('test', 'click');
            _result.should.equal(1);
            
            _eventManager._$addEvent('test', 'click', _onClick._$bind(this));
            _v._$dispatchEvent('test', 'click');
            _result.should.equal(3);
            
            _eventManager._$recycle();
            
            _v._$dispatchEvent('test', 'click');
            
            _v._$dispatchEvent('test', 'click');
            _result.should.equal(3);
        });
        
        it("测试:2", function () {
            _result.should.equal(0);
            _eventManager._$addEvent('test', 'click', _onClick._$bind(this));
            _v._$dispatchEvent('test', 'click');
            _result.should.equal(1);
            
            _eventManager._$addEvent('test', 'click', _onClick._$bind(this));
            _v._$dispatchEvent('test', 'click');
            _result.should.equal(3);
            
            _eventManager._$recycle();
            
            _v._$dispatchEvent('test', 'click');
            
            _v._$dispatchEvent('test', 'click');
            _result.should.equal(3);
        });
    });
    
    mocha.run();
});
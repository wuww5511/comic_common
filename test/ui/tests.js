define([
    'pro/ui',
    'text!./view.html',
    'base/event'
], function (_ui, _view, _v, _p) {
    
    var _$$UiTest = null;
    
    var _ins = null;
    
    chai.should();
    
    describe("UI类测试：处理已有UI", function () {
        beforeEach(function () {
            _$$UiTest = _ui._$$Ui._$getSub({
                __bd: document.body
            });

            _ins = _$$UiTest._$allocate();
        });
        
        it("UI测试", function () {
            _ins.__body.should.equal(document.body);
            _ins.__parent.should.equal(document.documentElement);
        });
        
    });
    
    describe("UI类测试：动态创建UI", function () {
        
        beforeEach(function () {
            
            _$$UiTest = _ui._$$Ui._$getSub({
                __html: _view,
                __fs: function (_opts) {
                    _opts.event.current.style.fontSize = _opts.args[0] + "px";
                    if(_opts.args[1] == 'true'){
                        _opts.stop = true;
                    }
                }
            });
            
            _ins = _$$UiTest._$allocate({
                parent: document.body
            });
        });
        
        afterEach(function () {
            _ins._$recycle();
        });
        
        it("UI测试", function () {
            _ins.__body.should.equal(_ins.__el('body'));
            _ins.__parent.should.equal(document.body);
        });
        
        it("成员方法__els测试", function () {
            _ins.__els('item').should.be.a('array');
            _ins.__els('item').should.equal(_ins.__els('item'));
            _ins.__els('item').should.not.equal(_ins.__els('item', true));
        });
        
        it("成员方法__el测试", function () {
            _ins.__el('item').should.be.a('HTMLDivElement');
            _ins.__el('item').should.equal(_ins.__el('item'));
            _ins.__el('item').should.equal(_ins.__el('item', true));
        });
        
        it("成员方法__isChildOf测试", function () {
            var _body = _ins.__el('body'),
                _item = _ins.__el('item');
            _ins.__isChildOf(_item, _body).should.equal(true);
            _ins.__isChildOf(_body, _body).should.equal(false);
            _ins.__isChildOf(document.documentElement, _body).should.equal(false);
        });
        
        it("成员方法__isLe测试", function () {
            var _body = _ins.__el('body'),
                _item = _ins.__el('item');
            _ins.__isLe(_item, _body).should.equal(true);
            _ins.__isLe(_body, _body).should.equal(true);
            _ins.__isLe(document.documentElement, _body).should.equal(false);
        });
        
        it("事件代理测试:事件触发", function () {
            _ins.__initEvent('click');
            
            _ins.__el('body').style.fontSize.should.equal("");
            
            _v._$dispatchEvent(_ins.__el('body'), 'click');
            
            _ins.__el('body').style.fontSize.should.equal("12px");
            
        });
        
        it("事件代理测试:组件内冒泡", function () {
            _ins.__initEvent('click');
            
            _ins.__el('left').style.fontSize.should.equal("");
            
            _ins.__el('body').style.fontSize.should.equal("");
            
            _v._$dispatchEvent(_ins.__el('left'), 'click');
            
            _ins.__el('left').style.fontSize.should.equal("14px");
            
            _ins.__el('body').style.fontSize.should.equal("12px");
        });
        
        it("事件代理测试:stop", function () {
            _ins.__initEvent('click');
            
            _ins.__el('right').style.fontSize.should.equal("");
            
            _ins.__el('body').style.fontSize.should.equal("");
            
            _v._$dispatchEvent(_ins.__el('right'), 'click');
            
            _ins.__el('right').style.fontSize.should.equal("16px");
            
            _ins.__el('body').style.fontSize.should.equal("");
        });
    });
    
    mocha.run();
});
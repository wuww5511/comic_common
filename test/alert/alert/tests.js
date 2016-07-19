define([
    'pro/alert/alert',
    'text!./view.html',
    './ui.js'
], function (_alert, _view, _ui, _p) {
    
    chai.should();
    
    describe("Alert类测试:初始化(__inner:字符串)", function () {
        
        var _$$Alert = _alert._$$Alert._$getSub({
           __inner: _view 
        });
        
        var _ins = null;
        
        function _validate () {
            _ins.__isLe(_ins.__body, document.body).should.be.true; 
            _ins.__isLe(_ins.__alert, _ins.__body).should.be.true;
        }
        
        afterEach(function () {
            _ins._$close();
            _ins = null;
        });
        
        it("通过字符串初始化", function () {
            _ins = _$$Alert._$allocate({
                inner: _view
            });
            
            _validate();
            
            
        });
        
        it("通过UI类初始化", function () {
            _ins = _$$Alert._$allocate({
                inner: _ui._$$Ui
            });
            
            _validate();
        });
        
        it("通过对象初始化:字符串", function () {
            _ins = _$$Alert._$allocate({
                inner: {
                    klass: _view
                }
            });
            
            _validate();
        });
        
        it("通过对象初始化:UI类", function () {
            _ins = _$$Alert._$allocate({
                inner: {
                    klass: _ui._$$Ui
                }
            });
            
            _validate();
        });
    });
    
    describe("Alert类测试:初始化(__inner:类)", function () {
        
        var _$$Alert = _alert._$$Alert._$getSub({
           __inner: _ui._$$Ui 
        });
        
        var _ins = null;
        
        function _validate () {
            _ins.__isLe(_ins.__body, document.body).should.be.true; 
            _ins.__isLe(_ins.__alert, _ins.__body).should.be.true;
        }
        
        afterEach(function () {
            _ins._$close();
            _ins = null;
        });
        
        it("通过字符串初始化", function () {
            _ins = _$$Alert._$allocate({
                inner: _view
            });
            
            _validate();
            
            
        });
        
        it("通过UI类初始化", function () {
            _ins = _$$Alert._$allocate({
                inner: _ui._$$Ui
            });
            
            _validate();
        });
        
        it("通过对象初始化:字符串", function () {
            _ins = _$$Alert._$allocate({
                inner: {
                    klass: _view
                }
            });
            
            _validate();
        });
        
        it("通过对象初始化:UI类", function () {
            _ins = _$$Alert._$allocate({
                inner: {
                    klass: _ui._$$Ui
                }
            });
            
            _validate();
        });
    });
    
    describe("Alert类测试:初始化(__inner:对象:klass:字符串)", function () {
        
        var _$$Alert = _alert._$$Alert._$getSub({
           __inner: {
               klass: _view
           } 
        });
        
        var _ins = null;
        
        function _validate () {
            _ins.__isLe(_ins.__body, document.body).should.be.true; 
            _ins.__isLe(_ins.__alert, _ins.__body).should.be.true;
        }
        
        afterEach(function () {
            _ins._$close();
            _ins = null;
        });
        
        it("通过字符串初始化", function () {
            _ins = _$$Alert._$allocate({
                inner: _view
            });
            
            _validate();
            
            
        });
        
        it("通过UI类初始化", function () {
            _ins = _$$Alert._$allocate({
                inner: _ui._$$Ui
            });
            
            _validate();
        });
        
        it("通过对象初始化:字符串", function () {
            _ins = _$$Alert._$allocate({
                inner: {
                    klass: _view
                }
            });
            
            _validate();
        });
        
        it("通过对象初始化:UI类", function () {
            _ins = _$$Alert._$allocate({
                inner: {
                    klass: _ui._$$Ui
                }
            });
            
            _validate();
        });
    });
    
    describe("Alert类测试:初始化(__inner:对象:klass:类)", function () {
        
        var _$$Alert = _alert._$$Alert._$getSub({
           __inner: {
               klass: _ui._$$Ui
           } 
        });
        
        var _ins = null;
        
        function _validate () {
            _ins.__isLe(_ins.__body, document.body).should.be.true; 
            _ins.__isLe(_ins.__alert, _ins.__body).should.be.true;
        }
        
        afterEach(function () {
            _ins._$close();
            _ins = null;
        });
        
        it("通过字符串初始化", function () {
            _ins = _$$Alert._$allocate({
                inner: _view
            });
            
            _validate();
            
            
        });
        
        it("通过UI类初始化", function () {
            _ins = _$$Alert._$allocate({
                inner: _ui._$$Ui
            });
            
            _validate();
        });
        
        it("通过对象初始化:字符串", function () {
            _ins = _$$Alert._$allocate({
                inner: {
                    klass: _view
                }
            });
            
            _validate();
        });
        
        it("通过对象初始化:UI类", function () {
            _ins = _$$Alert._$allocate({
                inner: {
                    klass: _ui._$$Ui
                }
            });
            
            _validate();
        });
    });
    
    describe("Alert类测试:初始化:__inner:undefined", function () {
        
        var _ins = null;
        
        function _validate () {
            _ins.__isLe(_ins.__body, document.body).should.be.true; 
            _ins.__isLe(_ins.__alert, _ins.__body).should.be.true;
        }
        
        afterEach(function () {
            _ins._$close();
            _ins = null;
        });
        
        it("通过字符串初始化", function () {
            _ins = _alert._$$Alert._$allocate({
                inner: _view
            });
            
            _validate();
            
            
        });
        
        it("通过UI类初始化", function () {
            _ins = _alert._$$Alert._$allocate({
                inner: _ui._$$Ui
            });
            
            _validate();
        });
        
        it("通过对象初始化:字符串", function () {
            _ins = _alert._$$Alert._$allocate({
                inner: {
                    klass: _view
                }
            });
            
            _validate();
        });
        
        it("通过对象初始化:UI类", function () {
            _ins = _alert._$$Alert._$allocate({
                inner: {
                    klass: _ui._$$Ui
                }
            });
            
            _validate();
        });
    });
    
    describe("Alert测试:居中测试", function () {
        
        var _ins = null;
        
        function _isCenter (_inner, _outer) {
            
            var _mt = parseFloat(_inner.style.marginTop),
                _ch = _outer.clientHeight,
                _h = _inner.offsetHeight;
            
            if((_ch - _h) / 2 === _mt || _mt == 0) {
                return true;
            }
            
            return false;
        }
        
        beforeEach(function () {
            _ins = _alert._$$Alert._$allocate({
                inner: {
                    klass: _ui._$$Ui
                }
            });
        });
        
        afterEach(function () {
            _ins._$close();
            _ins = null;
        });
        
        it("居中测试", function () {
            _isCenter(_ins.__alert, _ins.__body).should.be.true;
        });
    });
    
    describe("Alert测试:配置子view", function () {
        
        var _ins = null;
        
        beforeEach(function () {
            _ins = _alert._$$Alert._$allocate({
                inner: {
                    klass: _ui._$$Ui,
                    ontest: function (_o, _val) {
                        _o.value = _val;
                    }
                }
            });
        });
        
        afterEach(function () {
            _ins._$close();
            delete _ins.___test;
        });
        
        it("配置子view", function () {
            var _val = "just For Test";
            
            var _o = {
                value: ""
            };
            
            _ins.__view._$dispatchEvent('ontest', _o, _val);
            
            _o.value.should.be.equal(_val);
            
        });
    });
    
    mocha.run();
});
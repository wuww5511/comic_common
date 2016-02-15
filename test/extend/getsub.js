define([
    'base/klass',
    '../../extend.js'
], function (_k, _e, _p, _o, _f) {

    describe('继承测试', function () {

        it('继承已有的类', function () {

            var _$$Parent = _k._$klass();

            _$$Parent.prototype.__test = function (_o) {
                _o.a++;
            };

            var _$$Sub = _$$Parent._$getSub({
                __test: function (_o) {
                    this.__super(_o);
                    _o.a++;
                }
            });

            var _sub = new _$$Sub();

            var _o = {
                a: 1
            };
            _sub.__test(_o);

            expect(_o.a).toEqual(3);
        });

        it('继承一个函数', function () {
            var _$$Parent = _f;

            _$$Parent.prototype.__test = function (_o) {
                _o.a++;
            };

            var _$$Sub = _$$Parent._$getSub({
                __test: function (_o) {
                    this.__super(_o);
                    _o.a++;
                }
            });

            var _sub = new _$$Sub();

            var _o = {
                a: 1
            };
            _sub.__test(_o);

            expect(_o.a).toEqual(3);
        });

    });
    
});
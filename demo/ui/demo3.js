define([
    '../../ui.js'
], function (_ui, _p) {
    var _pro = {};

    _pro.__bd = document.getElementById('test');

    _pro.__reset = function (_opts) {
        this.__super(_opts);
        this.__initEvent('click');
    }

    _pro.__a = function (_opts) {
        console.log('a');
        _opts.event.stopPropagation();
    };

    _pro.__b = function (_opts) {
        console.log('b');
        _opts.stop = true;
    };

    _pro.__c = function (_opts) {
        console.log('c');
    };

    _p._$$Test = _ui._$$Ui._$getSub(_pro);

    _p._$$Test._$allocate();

    document.body.addEventListener('click', function () {
        console.log('body');
    })
})
define([
    '../ui.js',
    '../widget/position.js',
    'base/element',
    'base/util'
], function (_ui, _pos, _e, _u, _p) {
    
    var _pro = {};
    
    _pro.__html = "<div style='position:fixed;top:0;left:0;bottom:0;right:0;z-index:999;'></div>";
    
    _pro.__reset = function (_opts) {
        this.__super(_opts);
        this.__pos = new _pos._$$Widget(this);
        this.__inner = _opts.inner || this.__inner;
        this.__iopts = {};
        
        if(this.__inner.clazz) {
            this.__iopts = this.__inner;
            this.__inner = this.__iopts.clazz;
            delete this.__iopts.clazz;
        }
        
        if(typeof this.__inner === 'string') {
            this.__inner = _ui._$$Ui._$getSub({
                __html: this.__inner
            });
        }
        
        _u._$merge(this.__iopts, {
            parent: this.__body,
            data: _opts.data,
            onbeforedestroy: function () {
                this._$recycle();
            }._$bind(this)
        });
        
        this.__view = this.__inner._$allocate(this.__iopts);

        this.__alert = this.__view._$getBody();
        
        this._$appendTo(document.body);
        
        this._$resize();
    };
    
    _pro._$getView = function () {
        return this.__view;
    };
    
    _pro._$resize = function () {
        this.__pos._$setPos();
    };
    
    _pro._$setPos = function () {
        var _wh = document.documentElement.clientHeight,
            _h = this.__alert.offsetHeight;
        var _top = (_wh - _h)/2;
        if(_top < 0) _top = 0;
        _e._$style(this.__alert, {
            margin: _top + "px auto 0 auto"
        })
        
    };
    
    _pro.__close = function () {
        this.__view && this.__view._$recycle();
    };
    
    _pro._$close = function () {
        this.__close();
    };
        
    _pro.__destroy = function () {
        this.__super();
        this.__pos._$destroy();
        delete this.__pos;
        delete this.__iopts;
        delete this.__inner;
        delete this.__view;
        delete this.__alert;
    };
    
    _p._$$Alert = _ui._$$Ui._$getSub(_pro);
});
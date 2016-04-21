define([
    '../ui.js',
    '../widget/position.js',
    'base/element'
], function (_ui, _pos, _e, _p) {
    
    var _pro = {};
    
    _pro.__html = "<div style='position:fixed;top:0;left:0;bottom:0;right:0;z-index:999;'></div>";
    
    _pro.__inner = "";
    
    _pro.__reset = function (_opts) {
        this.__super(_opts);
        this.__pos = new _pos._$$Widget(this);
        this.__inner = _opts.inner || this.__inner;
        if(typeof _inner === 'string'){
            this.__body.innerHTML = _inner;
            this.__alert = this.__getFirstChild(this.__body);
        }
        else{
            this.__view = this.__inner._$allocate({
                parent: this.__body,
                data: _opts.data,
                onafterpaint: function () {
                    this._$resize();
                }._$bind(this)
            });
            
            this.__alert = this.__view._$getBody();
        }
        
        this._$appendTo(document.body);
        
        this._$resize();
    };
    
    _pro._$getView = function () {
        return this.__view || this.__alert;
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
        setTimeout(function () {
            this._$recycle();
        }._$bind(this));
        this._$dispatchEvent('onbeforeclose');
    };
    
    _pro.__getFirstChild = function (_node) {
        if(_node.firstElementChild)
            return _node.firstElementChild;
        var _childs = _node.childNodes;
        for(var _i = 0; _i < _childs.length; _i++){
            if(_childs[_i].nodeType === 1){
                return _childs[_i];
            }
        }
        
        return null;
    };
    
    _pro.__destroy = function () {
        this.__super();
        this.__pos._$destroy();
    };
    
    _p._$$Alert = _ui._$$Ui._$getSub(_pro);
});
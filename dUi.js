define([
    './ui.js',
    'util/template/jst',
    'base/element',
    'base/util'
], function (_ui, _jst, _e, _u, _p) {
    
    var _pro = {};
    
    var _events = {
        "focus": true,
        "blur": true,
        "click": true
    };
    
    _pro.__jst = "";
    
    _pro.__data = {};
    
    _pro.__exts = {};
    
    /**
     * - opts {Object}
     *      - data {Object} 模块中的数据，被用于jst重新渲染
     *      - exts {Object} jst重新渲染时用到的函数
     *      - jst {String} jst模板
     **/
    _pro.__reset = function (_opts) {
        this.__super(_opts);
        this.___data = _u._$merge({}, this.__data, _opts.data||{});
        this.__jst = _opts.jst || this.__jst;
        this.__jstSeed = _jst._$add(this.__jst);
        this.___exts = _opts.exts || this.__exts;
        this.__repaint();
    };
    
    _pro._$setData = function (_o) {
        _u._$merge(this.___data, _o);
        this.__repaint();
    };
    
    _pro._$getData = function () {
        return this.___data;
    };
    
    _pro.__repaint = function () {
        this.__onBeforeRepaint();
        this.__body.innerHTML = _jst._$get(this.__jstSeed, this.___data, this.___exts);
        this._$dispatchEvent('onafterpaint');
    };
    
    _pro.__onBeforeRepaint = function () {
        this.__doClearDomEvent();
        delete this.___cache.event;
        delete this.___cache.el;
    };
    
    _pro.__bindEvent = function () {
        this.__search(this.__body, this.__onInitOne._$bind(this));
    };
    
    _pro.__onInitOne = function (_node) {
        var _attr;
        for(var _i in _events){
            _attr = _e._$attr(_node, "data-on" + _i);
            if(_attr){
                this.__doInitDomEvent([
                    [_node, _i, function (_attrName, _node, _event) {
                        var _opts = {
                            event: this.__doWithEvent(_event)
                        };
                        
                        _opts.event.current = _node;
                        
                        var _attr = _e._$attr(_node, _attrName);
                        
                        this.__exec(_attr, _opts);
                        
                    }._$bind(this, "data-on" + _i, _node)]
                ]);
            }
        }
    };
    
    //从一个DOM节点开始搜索其所有子节点
    _pro.__search = function (_node, _cb) {
        var _stack = [_node];
        var _now;
        while(_now = _stack.pop()){
            if(_now.nodeType === 1){
                _cb(_now);
                for(var _i = 0; _i < _now.childNodes.length; _i++){
                    _stack.push(_now.childNodes[_i]);
                }
            }
        }
        
    };
    
    _pro.__destroy = function () {
        this.__super();
        delete this.___data;
    };
      
    _p._$$Ui = _ui._$$Ui._$getSub(_pro);
});
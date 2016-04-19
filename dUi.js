define([
    './ui.js',
    'util/template/jst',
    'base/element'
], function (_ui, _jst, _e, _p) {
    
    var _pro = {};
    
    var _events = {
        "focus": true,
        "blur": true,
        "click": true
    };
    
    _pro.__jst = "";
    
    _pro.__data = {};
    
    _pro.__extends = {};
    
    /**
     * - opts {Object}
     *      - data {Object} 模块中的数据，被用于jst重新渲染
     *      - extends {Object} jst重新渲染时用到的函数
     *      - jst {String} jst模板
     **/
    _pro.__reset = function (_opts) {
        this.__super(_opts);
        this.__data = _opts.data || this.__data;
        this.__jst = _opts.jst || this.__jst;
        this.__jstSeed = _jst._$add(this.__jst);
        this.__extends = _opts.extends || this.__extends;
        this.__repaint();
    };
    
    _pro._$setData = function (_o) {
        for(var _i in _o){
            this.__data[_i] = _o[_i];
        }
        this.__repaint();
    };
    
    _pro.__repaint = function () {
        this._$clearEvent();
        this.__body.innerHTML = _jst._$get(this.__jstSeed, this.__data, this.__extends);
        this.__search(this.__body, this.__onInitOne._$bind(this))
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
    
    _p._$$Ui = _ui._$$Ui._$getSub(_pro);
});
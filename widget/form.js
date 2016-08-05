define([
    '../ui.js',
    'base/element'
], function (_ui, _e, _p) {
    
    var _pro = {};
    
    /**
     *  _opts {Object}
     *      
     **/
    _pro.__reset = function (_opts) {
        this.__super(_opts);
    };
    
    /**
     *  表单验证
     * 
     *  @return {Object}
     *      - status {boolean} 验证是否通过
     *      - data {Object} 验证通过的表单项的数据
     *      - name {String} 如果验证不通过，记录不通过的表单项的name
     *      - error {Number} 如果验证不通过，记录不通过的表单项的验证条件序号
     */
    _pro._$validate = function () {
        var _els = this.__els('form-ele', true);
        
        var _data = {};
        
        for(var _i = 0; _i < _els.length; _i++) {
            var _vFuncs = this.__getValidateFuncs(_e._$dataset(_els[_i], 'validate'));
            var _res = this.__validate(_els[_i], _vFuncs);
            if(!_res.status) {
                return {
                    status: false,
                    data: _data,
                    name: _res.name,
                    error: _res.error
                }
            } 
            else {
                _data[_res.name] = _res.value;
            }
        }
        
        return {
            status: true,
            data: _data
        };
    };
    
    /**
     *  @param
     *      _node {HTMLElement} 需要验证的节点
     *      _vFuncs {Array|Function} 验证数组
     *
     *  @return {Object}
     *      - status {boolean} 验证是否通过
     *      - name {String} 表单项的name
     *      - value {String} 表单项的值
     *      - error {Number} 如果验证不通过，则记录不通过的验证条件的序号
     */
    _pro.__validate = function (_node, _vFuncs) {
        var _value = this.__trim(_node.value),
            _name = _node.name;
        
        var _res = {
            name: _name,
            value: _value
        };
        
        for(var _i = 0; _i < _vFuncs.length; _i++) {
           if(!_vFuncs[_i](_value)) {
               _res.error = _i;
               _res.status = false;
               return _res;
           }
        }
        
        _res.status = true;
        
        return _res;
    };
    
    /**
     *  将验证表达式解析成验证数组，验证表达式的格式类似于 "minlength:1 maxlength:12 reg:^abcd$"
     *  @param 
     *      -   _str {String} 验证表达式
     *
     *  @return {Array|Function}
     */
    _pro.__getValidateFuncs = function (_str) {
        var _res = [];
        _str = this.__trim(_str);
        var _itms = _str.split(/\s+/);
        for(var _i = 0; _i < _itms.length; _i++) {
            _res.push(
                this.__getValidateFunc(_itms[_i])
            );
        }
        
        return _res;
    };
    
    _pro.__getValidateFunc = function (_str) {
        var _arr = _str.split(":"),
            _fname = _arr[0],
            _astr = _arr[1];
        
        return this["__" + _fname](_astr);   
    };
    
    _pro.__maxlength = function (_num) {
        
        return function (_value) {
            if(_value.length > +_num) 
                return false;
            return true;
        };
        
    };
    
    _pro.__minlength = function (_num) {
        
        return function (_value) {
            if(_value.length < +_num)
                return false;
            return true;
        }
        
    };
    
    _pro.__reg = function (_regStr) {
        
        return function (_value) {
            var _reg = new RegExp(_regStr);
            if(_reg.test(_value))
                return true;
            return false;
        };
        
    };
    
    _pro.__trim = function (_str) {
        var _reg = /^\s*(.*?)\s*$/;
        if(_reg.test(_str)) {
            return RegExp.$1;
        }
        return "";
    };
    
    _p._$$Form = _ui._$$Ui._$getSub(_pro);
})
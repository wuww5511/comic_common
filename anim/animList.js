define([
    'base/klass',
    'util/event',
    'util/animation/easein',
    'util/animation/easeout',
    'util/animation/linear'
], function (_k, _t, _easein, _easeout, _linear, _p) {
    
    _p._$$AnimList = _k._$klass();
    
    var _pro  = _p._$$AnimList._$extend(_t._$$EventTarget);
    
    /**
     * 动画类标识和动画类的对应表
     */
    var _klassMap = {
        "easein": _easein._$$AnimEaseIn,
        "easeout": _easeout._$$AnimEaseOut,
        "linear": _linear._$$AnimLinear
    };
    
    /**
     *  增加动画类
     *      _name {String} 动画类的标识
     *      _klass {Function} 动画类 util/animation/animation._$$Animation子类
     **/
    _p._$$AnimList._$addAnimation = function (_name, _klass) {
        _klassMap[_name] = _klass;
    };
    
    /**
     *  _opts {Object}
     *      - list {Array|Array}动画配置参数数组
     *          [
     *                [
     *                  'easein', //动画类标识
                        1000, //持续时间(ms)
                        {
                            
                        }, // from
                        {
                        
                        } // to
                    ]
                    
                ]
     *
     *      - ifinite {Boolean} 是否循环播放
     */
    _pro.__reset = function (_opts) {
        this.__super(_opts);
        this.__list = _opts.list || [];
        this.__aList = null;
        this.__now = null;
        
        if(_opts.ifinite)
            this._$addEvent('onstop', function () {
                this._$play();
            }._$bind(this));
    };
    
    _pro._$play = function () {
        this.__aList = [];
        for(var _i = 0; _i < this.__list.length; _i++) {
            this.__aList.push(
                this.__getAnimation.apply(this, this.__list[_i].concat([_i]))
            );
        }
        this.__playNext();
    };
    
    _pro._$stop = function () {
        for(var _i = 0; _i < this.__alist; _i++) {
            this.__alist[_i]._$recycle();
        }
        this.__alist = [];
        this.__now && this.__now._$recycle();
        this.__now = null;
    };
    
    _pro.__onItemEnd = function (_animation) {
        _animation._$recycle();
        this.__playNext();
    };
    
    _pro.__onStep = function (_from, _to, _index, _event) {
        var _percent = _event.offset / 100;
        var _data = {};
        
        for(var _i in _from) {
            if(typeof _to[_i] == 'number')
                _data[_i] = (_to[_i] - _from[_i]) * _percent + _from[_i];
            else
                _data[_i] = _from[_i];
        }
        
        this.__stepAction();
        
        this._$dispatchEvent('onstep', _data);
    };
    
    _pro.__playNext = function () {
        if(!this.__playOne()) {
            this._$dispatchEvent('onstop');
        }
    };
    
    _pro.__playOne = function () {
        var _aItm = this.__aList.shift();
        if(_aItm) {
            this.__now = _aItm;
            _aItm._$addEvent('onstop', this.__onItemEnd._$bind(this, _aItm));
            _aItm._$play();
            return true;
        }
        return false;
    };
    
    /**
     *  _type {String} easein: 先慢后快 easeout: 先快后慢
     */
    _pro.__getAnimation = function (_type, _duration, _from, _to, _index) {
        var _klass = _klassMap[_type];
        return _klass._$allocate({
            from: {
                offset: 0
            },
            to: {
                offset: 100
            },
            duration: _duration,
            onupdate: this.__onStep._$bind(this, _from, _to, _index),
            onstop: function () {
                this._$dispatchEvent('onstepend', _index);
            }._$bind(this)
        });
    };
    
    _pro.__stepAction = function (_data) {
        
    };
    
    _pro.__destroy = function () {
        this.__super();
        this._$stop();
    }
})
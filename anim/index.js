define([
    './anim.js',
    'base/util',
    '../widget/util.js',
    './animParallel.js',
    './animSerial.js'
], function (anim, util, util2, ap, as, p) {
    
    var transforms = {
        "translateX": 1,
        "translateY": 1,
        "translateZ": 1,
        "scale": 1,
        "rotate": 1
    };
    
    var noPxs = {
        "opacity": 1
    };
    
    /**
     *  @param {HTMLElement}  或者 {Array|HTMLElement}
     *  @param {Object} 或 {Array|Object}
     *      -   duration
     *      -   func
     *      -   from
     *      -   to
     *   
     **/
    p._$anim = function (ele, opts) {
        
        var list = [];
        
        if(({}).toString.call(opts) !== '[object Array]') {
            opts = [opts];
        }
        
        if(({}).toString.call(ele) !== '[object Array]') {
            ele = [ele];
        }
        
        for(var i = 0; i < opts.length; i++) {
            var fn = opts[i].func || "easein",
                duration = opts[i].duration || 1000;
            
            if(!opts[i].from)
                opts[i].from = opts[i-1].to;
            
            list.push(
                [fn, duration, opts[i].from, opts[i].to]
            )
        }
        
        var res =  anim._$$Anim._$allocate({
            list: list,
            onstep: onStep._$bind(this)
        });
        
        util._$merge(res, {
            _$plus: plus,
            _$multiply: multiply
        });
        
        return res;
        
        function onStep (data, index) {
            data = util._$merge({}, data);
            var transfrom = null;
            for(var i in data) {
                if(transforms[i]) {
                    transfrom = transfrom || {};
                    transfrom[i] = data[i];
                }
                else {
                    if(noPxs[i])
                        style(ele, i, data[i]);
                    else
                         style(ele, i, data[i] + "px");
                }
            }
            
            if(transfrom) {
                var prefix = ["ms", "webkit", "o", "mos"];
                var value = util2._$string(
                    "translate3D(%spx,%spx,%spx) rotate(%sdeg) scale(%s)",
                    (transfrom.translateX||0),
                    (transfrom.translateY||0),
                    (transfrom.translateZ||0),
                    (transfrom.rotate||0),
                    (transfrom.scale||1)
                );
                for(var i = 0; i < prefix.length; i++) {
                    style(ele, prefix[i] + "Transform", value);
                }
                style(ele, 'transform', value);
            }
            
            
        }
        
        function plus (item) {
            return p._$plus(this, item);
        }
        
        function multiply (item) {
            return p._$multiply(this, item);
        }
        
        function style (eles, key, value) {
            
            util._$forEach(eles, function (item) {
                if(key == 'opacity' && util2._$isIe8()) {
                    item.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + value * 100 + ");";
                }
                else
                    item.style[key] = value;
            })
        }
    };
    
    p._$plus = function () {
        return as._$$Anim._$allocate({
            anims: arguments
        });
    };
    
    p._$multiply = function () {
        return ap._$$Anim._$allocate({
            anims: arguments
        });
    };
});
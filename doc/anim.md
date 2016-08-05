# 动画队列类
`anim/animList._$$AnimList`
## 初始化
        _al._$$AnimList._$allocate({
            ifinite: true,
            list: [
                ['easeout', 1000, {top: 0, left: 0}, {top:  100, left: 100}],
                ['easein', 3000, {top: 100, left: 100}, {top: 400,left: 200}],
                ['easeout', 1000, {top: 400, left: 200}, {top: 100,left: 400}],
                ['easeout', 2000, {top: 100, left: 400}, {top: 0, left: 0}]
            ],
            onstep: function (_data) {
                this.__el('box').style.top = _data.top + "px";
                this.__el('box').style.left = _data.left + "px";
            }._$bind(this),
            onstop: function () {
                console.log('动画结束了!');
            },
            onstepend: function (_index) {
                console.log('动画' + _index + "结束了!");
            }
        })._$play();
    
### ifinite {Boolean} 是否循环播放
### list {Array|Array} 动画描述队列
        
        [
            'easeout', //描述动画的速度变化，目前支持easeout, easein, linear
            1000, //动画持续的时间
            {top: 0, left: 0}, //动画初始时的数据
            {top:  100, left: 100} //动画结束时的数据
        ]

### onstep {Function} 动画每一帧执行的函数, 参数_data为当前帧的数据
### onstepend {Function} 当一段动画结束时执行, 参数为该段动画在动画队列中的序号(从0开始)
### onstop {Function} 动画结束时执行
## 方法
### _$play() => {void}
**开始动画**

### _$stop() => {void}
**停止动画**

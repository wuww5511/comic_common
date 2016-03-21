# 基于NEJ的小模块
**安装：** `bower install comic_common`

### extend.js
**使类可以通过静态方法`_$getSub()`生成子类**
使用方法：加载此模块即可

### ui.js
**实现ui模块中常用方法**
`__initEvent()`: 为整个ui模块绑定事件，代理子元素的事件。模块内子元素通过对应属性设置要执行的操作。操作与类的protected成员函数相对应。

操作会被传递一个参数_opts.

		/**
		 * _opts {Object}
		 *	- event {Object} 事件对象。其中target,
		 * 					  currentTarget, stopPropagation,
		 *					  preventDault已做兼容处理
		 *  - args {Array}  操作被传递的参数
		 *  - stop {bool} 默认为undefined。当被置为true时，本UI模块中该事件将不再冒泡。（模块外的事件将仍会被触发。如果想要阻止模块外的事件的触发，调用 _opts.event.stopPropagation()）;
		 */

__绑定click事件__

    //js
    this.__initEvent('click');
    this.__action = function (_opts) {
        //dosomething
    };
    //html
    <div data-click="action">test</div>
    
__绑定click和mouseover事件__
    
    //js
    this.__initEvent(['click','mouseover']);
    this.__action = function (_opts) {
        //dosomething
    };
    //html
    <div data-click="action" data-mouseover="action">test</div>
    
 __操作中带参数__
 
 	//js
    this.__initEvent(['click']);
    this.__action = function (_opts) {
        //dosomething
        console.log(_opts.args.join(" "));
    };
    //html
    <div data-click="action:1,2,3,4,a,b,c" >test</div>
 	
    
`__el`: 通过css类获取元素（只获取当前ui模块内的元素.如果存在多个，则获取第一个）

`__els`: 通过css类获取元素(返回数组).

__第一次获取元素时会将元素缓存。如果需要刷新缓存,需要出入第二个参数'true'__

__使用缓存__

    //js
    //返回dom元素
    this.__el('div')
    //返回dom元素的数组
    this.__els('div')
    
    //html
    <div class="js-div"></div>
    
__刷新缓存__

	//js
    //返回dom元素
    this.__el('div', true)
    //返回dom元素的数组
    this.__els('div', true)
    
    //html
    <div class="js-div"></div>
    

**简化ui控制设置html，css的流程**
[代码样例](https://github.com/wuww5511/comic_common/tree/master/demo/ui)
# 基于NEJ的小模块
**安装：** `bower install comic_common`

### extend.js
**使类可以通过静态方法`_$getSub()`生成子类**
使用方法：加载此模块即可

### ui.js
**实现ui模块中常用方法**
`__initEvent()`: 为整个ui模块绑定事件，代理子元素的事件。模块内子元素通过对应属性设置要执行的操作。操作与类的protected成员函数相对应。

    //js
    this.__initEvent('click');
    this.__action = function () {
        //dosomething
    };
    //html
    <div data-click="action">test</div>
    
    //js
    this.__initEvent(['click','mouseover']);
    this.__action = function () {
        //dosomething
    };
    //html
    <div data-click="action" data-mouseover="action">test</div>
    
`__el`: 通过css类获取元素（只获取当前ui模块内的元素.如果存在多个，则获取第一个）

`__els`: 通过css类获取元素(返回数组)


    //js
    //返回dom元素
    this.__el('div')
    //返回dom元素的数组
    this.__els('div')
    
    //html
    <div class="js-div"></div>

**简化ui控制设置html，css的流程**
[代码样例](https://github.com/wuww5511/comic_common/blob/master/test/ui/demo.js)
#UI类
**UI类用来实现一部分UI的逻辑**
##绑定UI
UI类与UI的绑定只能在UI类生成时进行，不能在UI类实例化时进行
###与UI类绑定的UI需要在类实例化时生成

		define([
			'{path}/ui.js',
			'text!./view.html',
			'text!./view.css'
		], function (_ui, _view, _css, _p) {
		
			var _pro = {};
			
			//需要生成的UI的HTML
			_pro.__html = _view;
			
			//需要添加的css代码，会在类第一次实例化时添加到<head></head>里，不建议使用
			_pro.__css = _css;
			
			//生成新的UI类
			_p._$$Ui = _ui._$$Ui._$getSub(_pro);
			
		})
		

###与UI类绑定的UI已存在

		define([
			'{path}/ui.js'
		], function (_ui, _p) {
		
			var _pro = {};
			
			//绑定已经存在的UI
			_pro.__bd = document.getElementById('view');
			
			//生成新的UI类
			_p._$$Ui = _ui._$$Ui._$getSub(_pro);
			
		})

##事件绑定扩展
通过事件代理的方式，以一种简洁的方式为UI绑定事件。

此扩展只能绑定可以冒泡的事件，如 `click`, `mouseenter`, `mousemove`等，像`focus`, `blur`, `input`等事件不能绑定。

		<!--HTML部分-->
		<div id="view">
		    <!--通过data-click属性为button绑定click事件(需要对click事件进行初始化)-->
			<button data-click="print:1,2">按钮1</button>
			
			<!--通过data-mouseenter属性为button绑定mouseenter事件(需要对mouseenter事件进行初始化)-->
			<button data-mouseenter="print:3,4">按钮2</button>
		</div>
		
		
		
		/**
		 * js部分
		 **/
		 
		 define([
			'{path}/ui.js'
		], function (_ui, _p) {
		
			var _pro = {};
			
			//绑定已经存在的UI
			_pro.__bd = document.getElementById('view');
			
			_pro.__reset = function (_opts) {
					this.__super(_opts);
					
					//初始化click,mouseenter事件，否则无法通过data-click, data-mouseenter绑定事件
					this.__initEvent(['click', 'mouseenter']);
			};
			
			//事件触发时执行的操作，通过data-click, data-mouseenter属性与UI进行绑定
			_pro.__print = function (_opts) {
			
				//获取事件绑定时传入的参数.args为一个字符串数组，包含所有传入的参数
				var _args = _opts.args;
				
				//输出所有参数
				console.log(_args.join(" "));
			};
			
			//生成新的UI类
			_p._$$Ui = _ui._$$Ui._$getSub(_pro);
			
		})

##成员方法
### __initEvent(_events) => {void}
**为__body绑定事件，在事件冒泡的过程中，依次检查每一个DOM节点，如果节点上含有data-{event}属性，则执行属性值所对应的方法**
参数_events的值可以为undefined, 字符串, 字符串数组。

值为undefined时，绑定click事件； `this.__initEvent()`

值为字符串时绑定单个事件；`this.__initEvent('click')`

值为字符串数组时同时绑定多个事件；`this.__initEvent(['click', 'mouseenter'])`

**在对应的成员方法被执行时，会传入一个对象_opts作为参数**
		
		_opts
			-event {Object} 事件对象
				-target {Node} 触发事件的源节点
				-preventDefault {Function} 阻止默认行为
				-stopPropagation {Function} 阻止事件冒泡，__body父节点不会触发事件
				-stop {Boolean} 将stop置为true， 当前节点的父节点将不会执行data-{event}中的方法
				-current {Node} 添加了data-{event}的节点
			-args {Array|String} 所有通过data-{event}传入的参数

### __els(_selector, _refresh) => {Array|Node}
**获取__body中的DOM节点**
		
		_selector {String} 筛选元素的字符串。如__els('btn') 会选取__body子节点中所有类似于`<div class="js-btn"></div>`的节点。第一次选取时会将结果记录在缓存中，下次会直接从缓存中提取结果。
		_refresh {Boolean} 为true时会刷新缓存

### __el(_selector, _refresh) => {Node}
**__els(_selector, _refresh)[0]**

### __isChildOf(_target, _parent) => {Boolean}
**判断_target是否为_parent的子节点**
		
		_target {Node}
		_parent {Node}

### __isLe(_target, _parent) => {Node}
**判断_target是否为_parent的子节点或者为同一节点**
		
		_target {Node}
		_parent {Node}
		
### __getProxyEvent(_ele, _event) => {String}
**获取DOM节点_ele上的`data-{_event}`属性**
        
        _ele {Node}
        _event {String}
        
### __setProxyEvent(_ele, _event, _action) => {void}
**设置DOM节点_ele上的`data-{_event}`属性值为_action**
        
        _ele {Node}
        _event {String}
        _action {String}

### __addProxyEvent(_ele, _event, _action) => {void}
**为DOM节点_ele上的`data-{_event}`属性添加_action**

        _ele {Node}
        _event {String}
        _action {String}
        
### __exec(_action, _opts) => {void}
**对操作_action进行解析和执行**

        _action {String} "func1:arg1,arg2 func2:arg1 func3"
        _opts {Object}
            -event {Object} 做过兼容处理的事件对象
            
### ___execOne(_fn, _args, _opts) => {void}
**执行对应的成员函数**

        _fn {String} 需要执行的成员函数名；如需执行成员函数__log, 传入"log"
        _args {Array} 参数列表
        _opts {Object}
            -event {Object} 做过兼容处理的事件对象

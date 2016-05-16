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

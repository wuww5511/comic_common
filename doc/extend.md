#对函数的原型进行扩展
###_$getSub(_opts) => {Function}
**函数可以通过此方法生成自己的子类**
*	_opts {Object} 添加到子类中的原型属性和方法

		//父类
		function Parent () {
		
		}
		
		//生成子类
		var Sub = Parent._$getSub({});

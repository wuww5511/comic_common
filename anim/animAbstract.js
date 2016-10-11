define([
    '../extend.js'
], function (ext, p) {
    
   /**
    * 动画类接口；同时需要实现onstop事件
    */    
   p._$$Anim = ext._$abstract([
       "_$play",
       "_$stop"
   ]); 
});
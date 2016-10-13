/**
 *  需要考虑的case:
 *  1.  在动画未结束时调用_$play
 *  2.  动画停止后能否继续播放，回调函数能否正确执行（包括自动停止和手动停止） 
 */
define([
    '../extend.js',
    'util/event'
], function (ext, u, p) {
       
    var pro = {};
    
    pro.__reset = function (opts) {
        this.__super(opts);
        this.__cbEnd = null;
        this.__isPlaying = false;
    };
    
    pro._$play = function (cb) {
        if(this.__isPlaying) return;
        this.__isPlaying = true;
        this.__cbEnd = cb;
        this.__doPlay();
    };
    
    /**
     *  将动画定格在最后一帧
     */
    pro._$stop = function () {
        this.__doStop();
        this.__onForcedEnd();
    };
    
    pro._$isPlaying = function () {
        return this.__isPlaying;
    };
    
    pro.__doStop = function () {
        
    };
    
    pro.__doPlay = function () {
        
    };
    
    //强制停止后执行
    pro.__onForcedEnd = function () {
        this.__doEnd();
    };
    
    //动画播放结束
    pro.__onExecutedEnd = function () {
        this.__doEnd();
    };
    
    pro.__doEnd = function () {
        this.__isPlaying = false;;
        this.__cbEnd && this.__cbEnd();
        this._$dispatchEvent('onstop');
    };
    
    pro.__destroy = function () {
        this._$stop();
        this.__super(opts);
        delete this.__cbEnd;
        delete this.__isPlaying;
    };
    
    p._$$Anim = u._$$EventTarget._$getSub(pro);
});
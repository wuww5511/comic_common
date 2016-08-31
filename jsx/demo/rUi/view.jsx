define([
    'pro/rUi'
], function (rui, p) {
    
    var pro = {};
    
    pro.__render = function () {
        return (
            <div>
                <div>{this.state.v1}</div>
                <div>{this.state.v2}</div>
                <div>{this.state.v3}</div>
                <button data-click="onAdd">加</button>
            </div>
        );
    };
    
    p._$$Ui = rui._$$Ui._$getSub(pro);
});
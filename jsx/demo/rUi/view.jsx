define([
    'pro/rUi'
], function (rui, p) {
    
    var pro = {};
    
    pro.__render = function () {
        
        var list = this.state.list;
        var domList = [];
        
        for(var i = 0; i < list.length; i++) {
            domList.push(<div>{list[i]}</div>);
        }
        
        return (
            <div>
                <div>v1:{this.state.v1}</div>
                <div>v2:{this.state.v2}</div>
                <div>v3:{this.state.v3}</div>
                {domList}
                <button data-click="onAdd">按钮</button>
            </div>
        );
    };
    
    p._$$Ui = rui._$$Ui._$getSub(pro);
});
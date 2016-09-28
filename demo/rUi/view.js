define(['pro/rUi'], function (rui, p) {

    var pro = {};

    pro.__render = function () {

        var list = this.state.list;
        var domList = [];

        for (var i = 0; i < list.length; i++) {
            domList.push(React.createElement(
                "div",
                null,
                list[i]
            ));
        }

        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                null,
                "v1:",
                this.state.v1
            ),
            React.createElement(
                "div",
                null,
                "v2:",
                this.state.v2
            ),
            React.createElement(
                "div",
                null,
                "v3:",
                this.state.v3
            ),
            domList,
            React.createElement(
                "button",
                { "data-click": "onAdd" },
                "按钮"
            )
        );
    };

    p._$$Ui = rui._$$Ui._$getSub(pro);
});
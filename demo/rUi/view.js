define(['pro/rUi'], function (rui, p) {

    var pro = {};

    pro.__render = function () {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                null,
                this.state.v1
            ),
            React.createElement(
                "div",
                null,
                this.state.v2
            ),
            React.createElement(
                "div",
                null,
                this.state.v3
            ),
            React.createElement(
                "button",
                { "data-click": "onAdd" },
                "加"
            )
        );
    };

    p._$$Ui = rui._$$Ui._$getSub(pro);
});
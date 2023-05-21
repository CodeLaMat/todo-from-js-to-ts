var TodoApp = /** @class */ (function () {
    function TodoApp() {
        var _this = this;
        this.form = document.querySelector("form");
        this.ol = document.querySelector("ol");
        this.button = document.querySelector("button");
        this.input = document.getElementById("item");
        this.itemsArray = localStorage.getItem("items")
            ? JSON.parse(localStorage.getItem("items"))
            : [];
        localStorage.setItem("items", JSON.stringify(this.itemsArray));
        var data = JSON.parse(localStorage.getItem("items"));
        data.forEach(function (item) {
            _this.liMaker(item);
        });
        this.form.addEventListener("submit", this.handleSubmit.bind(this));
        this.button.addEventListener("click", this.clearItems.bind(this));
    }
    TodoApp.prototype.liMaker = function (text) {
        var li = document.createElement("li");
        li.textContent = text;
        this.ol.appendChild(li);
    };
    TodoApp.prototype.handleSubmit = function (e) {
        e.preventDefault();
        this.itemsArray.push(this.input.value);
        localStorage.setItem("items", JSON.stringify(this.itemsArray));
        this.liMaker(this.input.value);
        this.input.value = "";
    };
    TodoApp.prototype.clearItems = function () {
        localStorage.clear();
        while (this.ol.firstChild) {
            this.ol.removeChild(this.ol.firstChild);
        }
        this.itemsArray = [];
    };
    return TodoApp;
}());
new TodoApp();

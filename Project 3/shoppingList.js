var items = [];
var nameInput = document.getElementById("nameInput");
var priceInput = document.getElementById("priceInput");
var quantityInput = document.getElementById("quantityInput");
var addBtn = document.getElementById("addBtn");
var itemList = document.getElementById("itemList");
var totalDisplay = document.getElementById("totalDisplay");
function addItem(name, price, quantity) {
    if (!name || isNaN(price) || isNaN(quantity)) {
        alert("Please enter valid values.");
        return;
    }
    var newItem = { name: name, price: price, quantity: quantity };
    items.push(newItem);
    renderList();
}
function calculateTotal(items) {
    var total = 0;
    items.forEach(function (item) {
        total += item.price * item.quantity;
    });
    return total;
}
function renderList() {
    itemList.innerHTML = "";
    items.forEach(function (item) {
        var li = document.createElement("li");
        li.textContent = "".concat(item.name, " \u2014 $").concat(item.price, " x ").concat(item.quantity);
        itemList.appendChild(li);
    });
    totalDisplay.textContent = calculateTotal(items).toFixed(2);
}
addBtn.addEventListener("click", function () {
    addItem(nameInput.value, Number(priceInput.value), Number(quantityInput.value));
    nameInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";
});

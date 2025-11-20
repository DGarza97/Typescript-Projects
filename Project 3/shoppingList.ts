interface Item {        //interface defines the shape of an item
  name: string;         //string allows for texs
  price: number;        //numbers can be either float or int
  quantity: number;
}

const items: Item[] = [];   //array only allows for Item types to be in the array

const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const priceInput = document.getElementById("priceInput") as HTMLInputElement;
const quantityInput = document.getElementById("quantityInput") as HTMLInputElement;

const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const itemList = document.getElementById("itemList") as HTMLUListElement;
const totalDisplay = document.getElementById("totalDisplay") as HTMLSpanElement;

function addItem(name: string, price: number, quantity: number): void {
  if (!name || isNaN(price) || isNaN(quantity)) {           //this function makes sure to only add valud items to the array
    alert("Please enter valid values.");
    return;
  }

  const newItem: Item = { name, price, quantity };          //create and add a new item to the array
  items.push(newItem);
  renderList();             //updates UI
}

function calculateTotal(items: Item[]): number {        //function adds teh total cost of the items together then returns the total
  let total = 0;

  items.forEach(item => {
    total += item.price * item.quantity;
  });

  return total;
}

function renderList(): void {            //creates a list element for each item
  itemList.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — $${item.price} x ${item.quantity}`;
    itemList.appendChild(li);
  });

  totalDisplay.textContent = calculateTotal(items).toFixed(2);  //only allows for 2 decimal points
}

addBtn.addEventListener("click", () => {
  addItem(      
    nameInput.value,                    //string
    Number(priceInput.value),
    Number(quantityInput.value)         //converts string to number
  );

  nameInput.value = "";
  priceInput.value = "";        //clears inputs 
  quantityInput.value = "";
});

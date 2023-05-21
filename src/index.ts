class TodoApp {
  form: HTMLFormElement;
  ol: HTMLOListElement;
  button: HTMLButtonElement;
  input: HTMLInputElement;
  itemsArray: string[];

  constructor() {
    this.form = document.querySelector("form") as HTMLFormElement;
    this.ol = document.querySelector("ol") as HTMLOListElement;
    this.button = document.querySelector("button") as HTMLButtonElement;
    this.input = document.getElementById("item") as HTMLInputElement;

    this.itemsArray = localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items") as string)
      : [];

    localStorage.setItem("items", JSON.stringify(this.itemsArray));
    const data = JSON.parse(localStorage.getItem("items") as string);

    data.forEach((item: string) => {
      this.liMaker(item);
    });

    this.form.addEventListener("submit", this.handleSubmit.bind(this));
    this.button.addEventListener("click", this.clearItems.bind(this));
  }

  liMaker(text: string): void {
    const li = document.createElement("li");
    li.textContent = text;
    this.ol.appendChild(li);
  }

  handleSubmit(e: Event): void {
    e.preventDefault();
    this.itemsArray.push(this.input.value);
    localStorage.setItem("items", JSON.stringify(this.itemsArray));
    this.liMaker(this.input.value);
    this.input.value = "";
  }

  clearItems(): void {
    localStorage.clear();
    while (this.ol.firstChild) {
      this.ol.removeChild(this.ol.firstChild);
    }

    this.itemsArray = [];
  }
}

new TodoApp();

// Import prompt-sync module
const prompt = require("prompt-sync")({ sigint: true });

class Book {
  constructor(id, title, author, year, price) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.price = price;
  }

  getInfo() {
    return `${this.id.toString().padEnd(4)} ${this.title.padEnd(
      20
    )} ${this.author.padEnd(20)} ${this.year
      .toString()
      .padEnd(8)} ${this.price.toLocaleString("id-ID")}`;
  }
}

class Cart {
  constructor() {
    this.items = [];
  }

  // Method to create a line
  line(char = "=", length = 65) {
    return "".padEnd(length, char);
  }

  // Method to create a header
  createHeader(title = "BOOK LIST") {
    const header = `
${"".padEnd(65, "=")}
${title.padStart(37)}
${"".padEnd(65, "=")}
${"ID".padEnd(4)} ${"TITLE".padEnd(20)} ${"AUTHOR".padEnd(20)} ${"QTY".padEnd(
      7
    )} ${"PRICE"}
${"".padEnd(65, "-")}`;
    return header;
  }

  addBook(book, qty) {
    this.items.push({
      id: book.id,
      title: book.title,
      author: book.author,
      quantity: qty,
      price: book.price,
    });
    return "\nBook added to cart successfully.\n";
  }
  removeBook(bookId) {
    if (this.items.length === 0) {
      return "\nCart is empty!\n";
    }

    const foundBook = this.items.find((book) => book.id === bookId);

    if (!foundBook) {
      return "\nBook not found.\n";
    }

    const findIndex = this.items.findIndex((book) => book.id === bookId);
    this.items.splice(findIndex, 1);
    return "\nBook deleted successfully!\n";
  }
  calculateTotal() {
    const spending = this.items.reduce(
      (sum, book) => sum + book.price * book.quantity,
      0
    );
    return spending;
  }
  printReceipt() {
    if (this.items.length === 0) {
      return "\nCart is empty!\n";
    }

    const show = this.items
      .map(
        (book) =>
          `${book.id.toString().padEnd(4)} ${book.title.padEnd(
            20
          )} ${book.author.padEnd(20)} ${book.quantity.toString().padEnd(7)} ${(
            book.price * book.quantity
          ).toLocaleString("id-ID")}`
      )
      .join("\n");
    return `${this.createHeader("RECEIPT")} \n${show} \n${this.line(
      "-",
      65
    )} \nTOTAL AMOUNT: Rp ${this.calculateTotal().toLocaleString(
      "id-ID"
    )} \n${this.line("-", 65)} \n${"THANKS FOR SHOPPING".padStart(
      42
    )} \n${this.line("=", 65)}`;
  }
}

class BookStore {
  constructor() {
    this.books = [
      new Book(1, "The Seven Husbands", "Taylor Jenkins", 2017, 200000),
      new Book(2, "Little Fires", "Celeste Ng", 2017, 180000),
      new Book(3, "Assembly", "Natasha Brown", 2021, 220000),
      new Book(4, "The Book of Form", "Ruth Ozeki", 2021, 210000),
      new Book(5, "The Sentence", "Louise Erdrich", 2021, 190000),
      new Book(6, "Noor", "Nnedi Okorafor", 2021, 230000),
      new Book(7, "The Plot", "Jean Hanff", 2021, 175000),
      new Book(8, "Exit West", "Mohsin Hamid", 2017, 165000),
      new Book(9, "The Prophets", "Robert Jones Jr.", 2021, 195000),
      new Book(10, "Daisy Jones", "Taylor Jenkins", 2019, 205000),
    ];

    this.menus = [
      { no: 1, name: "Show Book List" },
      { no: 2, name: "Find Book by ID" },
      { no: 3, name: "Find Book by Author" },
      { no: 4, name: "Add Book to Cart" },
      { no: 5, name: "Remove Book from Cart" },
      { no: 6, name: "Print Receipt" },
      { no: 7, name: "Exit" },
    ];

    this.cart = new Cart();
  }

  // Method to create a line
  line(char = "=", length = 65) {
    return "".padEnd(length, char);
  }

  // Method to create a header
  createHeader(title = "BOOK LIST") {
    const header = `
${"".padEnd(65, "=")}
${title.padStart(37)}
${"".padEnd(65, "=")}
${"ID".padEnd(4)} ${"TITLE".padEnd(20)} ${"AUTHOR".padEnd(20)} ${"YEAR".padEnd(
      8
    )} ${"PRICE"}
${"".padEnd(65, "-")}`;
    return header;
  }

  showBooks() {
    const header = this.createHeader("BOOK LIST");
    const rows = this.books.map((book) => book.getInfo()).join("\n");
    return `${header}\n${rows}\n${this.line("=", 65)}`;
  }

  findBookById(id) {
    const foundBook = this.books.find((book) => book.id === id);
    return foundBook
      ? `${this.createHeader(
          "FOUND BOOK"
        )}\n${foundBook.getInfo()}\n${this.line("=", 65)}`
      : `\nBook with ID ${id} not found.\n`;
  }
  searchByAuthor(name) {
    const foundAuthor = this.books.filter((book) =>
      book.author.toLowerCase().includes(name)
    );
    const authorValidation = this.books.find((book) =>
      book.author.toLowerCase().includes(name)
    );

    if (!authorValidation) {
      return `\nBook with the author ${name} not found.\n`;
    }

    const foundBook = foundAuthor.map((book) => book.getInfo()).join("\n");
    return `${this.createHeader("FOUND BOOK")}\n${foundBook}\n${this.line(
      "=",
      65
    )}`;
  }
  start() {
    // Show Menu
    const bookMenu = this.menus
      .map((menu) => `${menu.no}) ${menu.name}`)
      .join("\n");
    console.log(
      `${this.line("=", 30)}\n${"MENU".padStart(16)}\n${this.line(
        "=",
        30
      )}\n${bookMenu}\n${this.line("=", 30)}`
    );

    // Choose Menu
    const userChoice = parseInt(prompt("Choose the Menu: "));
    switch (userChoice) {
      case 1:
        console.log(this.showBooks());
        break;
      case 2:
        const bookId = parseInt(prompt("Enter the Book ID: "));
        console.log(this.findBookById(bookId));
        break;
      case 3:
        const bookAuthor = prompt("Enter the Author Name: ".toLowerCase());
        console.log(this.searchByAuthor(bookAuthor));
        break;
      case 4:
        const bookToCart = parseInt(prompt("Enter the Book ID: "));
        const findBook = this.books.find((book) => book.id === bookToCart);

        if (!findBook) {
          console.log("Book not found.");
          break;
        }

        const bookQty = parseInt(prompt("Enter Book Quantity: "));
        if (isNaN(bookQty) || bookQty <= 0) {
          console.log("Quantity number is not valid.");
          break;
        }

        console.log(this.cart.addBook(findBook, bookQty));
        break;
      case 5:
        const removeId = parseInt(prompt("Enter Book ID: "));
        console.log(this.cart.removeBook(removeId));
        break;
      case 6:
        console.log(this.cart.printReceipt());
        break;
      case 7:
        console.log("\nGood bye!\n");
        break;
      default:
        console.log("\nInput is not valid.\n");
        break;
    }

    if (userChoice != 7) {
      this.start();
    }
  }
}

const store = new BookStore();
store.start();

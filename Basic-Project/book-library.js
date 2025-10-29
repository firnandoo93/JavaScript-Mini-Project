const prompt = require("prompt-sync")({ sigint: true });

class MediaItem {
  constructor(id, title, author, year, available) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.available = available;
  }

  getInfo() {
    return `${this.id}) ${this.title} by ${this.author} (${this.year})`;
  }
  borrowItem() {
    this.available = false;
  }
  returnItem() {
    this.available = true;
  }
}

class Book extends MediaItem {
  constructor(id, title, author, year, available, pageCount, genre) {
    super(id, title, author, year, available);
    this.pageCount = pageCount;
    this.genre = genre;
  }

  getInfo() {
    return `${this.id.toString().padEnd(4)} ${this.title.padEnd(
      20
    )} ${this.author.padEnd(20)} ${this.year.toString().padEnd(8)} ${
      this.pageCount
    } pages`;
  }
}

class AudioBook extends MediaItem {
  constructor(id, title, author, year, available, duration, narrator) {
    super(id, title, author, year, available);
    this.duration = duration;
    this.narrator = narrator;
  }

  getInfo() {
    return `${this.id.toString().padEnd(4)} ${this.title.padEnd(
      20
    )} ${this.author.padEnd(20)} ${this.year.toString().padEnd(8)} ${
      this.duration
    } minutes`;
  }
}

class Library {
  #items = [];
  #menus = [];
  #subMenus = [];

  constructor() {
    this.#items = [
      new Book(1, "Narnia", "Peter", 2005, true, 205, "Adventure"),
      new AudioBook(2, "Jumanji", "Alex", 2001, true, 130, "Kevin"),
      new Book(3, "The Ends Game", "Petrov", 2009, true, 315, "Sci-fi"),
      new AudioBook(4, "The Last of Us", "Morris", 2015, true, 145, "Steven"),
    ];

    this.#menus = [
      { no: 1, name: "Show All Books" },
      { no: 2, name: "Show Available Books" },
      { no: 3, name: "Add Books" },
      { no: 4, name: "Borrow Books" },
      { no: 5, name: "Return Books" },
      { no: 6, name: "Exit" },
    ];

    this.#subMenus = [
      { no: 1, name: "Book" },
      { no: 2, name: "Audio Book" },
    ];
  }

  // Method to create a line
  line(char = "=", length = 65) {
    return "".padEnd(length, char);
  }

  // Method to create a header
  createHeader(title = "BOOK LIST") {
    const header = `
${"".padEnd(70, "=")}
${title.padStart(40)}
${"".padEnd(70, "=")}
${"ID".padEnd(4)} ${"TITLE".padEnd(20)} ${"AUTHOR".padEnd(20)} ${"YEAR".padEnd(
      8
    )} ${"DURATION/PAGES"}
${"".padEnd(70, "-")}`;
    return header;
  }

  showMenus(myMenu) {
    console.log(this.line("=", 30));
    console.log(`${"MENU".padStart(17)}`);
    console.log(this.line("=", 30));
    console.log(myMenu.map((menu) => `${menu.no}) ${menu.name}`).join("\n"));
    console.log(this.line("=", 30));
  }

  displayAllItems() {
    console.log(this.createHeader());
    this.#items.map((item) => console.log(item.getInfo()));
    console.log(this.line("-", 70));
  }
  showAvailableItems() {
    const availableBook = this.#items.filter((book) => book.available === true);
    console.log(this.createHeader());
    availableBook.map((book) => console.log(book.getInfo()));
    console.log(this.line("-", 70));
  }
  addItem(item) {
    this.#items.push(item);
  }
  borrowItem(id) {
    const item = this.#items.find((book) => book.id === id);

    if (!item) {
      return `\nPlease input a valid ID.\n`;
    }

    if (item.available === false) {
      return `\nThe book already borrowed.\n`;
    } else {
      item.borrowItem();
      return `\nBook borrowed successfully.\n`;
    }
  }
  returnItem(id) {
    const item = this.#items.find((book) => book.id === id);

    if (!item) {
      return `\nPlease input a valid ID.\n`;
    }

    if (item.available === true) {
      return `\nThe book already returned.\n`;
    } else {
      item.returnItem();
      return `\nBook returned successfully.\n`;
    }
  }

  start() {
    this.showMenus(this.#menus);
    const userChoice = parseInt(prompt("Choose the menu: "));
    switch (userChoice) {
      case 1:
        this.displayAllItems();
        break;
      case 2:
        this.showAvailableItems();
        break;
      case 3:
        this.showMenus(this.#subMenus);
        const subChoice = parseInt(prompt("Choose type of book: "));
        // Input Validation
        if (isNaN(subChoice) || subChoice <= 0 || subChoice > 2) {
          console.log("\nInput Invalid.\n");
          break;
        }

        const bookTitle = prompt("Enter the title          : ");
        const bookAuthor = prompt("Enter the author name    : ");
        const bookYear = parseInt(prompt("Enter the published year : "));
        if (subChoice === 1) {
          const bookPages = parseInt(prompt("Enter the pages number   : "));
          const bookGenre = prompt("Enter the book genre     : ");
          const newBook = new Book(
            this.#items.length + 1,
            bookTitle,
            bookAuthor,
            bookYear,
            true,
            bookPages,
            bookGenre
          );
          this.addItem(newBook);
        } else if (subChoice === 2) {
          const bookDuration = parseInt(prompt("Enter the duration       : "));
          const bookNarator = prompt("Enter the narrator name  : ");
          const newAudio = new AudioBook(
            this.#items.length + 1,
            bookTitle,
            bookAuthor,
            bookYear,
            true,
            bookDuration,
            bookNarator
          );
          this.addItem(newAudio);
        }
        console.log("\nBook added successfully.\n");
        break;
      case 4:
        const borrowId = parseInt(prompt("Enter the book ID: "));
        console.log(this.borrowItem(borrowId));
        break;
      case 5:
        const returnId = parseInt(prompt("Enter the book ID: "));
        console.log(this.returnItem(returnId));
        break;
      case 6:
        console.log("\nGood Bye\n");
        break;
    }
    if (userChoice != 6) {
      this.start();
    }
  }
}

const library = new Library();
library.start();

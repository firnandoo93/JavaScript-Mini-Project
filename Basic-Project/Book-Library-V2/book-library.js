const fs = require("fs");
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
    this.type = "Book";
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
    this.type = "AudioBook";
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
  #dataFile = "library.json";

  constructor() {
    this.#menus = [
      { no: 1, name: "Show Available Books" },
      { no: 2, name: "Add Books" },
      { no: 3, name: "Borrow Books" },
      { no: 4, name: "Return Books" },
      { no: 5, name: "Exit" },
    ];
    this.#subMenus = [
      { no: 1, name: "Book" },
      { no: 2, name: "Audio Book" },
    ];

    this.loadData();
  }

  loadData() {
    try {
      // Check if file exists
      if (!fs.existsSync(this.#dataFile)) {
        console.log(
          "No existing library data found. Starting with empty library..."
        );
        this.#items = this.#getDefaultItems();
        this.saveData();
        return;
      }
      // Read from file
      const data = fs.readFileSync(this.#dataFile, "utf8");
      const savedData = JSON.parse(data);

      // Convert plain objects back to Book/AudiBook instances
      this.#items = savedData.items.map((item) => {
        if (item.type === "Book") {
          return new Book(
            item.id,
            item.title,
            item.author,
            item.year,
            item.available,
            item.pageCount,
            item.genre
          );
        } else if (item.type === "AudioBook") {
          return new AudioBook(
            item.id,
            item.title,
            item.author,
            item.year,
            item.available,
            item.duration,
            item.narrator
          );
        }
      });
      console.log(
        `Library data loaded successfully! ${this.#items.length} items found.`
      );
    } catch (error) {
      // If file doesn't exist or is corrupted, start with empty library
      this.#items = [];
    }
  }

  saveData() {
    try {
      const dataToSave = {
        items: this.#items,
        nextId:
          this.#items.length > 0
            ? Math.max(...this.#items.map((i) => i.id)) + 1
            : 1,
      };
      fs.writeFileSync("library.json", JSON.stringify(dataToSave, null, 2));
      console.log("Library data saved successfully!");
    } catch (error) {
      console.log("Error saving library data:", error.message);
    }
  }

  #getDefaultItems() {
    return [
      new Book(1, "Narnia", "Peter", 2005, true, 205, "Adventure"),
      new AudioBook(2, "Jumanji", "Alex", 2001, true, 130, "Kevin"),
      new Book(3, "The Ends Game", "Petrov", 2009, true, 315, "Sci-fi"),
      new AudioBook(4, "The Last of Us", "Morris", 2015, true, 145, "Steven"),
    ];
  }

  #getNextId() {
    if (this.#items.length === 0) return 1;
    return Math.max(...this.#items.map((item) => item.id)) + 1;
  }

  // ==================== VALIDATION METHODS ====================

  #validateNumberInput(input, fieldName) {
    const num = parseInt(input);
    if (isNaN(num) || num <= 0) {
      throw new Error(`Invalid ${fieldName}: must be a positive number`);
    }
    return num;
  }

  #validateStringInput(input, fieldName) {
    if (!input || input.trim().length === 0) {
      throw new Error(`Invalid ${fieldName}: cannot be empty`);
    }
    return input.trim();
  }

  // ==================== UI METHODS ====================

  #validateYear(input) {
    const year = this.#validateNumberInput(input, "year");
    const currentYear = new Date().getFullYear();
    if (year < 1000 || year > currentYear) {
      throw new Error(`Invalid year: must be between 1000 and ${currentYear}`);
    }
    return year;
  }

  // Method to create a line
  line(char = "=", length = 65) {
    return "".padEnd(length, char);
  }

  // Method to create a header
  createHeader(title = "BOOK LIST") {
    const header = `
${"".padEnd(71, "=")}
${title.padStart(40)}
${"".padEnd(71, "=")}
${"ID".padEnd(4)} ${"TITLE".padEnd(20)} ${"AUTHOR".padEnd(20)} ${"YEAR".padEnd(
      8
    )} ${"DURATION/PAGES"}
${"".padEnd(71, "-")}`;
    return header;
  }

  // ==================== LIBRARY OPERATIONS ====================
  showMenus(data) {
    console.log(this.line("=", 30));
    console.log("MENU".padStart(17));
    console.log(this.line("=", 30));
    data.map((menu) => console.log(`${menu.no}) ${menu.name}`));
    console.log(this.line("=", 30));
  }
  showAvailableItems() {
    const checkBook = this.#items.filter((book) => book.available === true);
    console.log(this.createHeader("BOOK LIST"));
    checkBook.forEach((book) => console.log(book.getInfo()));
    console.log(this.line("=", 71));
  }
  addItem(item) {
    this.#items.push(item);
    this.saveData();
  }
  borrowItem(id) {
    const foundBook = this.#items.find((book) => book.id === id);

    if (!foundBook) {
      console.log("\nBook not found!\n");
      return;
    }

    if (foundBook.available === false) {
      console.log(`\nBook ${foundBook.title} already being borrowed.\n`);
      return;
    } else {
      foundBook.borrowItem();
      this.saveData();
      console.log(`\nBook ${foundBook.title} borrowed successfully.\n`);
    }
  }
  returnItem(id) {
    const foundBook = this.#items.find((book) => book.id === id);

    if (!foundBook) {
      console.log("\nBook not found!\n");
    }

    if (foundBook.available === true) {
      console.log(`\nBook ${foundBook.title} are available.\n`);
    } else {
      foundBook.returnItem();
      this.saveData();
      console.log(`\nBook ${foundBook.title} returned successfully!\n`);
    }
  }

  // ==================== MENU HANDLERS ====================
  #handleAddBook() {
    try {
      this.showMenus(this.#subMenus);
      const subChoice = parseInt(prompt("Choose type of book: "));

      if (isNaN(subChoice) || subChoice <= 0 || subChoice > 2) {
        console.log("\nInvalid choice.\n");
        return;
      }

      const bookTitle = this.#validateStringInput(
        prompt("Enter the title          : "),
        "title"
      );
      const bookAuthor = this.#validateStringInput(
        prompt("Enter the author name    : "),
        "author"
      );
      const bookYear = this.#validateYear(
        prompt("Enter the published year : ")
      );

      if (subChoice === 1) {
        const bookPages = this.#validateNumberInput(
          prompt("Enter the pages number   : "),
          "page count"
        );
        const bookGenre = this.#validateStringInput(
          prompt("Enter the book genre     : "),
          "genre"
        );

        const newBook = new Book(
          this.#getNextId(),
          bookTitle,
          bookAuthor,
          bookYear,
          true,
          bookPages,
          bookGenre
        );
        this.addItem(newBook);
      } else {
        const bookDuration = this.#validateNumberInput(
          prompt("Enter the duration (minutes) : "),
          "duration"
        );
        const bookNarrator = this.#validateStringInput(
          prompt("Enter the narrator name  : "),
          "narrator"
        );

        const newAudio = new AudioBook(
          this.#getNextId(),
          bookTitle,
          bookAuthor,
          bookYear,
          true,
          bookDuration,
          bookNarrator
        );
        this.addItem(newAudio);
      }

      console.log("\nBook added successfully!\n");
    } catch (error) {
      console.log(`\nError: ${error.message}\n`);
    }
  }

  #handleBorrowBook() {
    try {
      const borrowId = this.#validateNumberInput(
        prompt("Enter the book ID: "),
        "book ID"
      );
      this.borrowItem(borrowId);
    } catch (error) {
      console.log(`\n${error.message}\n`);
    }
  }

  #handleReturnBook() {
    try {
      const returnId = this.#validateNumberInput(
        prompt("Enter the book ID: "),
        "book ID"
      );
      this.returnItem(returnId);
    } catch (error) {
      console.log(`\n${error.message}\n`);
    }
  }

  // ==================== MAIN APPLICATION FLOW ====================
  start() {
    let userChoice;
    do {
      this.showMenus(this.#menus);

      try {
        userChoice = parseInt(prompt("Choose the menu: "));

        switch (userChoice) {
          case 1:
            this.showAvailableItems();
            break;
          case 2:
            this.#handleAddBook();
            break;
          case 3:
            this.#handleBorrowBook();
            break;
          case 4:
            this.#handleReturnBook();
            break;
          case 5:
            console.log("\nGoodbye! Your data has been saved.\n");
            break;
          default:
            console.log("\nInvalid menu choice. Please try again.\n");
        }
      } catch (error) {
        console.log("\nInvalid input. Please enter a number.\n");
        userChoice = 0; // Reset to continue loop
      }
    } while (userChoice !== 5);
  }
}

const library = new Library();
library.start();

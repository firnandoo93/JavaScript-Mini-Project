// Import prompt-sync module
const prompt = require("prompt-sync")({ sigint: true });

// Book list
const bookList = [
  {
    id: 1,
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    year: 2018,
    price: 109000,
  },
  {
    id: 2,
    title: "Happiness at Work",
    author: "Bernard Batubara",
    year: 2023,
    price: 118000,
  },
  {
    id: 3,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    year: 2020,
    price: 103000,
  },
  {
    id: 4,
    title: "Atomic Habits",
    author: "James Clear",
    year: 2020,
    price: 135000,
  },
  { id: 5, title: "Bumi", author: "Tere Liye", year: 2014, price: 112000 },
  {
    id: 6,
    title: "Bad Romance",
    author: "Bernard Batubara",
    year: 2022,
    price: 100000,
  },
  { id: 7, title: "Pulang", author: "Tere Liye", year: 2015, price: 105000 },
  {
    id: 8,
    title: "Not Giving a Fuck",
    author: "Mark Manson",
    year: 2019,
    price: 125000,
  },
  {
    id: 9,
    title: "Laut Bercerita",
    author: "Leila S. Chudori",
    year: 2021,
    price: 112000,
  },
  {
    id: 10,
    title: "Bersikap Bodo Amat",
    author: "Mark Manson",
    year: 2023,
    price: 128000,
  },
];

let status = true;
let bookCart = [];

const menus = [
  { no: 1, name: "Show Book List" },
  { no: 2, name: "Add Item to Cart" },
  { no: 3, name: "Search Book" },
  { no: 4, name: "Print Receipt" },
  { no: 5, name: "Exit" },
];

// Function showMenu()
function showMenu(data) {
  const menuList = `
${"".padEnd(25, "=")}
${"MENU".padStart(15)}
${"".padEnd(25, "=")}
${data.map((menu) => `${menu.no}) ${menu.name}`).join("\n")}
${"".padEnd(25, "=")}\n`;
  return menuList;
}

// Function showBook()
function showBook(data) {
  const books = `
${"".padEnd(66, "=")}
${"BOOK LIST".padStart(38)}
${"".padEnd(66, "=")}
${"ID".padEnd(4)}${"TITLE".padEnd(26)} ${"AUTHOR".padEnd(19)} ${"YEAR".padEnd(
    7
  )} ${"PRICE"}
${"".padEnd(66, "-")}
${data
  .map(
    (book) =>
      `${book.id.toString().padEnd(3)} ${book.title.padEnd(
        25
      )}  ${book.author.padEnd(19)} ${book.year
        .toString()
        .padEnd(7)} ${book.price.toLocaleString("id-ID")}`
  )
  .join("\n")}
${"".padEnd(66, "=")}`;
  return books;
}

// Function addChart()
function addChart(data) {
  const bookId = parseInt(prompt("Input Book ID: "));
  const searchBook = data.find((p) => p.id === bookId);

  // Input validation
  if (!searchBook) {
    return "\nBook not found.";
  }

  // Input quantity
  const bookQty = parseInt(prompt("Enter book quantity: "));

  // Input validation
  if (isNaN(bookQty) || bookQty <= 0) {
    return "Please input a valid number.";
  }

  // Push data to bookCart
  bookCart.push({
    id: searchBook.id,
    title: searchBook.title,
    quantity: bookQty,
    price: searchBook.price,
  });
  return "\nBook added to cart successfully.";
}

// Function searchBook()
function searchBook(data) {
  const bookYear = parseInt(prompt("Enter the published year: "));
  const searchYear = data.filter((book) => book.year === bookYear);
  const searchValidation = data.find((p) => p.year === bookYear);

  // Input validation
  if (isNaN(bookYear)) {
    return "\nInput not valid!";
  }

  if (!searchValidation) {
    return "\nBook not found!";
  }

  const show = `
${"".padEnd(66, "=")}
${"ID".padEnd(4)}${"TITLE".padEnd(26)} ${"AUTHOR".padEnd(19)} ${"YEAR".padEnd(
    7
  )} ${"PRICE"}
${"".padEnd(66, "-")}
${searchYear
  .map(
    (book) =>
      `${book.id.toString().padEnd(3)} ${book.title.padEnd(
        25
      )}  ${book.author.padEnd(19)} ${book.year
        .toString()
        .padEnd(7)} ${book.price.toLocaleString("id-ID")}`
  )
  .join("\n")}
${"".padEnd(66, "=")}`;
  return show;
}

// Function calculateTotal()
function calculateTotal(data) {
  const spending = data.reduce(
    (sum, book) => sum + book.price * book.quantity,
    0
  );
  return spending;
}

// Function printReceipt()
function printReceipt(data) {
  if (data.length === 0) {
    return "\nCart is empty!";
  }

  const show = `
${"".padEnd(50, "=")}
${"BOOK RECEIPT".padStart(30)}
${"".padEnd(50, "=")}
${"ID".padEnd(4)} ${"TITLE".padEnd(26)} ${"QTY".padEnd(5)} ${"PRICE"}
${"".padEnd(50, "-")}
${data
  .map(
    (book) =>
      `${book.id.toString().padEnd(4)} ${book.title.padEnd(26)} ${book.quantity
        .toString()
        .padEnd(5)} ${(book.price * book.quantity).toLocaleString("id-ID")}`
  )
  .join("\n")}
${"".padEnd(50, "-")}
TOTAL AMOUNT: Rp ${calculateTotal(data).toLocaleString("id-ID")}
${"".padEnd(50, "-")}
${"Thank you for shopping".padStart(35)}
${"".padEnd(50, "=")}
`;
  return show;
}

while (status) {
  console.log(showMenu(menus));
  const userChoice = parseInt(prompt("Choose the menu: "));

  if (userChoice === 1) {
    console.log(showBook(bookList));
  } else if (userChoice === 2) {
    console.log(addChart(bookList));
  } else if (userChoice === 3) {
    console.log(searchBook(bookList));
  } else if (userChoice === 4) {
    console.log(printReceipt(bookCart));
  } else if (userChoice === 5) {
    status = false;
    break;
  } else {
    console.log("\nInput not valid!\n");
    break;
  }
}

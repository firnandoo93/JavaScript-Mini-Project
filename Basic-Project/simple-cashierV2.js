// Import prompt-sync module
const prompt = require("prompt-sync")({ sigint: true });

// Product List
const products = [
  { code: "P01", name: "Indomie Goreng", price: 3500 },
  { code: "P02", name: "Aqua 600ml", price: 4000 },
  { code: "P03", name: "Ultramilk 250ml", price: 5000 },
  { code: "P04", name: "Kopi Kapal Api", price: 2000 },
  { code: "P05", name: "Sampo Sunsilk", price: 12000 },
];

// Menu List
const menus = [
  { no: 1, menu: "Show Product List" },
  { no: 2, menu: "Add Product" },
  { no: 3, menu: "Search Product" },
  { no: 4, menu: "Print Receipt" },
  { no: 5, menu: "Exit" },
];

let status = true;
let productBought = [];

// Show Menus
function showMenu(data) {
  const show = `
================================
             MENU
================================
${data.map((myMenu) => `${myMenu.no}) ${myMenu.menu}`).join("\n")}
================================`;
  return show;
}

// Function Show Product
function showProduct(data) {
  const show = `
================================
          PRODUCT LIST
================================
CODE    PRODUCT           PRICE
${data
  .map(
    (myProduct) =>
      `${myProduct.code.padEnd(7)} ${myProduct.name.padEnd(
        17
      )} ${myProduct.price.toLocaleString("id-ID")}`
  )
  .join("\n")}
================================`;
  return show;
}

// Function Add Product
function addProduct(data) {
  // Input product code
  const productCode = prompt("Input Product Code     : ").toUpperCase();
  const product = data.find((p) => p.code === productCode);

  // Product code validation
  if (!product) {
    console.log("\nProduct code is not valid. This item will be skipped");
    return;
  }

  // Input product quantity
  const productQty = parseInt(prompt("Input Product Quantity : "));

  // Product quantity validation
  if (isNaN(productQty) || productQty < 0) {
    console.log("\nQuantity must be a valid number. This item will be skipped");
    return;
  } else {
    console.log("\nProduct added successfully!");
  }

  productBought.push({
    code: product.code,
    name: product.name,
    price: product.price,
    quantity: productQty,
  });

  return productBought;
}

// Function Search Product
function searchProduct(data) {
  const searchCode = prompt("Input product code : ").toUpperCase();
  const checkCode = data.find((p) => p.code === searchCode);

  if (!checkCode) {
    console.log("\nNothing found");
    return "";
  }

  const myCode = data.filter((product) => product.code === searchCode);
  const show = `
================================
        SEARCH RESULTS
================================
CODE    PRODUCT           PRICE
${myCode
  .map(
    (myProduct) =>
      `${myProduct.code.padEnd(7)} ${myProduct.name.padEnd(
        17
      )} ${myProduct.price.toLocaleString("id-ID")}`
  )
  .join("\n")}
================================`;
  return show;
}

// Function Print Receipt
function printReceipt(data) {
  if (data.length === 0) {
    console.log("\nNo product have been added!");
    return "";
  }
  const show = `
======================================
               RECEIPT
======================================
CODE    PRODUCT          QTY   PRICE
--------------------------------------
${data
  .map(
    (myProduct) =>
      `${myProduct.code.padEnd(7)} ${myProduct.name.padEnd(
        16
      )} ${myProduct.quantity.toString().padEnd(5)} ${(
        myProduct.price * myProduct.quantity
      ).toLocaleString("id-ID")}`
  )
  .join("\n")}
--------------------------------------
TOTAL BELANJA : Rp ${calculateTotal(data).toLocaleString("id-ID")}
--------------------------------------
     Terimakasih telah berbelanja!
======================================\n`;
  return show;
}

// Function total spending
function calculateTotal(data) {
  const spending = data.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  return spending;
}

// Main
while (status) {
  console.log(showMenu(menus));
  const chooseMenu = parseInt(prompt("Choose the menu: "));

  if (chooseMenu === 1) {
    console.log(showProduct(products));
  } else if (chooseMenu === 2) {
    addProduct(products);
  } else if (chooseMenu === 3) {
    console.log(searchProduct(products));
  } else if (chooseMenu === 4) {
    console.log(printReceipt(productBought));
  } else if (chooseMenu === 5) {
    status = false;
    break;
  }
}

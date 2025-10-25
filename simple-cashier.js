// Import prompt-sync module
const prompt = require("prompt-sync")({ sigint: true });

// Daftar produk
const products = [
  { code: "P01", product: "Indomie", price: 3500 },
  { code: "P02", product: "Aqua 600ml", price: 4000 },
  { code: "P03", product: "Masako", price: 1000 },
  { code: "P04", product: "Ultramilk 250ml", price: 5000 },
  { code: "P05", product: "Sunsilk Shampoo", price: 12000 },
];

let produkDibeli = [];
let totalBelanja = 0;

const jumlahInput = parseInt(prompt("Masukkan jumlah barang yang dibeli : "));

// Validasi input
if (isNaN(jumlahInput) || jumlahInput <= 0) {
  console.log("Input tidak valid. Jumlah barang harus berupa angka positif.");
}

// Input detail produk
for (let i = 0; i < jumlahInput; i++) {
  console.log(`\nProduk No-${i + 1}`);
  const kodeProduk = prompt("Masukkan kode produk: ").toUpperCase();

  const produk = products.find((p) => p.code === kodeProduk);

  // Validasi kode produk
  if (!produk) {
    console.log("Kode produk tidak ditemukan. Lewati item ini.");
    continue;
  }

  const jumlahProduk = parseInt(prompt("Masukkan jumlah: "));

  // Validasi jumlah produk
  if (isNaN(jumlahProduk) || jumlahProduk <= 0) {
    console.log("Jumlah harus berupa angka positif. Lewati item ini.");
    continue;
  }

  // Tambahkan ke list produk dibeli
  produkDibeli.push({
    code: produk.code,
    product: produk.product,
    quantity: jumlahProduk,
    price: produk.price,
  });
}

// Output
console.log(`
====================================================
                  STRUK PEMBELIAN
====================================================`);
console.log(`Kode       Nama Barang      Jumlah         Subtotal`);
for (const { code, product, quantity, price } of produkDibeli) {
  console.log(
    `${code.padEnd(10)} ${product.padEnd(16)} ${quantity
      .toString()
      .padEnd(14)} ${(price * quantity).toLocaleString("id-ID")}`
  );
  totalBelanja += price * quantity;
}
console.log("----------------------------------------------------");
console.log(
  `${"TOTAL BELANJA".padEnd(42)} Rp ${totalBelanja.toLocaleString("id-ID")}`
);
console.log("----------------------------------------------------");
console.log(`           Terima kasih telah berbelanja!           `);
console.log("====================================================");

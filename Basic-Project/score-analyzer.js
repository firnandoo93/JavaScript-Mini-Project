// Data siswa
const dataSiswa = [
  { nama: "Andi", nilai: 85 },
  { nama: "Budi", nilai: 72 },
  { nama: "Citra", nilai: 90 },
  { nama: "Dewi", nilai: 65 },
  { nama: "Eka", nilai: 58 },
];

// Function penilaian
function getGrade(nilai) {
  if (nilai >= 90) return "A";
  else if (nilai >= 80) return "B";
  else if (nilai >= 70) return "C";
  else if (nilai >= 60) return "D";
  else return "E";
}

// Function average
function getAvg(data) {
  const totalNilai = data.reduce((sum, student) => sum + student.nilai, 0);
  const nilaiRerata = totalNilai / data.length;

  return nilaiRerata;
}

// Function nilai tertinggi
function highScore(data) {
  const highestScore = Math.max(...data.map((siswa) => siswa.nilai));
  const topStudent = data.filter((siswa) => siswa.nilai === highestScore);
  const studentName = topStudent.map((siswa) => siswa.nama).join(", ");
  return { nameHigh: studentName, scoreHigh: highestScore };
}

// Function nilai terendah
function lowScore(data) {
  const lowestScore = Math.min(...data.map((siswa) => siswa.nilai));
  const lowStudent = data.filter((siswa) => siswa.nilai === lowestScore);
  const studentName = lowStudent.map((siswa) => siswa.nama).join(", ");
  return { nameLow: studentName, scoreLow: lowestScore };
}

// Function Outup
function showOutput(data) {
  const { nameHigh, scoreHigh } = highScore(data);
  const { nameLow, scoreLow } = lowScore(data);
  const report = `
=========================================
         HASIL PENILAIAN SISWA
=========================================
${data
  .map(
    (siswa) =>
      `Nama: ${siswa.nama.padEnd(8)}| Nilai: ${siswa.nilai
        .toString()
        .padEnd(8)}| Grade: ${getGrade(siswa.nilai)}`
  )
  .join("\n")}
-----------------------------------------
Rata-rata Kelas : ${getAvg(data).toFixed(1)}
Nilai Tertinggi : ${scoreHigh} (${nameHigh})
Nilai Terendah  : ${scoreLow} (${nameLow})
=========================================
  `;
  return report;
}

console.log(showOutput(dataSiswa));

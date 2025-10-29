const students = [
  { name: "Andi", score: 85 },
  { name: "Budi", score: 74 },
  { name: "Sinta", score: 92 },
  { name: "Rani", score: 60 },
  { name: "Dika", score: 45 },
];

let totalScore = 0;

console.log(`
=============================
    HASIL PENILAIAN SISWA
=============================`);

for (const { name, score } of students) {
  if (score < 0 || score > 100) {
    console.log(`Nilai tidak valid untuk ${name}`);
    continue;
  }

  let grade;
  totalScore += score;

  if (score >= 90) {
    grade = "A";
  } else if (score >= 80) {
    grade = "B";
  } else if (score >= 70) {
    grade = "C";
  } else if (score >= 60) {
    grade = "D";
  } else {
    grade = "E";
  }

  console.log(`Name  : ${name}`);
  console.log(`Score : ${score}`);
  console.log(`Grade : ${grade}`);
  console.log("-----------------------------");
}
console.log(`=============================
Average class score: ${(totalScore / students.length).toFixed(2)}
=============================`);

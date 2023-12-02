const fs = require("fs");
let sum = 0;

const NUMBERS = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const isLitteral = (s) => NUMBERS.indexOf(s) >= 0;
const toDecimal = (s) => NUMBERS.indexOf(s) + 1;

fs.readFile("./inputs.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  data.split("\r\n").map((s) => {
    let first = s.match(/(\d|one|two|three|four|five|six|seven|eight|nine)/)[0];
    let last = s.match(
      /.*(\d|one|two|three|four|five|six|seven|eight|nine)/
    )[1];

    sum += parseInt(
      `${isLitteral(first) ? toDecimal(first) : first}${
        isLitteral(last) ? toDecimal(last) : last
      }`
    );
  });

  console.log(sum);
});

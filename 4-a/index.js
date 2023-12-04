const fs = require("fs");

fs.readFile("./inputs.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let sum = 0;
  let sets = [];
  data.split("\r\n").forEach((l) =>
    sets.push(
      l
        .split(": ")[1]
        .split(" | ")
        .map((s) => s.match(/[\d]+/g).map((n) => +n))
    )
  );

  sets.forEach((set) => {
    const [win, get] = set;
    const matchingValues = get.filter((element) => win.includes(element));

    let cardValue =
      matchingValues.length > 0
        ? matchingValues.reduce((a, c) => a * 2, 1) / 2
        : 0;
    sum += cardValue;
  });

  console.log(sum);
});

const fs = require("fs");

const isSpecialChar = (c) => c !== "." && !c.match(/\d/);

const isAdjacentToSpecialChar = (
  number,
  numberIndex,
  line,
  lineIndex,
  lines
) => {
  let flag = false;
  number.split("").forEach((el, i) => {
    // Top
    // If lineIndex == 0 Don't look l-1
    if (lineIndex !== 0) {
      // Left
      if (
        numberIndex !== 0 &&
        i == 0 &&
        isSpecialChar(lines[lineIndex - 1][numberIndex + i - 1])
      )
        flag = true;

      // Center
      if (isSpecialChar(lines[lineIndex - 1][numberIndex + i])) flag = true;

      // Right
      if (
        numberIndex + i !== line.length - 1 &&
        i == number.length - 1 &&
        isSpecialChar(lines[lineIndex - 1][numberIndex + i + 1])
      )
        flag = true;
    }

    // Left
    if (numberIndex !== 0 && i == 0 && isSpecialChar(line[numberIndex - 1]))
      flag = true;

    // Right
    if (
      numberIndex + i !== line.length - 1 &&
      i == number.length - 1 &&
      isSpecialChar(line[numberIndex + i + 1])
    )
      flag = true;

    // Bottom
    // If lineIndex == lines.length-1 don't look l+1
    if (lineIndex < lines.length - 1) {
      // Left
      if (
        numberIndex !== 0 &&
        i == 0 &&
        isSpecialChar(lines[lineIndex + 1][numberIndex + i - 1])
      )
        flag = true;

      // Center
      if (isSpecialChar(lines[lineIndex + 1][numberIndex + i])) flag = true;

      // Right
      if (
        numberIndex + i !== line.length - 1 &&
        i == number.length - 1 &&
        isSpecialChar(lines[lineIndex + 1][numberIndex + i + 1])
      )
        flag = true;
    }
  });
  return flag;
};

fs.readFile("./inputs.txt", "utf8", (err, data) => {
  if (err) {
    return;
  }

  const lines = data.split("\r\n");
  let sum = 0;

  lines.forEach((line, lineIndex) => {
    let arr = [];
    let re = /[\d]+/g;
    while ((arr = re.exec(line)) !== null) {
      if (
        isAdjacentToSpecialChar(
          arr[0],
          re.lastIndex - arr[0].length,
          line,
          lineIndex,
          lines
        )
      )
        sum += +arr[0];
    }
  });

  console.log(sum);
});

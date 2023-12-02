const fs = require("fs");

fs.readFile("./inputs.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // The sum of the powers
  let sum = 0;
  // Get an array of all the games
  data.split("\r\n").map((l) => {
    // Get the game and the sets of the game
    let [game, sets] = l.split(": ");
    // Loop on the different sets
    // To get the minimum cubes needed
    const { red, green, blue } = sets
      .split("; ")
      .map((s) =>
        // Transform the array to an object of colors
        s.split(", ").reduce((a, b) => {
          let [n, color] = b.split(" ");
          a[color] = +n;
          return a;
        }, {})
      )
      // Reduce the array to one object of the minimum
      // cubes needed for the game
      .reduce(
        (a, { red, blue, green }) => {
          return {
            red: Math.max(a.red, red ?? 0),
            green: Math.max(a.green, green ?? 0),
            blue: Math.max(a.blue, blue ?? 0),
          };
        },
        { red: 0, green: 0, blue: 0 }
      );

    // Compute the power of the game
    const power = red * green * blue;
    // Add to the sum
    sum += power
  });
  console.log(sum);
});

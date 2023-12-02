const fs = require("fs");

fs.readFile("./inputs.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // The sum of the possible games
  let sum = 0;
  // Get an array of all the games
  data.split("\r\n").map((l) => {
    // Flag to keep track if the game is possible or not
    let flag = true;
    // Get the game and the sets of the game
    let [game, sets] = l.split(": ");
    // Loop on the different sets
    // And see if the game is possible
    sets.split("; ").map((s) => {
      const els = s.split(", ");
      // Loop on the cubes of the subset
      for (let i = 0; i < els.length; i++) {
        // Get number of cubes and their color
        let [n, color] = els[i].split(" ");
        // Check if game impossible
        if (
          (color === "red" && n > 12) ||
          (color === "green" && n > 13) ||
          (color === "blue" && n > 14)
        ) {
          flag = false;
        }
      }
    });
    // Add the game ID if game possible
    if (flag) sum += +(game.replace("Game ", ""));
  });
  console.log(sum);
});

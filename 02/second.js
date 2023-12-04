import { input } from "./input.js";

/**
 * For each game,
 * find the minimum set of cubes that must have been present.
 * What is the sum of the power of these sets?
 */

let powerOfGames = [];

game: for (let game of input.split("\n")) {
  let minBlocks = {
    red: 0,
    green: 0,
    blue: 0,
  };
  let gameSplit = game.split(": ");
  let gameId = parseInt(gameSplit[0].split(" ")[1]);

  for (let hand of gameSplit[1].split("; ")) {
    for (let block of hand.split(", ")) {
      let blockSplit = block.split(" ");
      let numberOfBlocks = parseInt(blockSplit[0]);
      let color = blockSplit[1];
      if (numberOfBlocks > minBlocks[color]) {
        minBlocks[color] = numberOfBlocks;
      }
    }
  }

  powerOfGames.push(minBlocks.red * minBlocks.blue * minBlocks.green);
}

let powerOfGamesSum = powerOfGames.reduce((acc, cur) => acc + cur);

console.log(powerOfGamesSum);

import { input } from "./input.js";

/**
 * Determine which games would have been possible if the bag had been loaded with only
 * 12 red cubes, 13 green cubes, and 14 blue cubes.
 * What is the sum of the IDs of those games?
 */

let maxBlocks = {
  red: 12,
  green: 13,
  blue: 14,
};

let possibleGames = [];

game: for (let game of input.split("\n")) {
  let gameSplit = game.split(": ");
  let gameId = parseInt(gameSplit[0].split(" ")[1]);

  for (let hand of gameSplit[1].split("; ")) {
    for (let block of hand.split(", ")) {
      let blockSplit = block.split(" ");
      if (parseInt(blockSplit[0]) > maxBlocks[blockSplit[1]]) {
        continue game;
      }
    }
  }

  possibleGames.push(gameId);
}

let possibleGamesSum = possibleGames.reduce((acc, cur) => acc + cur);

console.log(possibleGamesSum);

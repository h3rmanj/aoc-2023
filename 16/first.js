import { input } from "./input.js";

let grid = input.split("\n");

let beams = [
  {
    x: 0,
    y: 0,
    vX: 1,
    vY: 0,
  },
];

let energizedTiles = new Array(grid.length)
  .fill(null)
  .map(() => new Array(grid[0].length).fill(0));

while (beams.length > 0) {
  beams = beams
    .map(({ x, y, vX, vY }) => {
      if (x < 0 || y < 0 || y >= grid.length || x >= grid[0].length) {
        return null;
      }

      let tile = grid[y][x];

      let beam = { x, y, vX, vY };

      if (tile === "/") {
        beam.vX = vY * -1;
        beam.vY = vX * -1;
      }

      if (tile === "\\") {
        beam.vY = vX;
        beam.vX = vY;
      }

      if (tile === "-" && beam.vY !== 0) {
        if (energizedTiles[y][x] === 2) {
          return null;
        }

        energizedTiles[y][x] = 2;

        return [
          {
            x: x - 1,
            y,
            vX: -1,
            vY: 0,
          },
          {
            x: x + 1,
            y,
            vX: 1,
            vY: 0,
          },
        ];
      }

      if (tile === "|" && beam.vX !== 0) {
        if (energizedTiles[y][x] === 2) {
          return null;
        }

        energizedTiles[y][x] = 2;

        return [
          {
            x,
            y: y - 1,
            vX: 0,
            vY: -1,
          },
          {
            x,
            y: y + 1,
            vX: 0,
            vY: 1,
          },
        ];
      }

      if (energizedTiles[y][x] !== 2) {
        energizedTiles[y][x] = 1;
      }

      beam.x += beam.vX;
      beam.y += beam.vY;

      return beam;
    })
    .filter((a) => a)
    .flat();
}

console.log(energizedTiles.flat().filter((t) => t).length);

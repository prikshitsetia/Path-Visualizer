const dRow = [-1, 0, 1, 0, -1, 1, -1, 1];
const dCol = [0, 1, 0, -1, -1, -1, 1, 1];

function heuristic(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function astar(grid, startNode, finishNode) {
  let visitedNodesInOrder = [];
  let openSet = [];
  let closedSet = [];

  openSet.push(grid[startNode.row][startNode.col]);
  visitedNodesInOrder.push(grid[startNode.row][startNode.col]);
  grid[startNode.row][startNode.col].isVisited = true;

  while (openSet.length > 0) {
    //get minimum
    var winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    var current = openSet[winner];

    console.log(current.row, current.col);

    if (current.isFinish) {
      console.log("end");
      visitedNodesInOrder.push(current);
      return visitedNodesInOrder;
    }

    for (var i = openSet.length - 1; i >= 0; i--) {
      if (openSet[i] === current) {
        console.log("found");
        openSet.splice(i, 1);
      }
    }
    closedSet.push(current);

    //add neibhours
    for (let i = 0; i < 4; i++) {
      const adjx = current.row + dRow[i];
      const adjy = current.col + dCol[i];
      if (isValid(grid, adjx, adjy)) {
        if (!closedSet.includes(grid[adjx][adjy])) {
          var tempG = current.g + 1;
          if (openSet.includes(grid[adjx][adjy])) {
            if (tempG < grid[adjx][adjy].g) {
              grid[adjx][adjy].g = tempG;
            }
          } else {
            grid[adjx][adjy].g = tempG;
            openSet.push(grid[adjx][adjy]);
          }
          grid[adjx][adjy].isVisited = true;

          grid[adjx][adjy].h = heuristic(grid[adjx][adjy], finishNode);
          grid[adjx][adjy].f = grid[adjx][adjy].g + grid[adjx][adjy].h;
          grid[adjx][adjy].previousNode = current;
        }
      }
    }
    visitedNodesInOrder.push(current);
  }
}
function isValid(grid, row, col) {
  if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length) {
    return false;
  }
  if (grid[row][col].isWall) return false;
  return true;
}

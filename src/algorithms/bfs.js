const dRow = [-1, 0, 1, 0];
const dCol = [0, 1, 0, -1];

export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];

  let queue = [grid[startNode.row][startNode.col]];
  grid[startNode.row][startNode.col].isVisited = true;

  while (queue.length !== 0) {
    let currentNode = queue[0];

    const x = currentNode.row;
    const y = currentNode.col;

    if (grid[x][y].isFinish) {
      visitedNodesInOrder.push(currentNode);
      return visitedNodesInOrder;
    }
    queue.shift();
    for (let i = 0; i < 4; i++) {
      const adjx = x + dRow[i];
      const adjy = y + dCol[i];
      if (isValid(grid, adjx, adjy)) {
        queue.push(grid[adjx][adjy]);
        grid[adjx][adjy].isVisited = true;
        grid[adjx][adjy].previousNode = currentNode;
      }
    }
    visitedNodesInOrder.push(currentNode);
  }
  return visitedNodesInOrder;
}
function isValid(grid, row, col) {
  if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length) {
    return false;
  }
  if (grid[row][col].isVisited) {
    return false;
  }
  if (grid[row][col].isWall) return false;
  return true;
}

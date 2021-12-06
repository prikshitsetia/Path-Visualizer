const dRow = [-1, 0, 1, 0];
const dCol = [0, 1, 0, -1];

export function dfs(grid, startNode, finishNode) {
  var st = [];
  const visitedNodesInOrder = [];

  st.push(startNode);
  startNode.isVisited = true;

  while (st.length !== 0) {
    var curr = st[st.length - 1];
    console.log(curr);
    st.pop();
    var row = curr.row;
    var col = curr.col;

    if (curr === finishNode) {
      //[row][col].isVisited = true;
      //visitedNodesInOrder.push(curr);
      return visitedNodesInOrder;
    }
    grid[row][col].isVisited = true;

    for (var i = 0; i < 4; i++) {
      var adjx = row + dRow[i];
      var adjy = col + dCol[i];
      if (isValid(grid, adjx, adjy)) {
        st.push(grid[adjx][adjy]);
        grid[adjx][adjy].previousNode = curr;
      }
    }
    visitedNodesInOrder.push(curr);
  }
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

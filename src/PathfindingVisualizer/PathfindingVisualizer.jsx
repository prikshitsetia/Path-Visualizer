import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstra } from "../algorithms/dijkstra";
import { bfs } from "../algorithms/bfs";

import "./PathfindingVisualizer.css";

let START_NODE_ROW = 10;
let START_NODE_COL = 15;
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 35;
let speed = 10;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();

    this.state = {
      grid: [],
      mouseIsPressed: false,
      isStartNodeClicked: false,
      isVisualizing: false,
      isFinishNodeClicked: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    if (!this.state.isStartNodeClicked) {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    if (!this.state.isStartNodeClicked) {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    }
  }

  handleMouseClick(row, col) {
    if (this.state.isStartNodeClicked) {
      const newGrid = getNewGridWithChangedStartNode(this.state.grid, row, col);
      this.setState({
        grid: newGrid,
        isStartNodeClicked: false,
        mouseIsPressed: false,
      });
      START_NODE_ROW = row;
      START_NODE_COL = col;
    } else if (this.state.isFinishNodeClicked) {
      const newGrid = getNewGridWithChangedFinishNode(
        this.state.grid,
        row,
        col
      );
      this.setState({
        grid: newGrid,
        isFinishNodeClicked: false,
        mouseIsPressed: false,
      });
      FINISH_NODE_ROW = row;
      FINISH_NODE_COL = col;
    } else {
      if (row === START_NODE_ROW && col === START_NODE_COL) {
        this.setState({ isStartNodeClicked: true, mouseIsPressed: false });
      } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
        this.setState({ isFinishNodeClicked: true, mouseIsPressed: false });
      }
    }
  }
  handleMouseUp(row, col) {
    this.setState({
      mouseIsPressed: false,
    });
  }
  resetBoard() {
    const newGrid = getInitialGrid();
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        if (row === START_NODE_ROW && col === START_NODE_COL) {
          document.getElementById(`node-${row}-${col}`).className =
            "node node-start";
        } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
          document.getElementById(`node-${row}-${col}`).className =
            "node node-finish";
        } else {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
      }
    }
    this.setState({ grid: newGrid });
  }
  clearPath() {
    let newGrid = getInitialGrid();
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        if (row === START_NODE_ROW && col === START_NODE_COL) {
          document.getElementById(`node-${row}-${col}`).className =
            "node node-start";
        } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
          document.getElementById(`node-${row}-${col}`).className =
            "node node-finish";
        } else if (this.state.grid[row][col].isWall) {
          document.getElementById(`node-${row}-${col}`).className =
            "node node-wall";
          newGrid[row][col].isWall = true;
          newGrid[row][col].isVisited = false;
        } else if (this.state.grid[row][col].isVisited) {
          document.getElementById(`node-${row}-${col}`).className = "node";
          newGrid[row][col].isVisited = false;
        }
      }
    }
    this.setState({ grid: newGrid });
  }
  animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, speed * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, speed * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, speed * i * 2);
    }
    this.setState({ isVisualizing: false });
  }

  visualizeAlgo(event) {
    const algo = event.target.value;
    this.setState({ isVisualizing: true });
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder = null;

    switch (algo) {
      case "dijkstra":
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        break;
      case "bfs":
        visitedNodesInOrder = bfs(grid, startNode, finishNode);
        break;
      default:
        break;
    }
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  speedHandler(e) {
    if (e.target.value === "fast") {
      speed = 10;
    } else if (e.target.value === "average") {
      speed = 20;
    } else {
      speed = 40;
    }
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <nav className="main-nav">
          <div className="logo">
            <h2>
              <span>P</span>ath <span>V</span>isualizer
            </h2>
          </div>
          <div className="menu-link">
            <ul>
              <li>
                <select
                  name="algo"
                  id="algoList"
                  onChange={(e) => this.visualizeAlgo(e)}
                  disabled={this.state.isVisualizing}
                >
                  <option value="dijkstra">Dijkstra</option> 
                  <option value="bfs">BFS</option>
                </select>
              </li>
              <li>
                <button
                  disabled={this.state.isVisualizing}
                  className="button"
                  onClick={() => this.resetBoard()}
                >
                  Reset Board
                </button>
              </li>{" "}
              <li>
                <button
                  disabled={this.state.isVisualizing}
                  className="button"
                  onClick={() => this.clearPath()}
                >
                  Clear Path
                </button>
              </li>{" "}
              <li>
                <select
                  name="speed"
                  id="speedList"
                  onChange={(e) => this.speedHandler(e)}
                >
                  <option selected value="fast">
                    Fast
                  </option>
                   <option value="average">Average</option>
                  <option value="slow">Slow</option>
                </select>
              </li>
            </ul>
          </div>
        </nav>

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp(row, col)}
                      row={row}
                      onClick={() => this.handleMouseClick(row, col)}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
const getNewGridWithChangedStartNode = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isStart: true,
    isWall: false,
  };
  const previousStart = newGrid[START_NODE_ROW][START_NODE_COL];
  const newPrevNod = {
    ...previousStart,
    isStart: false,
    isWall: false,
  };
  newGrid[START_NODE_ROW][START_NODE_COL] = newPrevNod;
  newGrid[row][col] = newNode;
  return newGrid;
};
const getNewGridWithChangedFinishNode = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isFinish: true,
    isWall: false,
  };
  const previousStart = newGrid[FINISH_NODE_ROW][FINISH_NODE_COL];
  const newPrevNod = {
    ...previousStart,
    isFinish: false,
    isWall: false,
  };
  newGrid[FINISH_NODE_ROW][FINISH_NODE_COL] = newPrevNod;
  newGrid[row][col] = newNode;
  return newGrid;
};
function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

import React, { Component } from 'react';
import Field from './Field';
import Player from './Player'
import { getCanvasPosition, calculateAngle } from '../utils/formulas';
import GameBoard from './GameBoard'
import Cell from './Cell'
import Score from './Score'
import Timer from './Timer'

const gameHeight = 800;
const viewBox = [0, 0, window.innerWidth, gameHeight];
viewBox = [-100, -100, 5100, 5100];
// console.log('window.innerWidth', window.innerWidth)
viewBox = [window.innerWidth / -2, 100 - window.innerHeight, window.innerWidth, window.innerHeight];

const CELL_NUM_HEIGHT = 100;
const CELL_NUM_WIDTH = 200;

const CELL_SIZE = 10;
const WIDTH = CELL_NUM_WIDTH * CELL_SIZE;
const HEIGHT = CELL_NUM_HEIGHT * CELL_SIZE;

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos_x: 0,
            pos_y: 0,
            cameraSize: 2500,
            cells: [],
            Cells: [],
            rows: CELL_NUM_HEIGHT,
            cols: CELL_NUM_WIDTH,
            board: [],
            score: 0,
            GameState: 0,
            playerName: "player",
        }
    }
    componentDidMount() {
        var new_board = this.makeEmptyBoard();
        var new_cells = this.makeEmptyCells(new_board);
        this.setState({ board: new_board });
        this.setState({ cells: new_cells });

        var Cells =
            new_cells.map(cell => (
                <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} id={`${cell.x},${cell.y}`} color={0} CELL_SIZE={CELL_SIZE} />
            ))
        this.setState({ Cells: Cells });

    }
    makeEmptyBoard() {
        let board = [];
        for (let y = 0; y < this.state.rows; y++) {
            board[y] = [];
            for (let x = 0; x < this.state.cols; x++) {
                board[y][x] = 0;
            }
        }
        return board;
    }
    makeEmptyCells(board) {
        let cells = [];
        for (let y = 0; y < this.state.rows; y++) {
            for (let x = 0; x < this.state.cols; x++) {
                cells.push({ x: x, y: y });
            }
        }
        return cells;
    }
    updateCamera = (pos_x, pos_y, cameraSize) => {
        this.setState({
            pos_x: pos_x,
            pos_y: pos_y,
            cameraSize: cameraSize,
        })
    }
    clickStart = () => {
        if (this.state.GameState === 0) {
            this.setState({ GameState: 1 });
        }
        // document.getElementById("sb").disabled = true;
    }
    clickRestart = () => {
        if (this.state.GameState === 2) {
            location.reload();
        }
    }
    handleClick = (event, pos_x, pos_y) => {
        if (this.state.GameState !== 1) return;
        this.setState({
            pos_x: pos_x,
            pos_y: pos_y,
        });
        const elemOffset = { x: pos_x, y: pos_y };
        var canvasMousePosition = getCanvasPosition(event);
        if(canvasMousePosition.x>2000) return;
        const offsetX = canvasMousePosition.x - elemOffset.x;
        const offsetY = canvasMousePosition.y - elemOffset.y;

        const max_splat_length = 300;

        const offset_length = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
        // console.log(offset_length);

        var splatX_1 = offsetX;
        var splatY_1 = offsetY;

        if (offset_length > max_splat_length) {
            splatX_1 = offsetX / offset_length * max_splat_length;
            splatY_1 = offsetY / offset_length * max_splat_length;
        }
        var splatX_2 = splatX_1 / 2;
        var splatY_2 = splatY_1 / 2;
        var splatX_3 = splatX_1 / 4;
        var splatY_3 = splatY_1 / 4;
        // console.log(elemOffset.x, elemOffset.y);

        const x1 = Math.floor((splatX_1 + elemOffset.x) / CELL_SIZE);
        const y1 = Math.floor((splatY_1 + elemOffset.y) / CELL_SIZE);
        const x2 = Math.floor((splatX_2 + elemOffset.x) / CELL_SIZE);
        const y2 = Math.floor((splatY_2 + elemOffset.y) / CELL_SIZE);
        const x3 = Math.floor((splatX_3 + elemOffset.x) / CELL_SIZE);
        const y3 = Math.floor((splatY_3 + elemOffset.y) / CELL_SIZE);

        var new_board = this.state.board;

        const splat_Y_min = pos_y + splatY_1 - 100;
        const splat_Y_max = pos_y + splatY_1 + 100;
        const splat_X_min = pos_x + splatX_1 - 100;
        const splat_X_max = pos_x + splatX_1 + 100;
        const search_start_x = Math.floor(Math.max(Math.min(pos_x - 50, splat_X_min), 0) / CELL_SIZE);
        const search_end_x = Math.floor(Math.min(Math.max(pos_x + 50, splat_X_max), this.state.cols * CELL_SIZE) / CELL_SIZE);
        const search_start_y = Math.floor(Math.max(Math.min(pos_y - 50, splat_Y_min), 0) / CELL_SIZE);
        const search_end_y = Math.floor(Math.min(Math.max(pos_y + 50, splat_Y_max), this.state.rows * CELL_SIZE) / CELL_SIZE);

        // const search_start_y = Math.floor((pos_y-50) / CELL_SIZE);

        // const search_end_x = Math.floor((pos_x+splatX_1+50) / CELL_SIZE);
        // const search_end_y = Math.floor((pos_y+splatY_1+50) / CELL_SIZE);
        const r1 = 6;
        const r2 = r1 / 1.5;
        const r3 = r1 / 2;
        var score_count = 0;
        for (let y = search_start_y; y < search_end_y; y++) {
            for (let x = search_start_x; x < search_end_x; x++) {
                var d1 = Math.sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
                if (d1 < r1) {
                    new_board[y][x] = 1;
                }
                var d2 = Math.sqrt((x - x2) * (x - x2) + (y - y2) * (y - y2));
                if (d2 < r2) {
                    new_board[y][x] = 1;
                }
                var d3 = Math.sqrt((x - x3) * (x - x3) + (y - y3) * (y - y3));
                if (d3 < r3) {
                    new_board[y][x] = 1;
                }
                if (new_board[y][x] === 1) {
                    var cell = document.getElementById(`${x},${y}`);
                    // console.log(cell);
                    cell.style.background = "#91DCA8"
                }
            }
        }
        for (let y = 0; y < this.state.rows; y++) {
            for (let x = 0; x < this.state.cols; x++) {
                if (new_board[y][x] === 1) {
                    score_count++;
                }
            }
        }
        this.setState({ board: new_board });
        this.setState({ score: score_count });
    }
    inInk = (pos_x, pos_y) => {
        const x = Math.floor(pos_x / CELL_SIZE);
        const y = Math.floor(pos_y / CELL_SIZE);
        if (this.state.board[y][x] !== 0) {
            return 1;
        } else {
            return 0;
        }
    }
    endGame = () => {
        // fetch('/data', {
        //     body: JSON.stringify({
        //         name: this.state.playerName,
        //         score: this.state.score}), // must match 'Content-Type' header
        //     headers: {
        //       'content-type': 'application/json'
        //     },
        //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //   })
        //   .then(response => response.json()) 

        this.setState({ GameState: 2 });
    }
    onPlayerInput = (e) => {
        if (e.key === "Enter") {
            var value = e.target.value;
            this.setState({
                playerName: value
            })
        }
    }
    render() {
        var pos_x = this.state.pos_x;
        var pos_x = this.state.pos_y;
        var cameraSize = this.state.cameraSize;
        if (this.state.GameState === 2) {
            return (
                <div className="endgame">
                    <div>Game Over!</div>
                    <div>Your Score: {this.state.score}</div>
                    <button className="restart-button" onClick={this.clickRestart}>Restart</button>
                </div>
            );
        } else {
            return (
                <div>
                    <svg className="App"
                        id="aliens-go-home-canvas"
                        preserveAspectRatio="xMidYMid meet"
                        // onMouseMove={this.trackMouse}
                        // viewBox={[cameraSize / -2 + pos_x,
                        // cameraSize / -2 + pos_y,
                        //     cameraSize,
                        //     cameraSize]}
                        viewBox={[-100, -100, 2200, 1200]}
                    >
                        <defs>
                            <filter id="shadow">
                                <feDropShadow dx="1" dy="1" stdDeviation="2" />
                            </filter>
                        </defs>
                        <Field />

                        <foreignObject x="0" y="0" width="5000" height="5000">
                            <GameBoard pos_x={this.state.pos_x} pos_y={this.state.pos_y}
                                cells={this.state.Cells} />
                        </foreignObject>

                        <Player handleClick={this.handleClick} inInk={this.inInk} playerName={this.state.playerName} GameState={this.state.GameState} />
                        <Score score={this.state.score} />
                        <Timer GameState={this.state.GameState} endGame={this.endGame} />
                    </svg>
                    <input className="player_name_input"
                        placeholder="player"
                        onKeyPress={e => this.onPlayerInput(e)}
                    />
                    <button id="sb" className="start-button" onClick={this.clickStart}>Start</button>
                </div>

            );
        }
    }

};

export default Canvas;

import React from 'react';
import './GameBoard.css';
import { encodeBase64 } from '../utils/utils';

const CELL_NUM_HEIGHT = 100;
const CELL_NUM_WIDTH = 200;

const CELL_SIZE = 10;
const WIDTH = CELL_NUM_WIDTH * CELL_SIZE;
const HEIGHT = CELL_NUM_HEIGHT * CELL_SIZE;

class GameBoard extends React.Component {

    constructor(props) {
        super(props);
        this.rows = HEIGHT / CELL_SIZE;
        this.cols = WIDTH / CELL_SIZE;
        // this.board = this.makeEmptyBoard();
        this.state = {
            // cells: [],
        }
    }

    render() {
        // console.log(btoa(String.fromCharCode.apply(null, new Uint8Array(this.board.flat()))));
        const { cells, interval, isRunning } = this.state;
        return (
            <div className="Board"
                style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px` }}
                onClick={this.handleClick}
                // onClick={this.props.onClick}
                ref={(n) => { this.boardRef = n; }}>

                {this.props.cells}
            </div>
        );
    }
}


export default GameBoard;
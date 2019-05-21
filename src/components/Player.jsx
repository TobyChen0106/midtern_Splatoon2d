import React, { Component } from 'react';
import { getKeyDownState, getKeyUpState } from '../utils/utils'
import { getCanvasPosition, calculateAngle } from '../utils/formulas';
import "./Player.css";

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playerPos: { x: 0, y: 0 },
      playerAngle: 0,
      playerSpeed: 1,
      keyDownStatus: { a: 0, w: 0, s: 0, d: 0 },
      playerMoveDir: { x: 0, y: 0 },
      cameraSize: 2000,
      name: "player",
      dive: 0,
      vanish: 0,
    }
  }

  componentDidMount = () => {
    window.addEventListener("keyup", this.onKeyUp);
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("mousemove", this.trackMouse);
    window.addEventListener("click", e => this.props.handleClick(e, this.state.playerPos.x, this.state.playerPos.y), false);
    setInterval(() => {
      this.updatePlayerPos();
    }, 20);
  }
  onKeyDown = e => {
    var new_State = getKeyDownState(e, this.state);
    var new_keyState = new_State[0];
    var new_dirState = new_State[1];
    this.setState(new_keyState);
    this.setState(new_dirState);

    if (e.key === ' ') {
      this.setState({ dive: 1 });
    }
  }

  onKeyUp = e => {
    var new_State = getKeyUpState(e, this.state);
    var new_keyState = new_State[0];
    var new_dirState = new_State[1];
    this.setState(new_keyState);
    this.setState(new_dirState);
    if (e.key === ' ') {
      this.setState({ dive: 0 });
    }
  }
  updatePlayerPos = () => {
    if (this.props.GameState === 1) {
      var p_x = this.state.playerPos.x;
      var p_y = this.state.playerPos.y;
      var inink = this.props.inInk(this.state.playerPos.x, this.state.playerPos.y);
      var s;
      if (this.state.dive === 1 && inink === 1) {
        s = 5;
        this.setState({ vanish: 1 });
      }
      else {
        s = this.state.playerSpeed;;
        this.setState({ vanish: 0 });
      }
      var d_x = this.state.playerMoveDir.x;
      var d_y = this.state.playerMoveDir.y;
      var new_x = Math.min(Math.max(p_x + d_x * s, 0), 2000);
      var new_y = Math.min(Math.max(p_y + d_y * s, 0), 1000);
      this.setState({ playerPos: { x: new_x, y: new_y } });
      // this.props.updateCamera(p_x, p_y, this.state.cameraSize);
    }
  }
  trackMouse = (event) => {
    var canvasMousePosition = getCanvasPosition(event);
    var pos_x = this.state.playerPos.x;
    var pos_y = this.state.playerPos.y;
    this.setState({
      playerAngle:
        calculateAngle(pos_x, pos_y,
          canvasMousePosition.x,
          canvasMousePosition.y)
    });
  }
  render() {
    const transform = `rotate(${this.state.playerAngle}, ${this.state.playerPos.x}, ${this.state.playerPos.y})`;
    const playerStyle = {
      fill: '#91DCA8',
      stroke: '#496D54',
      strokeWidth: '4px',
    }
    const vanishStyle = {
      fill: 'none',
      stroke: '#FFFFFF',
      strokeWidth: '4px',
      opacity: "0.2",
    }
    const pos_x = this.state.playerPos.x;
    const pos_y = this.state.playerPos.y;
    if (this.state.vanish === 1) {
      return (
        <g >
          <g transform={transform}>
            <circle cx={0} cy={0} r="20" style={vanishStyle} transform={`translate(${pos_x},${pos_y})`}>
              <animateTransform attributeName="transform"
                type="scale"
                additive="sum"
                values="1; 1.5; 1; 0.8; 1"
                // begin="0s"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
          <text className="playerName" textAnchor="middle"
            x={pos_x} y={pos_y + 60} >
            {this.state.name}
          </text>
        </g>
      );
    }
    else {
      return (
        <g >
          <g transform={transform}>
            <circle cx={pos_x - 15} cy={pos_y - 30} r="7" style={playerStyle} >
              <animate attributeName="cx" to={pos_x - 8} dur="0.5s" repeatCount="indefinite" />
            </circle>
            <circle cx={pos_x + 15} cy={pos_y - 30} r="7" style={playerStyle} >
              <animate attributeName="cx" to={pos_x + 8} dur="0.5s" repeatCount="indefinite" />
            </circle>

            <circle cx={pos_x - 20} cy={pos_y - 20} r="7" style={playerStyle} >
              <animate attributeName="cx" to={pos_x - 30} dur="0.5s" repeatCount="indefinite" />
            </circle>
            <circle cx={pos_x + 20} cy={pos_y - 20} r="7" style={playerStyle} >
              <animate attributeName="cx" to={pos_x + 30} dur="0.5s" repeatCount="indefinite" />
            </circle>
            <circle cx={pos_x} cy={pos_y} r="25" style={playerStyle} ></circle>
            <polygon points={[pos_x + 0, pos_y + 37, pos_x + -30, pos_y - 5, pos_x + 30, pos_y - 5]} style={playerStyle} />
            <circle cx={pos_x - 12} cy={pos_y - 15} r="5" style={{ fill: '#000000' }} />
            <circle cx={pos_x + 12} cy={pos_y - 15} r="5" style={{ fill: '#000000' }} />
          </g>
          <text className="playerName" textAnchor="middle"
            x={pos_x} y={pos_y + 60} >
            {this.props.playerName}
          </text>
        </g>
      );
    }
  }
};

export default Player;
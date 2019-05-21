import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStartTime: 0,
      gameTimeLimit: 30,
      time: 30,
      startFlag: 0,
    }
  }

  componentDidMount = () => {
    setInterval(() => {
      this.updateTime();
    }, 20);
  }
  updateTime = () => {
    if (this.props.GameState === 1) {
      if (this.state.startFlag === 0) {
        this.setState({ gameStartTime: (new Date()).getTime() });
        this.setState({ startFlag: 1 });
      }
      var time = (new Date()).getTime();
      var time_left = Math.floor(this.state.gameTimeLimit - (time - this.state.gameStartTime) / 1000);
      if (time_left >= 0) {
        this.setState({ time: time_left });
      }
      if (time_left <= 0) {
        this.props.endGame();
      }
    }
  }
  render() {
    const scoreStyle = {
      fontFamily: '"Joti One", cursive',
      fontSize: 80,
      fill: '#F5BE51',
      events: 'none',
    };
    return (
      <g filter="url(#shadow)">
        <text style={scoreStyle} x="1500" y="-10">
          Time: {this.state.time}
        </text>
      </g>
    );
  }
};

export default Timer;
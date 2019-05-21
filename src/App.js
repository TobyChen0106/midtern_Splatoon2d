import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css'
import Canvas from './components/Canvas';


var x = new Array(100);
for (var i = 0; i < x.length; ++i) {
  x[i] = new Array(200);
  for (var j = 0; j < x[i].length; ++j) {
    x[i][j] = 0;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      playerCameraSize:3000,
      gameTime: 0,

      fieldArray: x,
      counter: 0,
    }
  }

  componentDidMount() {
    // window.addEventListener("keypress", this.onKeyPress);

    window.onresize = () => {
      const cnv = document.getElementById('aliens-go-home-canvas');
      cnv.style.width = `${window.innerWidth}px`;
      cnv.style.height = `${window.innerHeight}px`;
    };
    window.onresize();
    
  }

  updateGame = () => {
    this.setState({ gameTime: (new Date()).getTime() - this.state.gameStartTime });

    var m = this.state.counter / 200;
    var n = this.state.counter % 200;

    this.state.fieldArray[m, n] = 1;
    this.setState({ counter: this.state.counter + 1 });
    if (this.state.counter === 20000) {
      this.setState({ counter: 0 });
    }

    var p_x = this.state.playerPos.x;
    var p_y = this.state.playerPos.y;
    var s = this.state.playerSpeed;
    var d_x = this.state.playerMoveDir.x;
    var d_y = this.state.playerMoveDir.y;
    this.setState({playerPos:{x:p_x+d_x*s, y:p_y+d_y*s}});
  }
  
  render() {
    // console.log(this.state.playerMoveDir)
    // console.log(this.state.playerMoveDir)
    
    return (
      <Canvas
        playerAngle={this.state.playerAngle}
        playerPos={this.state.playerPos}
        trackMouse={event => (this.trackMouse(event))}
        Gametime={this.state.gameTime}
        fieldArray={this.state.fieldArray}
        playerCameraSize={this.state.playerCameraSize}
        
        updatePlayerPos={this.updateGame}
      />
    );
  }
}

// App.propTypes = {
//   playerAngle: PropTypes.number.isRequired,
//   playerPos: PropTypes.number.isRequired,
//   moveObjects: PropTypes.func.isRequired,
// };

export default App;
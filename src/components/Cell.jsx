import React from 'react';

class Cell extends React.Component {
    render() {
        const x = this.props.x;
        const y = this.props.y;
        var color = "#333333";
        // switch(this.props.color){
        //     case 0: color = "#550000"; break;
        //     case 1: color = "#005500"; break;
        //     case 2: color = "#550000"; break;
        //     case 3: color = "#550000"; break;
        // }
        
        return (
            <div className="Cell" id = {this.props.id}
                style={{
                    left: `${this.props.CELL_SIZE * x + 1}px`,
                    top: `${this.props.CELL_SIZE * y + 1}px`,
                    width: `${this.props.CELL_SIZE - 1}px`,
                    height: `${this.props.CELL_SIZE - 1}px`,
                    background: color,
                }} />
        );
    }
}

export default Cell;
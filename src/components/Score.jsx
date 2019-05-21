import React, { Component } from 'react';

class Score extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
                <text style={scoreStyle} x="2000" y="1000">
                    {this.props.score}
                </text>
            </g>
        );
    }
};

export default Score;
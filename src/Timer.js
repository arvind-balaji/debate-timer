import React, {Component} from 'react';
import { KeyDown } from 'react-event-components'
import TimerComponent from './components/TimerComponent';


const ROUND_DEFINITION = [
    [
        {name:"SPEECH - C", time: 480},
        {name:"SPEECH - R", time: 300}

    ],
    [
        {name:"PREP - NEG", time: 480},
        {name:"PREP - AFF", time: 480}
    ],
    [
        {name:"CX", time: 180}
    ]
]

class Timer extends Component {
    constructor() {
        super();
        var initialState = ROUND_DEFINITION.map(function(arr) {
            return arr.slice();
        });
        this.state = {
            time: 0,
            name: "",
            timerState: initialState,
            x: 0,
            y: 0
        };
    }
    handleKeyPress = (key) => {
        console.log(key);
        var x = this.state.x;
        var y = this.state.y;
        if (key === "left") {
            if (x - 1 >= 0) {
                x--;
                this.setState({
                    x: x
                })
            }
        } else if (key === "right") {
            if (x + 1 < ROUND_DEFINITION[y].length) {
                x++;
                this.setState({
                    x: x
                })
            }
        } else if (key === "up") {
            if (y - 1 >= 0) {
                y--;
                if (ROUND_DEFINITION[y][x] == null){
                    x = ROUND_DEFINITION[y].length - 1;
                }
                this.setState({
                    y: y,
                    x: x
                })
            }
        } else if (key === "down") {
            if (y + 1 < ROUND_DEFINITION.length) {
                y++;
                if (ROUND_DEFINITION[y][x] == null){
                    x = ROUND_DEFINITION[y].length - 1;
                }
                this.setState({
                    y: y,
                    x: x
                })
            }
        }
    }
    updateStateTime = (x, y, time) => {
        var newTimerState = this.state.timerState.map(function(arr) {
            return arr.slice();
        });
        newTimerState[y][x].time = time;
        this.setState({
            timerState: newTimerState
        })
    }
    render() {
        return (
            <div>
                <KeyDown when="ArrowUp" do={() => this.handleKeyPress("up")} />
                <KeyDown when="ArrowDown" do={() => this.handleKeyPress("down")} />
                <KeyDown when="ArrowLeft" do={() => this.handleKeyPress("left")} />
                <KeyDown when="ArrowRight" do={() => this.handleKeyPress("right")} />

                <Timer
                    x = {this.state.x}
                    y = {this.state.y}
                    updateStateTime = {this.updateStateTime}
                    time={ROUND_DEFINITION[this.state.y][this.state.x].time}
                    name={ROUND_DEFINITION[this.state.y][this.state.x].name}
                />
            </div>
        )
    }
};

export default Timer;

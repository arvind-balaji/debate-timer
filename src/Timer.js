import React, {Component} from 'react';
import { KeyDown } from 'react-event-components'
import {Redirect} from 'react-router-dom'
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
        var settings = JSON.parse(localStorage.getItem("settings"));
        if (!settings) {
            settings = {
                event: 0,
                prep: 8,
                sound: true
            }
        }else{
            ROUND_DEFINITION[1][0].time = settings.prep*60;
            ROUND_DEFINITION[1][1].time = settings.prep*60;
        }

        this.state = {
            time: 0,
            name: "",
            timerState: JSON.parse(JSON.stringify(ROUND_DEFINITION)),
            x: 0,
            y: 0,
            settings: settings
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
            }else{
                x = ROUND_DEFINITION[x].length - 1;
                this.setState({
                    x: x
                })
            }
        } else if (key === "right") {
            if (x + 1 < ROUND_DEFINITION[x].length) {
                x++;
                this.setState({
                    x: x
                })
            }else{
                x = 0
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
        var newTimerState = JSON.parse(JSON.stringify(this.state.timerState))

        newTimerState[y][x].time = time;
        this.setState({
            timerState: newTimerState
        })
    }
    render() {
        if (localStorage.getItem("initial") == null) {
            return <Redirect to='/help'/>;
        }
        return (
            <div>
                <KeyDown when="ArrowUp" do={() => this.handleKeyPress("up")} />
                <KeyDown when="ArrowDown" do={() => this.handleKeyPress("down")} />
                <KeyDown when="ArrowLeft" do={() => this.handleKeyPress("left")} />
                <KeyDown when="ArrowRight" do={() => this.handleKeyPress("right")} />

                <TimerComponent
                    x = {this.state.x}
                    y = {this.state.y}
                    updateStateTime = {this.updateStateTime}
                    time={ROUND_DEFINITION[this.state.y][this.state.x].time}
                    name={ROUND_DEFINITION[this.state.y][this.state.x].name}
                    prefs={this.state.settings}
                />
            </div>
        )
    }
};

export default Timer;

import React, {Component} from 'react';
import './App.css';
import { KeyDown } from 'react-event-components'
import Timer from './components/Timer';


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

class App extends Component {
    constructor() {
        super();
        this.state = {
            time: 300,
            name: "1AR",
            timerState: ROUND_DEFINITION,
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
    render() {
        return (
            <div>
                <KeyDown when="ArrowUp" do={() => this.handleKeyPress("up")} />
                <KeyDown when="ArrowDown" do={() => this.handleKeyPress("down")} />
                <KeyDown when="ArrowLeft" do={() => this.handleKeyPress("left")} />
                <KeyDown when="ArrowRight" do={() => this.handleKeyPress("right")} />

                <Timer
                    time={ROUND_DEFINITION[this.state.y][this.state.x].time}
                    name={ROUND_DEFINITION[this.state.y][this.state.x].name}
                />
            </div>
        )
    }
};

export default App;

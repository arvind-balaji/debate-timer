import '../App.css';
import React, {Component} from 'react';
import { KeyDown } from 'react-event-components'
// const remote = window.require('electron').remote;
// const dialog = remote.dialog;
//const BrowserWindow = require('electron').BrowserWindow;

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            time: props.time,
            stopped: 5
        };
        // this.startTimer = this.startTimer.bind(this);
        // this.toggleStartStop = this.toggleStartStop.bind(this);
        // this.resetTimer = this.resetTimer.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({name: nextProps.name, time: nextProps.time, stopped: true});
        clearInterval(this.timer);
    }

    startTimer() {
        var time = this.state.time;
        var seconds = new Date().getTime(), last = seconds
        this.timer = setInterval(() => {
            var now = new Date().getTime();

            if (this.state.time < 1) {
                clearInterval(this.timer);
                return
            }

            last = now;
            this.setState({
                time: (time - (now - seconds) / 1000)
            })

        }, 333);

        // this.timer = setInterval(() => {
        //     if (this.state.time < 1) {
        //         clearInterval(this.timer);
        //         return
        //     }
        //     this.setState({
        //         time: time--
        //     })
        //     //console.log(this.state.time);
        // }, 1000);
    }
    toggleStartStop() {
        var stopped = !this.state.stopped;
        this.setState({stopped: stopped})
        if (stopped) {
            clearInterval(this.timer);
        } else {
            this.startTimer();
        }
    }
    resetTimer() {
        this.setState({time: this.props.time, stopped: true})
        clearInterval(this.timer);
    }

    render() {
        var min = ("0" + Math.trunc(this.state.time / 60)).slice(-2);
        var sec = ("0" + Math.trunc(this.state.time % 60)).slice(-2);
        var btnTxt = this.state.stopped
            ? "START"
            : "STOP";
        return (
            <div className="timer-container">
                <h3 className="timer-title">{this.state.name}</h3>
                <h1 className="timer-label">
                    {min}:{sec}
                </h1>
                <KeyDown when="Enter" do={() => this.toggleStartStop()} />
                <button className="timer-button" onClick={() => this.toggleStartStop()}>
                    {btnTxt}
                </button>
                <KeyDown when="Shift" do={() => this.resetTimer()} />
                <button className="timer-button" onClick={() => this.resetTimer()}>
                    RESET
                </button>
            </div>
        );
    };
}
export default Timer;

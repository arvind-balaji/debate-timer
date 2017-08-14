import React, {Component} from 'react';
import { KeyDown } from 'react-event-components'
// const remote = window.require('electron').remote;
// const dialog = remote.dialog;
//const BrowserWindow = require('electron').BrowserWindow;

class TimerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            time: props.time,
            stopped: true
        };
        // this.startTimer = this.startTimer.bind(this);
        // this.toggleStartStop = this.toggleStartStop.bind(this);
        // this.resetTimer = this.resetTimer.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if((nextProps.x != this.props.x) || (this.props.y != nextProps.y)){
            this.setState({name: nextProps.name, time: nextProps.time, stopped: true});
            clearInterval(this.timer);
        }
    }

    startTimer() {
        var time = this.state.time;
        var seconds = new Date().getTime(), last = seconds
        const notifyIntervals = [300, 240, 180, 120, 60, 30, 10]
        this.timer = setInterval(() => {
            var now = new Date().getTime();

            if (this.state.time < 1) {
                clearInterval(this.timer);
                return
            }

            last = now;
            var formattedSeconds = Math.floor(time - (now - seconds) / 1000)
            this.setState({
                time: formattedSeconds
            })
            if (notifyIntervals.indexOf(Math.floor(formattedSeconds)) > -1){
                var str = ((formattedSeconds % 60 == 0) ? (formattedSeconds / 60) + " Minutes" : formattedSeconds + " Seconds") + " Left!"
                var options = {
                        title: "Debate Timer",
                        body: str,
                        silent: true
                    }
                new Notification(options.title, options);
            }

            this.props.updateStateTime(this.props.x, this.props.y, formattedSeconds)

        }, 333);
    }
    toggleStartStop() {

        var stopped = !this.state.stopped;
        this.setState({stopped: stopped})
        if (stopped) {
            clearInterval(this.timer);
        } else {
            this.startTimer();
        }
        var audio = new Audio('sounds/beep.mp3');
        audio.play();
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
export default TimerComponent;

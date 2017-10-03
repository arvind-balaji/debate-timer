import React, {Component} from 'react';
import { KeyDown } from 'react-event-components'
import { Row, Col, Button, Icon, Dropdown, Menu, Slider} from 'antd';
import { Link } from 'react-router-dom';

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
                if (this.props.prefs.sound){
                    var options = {
                            title: "Debate Timer",
                            body: "Time's Up!",
                            silent: false
                        }
                    new Notification(options.title, options);
                }
                return
            }

            last = now;
            var formattedSeconds = Math.floor(time - (now - seconds) / 1000)
            this.setState({
                time: formattedSeconds
            })

            if ((notifyIntervals.indexOf(Math.floor(formattedSeconds)) > -1) && this.props.prefs.sound){
                var str = ((formattedSeconds % 60 == 0) ? (formattedSeconds / 60) + " Minutes" : formattedSeconds + " Seconds") + " Left!"
                var options = {
                        title: "Debate Timer",
                        body: str,
                        silent: true
                    }
                new Notification(options.title, options);
            }

            this.props.updateStateTime(this.props.x, this.props.y, formattedSeconds)

        }, 900);
    }
    toggleStartStop() {

        var stopped = !this.state.stopped;
        this.setState({stopped: stopped})
        if (stopped) {
            clearInterval(this.timer);
        } else {
            this.startTimer();
        }
        // var audio = new Audio('./beep.mp3');
        // audio.play();
    }
    resetTimer() {
        this.setState({time: this.props.totalTime, stopped: true})
        this.props.updateStateTime(this.props.x, this.props.y, this.props.totalTime)
        clearInterval(this.timer);
    }
    sliderTipFormat(x) {
        var min = ("0" + Math.trunc(x / 60)).slice(-2);
        var sec = ("0" + Math.trunc(x % 60)).slice(-2);
        return min+":"+sec;
    }
    render() {
        var min = ("0" + Math.trunc(this.state.time / 60)).slice(-2);
        var sec = ("0" + Math.trunc(this.state.time % 60)).slice(-2);
        var btnTxt = this.state.stopped
            ? "START"
            : "STOP";
        const menu = (
            <Menu className="no-drag">
                <Menu.Item>
                    <Link onClick={!this.state.stopped ? () => this.toggleStartStop() : null} to='/settings'>Settings</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link onClick={!this.state.stopped ? () => this.toggleStartStop() : null} to='/help'>Help</Link>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="timer-container" >

                <KeyDown when="Enter" do={() => this.toggleStartStop()} />

                <KeyDown when="Shift" do={() => this.resetTimer()} />

                <Row className="no-drag" type="flex" justify="start" align="middle" style={{height:"22px"}}>
                    <Col span={18}>
                        <h3 className="timer-title">{this.state.name}</h3>
                    </Col>
                    <Col span={2}>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                               <Icon className="timer-title" type="down-square" />
                            </a>
                        </Dropdown>
                    </Col>
                    <Col span={1}/>
                    <Col span={1}>
                        <a className="ant-dropdown-link "  style={{color:"#ff3a46"}} onClick={() => window.close()}href="#">
                           <Icon className="timer-title"type="close-square" />
                        </a>
                    </Col>
                </Row>
                <Row type="flex" justify="start">

                    <Col span={18}>
                        <h1 className="timer-label">
                            {min}:{sec}
                        </h1>
                    </Col>
                    <Col span={2}>
                        <Slider
                            className="timer-slider"
                            vertical
                            value={this.state.time}
                            tipFormatter={this.sliderTipFormat}
                            onChange={(x) => this.setState({time: x})}
                            step={5}
                            defaultValue={this.props.totalTime}
                            max={this.props.totalTime}
                        />
                    </Col>
                </Row>
                <Row>
                </Row>
                <Row type="flex" justify="space-between">
                        <Button type="primary" size="large" onClick={() => this.toggleStartStop()}>{btnTxt}</Button>
                        <Button type="default" size="large" onClick={() => this.resetTimer()}>RESET</Button>
                </Row>


            </div>
        );
    };
}
export default TimerComponent;

import React, {Component} from 'react';
import { KeyDown } from 'react-event-components'
import { Row, Col, Button, Slider, Icon, Dropdown, Menu} from 'antd';
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
        const menu = (
            <Menu>
                <Menu.Item>
                    <a href="#">Settings</a>
                </Menu.Item>
                <Menu.Item>
                    <a href="#">Help</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="timer-container">

                <KeyDown when="Enter" do={() => this.toggleStartStop()} />

                <KeyDown when="Shift" do={() => this.resetTimer()} />

                <Row type="flex" justify="start" align="middle" style={{height:"22px"}}>
                    <Col span={15}>
                        <h3 className="timer-title">{this.state.name}</h3>
                    </Col>
                    <Col span={3}/>
                    <Col span={2}>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                               <Icon className="timer-title"type="down-square" />
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
                        <h1 className="timer-label">
                            {min}:{sec}
                        </h1>
                </Row>
                <Row>
                {/*<Slider className="timer-slider" defaultValue={30} />*/}
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

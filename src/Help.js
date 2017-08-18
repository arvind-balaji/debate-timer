import React, {Component} from 'react';
import {Row, Col, Button} from 'antd'

class Help extends Component {
    handleClick = () => {
        localStorage.setItem("initial", false);
        this.props.history.push("/");
    }
	render() {
		return (
            <div className="timer-container" style={{fontSize:"13px", textAlign:"center"}}>
                <Row type="flex" justify="start" align="middle" style={{marginBottom:"10px"}}>
                    <Col span={8}>
                        <p className="help-key">Arrow keys</p>
                    </Col>
                    <Col span={16}>
                        <p className="help-text">Navigate between timers</p>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="middle" style={{marginBottom:"10px"}}>
                    <Col span={8}>
                        <p className="help-key">Shift</p>
                    </Col>
                    <Col span={16}>
                        <p className="help-text">Reset Timer</p>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="middle" style={{marginBottom:"10px"}}>
                    <Col span={8}>
                        <p className="help-key">Enter</p>
                    </Col>
                    <Col span={16}>
                        <p className="help-text">Start/Stop Timer</p>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="top">
                    <Button type="primary" size="small" onClick={() => this.handleClick()}>OK</Button>
                </Row>
            </div>
		)
	}
};

export default Help;

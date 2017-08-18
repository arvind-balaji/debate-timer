import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import WrappedForm from './components/SettingsForm.js'

class Settings extends Component {
	constructor() {
		super();
        var settings = JSON.parse(localStorage.getItem("settings"));
        if (settings) {
            this.state = settings;
        }else{
            this.state = {
                event: 0,
                prep: 8,
                sound: true
            }
        }
	}
    updateState = (name, val) => {

    }
    handleSubmit = (data) => {
        console.log(data)
        this.setState(data)
        localStorage.setItem("settings", JSON.stringify(data));
        this.props.history.push("/")
    }
	render() {
		return (
            <div className="timer-container">
                <WrappedForm handleSubmit={this.handleSubmit} prefs={this.state}/>
            </div>
		)
	}
};

export default Settings;

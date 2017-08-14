import React, {
	Component
} from 'react';

class Settings extends Component {
	constructor() {
		super();
		this.state = {
			foo: "bar"
		};
	}

	render() {
		return (
            <div className="timer-container">
                <select>
                    <option value="0">HS Policy</option>
                    <option value="1">College Policy</option>
                    <option value="2">Lincoln Douglas</option>
                    <option value="3">Public Forum</option>
                </select>
                <select>
                        

                </select>
            </div>
		)
	}
};

export default Settings;

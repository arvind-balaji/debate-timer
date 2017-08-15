import React, {
	Component
} from 'react';
import { InputNumber, Form, Select, Input, Button, Col, Switch } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
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
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="Event" colon="false" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                        <select size="small" placeholder="Select">
                            <option value="0">HS Policy</option>
                            <option value="1">College Policy</option>
                            <option value="2">Lincoln Douglas</option>
                            <option value="3">Public Forum</option>
                        </select>
                    </FormItem>
                    <FormItem label="Prep" colon="false" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                       <InputNumber size="small" min={1} max={100000} defaultValue={3}  />
                    </FormItem>
                    <FormItem label="Sound" colon="false" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                        <Switch size="small" />
                    </FormItem>
                    <FormItem >
                       <Col span={1}/>
                       <Col span={9}>
                           <Button type="primary" size="default" htmlType="submit">
                               Save
                           </Button>
                        </Col>
                        <Col span={1}/>
                        <Col span={9}>
                            <Button type="default" size="default">
                                Cancel
                            </Button>
                        </Col>
                   </FormItem>
               </Form>
            </div>

		)
	}
};

export default Settings;

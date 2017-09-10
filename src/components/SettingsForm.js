import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { Form, Select, Input, InputNumber, Switch, Button, Col} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class SettingsForm extends Component {
    constructor() {
        super();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
              localStorage.setItem("settings", JSON.stringify(values));
              this.props.handleSubmit(values);
          }
        });
    }
    handleSelectChange = (value) => {
        console.log(value);
    // this.props.form.setFieldsValue({
    //   event: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    // });
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
          <Form  onSubmit={this.handleSubmit} hideRequiredMark={true}>
            <FormItem label="Event" colon={false} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('event', {
                    rules: [{ required: true}],
                    initialValue: this.props.prefs.event
                })(
                    <select name='event' size="small" placeholder="Select">
                        <option value="0">HS Policy</option>
                        <option value="1">College Policy</option >
                        <option value="2">Lincoln Douglas</option>
                        <option value="3">Public Forum</option>
                    </select>
                )}
            </FormItem>
            <FormItem label="Prep" type="number" colon={false} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('prep', {
                    rules: [{ required: true}],
                    initialValue: this.props.prefs.prep
                })(
                    <InputNumber size="small" min={1} max={15} defaultValue={8}/>
                )}
            </FormItem>
            <FormItem name="sound" label="Notify" colon={false} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('sound', {
                    rules: [{ required: false}],
                    initialValue: this.props.prefs.sound
                })(
                    <Switch name="sound" defaultChecked={this.props.prefs.sound}size="default" />
                )}
            </FormItem>
            <FormItem >
               <Col span={2}/>
               <Col span={10}>
                   <Button type="primary" size="default" htmlType="submit">
                       Save
                   </Button>
                </Col>
                <Col span={1}/>
                <Col span={9}>
                    <Button type="default" size="default">
                        <Link to='/'>Back</Link>
                    </Button>
                </Col>
           </FormItem>
          </Form>
        );
    }
}

const WrappedForm = Form.create()(SettingsForm);

export default WrappedForm;

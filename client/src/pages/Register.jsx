import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import { registerPost } from '../api/index'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  

  handleSubmit = e => { 
    console.log(this.props)
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        registerPost(values.username, values.password)
        this.props.history.push('./login')
      }
    });
    return false;
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout="inline" id='form' onSubmit={this.handleSubmit} >
        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Log in
          </Button>
          <Button type="primary" href='/login'>返回登录</Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);
export default WrappedHorizontalLoginForm

// ReactDOM.render(<WrappedHorizontalLoginForm />, mountNode);

// export class Register extends Component {
//   render() {
//     return (
//       <div>
//         注册页面
//         <Input
//           placeholder="Enter your username"
//           prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//           suffix={
//             <Tooltip title="Extra information">
//               <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
//             </Tooltip>
//           }/>
//         <Button type="primary" href='/login'>返回登录</Button>
//       </div >
//     )
//   }
// }

// export default Register

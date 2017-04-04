import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/authActions'
import {Form, Input, Button, Row, Col, message} from 'antd'
import validateInput from '../../../server/shared/validations/login'
import './login.less'

const FormItem = Form.Item

class LoginPage extends Component {
  constructor(props) {
    super(props)
    //定义成 undefined和 ''的区别？
    this.state = {
      username: '',
      password: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state)

    if (!isValid) {
      message.error(errors.message)
    }

    return isValid
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()  //防止跳转
    if (this.isValid()) {
      const hide = message.loading('正在验证...', 0)
      this.props.login(this.state).then(
        (res) => hide(),
        (err) => console.log(err)
      )
    }
  }

  render() {
    const { username, password } = this.state
    return (
      <div className='login-min'>
        <Form  onSubmit={this.handleSubmit}>
         <FormItem
           id="userName"
           label="用户名："
           labelCol={{span: 10}}
           wrapperCol={{span: 3}}
           required>
           <Input id="username" name="username" placeholder="jno" onChange={this.onChange} value={username} />
         </FormItem>
         <FormItem
           id="password"
           label="密码："
           labelCol={{span: 10}}
           wrapperCol={{span: 3}}
           required>
           <Input type="password" id="password" name="password" placeholder="123456" onChange={this.onChange} value={password} />
         </FormItem>
         <Row>
           <Col span="16" offset="10">
             <Button type="primary" htmlType="submit">登录</Button>
           </Col>
         </Row>
       </Form>
     </div>
    );
  }
}


export default connect(null, { login })(LoginPage)

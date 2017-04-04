import React, { Component, PropTypes } from 'react'
import {Form, Input, Button, Checkbox, Radio, Row, Col, message} from 'antd';
const FormItem = Form.Item;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    }
  }

  componentWillMount() {
    console.log(2);
  }

  handleUsernameInput(e) {
    this.setState({userName: e.target.value})
  }

  handlePasswordInput(e) {
    this.setState({password: e.target.value})
  }

  handleSubmit(e) {
    console.log(1);
    e.preventDefault()  //防止跳转
    const userName = this.state.userName
    const password = this.state.password
    message.success('12收到表单值~~~：' + JSON.stringify(this.state))
    // e.preventDefault();
    // message.success('收到表单值~~~ ：' + JSON.stringify(this.state.formData, function(k, v) {
    //   if (typeof v === 'undefined') {
    //     return '';
    //   }
    //   return v;
    // }));
  }

  render() {
    const formData = this.state.formData
    return (
      <div style={{marginTop:200}}>
        <Form  onSubmit={(e) => this.handleSubmit(e)}>
         <FormItem
           id="userName"
           label="用户名："
           labelCol={{span: 10}}
           wrapperCol={{span: 3}}
           required>
           <Input id="userName" name="userName" placeholder="请输入用户名" onChange={(e) => this.handleUsernameInput(e)} value={this.state.userName} />
         </FormItem>
         <FormItem
           id="password"
           label="密码："
           labelCol={{span: 10}}
           wrapperCol={{span: 3}}
           required>
           <Input type="password" id="password" name="password" placeholder="请输入密码" onChange={(e) => this.handlePasswordInput(e)} value={this.state.password} />
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

import React, {Component} from 'react';
import {Form, Button, Input, message} from "antd";
import Logo from './images/logo.png'
import {connect} from "react-redux";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './css/login.less'
import {LoginSend} from "../../API";

class Login extends Component {
  
  onFinish = async (values) => {
    let result = await LoginSend(values)
    console.log(result)
      if (result.status === 0) {
        message.success("登录成功",1)
        this.props.history.replace('/admin')
      } else {
        message.warning("用户名或密码错误",1)
      }
  };
  
  render() {
    return (
      <div className='login'>
        <header>
          <img src={Logo} alt="登录图标"/>
          <h1>商品管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[{required: true, message: '请输入你的用户名!'},
                {type: "string", min: 4, message: '用户名最少为4位'},
                {type: "string", max: 12, message: '用户名最多为12位'},
                {pattern: /^\w+$/, message: '必须输入的是字母、数字、下划线'}
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{required: true, message: '请输入你的密码!'},
                {type: "string", min: 4, message: '密码最少为4位'},
                {type: "string", max: 12, message: '密码最多为12位'},
                {pattern: /^\w+$/, message: '必须输入的是字母、数字、下划线'}
              ]}
            
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon"/>}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

export default connect(
  state => ({test: state.test})
)(Login)
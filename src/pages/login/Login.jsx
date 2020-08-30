import React, {Component} from 'react';
import {Form, Button, Input} from "antd";
import Logo from './images/logo.png'
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './css/login.less'

export default class Login extends Component {
  
  onFinish = () => {
    alert("登录成功")
  };
  
  onvaluechange = (changedValue, allValue) =>{
    console.log(changedValue, allValue)
  }
  
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
            onValuesChange={this.onvaluechange}
           form={this.vaildate}
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

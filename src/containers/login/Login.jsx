import React, {Component} from 'react';
import {Form, Button, Input, message} from "antd";
import Logo from '../../public/images/logo.png'  //背景图片
import {connect} from "react-redux";  //集中管理状态
import {Redirect} from 'react-router-dom' //路由重定向
import {UserOutlined, LockOutlined} from '@ant-design/icons'; //antd组件
import './css/login.less'   //基本样式
import {LoginSend} from "../../API";  //发送请求
import {createSaveUserInfoAction} from '../../redux/action_creators/login_action'

class Login extends Component {
  
  onFinish = async (values) => {
    let result = await LoginSend(values)
    if (result.status === 0) {
      message.success("登录成功", 1)
      this.props.userInfoSave(result.data)
      this.props.history.replace('/admin')  //登录成功后,为了防止后退出现问题,设置后退为/admin组件
    } else {
      message.warning("用户名或密码错误", 1)
    }
  };
  
  render() {
    
    if (this.props.isLogin) {  //判断账户是否已经登录,登录的话返回admin页面
      return <Redirect to='/admin/home'/>
    } else {
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
}

export default connect(
  /**
   * 这里的connect将要处理的数据(redux)中,
   * 与处理数据的方法传入进来,将传入进来的数据利用传入进来的方法进行处理,并返回回去
   *
   * */
  state => ({isLogin: state.userInfo.isLogin}),
  {
    userInfoSave: createSaveUserInfoAction
  }
)(Login)


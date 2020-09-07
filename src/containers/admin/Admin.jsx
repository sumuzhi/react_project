import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import {createDeleteUserInfoAction} from "../../redux/action_creators/login_action";


class Admin extends Component {
  
  loginOut = () => {
    this.props.userInfoDelete()
  }
  
  render() {
    let {user, isLogin} = this.props.userInfo
    if (isLogin) { //如果没有登录,则返回到login的路由中去进行二次判断
      return (
        <div>
          <h1 style={{fontSize: '50px'}}>登录成功,用户名为:{user.username}</h1>
          <button onClick={this.loginOut}>退出登录</button>
        </div>
      )
      
    } else {
      return <Redirect to="/login"/>
    }
  }
}

export default connect((state) => ({userInfo: state.userInfo}), {
  userInfoDelete: createDeleteUserInfoAction
})(Admin)


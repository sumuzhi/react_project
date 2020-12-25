import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect, Route, Switch} from 'react-router-dom'
import {Layout} from 'antd'

import {createDeleteUserInfoAction} from "../../redux/action_creators/login_action";
import {categoryInfo} from '../../API/index'

import '../../redux/store'
import './css/admin.less'

import Home from '../../components/home/Home'
import Pie from "../../components/pie/Pie";
import Role from "../../components/role/Role";
import Line from '../../components/line/Line'
import Product from "../../components/product/Product";
import User from "../../components/user/User";
import CateGory from "../../components/category/CateGory";
import Bar from "../../components/bar/Bar";
import Header from "./header/Header";
import LeftNav from "./left_nav/LeftNav";
import Detail from "../../components/product/Detail";
import Add_update from "../../components/product/Add_update";

const {Footer, Sider, Content} = Layout;

class Admin extends Component {
  
  loginOut = () => {
    this.props.userInfoDelete()
  }
  
  demo = async () => {
    let result = await categoryInfo()
    console.log(result)
  }
  
  render() {
    let {isLogin} = this.props.userInfo
    if (isLogin) { //如果没有登录,则返回到login的路由中去进行二次判断
      return (
        // <div>
        //   <h1 style={{fontSize: '50px'}}>登录成功,用户名为:{user.username}</h1>
        //   <button onClick={this.loginOut}>退出登录</button>
        //   <button onClick={this.demo}>查询分类</button>
        //
        // </div>
        <Layout className="admin">
          <Sider className="sider">
            <LeftNav/>
          </Sider>
          <Layout>
            <Header className="header"></Header>
            <Content className="content">
              <Switch>
                <Route path='/admin/home' component={Home}/>
                <Route path='/admin/user' component={User}/>
                <Route path='/admin/pro_about/category' component={CateGory}/>
                {/*精确匹配,在大路由中有小路由时使用*/}
                <Route path='/admin/pro_about/product' component={Product} exact/>
                <Route path='/admin/pro_about/product/detail/:id' component={Detail}/>
                <Route path='/admin/pro_about/product/add_update' component={Add_update} exact/>
                <Route path='/admin/pro_about/product/add_update/:id' component={Add_update}/>
                <Route path='/admin/role' component={Role}/>
                <Route path='/admin/charts/bar' component={Bar}/>
                <Route path='/admin/charts/line' component={Line}/>
                <Route path='/admin/charts/pie' component={Pie}/>
                <Redirect to={'/admin/home'}/>
              </Switch>
            
            </Content>
            <Footer className="footer">使用chrome浏览器效果更佳</Footer>
          </Layout>
        </Layout>
      
      );
      
    } else {
      return <Redirect to="/login"/>
    }
  }
}

export default connect((state) => ({userInfo: state.userInfo}), {
  userInfoDelete: createDeleteUserInfoAction
})(Admin)


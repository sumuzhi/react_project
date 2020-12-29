import React, {Component} from 'react';
import {Menu} from "antd";
import {Link, withRouter} from 'react-router-dom'
import {Icon} from '@ant-design/compatible';  //利用v3的方法去动态加载icon
import {connect} from 'react-redux'

import './css/leftNav.less'
import Logo from '../../../public/images/logo.png'
import './css/leftNav.less'
import menus from '../../../config/menu_config'
import {createSaveTitleAction} from "../../../redux/action_creators/menu_action";

const {SubMenu, Item} = Menu;

class LeftNav extends Component {
  
  hasAuth = (item) => {  //动态生成导航列表
    // console.log(item)
    const {username, role} = this.props.menusList
    const {menus} = role
    // console.log(menus)
    if (username === 'admin') {
      return true
    } else if (item.children) {
      return item.children.some((item2) => {   //只要满足一个即返回正,(用于返回一级导航栏)
        return menus.indexOf(item2.key) !== -1
      })
    } else if (!item.children) {
      return menus.find((item3) => {
        return item3 === item.key
      })
    }
  }
  
  
  createItem = (item) => {
    return item.map((item) => {
      if (this.hasAuth(item)) {
        console.log(item)
        if (!item.children) {
          return (
            <Item key={item.key} onClick={() => {
              this.props.createTitle(item.title)   //将title交给redux保管
            }}>
              <Icon type={item.icon}/>
              {/*<HomeOutlined />*/}
              <Link to={item.path}>  {/*点击之后进行跳转组件*/}
                {item.title}
              </Link>
            </Item>
          )
        } else {
          return (
            <SubMenu key={item.key} title={<span><Icon type={item.icon}/>{item.title}</span>}>
              {this.createItem(item.children)}
            </SubMenu>
          )
        }
      }
      return
    })
  }
  
  render() {
    return (
      <div>
        <header className="left-nav-logo">
          <img src={Logo} alt=""/>
          <h1>商品管理系统</h1>
        </header>
        <Menu
          defaultSelectedKeys={this.props.location.pathname.indexOf('product') !== -1 ? 'product' : this.props.location.pathname.split("/").reverse()[0]}
          defaultOpenKeys={this.props.location.pathname.split("/").splice(2)}
          mode="inline"
          theme="light"
        >
          
          {
            this.createItem(menus)
          }
        
        </Menu>
      </div>
    );
  }
}

export default connect(
  state => ({menusList: state.userInfo.user}),
  {createTitle: createSaveTitleAction}
)(withRouter(LeftNav))

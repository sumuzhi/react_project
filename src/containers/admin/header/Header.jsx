import React, {Component} from 'react';
import {Button, message, Popconfirm} from "antd";
import {FullscreenOutlined, FullscreenExitOutlined} from '@ant-design/icons'
import {withRouter} from 'react-router-dom'  //在非路由组件中使用路由组件的API
import './css/header.less';
import screenfull from 'screenfull'
import {connect} from "react-redux";
import dayjs from 'dayjs';
import {reqWeather} from '../../../API/index'
import {createDeleteUserInfoAction} from "../../../redux/action_creators/login_action";
import menus from '../../../config/menu_config'

class Header extends Component {
  
  state = {
    isFull: false,
    date: dayjs().format('YYYY年MM月DD日 HH:mm:ss'),
    weather: {},
    title: ''
  }
  
  loginOut = () => {
    this.props.deleteUserInfo()
  }
  
  fullScreen = () => {
    screenfull.toggle()
  }
  
  getWeather = async () => {
    let weather = await reqWeather();
    this.setState({
      weather
    })
  }
  
  componentDidMount() {
    screenfull.on('change', () => {
      let isFull = !this.state.isFull
      this.setState({
        isFull
      })
    });
    
    this.timeer = setInterval(() => {
      this.setState({
        date: dayjs().format('YYYY年MM月DD日 HH:mm:ss')
      })
    }, 1000)
    
    this.getWeather()
    this.setTitle()
  }
  
  //当组件被卸载时,清除定时器
  componentWillUnmount() {
    clearInterval(this.timeer)
  }
  
  cancel = () => {
    message.error('您已取消登录', 0.4);
  }
  
  setTitle = () => {
    let pathname = this.props.location.pathname.split("/").reverse()[0]
    if (this.props.location.pathname.indexOf('product') !== -1) pathname = 'product'
    let result = ''
    menus.forEach((item) => {
      if (item.children instanceof Array) {
        let temp = item.children.find((itemlist) => {
          return itemlist.key === pathname
        })
        if (temp) result = temp.title
      } else {
        if (item.key === pathname) {
          result = item.title
        }
      }
    })
    this.setState({
      title: result
    })
    return result
  }
  
  
  render() {
    let {isFull, date, weather} = this.state
    let {user} = this.props.userInfo
    return (
      <header className='header'>
        <div className='header-top'>
          <div className="icons-list" onClick={this.fullScreen}>
            {/*用于切换全屏与非全屏*/}
            {isFull ? <FullscreenOutlined/> : <FullscreenExitOutlined/>}
          </div>
          <span className='welcome'>欢迎,&nbsp;{user.username}</span>
          <Popconfirm title="你确定要退出登录吗?"
                      onConfirm={this.loginOut}
                      onCancel={this.cancel}
                      okText="确定"
                      cancelText="取消">
            <Button type='link'>退出登录</Button>
          </Popconfirm>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            <span>{this.props.saveTitle || this.state.title}</span>
          </div>
          <div className="header-bottom-right">
            <span>{date}</span> {/*时间显示*/}
            <span>温度:{weather.temperature}°</span>
            <span>天气:{weather.weather}</span>
            {/*<img src={weather.dayPictureUrl} alt="天气信息"/>*/}
          </div>
        </div>
      </header>
    )
  }
}

export default connect(
  (state) => ({userInfo: state.userInfo, saveTitle: state.saveTitle}),
  {
    deleteUserInfo: createDeleteUserInfoAction
  })(withRouter(Header))

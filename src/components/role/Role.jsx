import React, {Component} from 'react';
import {Card, Button, Table, message, Modal, Input, Form, Tree} from "antd";
import {connect} from 'react-redux'
import {PlusOutlined} from '@ant-design/icons'
import dayjs from "dayjs";
import {pageSize} from '../../config/config'

import {getRoleList, addRole, updateRole} from "../../API";
import menuList from '../../config/menu_config'

const {TreeNode} = Tree

class Role extends Component {
  
  addForm = React.createRef()
  
  state = {
    isShowAdd: false,
    isShowAuth: false,
    roleList: [],
    checkedKeys: [],
    menuList,
    _id: '',
    create_time: ''
  }
  
  
  //得到role列表--发送请求得到
  getRoleForAPI = async () => {
    let result = await getRoleList()
    const {status, data} = result
    if (status === 0) {
      this.setState({
        roleList: data
      })
    }
  }
  
  componentDidMount() {
    this.getRoleForAPI()
  }
  
  //!点击权限面板确认按钮
  authCommit = async () => {
    const {checkedKeys, _id} = this.state
    const {currentUser} = this.props
    let result = await updateRole(_id, checkedKeys, currentUser)
    const {status} = result
    if (status === 0) {
      message.success("修改权限成功")
      this.setState({isShowAuth: false})
      this.getRoleForAPI()
    }
  }
  
  //点击权限面板取消按钮
  authCancel = () => {
    this.setState({isShowAuth: false})
  }
  
  //点击新增的取消方法
  addCancel = () => {
    this.setState({isShowAdd: false})
  }
  
  //点击新增的确定方法--添加新用户
  addCommit = async () => {
    let result = await this.addForm.current.validateFields();
    if (result) {
      let results = await addRole(result.content)
      const {status} = results
      if (status === 0) {
        message.success("添加角色成功")
        this.setState({
          isShowAdd: false
        })
        this.getRoleForAPI()
      }
    }
  }
  
  //点击设置权限调用的方法
  clickSetAuth = (value) => {
    const {roleList} = this.state
    let result = roleList.find((item) => {
      return item._id === value._id
    })
    console.log(result)
    if (result) {
      this.setState({
        checkedKeys: result.menus
      })
    }
    this.setState({isShowAuth: true, _id: value._id, create_time: value.create_time})
  }
  
  //遍历生成子节点树
  renderTreeNodes = (data) =>
    data.map((item, index) => {
      if (item['children']) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item['children'])}
          </TreeNode>
        )
      } else {
        return <TreeNode key={item.key}{...item} />
      }
      
    })
  
  //点击选择框调用的函数
  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({checkedKeys})
  };
  
  render() {
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        align: 'center',
        render: (time) => {
          return time ? dayjs(time).format('YYYY-MM-DD HH:mm') : ''
        }
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
        align: 'center',
        render: (time) => {
          return time ? dayjs(time).format('YYYY-MM-DD HH:mm') : ''
        }
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'auth_name',
        align: 'center',
      },
      {
        title: '操作',
        // dataIndex: 'age',
        key: 'age',
        align: 'center',
        // function(text, record, index) {}
        render: (text, record) => {
          return <div>
            <Button type='link' onClick={() => {
              this.clickSetAuth(record)
            }}>设置权限</Button>
          </div>
        }
      }
    ]
    const treeData = this.state.menuList
    return (
      <div>
        <Card
          style={{width: '100%'}}
          title={<Button type="primary" onClick={() => {
            this.setState({isShowAdd: true})
          }}>
            <PlusOutlined/>
            新增角色
          </Button>}
        >
          <Table
            dataSource={this.state.roleList}
            columns={columns}
            bordered
            pagimation={{defaultPageSize: pageSize}}
            rowKey="_id"
          >
          
          </Table>
        
        </Card>
        
        {/*新增角色弹窗------------------------------------------------modal*/}
        <Modal
          title="新增角色"
          visible={this.state.isShowAdd}
          onOk={this.addCommit}
          onCancel={this.addCancel}
          cancelText='取消'
          okText='确定'
          destroyOnClose={true}   //将组件进行销毁
        >
          
          <Form
            ref={this.addForm}
            name="normal_login"
            className="login-form"
          >
            <Form.Item
              name="content"
              rules={[{required: true, message: '请输入你要增加的角色'}
              ]}
            >
              <Input placeholder="请输入你要增加的角色"/>
            </Form.Item>
          </Form>
        </Modal>
        
        {/*权限设置弹窗---------------------------------------------------------modal*/}
        <Modal
          title="设置权限"
          visible={this.state.isShowAuth}
          onOk={this.authCommit}
          onCancel={this.authCancel}
          cancelText='取消'
          okText='确定'
          destroyOnClose={true}   //将组件进行销毁
        >
          
          <Tree
            checkable="true"
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            defaultExpandAll="true"
          >
            <TreeNode title="平台功能" key="top">
              {this.renderTreeNodes(treeData)}
            </TreeNode>
          </Tree>
        </Modal>
      
      </div>
    )
  }
}

export default connect(
  state => ({
    currentUser: state.userInfo.user.username
  }),
  {}
)(Role)

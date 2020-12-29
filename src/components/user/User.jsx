import React, {Component} from 'react';
import {Card, Button, Table, message, Modal, Input, Form, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import dayjs from "dayjs";

import {pageSize} from '../../config/config'
import {getUsersList, deleteUser, addUser} from '../../API/index'

const {Option} = Select

export default class User extends Component {
  
  addForm = React.createRef()
  
  state = {
    isShowAdd: false,
    userList: [].reverse(),
    roleList: []
  }
  
  //获取用户列表
  getUsersListFunction = async () => {
    let result = await getUsersList()
    const {status, data} = result
    if (status === 0) {
      this.setState({
        userList: data.users,
        roleList: data.roles
      })
    }
  }
  
  //! 删除用户方法
  deleteUser = async (value) => {
    let result = await deleteUser(value._id)
    if (result.status === 0) {
      message.success("删除用户成功")
      this.getUsersListFunction()
    } else {
      message.error("删除用户失败")
    }
  }
  
  //修改用户方法
  updateUser = () => {
    alert("dianjixiugai")
  }
  
  componentDidMount(): void {
    this.getUsersListFunction()
  }
  
  //点击新增弹窗的取消按钮
  addCancel = () => {
    this.setState({isShowAdd: false})
  }
  
  //点击新增弹窗的确认按钮
  addCommit = async (value) => {
    let result = await this.addForm.current.validateFields();
    if (result) {
      const {username, password, phone, email, role_id} = result
      let results = await addUser(username, password, phone, email, role_id)
      const {status, data} = results
      if (status === 0) {
        message.success("添加用户成功")
        this.setState({isShowAdd: false})
        this.getUsersListFunction()
      } else {
        message.error("此用户已存在")
      }
    }
  }
  
  render() {
    
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        align: 'center'
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        align: 'center'
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        key: 'create_time',
        align: 'center',
        render: (time) => time ? dayjs(time).format('YYYY-MM-DD HH:mm') : ''
      },
      {
        title: '角色',
        dataIndex: 'role_id',
        key: 'role_id',
        align: 'center',
        render: (id) => {
          let result = this.state.roleList.find((item) => {
            return item._id === id
          })
          if (result) {
            return result.name
          }
        }
      },
      {
        title: '操作',
        key: 'opera',
        align: 'center',
        width: '15%',
        
        // function(text, record, index) {}
        render: (text, record) => {
          return <div>
            <Button type='link' onClick={() => {
              this.updateUser(record)
            }}>修改用户</Button>
            <Button type='link' onClick={() => {
              this.deleteUser(record)
            }}>删除用户</Button>
          </div>
        }
      }
    
    
    ]
    
    return (
      <div>
        <Card
          style={{width: '100%'}}
          title={<Button type="primary" onClick={() => {
            this.setState({isShowAdd: true})
          }}>
            <PlusOutlined/>
            新增用户
          </Button>}
        >
          <Table
            dataSource={this.state.userList}
            columns={columns}
            bordered
            pagimation={{defaultPageSize: pageSize}}
            rowKey="_id"
          >
          
          </Table>
        
        </Card>
        
        {/*新增用户弹窗------------------------------------------------modal*/}
        <Modal
          title="新增用户"
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
            wrapperCol={{span: 16}}
            labelCol={{span: 4}}
          >
            <Form.Item
              name="username"
              label="用户名:"
              rules={[{required: true, message: '请输入你的用户名'}
              ]}
            >
              <Input placeholder="请输入你的用户名"/>
            </Form.Item>
            
            <Form.Item
              name="password"
              label="密码:"
              rules={[{required: true, message: '请输入你的密码'}
              ]}
            >
              <Input placeholder="请输入你的密码"/>
            </Form.Item>
            
            <Form.Item
              name="email"
              label="邮箱:"
              rules={[{required: true, message: '请输入你的邮箱'}
              ]}
            >
              <Input placeholder="请输入你的邮箱"/>
            </Form.Item>
            
            <Form.Item
              name="phone"
              label="手机号:"
              rules={[{required: true, message: '请输入你的手机号'}
              ]}
            >
              <Input placeholder="请输入你的手机号"/>
            </Form.Item>
            
            
            <Form.Item
              name="role_id"
              label="角色:"
              rules={[{required: true, message: '请选择一个角色'}
              ]}
            >
              
              <Select placeholder="请选择一个角色">
                {
                  this.state.roleList.map((item, index) => {
                    return (
                      <Option key={index} value={item._id}>{item.name}</Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      
      </div>
    )
  }
}

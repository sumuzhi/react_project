import React, {Component} from 'react';
import {Card, Button, Table, message, Modal, Form, Input} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {categoryInfo, addCategorys, updateOneCategory} from '../../API/index'
import {pageSize} from "../../config/config";

class CateGory extends Component {
  
  myForm = React.createRef()
  
  state = {
    categoryList: [],
    visible: false,
    titleType: '',
    isLoading: true,
    currentValue: '',
    currentId: ''
  }
  
  getList = async () => {
    let result = await categoryInfo()
    this.setState({
      isLoading: false
    })
    let {status, data} = result
    if (status === 0) {
      this.setState({
        categoryList: data.reverse()
      })
    } else {
      message.error("请求错误", 0.8)
    }
  }
  
  onFinish = (value) => {
    console.log(value)
  }
  
  componentDidMount() {
    this.getList().then(() => {
    })
    .catch(() => {
    
    })
  }
  
  //展示添加弹窗
  showAdd = () => {
    this.setState({
      visible: true,
      currentValue: '',
      currentId: '',
      titleType: 'add'
    });
  };
  
  //修改弹窗
  showupdate = (value) => {
    this.setState({
      currentValue: value.name,
      currentId: value["_id"],
      titleType: 'update',
      visible: true
    });
  };
  
  toAdd = async (value) => {
    let result = await addCategorys(value)
    let {status, msg, data} = result
    if (status === 0) {
      message.success("新增商品分类成功")
      let categoryList = [...this.state.categoryList]
      categoryList.unshift(data)
      this.setState({
        categoryList
      })
      this.setState({
        visible: false,
      });
      this.myForm.current.resetFields()
    } else {
      message.error(msg, 1)
    }
  }
  
  //修改方法
  toUpdate = async (value) => {
    // console.log(value,this.state.currentId)
    let result = await updateOneCategory(this.state.currentId, value)
    const {status, msg} = result
    if (status === 0) {
      message.success("修改商品成功")
      this.setState({
        visible: false
      })
      this.myForm.current.resetFields()
      this.getList()
    } else {
      message.error(msg, 1)
    }
  }
  
  //添加方法
  handleOk = async () => {
    
    //此函数用来校验表单的值,是一个异步函数,会影响到后面的将参数清空方法
    let result = await this.myForm.current.validateFields();
    
    if (result) {
      if (this.state.titleType === 'add') await this.toAdd(result.content)
      if (this.state.titleType === 'update') await this.toUpdate(result.content)
    }
  }
  
  handleCancel = () => {
    this.setState({
      visible: false,
      currentValue: ''
    });
    this.myForm.current.resetFields()
  };
  
  render() {
    const {titleType, visible} = this.state
    
    const
      columns = [
        {
          title: '分类名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '操作',
          dataIndex: 'age',
          key: 'age',
          align: 'center',
          width: '30%',
          // function(text, record, index) {}
          render: (text, record) => {
            return <Button type='link' onClick={() => {
              this.showupdate(record)
            }}>修改分类</Button>
          }
        }
      ]
    
    return (
      <div>
        <Card extra={
          <Button type='primary' onClick={this.showAdd}>
            <PlusOutlined/>
            添加分类
          </Button>
        }>
          <Table
            dataSource={this.state.categoryList}   //动态加载内容
            rowKey='_id'              //设置行键
            columns={columns}          //设置列名称
            bordered                  //设置边框
            pagination={{pageSize, showQuickJumper: true}}    //设置每页信息条数
            loading={this.state.isLoading}
          />
        </Card>
        
        <Modal
          title={titleType === 'add' ? '添加分类' : '修改分类'}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText='取消'
          okText='确定'
          destroyOnClose={true}
        >
          
          <Form
            ref={this.myForm}
            name="normal_login"
            className="login-form"
          >
            <Form.Item
              name="content"
              rules={[{required: true, message: '请输入你要操作的分类名称'}
              ]}
              initialValue={this.state.currentValue}
            >
              <Input placeholder="请输入你要操作的分类名称"/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default CateGory

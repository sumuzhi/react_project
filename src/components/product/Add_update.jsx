import React, {Component} from 'react';
import {Button, Card, Form, Input, Select, message} from "antd";
import {connect} from 'react-redux'
import {
  ArrowLeftOutlined
} from '@ant-design/icons'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import {categoryInfo, addProduct, getProductById, updateProduct} from '../../API/index'

import Rich_text_editor from "./Rich_text_editor";
import PicturesWall from "./PicturesWall";


const {Option} = Select

class Add_update extends Component {
  
  state = {
    categoryList: [],
    operaType: 'add',
    categoryId: '',
    name: '',
    desc: '',
    price: '',
    imgs: [],
    detail: '',
    _id: ''
  }
  
  myImagesArr = React.createRef()
  myRichContent = React.createRef()
  formRef = React.createRef()
  
  getCategoryListByAPI = async () => {
    console.log("从后台获取数据")
    let result = await categoryInfo()
    const {status, data} = result
    if (status === 0) {
      this.setState({
        categoryList: data
      })
    }
  }
  
  //数据回显函数
  dataPlayback = (data) => {
    this.setState({...data})
    this.formRef.current.setFieldsValue({
      pro_category: data.categoryId,
      pro_name: data.name,
      pro_desc: data.desc,
      pro_price: data.price,
    })
    this.myImagesArr.current.setImagesArr(data.imgs)
    this.myRichContent.current.setRichTextContent(data.detail)
  }
  
  getProductListById = async (id) => {
    let result = await getProductById(id)
    const {status, data} = result
    if (status === 0) {
      console.log(data)
      this.setState({...data})
      this.dataPlayback(data)
    }
  }
  
  componentDidMount() {
    const {categoryList, productList} = this.props
    const {id} = this.props.match.params
    console.log(id)
    if (categoryList.length) this.setState({categoryList})
    else this.getCategoryListByAPI()  //当redux中没有分类时,向服务器发送请求,重新获取数据
    if (id) {
      this.setState({operaType: 'update'})
      if (productList.length) {
        let result = productList.find((item) => {
          return item._id === id
        })
        if (result) {
          this.dataPlayback(result)
        }
      } else {
        this.getProductListById(id)
      }
    }
  }
  
  
  //点击提交操作
  onFinish = async (value) => {
    let imgs = this.myImagesArr.current.getImagesArr()
    let richText = this.myRichContent.current.getRichTextContent()
    let result
    let content = {...value, imgs, richText}
    if (this.state.operaType === 'add')
      result = await addProduct(content.pro_category, content.pro_name, content.pro_desc, content.pro_price, content.richText, content.imgs)
    else
      result = await updateProduct(this.state._id, content.pro_category, content.pro_name, content.pro_desc, content.pro_price, content.richText, content.imgs)
    const {status, msg} = result
    if (status === 0) {
      message.success("商品操作成功")
      this.props.history.replace('/admin/pro_about/product')
    } else {
      message.error(msg)
    }
  }
  
  render() {
    const {operaType} = this.state
    return (
      <div>
        <Card
          headStyle={{border: "none"}}
          bordered={false}
          title={
            <Button type='link' onClick={() => {
              this.props.history.goBack()
            }} style={{fontSize: '16px'}}>
              <ArrowLeftOutlined/>
              {operaType === 'add' ? "添加商品" : "修改商品"}</Button>}>
          <Form
            ref={this.formRef}
            labelCol={{md: 2}}
            wrapperCol={{md: 5}}
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
          >
            <Form.Item
              label="商品名称"
              name="pro_name"
              rules={[{required: true, message: '请输入商品名称'}]}
            >
              <Input placeholder="商品名称"/>
            </Form.Item>
            
            <Form.Item
              label="商品描述"
              name="pro_desc"
              rules={[{required: true, message: '请输入商品描述'}]}
            >
              <Input placeholder="商品描述"/>
            </Form.Item>
            
            <Form.Item
              name="pro_price"
              label="商品价格"
              rules={[{required: true, message: '请输入商品价格'}]}
            >
              <Input
                addonAfter={"元"}
                addonBefore={"￥"}
                type="number"
                placeholder="商品价格"/>
            </Form.Item>
            
            <Form.Item
              label="商品分类"
              name="pro_category"
              rules={[{required: true, message: '请输入商品分类'}]}
            >
              <Select defaultValue="请选择商品分类">
                {this.state.categoryList.map((item) => {
                  return (
                    <Option value={item._id} key={item._id}>{item.name}</Option>
                  )
                })}
              </Select>
            </Form.Item>
            
            <Form.Item
              label="商品图片"
              wrapperCol={{md: 8}}
            >
              <PicturesWall ref={this.myImagesArr}/>
            </Form.Item>
            
            <Form.Item
              name="pro_detail"
              label="商品详情"
              wrapperCol={{md: 17}}
            >
              <Rich_text_editor ref={this.myRichContent}/>
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                提交
              </Button>
            </Form.Item>
          
          </Form>
        </Card>
      </div>
    )
  }
}

export default connect(
  state => ({
    categoryList: state.categoryListForRedux,
    productList: state.productList,
  }),
  {}
)(Add_update)

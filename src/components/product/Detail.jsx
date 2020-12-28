import React, {Component} from 'react';
import {Button, Card, List, message} from "antd";
import {connect} from 'react-redux'
import {
  ArrowLeftOutlined
} from '@ant-design/icons'

import {getProductById, categoryInfo} from '../../API/index'
import './detail.less'
import {BASE_URL} from "../../config/config";


class Detail extends Component {
  
  state = {
    categoryId: '',
    cateGoryName: '',
    desc: '',
    detail: '',
    imgs: '',
    name: '',
    price: '',
    isLoading: true
  }
  
  //通过商品id获取数据,(当页面直接在详情页面刷新时调用)
  getProductById = async (id) => {
    let result = await getProductById(id)
    //得到一条数据,并将分类id设置为this.的属性
    const {status, data, msg} = result
    if (status === 0) {
      this.categoryId = data.categoryId
      this.setState({...data})
    } else message.error(msg)
  }
  
  //通过请求分类列表去将分类信息显示到详情页面中,(当页面直接在详情页面刷新时调用)
  getInfoById = async () => {
    let result = await categoryInfo()
    const {status, data} = result
    if (status === 0) {
      let results = data.find((item) => {
        return item._id === this.categoryId
      })
      if (results) {
        console.log(results)
        this.setState({
          cateGoryName: results.name,
          isLoading: false
        })
      }
    }
  }
  
  componentDidMount() {
    const currentId = this.props.match.params.id  //拿到传入过来的id,通过地址栏传输的
    console.log("商品id", currentId)
    const reduxProductList = this.props.productsList
    const reduxCateGoryList = this.props.cateGoryList
    if (reduxProductList.length) {
      let result = reduxProductList.find((item) => item._id === currentId)
      if (result) {
        console.log("从redux中拿到的categoryid:", result.categoryId)
        this.categoryId = result.categoryId
        this.setState({...result})
      }
    } else this.getProductById(currentId)
    if (reduxCateGoryList.length) {
      let result = reduxCateGoryList.find((item) => {
        return item._id === this.categoryId
      })
      if (result) this.setState({cateGoryName: result.name, isLoading: false})
    } else this.getInfoById()
  }
  
  
  render() {
    const {desc, detail, imgs, name, price, cateGoryName} = this.state
    return (
      <div>
        <Card
          loading={this.state.isLoading}
          title={
            <Button type='link'
                    onClick={() => {
                      this.props.history.goBack()
                    }}
                    style={{fontSize: '16px'}}
            >
              <ArrowLeftOutlined/>
              商品详情
            </Button>
          }
        >
          <List bordered>
            <List.Item>
              <span className="product_key">商品名称:</span>
              <span>{name}</span>
            </List.Item>
            <List.Item>
              <span className="product_key">商品价格:</span>
              <span>{price}</span>
            </List.Item>
            <List.Item>
              <span className="product_key">商品描述:</span>
              <span>{desc}</span>
            </List.Item>
            <List.Item>
              <span className="product_key">商品分类:</span>
              <span>{cateGoryName}</span>
            </List.Item>
            <List.Item>
              <span className="product_key" style={{width:'200px'}}>商品图片:</span>
              {
                <img src={`${BASE_URL}/upload/` + imgs} alt=""/>
              }
            </List.Item>
            <List.Item>
              <span className="product_key">商品细节:</span>
              <span dangerouslySetInnerHTML={{__html: detail}}/>
            </List.Item>
          
          </List>
        </Card>
      
      </div>
    )
      ;
  }
}

export default connect(
  state => ({
    productsList: state.productList,
    cateGoryList: state.categoryListForRedux
  }),
  {}
)(Detail)

import React, {Component} from 'react';
import {Button, Card, List, message} from "antd";
import {connect} from 'react-redux'
import {
  ArrowLeftOutlined
} from '@ant-design/icons'

import {getProductById} from '../../API/index'
import './detail.less'


class Detail extends Component {
  
  state = {
    categoryId: '',
    desc: '',
    detail: '',
    imgs: '',
    name: '',
    price: '',
  }
  
  getProductById = async (id) => {
    let result = await getProductById(id)
    const {status, data, msg} = result
    if (status === 0) {
      this.setState({...data})
    } else message.error(msg)
  }
  
  componentDidMount() {
    const currentId = this.props.match.params.id  //拿到传入过来的id,通过地址栏传输的
    console.log(currentId)
    const reduxProductList = this.props.productList ? this.props.productList : {}
    if (reduxProductList.length) {
      let result = reduxProductList.find((item) => item._id === currentId)
      if (result) {
        this.setState({...result})
      }
    } else this.getProductById(currentId)
  }
  
  
  render() {
    const {categoryId, desc, detail, imgs, name, price} = this.state
    return (
      <div>
        <Card
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
              <span>{categoryId}</span>
            </List.Item>
            <List.Item>
              <span className="product_key">商品图片:</span>
              {
                <img src={`/upload/` + imgs} alt=""/>
              }
            </List.Item>
            <List.Item>
              <span className="product_key">商品细节:</span>
              <span dangerouslySetInnerHTML={{__html: detail}}/>
            </List.Item>
            {/*<List.Item>*/}
            {/*  <span className="product_key">商品名称:</span>*/}
            {/*  <span>kjdakdkajsd</span>*/}
            {/*</List.Item>*/}
          </List>
        </Card>
      
      </div>
    )
      ;
  }
}

export default connect(
  state => ({productList: state.productList}),
  {}
)(Detail)

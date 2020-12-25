import React, {Component} from 'react';
import {Button, Table, Input, Select, Card, message} from "antd";
import {PlusOutlined, SearchOutlined} from '@ant-design/icons'; //antd组件
import {pageSize} from "../../config/config";
import {connect} from 'react-redux'
import {getProduct, updateProductStatus, searchProduct} from '../../API/index'
import {saveProductAction} from "../../redux/action_creators/product_action";

const {Option} = Select


class Product extends Component {
  
  state = {
    dataSource: [],   //商品列表数据，分页的
    total: '',        //一共有几页
    currentPage: '',  //当前页
    keyWord: '',   //关键字
    productName: 'productName', //搜索的方式
    isLoading: true
  }
  
  
  //获取商品列表
  getProductByPages = async (number = 1) => {
    let result = null;
    if (this.isSearch) {
      const {productName, keyWord} = this.state
      result = await searchProduct(number, pageSize, productName, keyWord)
    } else {
      result = await getProduct(number, pageSize)
    }
    const {data, status} = result
    if (status === 0) {
      this.setState({
        dataSource: data.list,
        total: data.total,
        currentPage: number,
        isLoading: false
      })
      this.props.saveProductList(data.list)
    } else {
      message.error("商品列表获取失败", 1)
    }
  }
  
  //搜索方法
  search = async () => {
    this.isSearch = true
    await this.getProductByPages()
  }
  
  
  componentDidMount() {
    this.getProductByPages()
  }
  
  
  //更新商品状态 上架/下架
  updateProductStatus = async (value) => {
    let dataSource = this.state.dataSource
    // console.log(value)
    let {_id, status} = value
    if (status === 1) status = 2
    else status = 1
    console.log(_id, "....", status)
    let result = await updateProductStatus(_id, status)
    console.log(result)
    if (result.status === 0) {
      message.success("商品更新成功", 1)
      dataSource.map((item) => {
        if (item._id === value._id) {
          item.status = status
        }
        return item
      })
      this.setState({dataSource})
    } else {
      message.error(result.msg)
    }
    
  }
  
  
  render() {
    
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        width: '15%',
        align: 'center',
        key: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc'
      },
      {
        title: '价格',
        align: 'center',
        width: '10%',
        dataIndex: 'price',
        key: 'price',
        render: price => "￥" + price
      },
      {
        title: '状态',
        // dataIndex: 'status',  //不写此属性,默认将整条数据获得
        align: 'center',
        width: '10%',
        key: 'status',
        render: (item) => {
          return (
            <div>
              <span style={{fontSize: '16px'}}>{item.status === 1 ? '在售' : "停售"}</span><br/>
              <Button
                type={item.status === 1 ? 'danger' : 'primary'}
                onClick={() => {
                  this.updateProductStatus(item)
                }}
              >
                {item.status === 1 ? '下架' : "上架"}
              </Button>
            </div>
          )
        }
      },
      {
        title: '操作',
        // dataIndex: 'opera',
        key: 'opera',
        width: '10%',
        align: 'center',
        render: (opera) => {
          return (
            <div>
              <Button type="link" onClick={() => {
                this.props.history.push(`/admin/pro_about/product/detail/${opera._id}`)
              }}>详情</Button><br/>
              <Button type="link" onClick={() => {
                this.props.history.push(`/admin/pro_about/product/add_update/${opera._id}`)
              }}>修改</Button>
            </div>
          )
        }
      }
    ]
    
    const {dataSource, total, currentPage} = this.state
    
    return (
      <Card
        title={
          <div>
            <Select defaultValue="productName" onChange={(e) => {
              this.setState({
                productName: e
              })
            }}>
              <Option value="productName">按名称搜索</Option>
              <Option value="productDesc">按描述搜索</Option>
            </Select>
            <Input
              placeholder="关键字"
              style={{margin: '0 10px', width: '150px'}}
              allowClear={true}
              onChange={(e) => {
                this.setState({
                  keyWord: e.target.value
                })
              }}
            />
            <Button
              type="primary"
              icon={<SearchOutlined/>}
              onClick={this.search}
            >搜索</Button>
          </div>
        }
        extra={<Button type="primary" icon={<PlusOutlined/>} onClick={() => {
          this.props.history.push('/admin/pro_about/product/add_update')
        }}>添加商品</Button>}
      >
        <Table
          loading={this.state.isLoading}
          bordered
          dataSource={dataSource}
          columns={columns}
          rowKey='_id'
          pagination={{
            pageSize,   //每页条数
            current: currentPage,   //当前页数
            onChange: this.getProductByPages, //当数据发生变化，（页数据）
            total: total    //一共有多少页
          }}
        />
      </Card>
    )
  }
}

export default connect(
  state => ({}),
  {saveProductList: saveProductAction}
)(Product)

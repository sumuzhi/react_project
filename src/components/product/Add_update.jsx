import React, {Component} from 'react';
import {Button, Card} from "antd";
import {
  ArrowLeftOutlined
} from '@ant-design/icons'

export default class Add_update extends Component {
  render() {
    return (
      <div>
        <Card title={<Button type='link' style={{fontSize:'16px'}}><ArrowLeftOutlined />商品管理</Button>}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    )
  }
}

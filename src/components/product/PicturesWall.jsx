import {Upload, Modal, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import React from 'react';
import {BASE_URL} from "../../config/config";
import {deletePicture} from "../../API";


//将图片变成base64编码形式
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  
  
  state = {
    previewVisible: false,  //是否展示预览窗
    previewImage: '',    //要预览的图片的URL或Base64
    fileList: []
  };
  
  //遍历图片墙中的数组,将数组中的图片的名字取出构建数组,供Add_update使用
  getImagesArr = () => {
    let result = []
    this.state.fileList.forEach((item) => {
      result.push(item.name)
    })
    return result
  }
  
  //将图片经由服务器返回(用于数据回显)
  setImagesArr = (imageArr) => {
    let result = []
    imageArr.forEach((item, index) => {
      result.push({uid: -index, name: item, url: `${BASE_URL}/upload/${item}`})
    })
    this.setState({
      fileList: result
    })
  }
  
  handleCancel = () => this.setState({previewVisible: false});
  
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  
  
  //当图片被删除时调用的函数
  deletePictures = async (name) => {
    console.log(name)
    let result = await deletePicture(name)
    if (result.status === 0)
      message.success("图片删除成功")
    else message.error("图片删除失败")
  }
  
  //当图片变化时调用的函数
  //在上传图片时,服务器返回的数据包含在了file中,现在应该将服务器返回的数据重新写入到file中,将图片原本的数据进行更改,方便服务器可以删除图片
  handleChange = ({file, fileList}) => {
    
    //若文件删除文件
    if (file.status === 'removed') {
      console.log(file)
      this.deletePictures(file.name)
    }
    //若文件上传成功
    if (file.status === 'done') {
      const {response} = file
      console.log(response)
      fileList[fileList.length - 1].url = response.data.url
      fileList[fileList.length - 1].name = response.data.name
    }
    this.setState({fileList})
  }
  
  render() {
    const {previewVisible, previewImage, fileList, previewTitle} = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined/>
        <div style={{marginTop: 8}}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action={`${BASE_URL}/manage/img/upload`}  //图片上传的服务器的地址  模板字符串是js语法
          method="post"
          name="image"
          listType="picture-card"     //照片墙的展示方式
          fileList={fileList}   //图片列表，一个数组里面包含着多个图片对象
          onPreview={this.handlePreview}   //点击预览按钮的回调
          onChange={this.handleChange}      // 图片状态的改变的回调
        >
          {/*用于控制上传的照片的张数（隐藏上传按钮）*/}
          {fileList.length >= 2 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>
      </>
    );
  }
}

export default PicturesWall

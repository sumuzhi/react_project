import React, {Component} from 'react';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import './rich_text_editor.less'


class Rich_text_editor extends Component {
  state = {
    editorState: EditorState.createEmpty(),   //初始化状态的编辑器+内容
  }
  
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  
  getRichTextContent = () => {
    const {editorState} = this.state
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }
  
  setRichTextContent = (html) => {
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({editorState})
    }
  }
  
  render() {
    const {editorState} = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"   //控制样式
          editorClassName="demo-editor"     //控制样式
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

export default Rich_text_editor

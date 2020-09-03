##react项目第一天
* 1.使用create-react-app创建基于react脚手架应用（最好精简一下脚手架）
* 2.引入antd，完成按需引入，自定义主题
* 3.login静态页面（不使用atnd的任何组件）
* 4.login的Form表单（不加校验，只是使用静态的Form）
* 5.login的Form表单（给用户名加校验，声明式验证）
* 6.login的Form表单（给密码加校验，自定义验证）
* 7.理解好Form.create()(Login)
* 8.高阶组件、高阶函数
###总结
* 在antd4.X中,form表单自动（全部）进行校验。
* 在antd3.x中，当form表单输入的不满足rule，得自己调用方法去全部进行判断
* ex：
    在ant3.x中，利用rule对用户名，密码分别进行校验，当输入的条件不满足时，点击登录也会触发登录的操作函数；但是在ant4.x中，不满足条件时，点击登录按钮也不会触发登录函数
    antd4.x中，默认form提交方法位ajax，不会触发form提交后造成网页自动刷新功能。
    
###需要引入的第三方库
* react-redux
* redux-thunk


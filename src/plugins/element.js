import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 把Message挂载到vue原型对象上，在每个组件中都可以通过$message进行弹框提示（$message是自定义的）
Vue.prototype.$message = Message

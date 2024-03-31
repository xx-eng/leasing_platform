<template>
  <div class="register">
    <img src="../../assets/images/login/mylogo.png" height="540" width="480" style="z-index: -1;"/>
    <img src="../../assets/images/login/mylogo.png" height="540" width="480" style="z-index: -1;"/>
    <div style="width:600px; height: 580px; border:1px solid #339966; position: absolute; left:50%; top: 50%; transform: translate(-50%,-50%); border-radius: 50px 50px 50px 50px;background-color: white;">
      <div class="title">欢迎注册！</div><br>
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
            label="用户姓名"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['name', {rules:[{required: true, message: '请输入'}]}]" />
        </a-form-item>
        <a-form-item
            label="用户性别"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
        >
          <a-select v-decorator="['sex']" style="width: 200px">
            <a-select-option :value="1">男</a-select-option>
            <a-select-option :value="2">女</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
            label="账号"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['account']" />
        </a-form-item>
        <a-form-item
            label="邮箱"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['email']"></a-input>
        </a-form-item>
        <a-form-item
            label="电话号码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['mobile']"></a-input>
        </a-form-item>
        <a-form-item
            label="卡号"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['bankCard']"></a-input>
        </a-form-item>
        <a-form-item
            label="密码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['password']"></a-input>
        </a-form-item>
        <a-form-item
                label="是否学生"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
        >
<!--          <a-radio-group v-decorator="['isStudent']">-->
<!--            <a-radio :value="1">-->
<!--              是-->
<!--            </a-radio>-->
<!--            <a-radio :value="0">-->
<!--              否-->
<!--            </a-radio>-->
<!--          </a-radio-group>-->
          <a-select v-decorator="['isStudent']" style="width: 200px">
            <a-select-option :value="1">是</a-select-option>
            <a-select-option :value="0">否</a-select-option>
          </a-select>
        </a-form-item>

        <!--<a-form-item
            label="库存"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['stock']"></a-input>
        </a-form-item>

        <a-form-item label="添加图片" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
              name="file"
              :multiple="true"
              action="http://localhost:8080/file/upload"
              :headers="headers"
              @change="handleChange"
          >
            <a-button> <a-icon type="upload" /> Click to Upload </a-button>
          </a-upload>
        </a-form-item>-->

        <a-form-item style="position: absolute; left: 50%; transform: translate(-50%);">
          <a-button @click="$router.back()" type="primary" style="background-color: #339966; border-color: #339966">返回</a-button>
          <a-button @click="addUser" type="primary" style="background-color: #339966; border-color: #339966;margin-left: 40px;">添加</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { add } from "@/api/user";
import md5 from 'md5'
// import { getAllBrand, getAllCategory, addGoods } from '@/api/goods'
import pick from 'lodash.pick'

const fields = [
  'name', 'sex', 'account', 'email', 'bankCard', 'password', 'mobile' ]

export default {
  name: 'Register',
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      form: this.$form.createForm(this),
      categories: [],
      brands: [],
      imageId: '',
      image: ''
    }
  },
  mounted () {
    // this.record && this.form.setFieldsValue(pick(this.record, fields))
    this.form.setFieldsValue(pick(fields))
    console.log('record', this.form)
    // getAllCategory().then(res => {
    //   console.log('res-category', res.data)
    //   this.categories = res.data
    //   console.log('category', this.categories)
    // }).catch(error => {
    //   console.log(error)
    // })
    // getAllBrand().then(res => {
    //   console.log('brand', res.data)
    //   this.brands = res.data
    // }).catch(error => {
    //   console.log(error)
    // })
  },
  methods: {
    onOk () {
      console.log('监听了 modal ok 事件')
      return new Promise(resolve => {
        resolve(true)
      })
    },
    onCancel () {
      console.log('监听了 modal cancel 事件')
      return new Promise(resolve => {
        resolve(true)
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.visible = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
        }
      })
    },
    addUser () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          values.password = md5(values.password)
          console.log('form', values)
          // const photo = { imageId: this.imageId, image: this.image, firmId: 20212000001 }
          const requestParameters = Object.assign({}, values)
          console.log('requestParam', requestParameters)
          return add(requestParameters).then(res => {
            if (res.code === 2006) {
              this.$notification.success({  //注册成功侧边提示框
                message: '操作消息',
                description: '恭喜您已成功注册！',
                icon: <a-icon type="smile" style="color: #339966" />,
            })
              this.$router.push({path: '/'})
            }
          })
        }
      })
    },
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
        console.log('file', info.fileList[0].response.data)
        this.imageId = info.fileList[0].response.data.id
        this.image = '/file/image/' + info.fileList[0].response.data.fileName
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.title{
  height: 70px;
  line-height: 70px;
  text-align: center;
  font-size: 20pt;
  font-weight: bold;
  color: #339966;
  border-bottom: 3px solid #339966;

}



</style>

<template>
  <div class="register">
    <img src="../../assets/images/login/mylogo.png" height="540" width="480" style="z-index: -1;"/>
    <img src="../../assets/images/login/mylogo.png" height="540" width="480" style="z-index: -1;"/>
    <div style="width:600px; height: 800px; border:1px solid #339966; position: absolute; left:50%; top: 50px; transform: translate(-50%); border-radius: 50px 50px 50px 50px;background-color: white;">
      <div class="title">欢迎商家注册！</div><br>
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
            label="姓名"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['name', {rules:[{required: true, message: '请输入'}]}]" />
        </a-form-item>
        <a-form-item
            label="账号"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['account', {rules:[{required: true, message: '请输入'}]}]" />
        </a-form-item>

        <a-form-item
            label="卡号"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['bankCard']" />
        </a-form-item>
        <a-form-item
            label="身份证号"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['idCard']"></a-input>
        </a-form-item>
        <a-form-item
            label="电话号码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['mobile']"></a-input>
        </a-form-item>
        <a-form-item
            label="邮箱"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['email']"></a-input>
        </a-form-item>
        <a-form-item
          label="企业名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['firmName']"></a-input>
        </a-form-item>
        <a-form-item
          label="企业注册号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['registration']"></a-input>
        </a-form-item>
        <a-form-item
            label="密码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['password']"></a-input>
        </a-form-item>

        <a-form-item label="添加法人身份证复印件" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            name="file"
            :multiple="true"
            action="http://localhost:8080/file/upload"
            :headers="headers"
            @change="handleChange"
          >
            <a-button> <a-icon type="upload" /> Click to Upload </a-button>
          </a-upload>
        </a-form-item>

        <a-form-item label="添加营业执照" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-upload
            name="file"
            :multiple="true"
            action="http://localhost:8080/file/upload"
            :headers="headers"
            @change="handleChangeRegister"
          >
            <a-button> <a-icon type="upload" /> Click to Upload </a-button>
          </a-upload>
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
          <a-button @click="addUser" type="primary" style="background-color: #339966; ">添加</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { addFirm } from "@/api/user";
import md5 from 'md5'
// import { getAllBrand, getAllCategory, addGoods } from '@/api/goods'
import pick from 'lodash.pick'

const fields = [
  'name', 'account', 'bankCard', 'idCard',
  'idCardPicId', 'idCardPicName', 'email',
  'mobile', 'firmName', 'registration',
  'password', 'licenseId', 'licenseName' ]

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
      idCardPicId: '',
      idCardPicName: '',
      licenseId:'',
      licenseName: ''

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
          const photo = { idCardPicId: this.idCardPicId, idCardPicName : this.idCardPicName, licenseId: this.licenseId, licenseName: this.licenseName }
          const requestParameters = Object.assign({}, values, photo)
          console.log('requestParam', requestParameters)
          return addFirm(requestParameters).then(res => {
            if (res.code === 2006) {
              alert('添加成功')
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
        this.idCardPicId = info.fileList[0].response.data.id
        this.idCardPicName = '/file/image/' + info.fileList[0].response.data.fileName
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    handleChangeRegister (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
        console.log('file', info.fileList[0].response.data)
        this.licenseId = info.fileList[0].response.data.id
        this.licenseName = '/file/image/' + info.fileList[0].response.data.fileName
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

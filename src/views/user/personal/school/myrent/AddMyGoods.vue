<template>
  <div class="add">
    <Menu :current="'8'"  style="z-index: 100;"></Menu>
    <div class="bread">
      <a-breadcrumb>
        <a-breadcrumb-item href="">
          <a-icon type="shop" />
          <span>校租租</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item href="">
          <a-icon type="home" />
          <span>我的租屋</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item href="">
          <a-icon type="plus-circle" />
          <span>添加商品</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="tips">
      <a-collapse default-active-key="0">
        <a-collapse-panel key="1" header="☺校租租温馨提示">
          <p>欢迎来到商品添加页面，在此页面您可以添加想要租赁给学校其他同学的物品。</p>
        </a-collapse-panel>
      </a-collapse>
      <div class="my-rent">
        <a-button type="primary" @click="$router.back()">返回</a-button>
      </div>
    </div>
    <div class="addForm" style="width:600px; border:1px solid #339966; padding-top:30px; position: absolute; left:50%; top: 350px; transform: translate(-50%,-50%); border-radius: 50px 50px 50px 50px;background-color: white;">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
                label="商品名称"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['title', {rules:[{required: true, message: '请填写名称'}]}]" />
        </a-form-item>
        <a-form-item
                label="商品简介"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['abstract', {rules:[{required: true, message: '请填写简介'}]}]" />
        </a-form-item>

        <a-form-item
                label="押金"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['deposit', {rules:[{required: true, message: '请输入押金'}]}]" />
        </a-form-item>
        <a-form-item
                label="租金"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['rental', {rules:[{required: true, message: '请输入租金'}]}]" />
        </a-form-item>
        <a-form-item
                label="上传图片"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
        >
          <a-upload
                  name="file"
                  :multiple="true"
                  action="http://127.0.0.1:8080/file/upload"
                  :headers="headers"
                  @change="handleChange"
          >
            <a-button> <a-icon type="upload" /> Click to Upload </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item style="position: absolute; left: 50%; transform: translate(-50%);">
          <a-button @click="addGoods" type="primary" style="background-color: #339966; ">添加</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
  import Menu from "@/components/Menu";
  import user from "@/store/module/user";
  import {addUserGoods} from "@/api/school"
  import pick from 'lodash.pick'

  const fields = [
    'firmId', 'title', 'abstract', 'deposit', 'rental', 'imageId', 'image']
  export default {
    name: "AddMyGoods",
    components: {
      Menu
    },
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
        image: '',
        headers: {
          authorization: 'authorization-text',
        },
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
      addGoods () {
        this.form.validateFields((errors, values) => {
          if (!errors) {
            console.log('form', values)
            const photo = { imageId: this.imageId, image: this.image, firmId: user.state.userId }
            const requestParameters = Object.assign(photo, values)
            // requestParameters['firmId'] = user.state.userId
            // requestParameters['imageId'] = this.imageId
            // requestParameters['image'] = this.image
            console.log('requestParam', requestParameters)

            return addUserGoods(requestParameters).then(res => {
              if (res.code === 2006) {
                this.$notification.success({  //添加成功侧边提示框
                  message: '操作消息',
                  description: '恭喜您已成功添加商品！',
                  icon: <a-icon type="smile" style="color: #339966" />,
              })
                this.$router.push({path: '/school/myrent'})
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

<style scoped>
  /* 面包屑 */
  .bread{
    position: absolute;
    top: 60px;
    left: 270px;
  }

  .tips {
    position: absolute;
    top: 100px;
    left: 280px;
    width: calc(100vw - 350px);
    z-index: 999;
  }

  >>>.ant-collapse.ant-collapse-icon-position-left {
    display: inline-block;
    background-color: #f9f9f9;
  }


  >>>.ant-collapse .ant-collapse-item {
    width: 700px;
    height: 45px;
    /*background-color: #65cf88;*/
    font-weight: bold;
  }

  >>>.ant-collapse > .ant-collapse-item > .ant-collapse-header {
    color: #46985a;
  }

  >>>.ant-collapse-content-box {
    border: 1px dashed #dbdbdb;
    border-top: 0;
    font-weight: 400;
    background-color: #effcf4;
  }

  .my-rent {
    display: inline-block;
    position: fixed;
    right: 100px;
    margin-left: 10px;
  }

  .ant-btn-primary {
    background-color: #127c47;
    border-color: #127c47;
  }

  .ant-btn-primary:hover {
    background-color: rgba(18, 124, 71, .9);
    border-color: rgba(18, 124, 71, .9);
  }

  /* 表单样式 */
  .addForm {
    position: relative;
    top: 500px;
  }
</style>
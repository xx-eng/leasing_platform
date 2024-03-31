<template>
  <div>
    <Menu :current="'4'" style="z-index: 100;"></Menu>
    <div class="bread">
      <a-breadcrumb>
        <a-breadcrumb-item href="">
          <a-icon type="home" />
          <span>用户中心</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item href="">
          <a-icon type="environment"/>
          <span>地址管理</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <a-button class="addAddress" @click="gotoAddPage">添加地址</a-button>

    <collection-create-form
        ref="collectionForm"
        :visible="visible"
        @cancel="handleCancel"
        @create="handleCreate"
    />

    <div class="address-table">
      <a-table
          :columns="columns"
          :row-key="addresses => addresses.id"
          :data-source="addresses"
          :pagination="pagination"
          :loading="loading"
          @change="handlePageChange"
          :row-class-name="isActive"
      >
        <a slot="image" slot-scope="text, record" @click="gotoDescription(record)">
          <img  :src="record.image" style="width: 120px;" />
        </a>


        <div slot="operate" slot-scope="text, record">
          <a-button type="danger" @click="deleteAddress(record)">删除</a-button>&nbsp;&nbsp;
<!--          <a-button @click="updateAddress(record)" style="background-color: #ec971f; color: white;">修改</a-button>&nbsp;&nbsp;-->
          <a-button type="primary" @click="updateAddress(record)">设为默认</a-button>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
import {getUserInfo} from "@/api/rental";
import {getAllAddress} from "@/api/rental";
import user from "@/store/module/user";
import {addAddress, deleteAddress, updateAddress} from "@/api/address";


const CollectionCreateForm = {
  props: ['visible'],
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'form_in_modal' });
    console.log('beforeCreate', this.form)
  },
  template: `
    <a-modal
      :visible="visible"
      title='添加地址'
      okText='Create'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
    >
      <a-form layout='vertical' :form="form">
        <a-form-item label='省'>
          <a-select default-value="北京" style="width: 100px" @change="handleChange">
            <a-select-option value="北京">
              北京
            </a-select-option>
            <a-select-option value="天津">
              天津
            </a-select-option>
            <a-select-option value="河北">
              河北
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label='市'>
          <a-input v-model="city" placeholder="市" allowClear class="city"></a-input>
        </a-form-item>
        <a-form-item label="区">
          <a-input  v-model="county" placeholder="区" allowClear class="county"></a-input>
        </a-form-item>
        <a-form-item label="县">
          <a-input v-model="town" placeholder="乡镇" allowClear class="town"></a-input>
        </a-form-item>
        <a-form-item label="街道">
          <a-input v-model="street" placeholder="街道" allowClear class="street"></a-input>
        </a-form-item>
        <a-form-item label='详细地址'>
          <a-input
              type='textarea'
              v-decorator="['description']"
              v-model="addressInfo"
          />
        </a-form-item>
        <a-button @click="addAddress">保存</a-button>
      </a-form>
    </a-modal>
  `,
  methods: {
    addAddress(){
      addAddress(user.state.userId,this.isDefault,this.province, this.city, this.county, this.street, this.town, this.addressInfo).then(res => {
        console.log("res-address",res.data)
        if(res.code === 2004){
          alert('添加成功！')
        }
        this.visible = false
      }).catch(error => {
        console.log(error)
      });
    },
    handleChange(value) {
      console.log(`selected ${value}`);
      this.province = value;
    }
  },
  data() {
    return{
      addressInfo: '',
      province: '',
      addresses: [],
      city: '',
      county: '',
      street: '',
      town: '',
      isDefault: 0,
    }
  }
};



export default {
  name: "Address",
  components: {Menu, CollectionCreateForm },
  data() {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        //sorter: true,
        width: '7%',
        //scopedSlots: { customRender: 'image' },
      },
      {
        title: '是否默认',
        dataIndex: 'default',
        width: '10%'
      },
      {
        title: '手机',
        dataIndex: 'mobile',
        //sorter: true,
        width: '13%',
        //scopedSlots: { customRender: 'order' },
      },
      {
        title: '省份',
        dataIndex: 'province',
        width: '10%',
      },
      {
        title: '城市',
        dataIndex: 'city',
        width: '10%',
      },
      {
        title: '区/县',
        dataIndex: 'county',
        width: '10%',
      },
      {
        title: '详细地址',
        dataIndex: 'addressInfo',
        width: '20%',
      },
      {
        title: '详细操作',
        dataIndex: 'operate',
        width: '30%',
        scopedSlots: { customRender: 'operate' },
      },
    ];
    //this.dateFormat = 'YYYY-MM-DD';
    return {
      //userAddress: [],
      pagination: {
        pageSize: 6,
        current: 1,
        total: 0
      },
      loading: false,

      columns,
      userInfo: [],
      addressInfo: '',
      province: '',
      addresses: [],
      city: '',
      county: '',
      street: '',
      town: '',
      isDefault: 0,
      defaultId: '',
      visible: false
    }
  },
  async mounted(){
    console.log(user)
    //user.state.userId
    getUserInfo(user.state.userId).then(res => {
      console.log("res-user",res.data)
      this.userInfo = res.data
      this.account = this.userInfo.account
    }).catch(error => {
      console.log(error)
    })
    getAllAddress(user.state.userId).then(res => {
      console.log("res-address", res.data)
      this.addresses = res.data
      for(let add of this.addresses){
        if(add.isDefault != 1){
          add.default = '非默认'
        }else{
          add.default = '默认'
          this.defaultId = add.id
        }
      }
    }).catch(error => {
      console.log(error)
    })
  },
  methods:{
    handlePageChange(pagination){
      this.pagination = pagination
      this.select()
    },
    handleChange(value) {
      console.log(`selected ${value}`);
      this.province = value;
    },
    addAddress(){
      addAddress(user.state.userId,this.isDefault,this.province, this.city, this.county, this.street, this.town, this.addressInfo).then(res => {
        console.log("res-address",res.data)
      }).catch(error => {
        console.log(error)
      });
    },

    showModal() {
      this.visible = true;
      console.log(this.visible)
    },
    handleCancel() {
      this.visible = false;
    },
    handleCreate() {
      console.log('handleCreate')
      const form = this.$refs.collectionForm.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log('Received values of form: ', values);
        form.resetFields();
        this.visible = false;
      });
    },
  gotoAddPage(){
    this.$router.push('/addPage')
  },
    // 删除地址
    deleteAddress(record){
      deleteAddress(record.id).then(res => {
        if(res.code === 2002){
          this.$notification.success({  //注册成功侧边提示框
            message: '操作消息',
            description: '地址删除成功！',
            icon: <a-icon type="smile" style="color: #339966" />,
        })
          getAllAddress(user.state.userId).then(res => {
            console.log("res-address", res.data)

            this.addresses = res.data
            for(let add of this.addresses){
              if(add.isDefault != 1){
                add.default = '非默认'
              }else{
                add.default = '默认'
              }
            }
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    // 设置默认地址
    updateAddress(record){
      this.defaultId = !this.defaultId?record.id:this.defaultId
      updateAddress(record.id, this.userInfo.id, this.defaultId).then(res => {
        if(res.code === 2004){
          this.$notification.success({  //注册成功侧边提示框
            message: '操作消息',
            description: '设置默认地址成功！',
            icon: <a-icon type="smile" style="color: #339966" />,
        })
          this.defaultId = record.id

          getAllAddress(user.state.userId).then(res => {
            console.log("res-address", res.data)
            this.addresses = res.data
            for(let add of this.addresses){
              if(add.isDefault != 1){
                add.default = '非默认'
              }else{
                add.default = '默认'
              }
            }
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },

    isActive(record, index) {
      console.log('我是第'+ index + '个', record)
      return record.isDefault?'active':'';
    }
  },
}
</script>

<style scoped>
a{
  color: #101010;
}

.bread{
  position: absolute;
  top: 60px;
  left: 270px;
}

.address-table{
  width: 75%;
  position: absolute;
  top: 130px;
  left: 60%;
  transform: translate(-50%);
}

.addAddress{
  background-color: #5bc0de;
  color: white;
  position: absolute;
  right: 30px;
  top: 80px;
}

.nav{
  position: absolute;
  left: 70px;
  width: 100px;
  //background-color: lightyellow;
}
.nav-title{
  height: 35px;
  line-height: 35px;
  font-size: 14pt;
  color: #FF6666;
  font-weight: bold;
}

.nav-content{
  height: 30px;
  line-height: 40px;
  font-size: 13pt;
}

.user-info{
  height: 240px;
  width: 800px;
  border: 1px solid #BBBBBB;
  position: absolute;
  left: 270px;
}

.select-item{
  display: inline-block;
  position: relative;
  width: 25%;
  top: 20px;
  border-right: 1px solid #BBBBBB;
}
/deep/ .ant-fullcalendar-selected-day .ant-fullcalendar-value, .ant-fullcalendar-month-panel-selected-cell .ant-fullcalendar-value{
  background-color: #FF6666;
}
/deep/ .ant-fullcalendar-today .ant-fullcalendar-value, .ant-fullcalendar-month-panel-current-cell .ant-fullcalendar-value {
  box-shadow: 0 0 0 1px #FF6666 inset;
}

/deep/ .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
  z-index: 1;
  color: #FF6666;
  background: #fff;
  border-color: #FF6666;
  box-shadow: -1px 0 0 0 #FF6666;
}

/deep/ .ant-radio-button-wrapper:hover{
  color: #FF6666;
}

.user-info-item{
  width: 90%; border-bottom: 1px solid #BBBBBB; height: 80px; line-height: 80px;
  position: absolute; left:50%; transform: translate(-50%);
}

.user-info-title{
  width: 70px;
  //background-color: lightyellow;
}

.search-btn{
  border-radius: 50px;
  width: 100px;
  position: absolute;
  top: 185px;
  left: 320px;
  background-color: #FF6666;
  color: white;
}

.city{
  width: 50%;
}
.county{
  width: 50px;
}
.town{
  width: 50px;
}
.street{
  width: 50px;
}

  /deep/ .active {
    color: #339966;
    background-color: #f9fcfd;
  }

  /deep/ .addAddress.ant-btn, .ant-btn.ant-btn-primary {
    background-color: #339966;
    border: #339966;
  }

  /deep/ .addAddress.ant-btn:hover, .ant-btn.ant-btn-primary:hover {
    background-color: #13c45b;
    border: #13c45b;
  }

  /deep/.ant-breadcrumb-link:hover{
    color: #127c47;
  }

  /deep/.ant-pagination-item.ant-pagination-item-1.ant-pagination-item-active {
    border-color: #127c47;
  }

  /deep/.ant-pagination-item-active a {
    color: #127c47;
  }

</style>
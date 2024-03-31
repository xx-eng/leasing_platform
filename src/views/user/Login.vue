<template>
  <div class="main">

    <div class="login-edging">
      <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout" class="login-form">
        <a-form-model-item has-feedback label="用户名" prop="account">
          <a-input v-model="ruleForm.account" type="string" autocomplete="off"/>
        </a-form-model-item>

        <a-form-model-item has-feedback label="密码" prop="password">
          <a-input v-model="ruleForm.password" type="password" autocomplete="off"/>
        </a-form-model-item>
        <a href="" style="position: relative; right: -80px; font-size: 8pt;">
          忘记密码?>>
        </a>
        <!--<a-form-model-item has-feedback label="Confirm" prop="checkPass">
          <a-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="Age" prop="age">
          <a-input v-model.number="ruleForm.age" />
        </a-form-model-item>-->
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">

          <a-button type="primary" @click="handleLogin('ruleForm')">
            登录
          </a-button>
          <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
            重置
          </a-button>
          <br/>
          <a href="" style="position: relative; right: -100px; font-size: 8pt;">
            立即注册!&nbsp;&nbsp;<a-icon type="right-circle" two-tone-color="#eb2f96"/>
          </a>
        </a-form-model-item>

      </a-form-model>
    </div>

  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    let checkAccount = (rule, value, callback) => {
      //clearTimeout(checkPending);
      if (value === '') {
        return callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    /*let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };*/
    return {
      ruleForm: {
        account: '',
        password: '',
        //checkPass: '',
        //age: '',
      },
      rules: {
        username: [{validator: checkAccount, trigger: 'change'}],
        pass: [{validator: validatePass, trigger: 'change'}],
        //checkPass: [{ validator: validatePass2, trigger: 'change' }],
        //age: [{ validator: checkAge, trigger: 'change' }],
      },
      layout: {
        labelCol: {span: 4},
        wrapperCol: {span: 16},
      },
    };
  },
  methods: {
    handleLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm);
          this.$store.dispatch('Login', this.ruleForm).then(() => {
              this.$notification.info({
                message: '登录成功',
                description: this.$store.getters.token
              })
            },
          ).catch(() => {
            this.$router.push({path: '/login'})
          }).finally(() => {
            //console.log('?????');
            console.log("userId", this.$store.getters.userId)
            this.$router.push({path: '/home'})
            //this.$router.push({ path: '/home' })
          })
        } else {
          console.log('未通过验证!!');
          return false;
        }
      });
    },
    /*handleLogin() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch('Login', this.form).then(() => {
            this.$notification.info({
              message: '登录成功',
              description: this.$store.getters.token
            })
          }).catch(() => {

          }).finally(() => {

          })
        }
      })
    },*/
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },

}
</script>

<style lang="less" scoped>
.main {
  width: 1280px;
  height: 610px;
  background-image: url("~@/assets/loginBackground.jpg");
  background-size: 100% 100%;
  background-attachment: fixed;
}

.login-edging {
  position: absolute;
  top: 150px;
  right: 80px;
  width: 350px;
  height: 300px;
  background-color: white;
  text-align: center;
  border-radius: 20px;
}

.login-form {
  position: relative;
  top: 50px;
  left: 20px;
}

</style>




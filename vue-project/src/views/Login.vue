<template>
    <div class='login_page fillcontain'>
      <transition name='form-fade' mode='in-out'>
        <section class='form_container'>
          <div class='manage_tip'>
            <p>后台管理系统</p>
          </div>
      <el-form
        :model='ruleForm'
        status-icon
        :rules='rules'
        ref='ruleForm'
        label-width='10px'
        class='demo-ruleForm form'
      >
        <el-form-item prop='userName'>
          <el-input v-model='ruleForm.userName' autocomplete='off' placeholder='用户名' ></el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input
            type='password'
            v-model='ruleForm.password'
            autocomplete='off'
            placeholder='密码'
            size='100px'
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type='primary' @click="submitForm('ruleForm')" class='submit_btn'>登录</el-button>
        </el-form-item>
      </el-form>
      <div class="tips">
        <p >温馨提示</p>
        <p>未登录过的新用户，自动注册</p>
        <p>注册过的用户可凭账号密码登录</p>
      </div>
      </section>
      </transition>
    </div>
</template>
<script>
import { userLogIn } from '../model/getData'
export default {
  name: 'home',
  data () {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var checkPassWord = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }

    return {
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        password: [{ validator: checkPassWord, trigger: 'blur' }],
        userName: [{ validator: checkUsername, trigger: 'blur' }]
      }
    }
  },
  methods: {
    open () {
      this.$notify.error({
        title: '错误',
        message: '请输入正确的用户名密码',
        offset: 100
      })
    },
    async isLogin () {
      let result = await userLogIn(this.ruleForm)
      if (result.code === 0) {
        localStorage.setItem('ACCESS_TOKEN',result.data.token)
        this.$store.commit('updateToken',{token: result.data.token})
        this.$message({
          type: 'success',
          message: '登录成功'
        })
        this.$router.push('manage')
      } else {
        this.open()
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLogin()
        } else {
          this.open()
          return false
        }
      })
    }
  }
}

</script>

<style lang='less' scoped>
  .login_page {
    background: #00b38a;
    height: 100vh;
  }
  .manage_tip {
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
    p {
      font-size: 34px;
      color: #fff;
    }
  }
  .form_container{
    width: 320px;
    height: 220px;
    // .wh(320px,210px)
    // .ctp(320px,210px)
    position:absolute;
    left: 50%;
    top: 50%;
    transform:translate(-50%,-50%);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background: #fff;
    .submit_btn {
      width: 100%;
      font-size: 16px;
    }
  }
  .tips {
    color: red;
    font-size: 12px;
  }
  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }
  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }

</style>

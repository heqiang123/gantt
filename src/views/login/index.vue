<template>
  <div v-dee-loading="loading" class="login">
    <div class="right middle">
      <div class="loginBox">
        <div class="title">
          <h1>AG600制造执行系统</h1>
          <p>AG600  Manufacturing Execution System</p>
        </div>
        <div>
          <el-form ref="form" label-position="top" :model="loginForm" :rules="loginFormRules" label-width="100px">
            <el-form-item label="用户名:" prop="account">
              <el-input v-model="loginForm.account" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="userLogin">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
// import引入的组件需要注入到对象中才能使用
  components: {},

  props: {},

  data() {
    // 这里存放数据
    return {
      loginData: {},
      loading: false,
      loginForm: {
        account: '',
        password: ''
      },
      loginFormData: [
        {
          data: [
            {
              key: 'account',
              title: '用户名',
              component: {
                name: 'el-input',
                placeholder: '用户名'
              },
              icon: require('../../icons/login/icon_account_normal.png')
            },
            {
              key: 'password',
              title: '密码',
              component: {
                name: 'el-input',
                placeholder: '密码',
                type: 'password'
              },
              icon: require('../../icons/login/icon_passwords_active.png')
            }
          ]
        }
      ],
      loginFormRules: {
        account: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    const that = this
    document.onkeydown = function(e) {
      var key = window.event.keyCode
      if (key === 13) {
        that.userLogin()
      }
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  activated() {
  },
  // 方法集合
  methods: {
    userLogin() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
  .login {
    width: 100%;
    height: 100%;
    background-position: center;
    background-image: url('../../icons/login/newLogin.png');
    .right{
      width: 50%;
      height: 100%;
      float: right;
      .loginBox{
        width: 360px;
        .title>h1,p{
          color: #ffffff;
        }
        /deep/ .el-input{
          font-size:16px;
        }
        /deep/ .el-form--label-top .el-form-item__label{
          color: #ffffff;
        }
        /deep/ .el-input__inner {
          background-color: transparent;
          border-top: 0;
          border-left: 0;
          border-right: 0;
          border-radius: 0;
          color: #fff;
        }
        /deep/ .el-input__inner::-webkit-input-placeholder {
          color: #fff;
        }
        /deep/ .el-button{
          width: 100%;
          margin-top: 30px;
          background: linear-gradient(90deg, #00A3FF 30%, #006FFF 100%);;
        }
        /deep/.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
          content: '';
        }
      }
    }
  }
</style>

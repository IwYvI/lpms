<template>
  <div class="app-wrapper">
    <el-container>
      <el-main>
        <div class="form-wrapper">
          <h3 class="title">
            <img :src="logo" alt="永兴日成贷款管理系统" style="max-width:100%">
          </h3>
          <el-card class="box-card">
            <div slot="header" class="form-title">
              <span>登录到我的账户</span>
            </div>
            <el-form :model="loginForm" ref="loginForm" :rules="loginRules" status-icon>
              <el-form-item label="用户名" prop="name">
                <el-input v-model="loginForm.name" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  type="password"
                  v-model="loginForm.password"
                  auto-complete="off"
                  @keyup.enter.native="handleLogin"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <el-form-item class="form-action">
                <el-button
                  type="primary"
                  @click.native.prevent="handleLogin"
                  :loading="loading"
                >{{loading?'正在登录...':'登录'}}</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-main>
      <el-footer>
        <span>
          {{new Date().getFullYear()}} &copy;
          <abbr title="Intelligent Medical">IM</abbr>
        </span>
        <span>
          Powered by
          <abbr title="WuHan University">WHU</abbr> |
          <a target="_blank" href="http://libingteam.com">LiBingTeam</a>
        </span>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import logo from '@/assets/logo-new.png'
export default {
  name: 'login',
  data () {
    return {
      logo,
      loginForm: {
        name: '',
        password: ''
      },
      loginRules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          // { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          { pattern: /^1[0-9]{10}$/, message: '手机号格式有误', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
          // { min: 6, max: 16, message: '密码长度为6到16位', trigger: ['blur', 'change'] }
        ]
      },
      loading: false
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then((data) => {
            this.loading = false
            if (data) {
              // 登录成功，跳转到首页
              this.$router.push({ path: '/' })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.app-wrapper {
  background-color: #e7e5e4;
  height: 100vh;
  .el-header {
    padding: 0 100px;
    border-bottom: 1px solid #eee;
    img {
      height: 60px;
    }
  }
  .el-main {
    .form-wrapper {
      .title {
        margin: 50px 0;
        text-align: center;
      }
      .box-card {
        margin: 0 auto;
        max-width: 350px;
      }
      .form-title {
        font-weight: bold;
      }
      .el-radio-group {
        width: 100%;
      }
      .form-action {
        padding-top: 20px;
        button {
          width: 100%;
        }
      }
    }
  }
  .el-footer {
    text-align: center;
    height: 60px;
    font-size: 10px;
    line-height: 60px;
    color: #333;
  }
}
@media (max-width: 767px) {
  .app-wrapper {
    .el-header {
      padding: 0 20px;
      img {
        height: 40px;
        margin-top: 10px;
      }
    }
    .el-main {
      padding: 0 30px;
      .el-row {
        padding-left: 0;
      }
      .box-card {
        margin: 0 auto;
        border: none;
        box-shadow: none;
      }
    }
  }
}
@media (min-width: 768px) and (max-width: 1200px) {
  .app-wrapper {
    .el-header {
      padding: 0 50px;
      img {
        height: 50px;
        margin-top: 5px;
      }
    }
    .el-main {
      .el-row {
        padding-left: 30px;
        .el-col {
          .info-wrapper {
            margin-right: 50px;
          }
        }
      }
    }
  }
}
</style>

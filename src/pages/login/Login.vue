<template>
  <div class="login">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none;">
      <symbol id="icon-more" viewBox="0 0 8 14">
        <path d="M1 1l6 6-6 6" stroke="#BBB" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round"
              stroke-linejoin="round"></path>
      </symbol>
      <symbol id="icon-close" viewBox="0 0 20 20">
        <path
          d="M.243 1.894a.81.81 0 0 1 0-1.158.84.84 0 0 1 1.175 0l8.33 8.209L18.582.24a.84.84 0 0 1 1.175 0 .81.81 0 0 1 0 1.158l-8.834 8.705 8.625 8.5a.81.81 0 0 1 0 1.157.84.84 0 0 1-1.175 0l-8.625-8.5-8.121 8.004a.84.84 0 0 1-1.175 0 .81.81 0 0 1 0-1.158l8.121-8.003-8.33-8.209z"
          fill="#23CC77" fill-rule="evenodd"></path>
      </symbol>
      <symbol id="icon-back" viewBox="0 0 10 20">
        <path d="M9 1l-8 9 8 9" stroke-width="1.5" stroke="#23CC77" fill="none" fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"></path>
      </symbol>
      <symbol id="icon-del" viewBox="0 0 15 15">
        <g fill="none" fill-rule="evenodd">
          <path d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z" fill="#C2C6CF"/>
          <path d="M5.25 5.25l4.773 4.773M10.023 5.25L5.25 10.023" stroke="#FFF" stroke-width="1.5"
                stroke-linecap="round"></path>
        </g>
      </symbol>
      <symbol id="icon-radio2" viewBox="0 0 15 15">
        <g fill="none" fill-rule="evenodd">
          <circle fill="#23CC77" cx="7.5" cy="7.5" r="7.5"/>
          <path
            d="M6.174 9.92l5.17-5.171a.561.561 0 1 1 .796.795l-5.568 5.568a.562.562 0 0 1-.795.001L2.859 8.195a.563.563 0 0 1 .795-.795l2.52 2.52z"
            fill="#FFF"></path>
        </g>
      </symbol>
      <symbol id="icon-radio" viewBox="0 0 16 16">
        <defs>
          <path d="M8 18A8 8 0 1 0 8 2a8 8 0 0 0 0 16z" id="a"></path>
          <mask id="b" x="0" y="0" width="16" height="16" fill="#fff">
            <use xlink:href="#a"></use>
          </mask>
        </defs>
        <use mask="url(#b)" xlink:href="#a" transform="translate(0 -2)" stroke="#23CC77" stroke-width="2" fill="none"
             fill-rule="evenodd"></use>
      </symbol>
      <symbol id="icon-see" viewBox="0 0 20 15">
        <path
          d="M20 7.491a.913.913 0 0 0-.027-.237 1.176 1.176 0 0 0-.043-.23l-.017-.044a.712.712 0 0 0-.034-.092C18.035 2.768 14.065 0 10 0 5.937 0 1.967 2.766.13 6.863a.69.69 0 0 0-.047.125l-.013.034c-.037.108-.037.184-.034.165-.017.08-.033.237-.033.237a.603.603 0 0 0 .001.135s.015.137.023.166c.002.039.012.096.023.148.009.044.023.087.04.13a.78.78 0 0 0 .031.085c1.847 4.121 5.817 6.89 9.88 6.89 4.065 0 8.034-2.767 9.858-6.844a.721.721 0 0 0 .059-.147.605.605 0 0 0 .05-.214c.012-.065.032-.164.032-.282zm-10 3.402c-1.838 0-3.333-1.527-3.333-3.404S8.162 4.085 10 4.085s3.334 1.527 3.334 3.404-1.496 3.404-3.334 3.404z"
          fill="#C2C6CF" fill-rule="evenodd"></path>
      </symbol>
      <symbol id="icon-see2" viewBox="-2 0 24 15">
        <defs>
          <path
            d="M293.973 12.254a1.176 1.176 0 0 0-.043-.23l-.017-.044a.712.712 0 0 0-.034-.092C292.035 7.768 288.065 5 284 5c-4.063 0-8.033 2.766-9.87 6.863-.021.045-.127.561-.127.561a.603.603 0 0 0 .001.135s.015.137.023.166c.002.039.012.096.023.148a.65.65 0 0 0 .04.13.78.78 0 0 0 .031.085c1.847 4.121 5.817 6.89 9.88 6.89 4.065 0 8.034-2.767 9.858-6.844a.721.721 0 0 0 .059-.147.722.722 0 0 0 .05-.214c.012-.065.032-.164.032-.282a.913.913 0 0 0-.027-.237zM284 14.5c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"
            id="a1"></path>
          <mask id="b1" x="0" y="0" width="20" height="14.978" fill="#fff">
            <use xlink:href="#a1"></use>
          </mask>
        </defs>
        <use mask="url(#b1)" xlink:href="#a1" transform="translate(-274 -5)" stroke="#C2C6CF" stroke-width="2"
             fill="none"
             fill-rule="evenodd"></use>
      </symbol>
    </svg>
    <section id="normalLogin" class="login-section">
      <header class="header">用户登录</header>
      <!--<div class="form" id="CommonLogin" action="/login/post" method="post" onsubmit="return false;">-->
      <form class="form" id="CommonLogin" action="/login/post" method="post" onsubmit="return false;">
        <input name="login_type" id="nor_login_type" value="m-n" type="hidden"/>

        <!-- 登录账号 手机号、会员名、昵称、邮箱 -->
        <div class="form-group username border-bottom">
          <input type="text" name="username" id="normalNum" class="text-input"
                 placeholder="姓名" autocomplete="off"
                 ref="usernameInput"
                 v-model="username"
                 @input="handleUserNameInput"
          >
          <svg class="btn-close" v-if="isShowUserNameDel" @click="handleDelClick('username')">
            <use xlink:href="#icon-del"></use>
          </svg>
        </div>

        <!-- 密码 -->
        <div class="form-group password border-bottom">
          <input type="password" name="password" class="text-input border-bottom" autocomplete="off"
                 placeholder="密码" maxlength="16"
                 v-model="password"
                 @input="handlePasswordInput"
          >
          <svg class="btn-close" v-if="isShowPasswordDel" @click="handleDelClick('password')">
            <use xlink:href="#icon-del"></use>
          </svg>
        </div>

        <!--<div class="free-login clearfix">-->
          <!--<input type="hidden" name="remember_me">-->
          <!--<a href="javascript:" class="fr two-week" @click="handleTwoWeekLoginClick">-->
            <!--<svg class="btn-radio fix" v-show="!twoWeekLogin"></svg>-->
            <!--<svg class="btn-radio" v-show="twoWeekLogin">-->
              <!--<use xlink:href="#icon-radio2"></use>-->
            <!--</svg>-->
            <!--<span class="text">两周内自动登录</span>-->
          <!--</a>-->
        <!--</div>-->

        <a href="javascript:" class="login-btn" :class="[canSubmit]" @click="handleSubmit">
          登录
        </a>
      </form>
    </section>
  </div>
</template>
<script>
import axios from 'axios'
import md5 from 'js-md5'
import core from '../../assets/js/core.js'

export default {
  name: 'Login',
  data () {
    return {
      twoWeekLogin: false,
      // 用户信息
      username: '',
      password: '',
      nickName: ''
    }
  },
  computed: {
    isShowUserNameDel () {
      console.log('computed isShowUserNameDel,this.username.length:' + this.username.length)
      return this.username.length > 0
    },
    isShowPasswordDel () {
      console.log('computed isShowPasswordDel,this.password.length:' + this.password.length)
      return this.password.length > 0
    },
    isAutoLogin () {
      return this.twoWeekLogin
    },
    canSubmit () {
      if (this.username.length > 0 && this.password.length > 0) {
        return ''
      }
      return 'disabled'
    }
  },
  methods: {
    handleTwoWeekLoginClick () {
      this.twoWeekLogin = !this.twoWeekLogin
    },
    handleUserNameInput () {
    },
    handlePasswordInput () {
    },
    handleDelClick (which) {
      if (which === 'username') {
        this.username = ''
      }
      if (which === 'password') {
        this.password = ''
      }
    },
    handleSubmit () {
      if (this.canSubmit === 'disabled') {
        return false
      }
      // 对username和password进行校验
      // alert('username check')
      // 提交用户名和密码
      // 请求存有用户账号的json文件
      axios({
        method: 'post',
        url: '/api/user/login',
        data: {
          username: this.username,
          password: md5(this.password)
        },
        withCredentials: true
      }).then((res) => {
        console.log(res.data)
        // 传值是 0:登陆成功, 1: 已登陆, 2:用户名或密码错误
        if (res.data.code === 0) {
          //           setCookie('username',this.username)
          setTimeout(function () {
            this.nickName = res.data.username
            this.$store.commit('username', res.data.username)
            this.$store.commit('userType', res.data.userType)
            this.$store.commit('userTypeC', core.userType(res.data.userType))
            this.$store.commit('userID', res.data.userID)
            //  this.$emit('receive', this.nickName)
            // if (this.$store.state.userType === 'S') {
            // this.$router.push('/sign')
            // } else {
            // window.location.href = 'http://192.168.2.251'
            // }
            //    this.$router.go(0);
            this.$router.push('/courseIndex')
          }.bind(this), 0.1)
        } else if (res.data.code === 1) {
          //            setCookie('username',this.username)
          setTimeout(function () {
            this.nickName = res.data.username
            this.$store.commit('username', res.data.username)
            this.$store.commit('userType', res.data.userType)
            this.$store.commit('userTypeC', core.userType(res.data.userType))
            this.$store.commit('userID', res.data.userID)
            this.$router.push('/courseIndex')
            // this.$emit('receive', this.nickName)
            //            if (this.$store.state.userType !== 'S') {
            //              window.location.href = 'http://192.168.2.251'
            //            } else {
            //              this.$router.push('/sign')
            //            }
            //   this.$router.go(0);
          }.bind(this), 0.1)
        } else if (res.data.code === 2) {
          this.checkPassword = true
        }
      })
    }
  }
}
</script>
<style lang="stylus">
  $mainColor = #23cc77
  .btn-close, .btn-more, .btn-see
    position absolute
    top 50%
    right 0
    margin-top -.24rem
    width .48rem;
    height .48rem;

  .login
    height 100vh
    overflow hidden
  .login-section
    padding-top 1.5rem
    .header
      font-size .36rem
      text-align center
      margin-bottom 1rem
    .form
      width 100%
      box-sizing border-box
      padding 0 10%
      .form-group
        position relative
        margin .4rem 0
        .text-input
          padding-right .64rem
          font-family: Menlo,sans-serif;
          box-sizing: border-box;
          font-size: .36rem;
          line-height: 2;
          border: none;
          outline: none;
          width: 100%;

      .free-login
        overflow hidden
        .two-week
          float right
          color $mainColor
          line-height .48rem
          font-size 0
          .btn-radio
            width: .24rem
            height .24rem
            vertical-align middle
            border-radius 50%
            &.fix
              border 1px solid $mainColor
              box-sizing border-box
          .text
            margin-left .1rem
            font-size: .24rem
            vertical-align middle

      .login-btn
        border-radius .2rem
        background-color $mainColor
        color #ffffff
        line-height .9rem
        display flex
        justify-content center
        align-items center
        margin .3rem 0
        transition background-color .3s
        &.disabled
          background-color #bdefd6
</style>

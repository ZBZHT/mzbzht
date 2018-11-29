<template>
  <div class="myself">
    <Header-nav></Header-nav>
    <div class="content" :style="{'height': height - 41 + 'px'}">
      <p class="goBack" @click="goBack">
        <go-back></go-back>
      </p>
      <div class="idCard">
        <p class="nameMsg">
          <span class="nameMsgName">{{username}}</span>
          <span class="nameMsgHao">下午好 ~</span>
        </p>
        <span>账户类型 : </span><span style="color: #ff6700;">{{userT}}</span><br>
        <span class="nameMsg_3">绑定手机 :</span>{{userMoNo}}
        <p class="logout" @click="logOut">退出当前账号</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import HeaderNav from '@/components/HeaderNav'
import goBack from '@/components/goBack'
import core from '../../assets/js/core.js'

export default {
  name: 'Myself',
  data () {
    return {
      height: window.innerHeight,
      userID: this.$store.state.userID,
      username: this.$store.state.username,
      userType: this.$store.state.userType,
      userT: core.userType(this.$store.state.userType),
      userMoNo: ''
    }
  },
  mounted () {
    this.getMyMsg()
  },
  methods: {
    //    退出当前账号
    logOut () {
      axios({
        method: 'post',
        url: '/api/user/logout',
        withCredentials: true
      }).then((res) => {
        this.$store.commit('username', '')
        this.$store.commit('userType', '')
        this.$router.push('/courseIndex')
      })
    },
    //    返回上一级
    goBack () {
      this.$router.go(-1)
    },
    //    获取用户信息
    getMyMsg () {
      axios.post('/teacherCMS/getMyMsg', {
        data: {
          userID: this.userID,
          username: this.username,
          userType: this.userType
        }
      }).then((res) => {
        if (res.data.userInfo) {
          this.resUserMsg = res.data.userInfo
          // console.log(__dirname)
          let ee = this.resUserMsg.MoNo
          this.userMoNo = (ee.substring(0, 3)) + '****' + (ee.substring(7, 11))
        }
      })
    }
  },
  components: {
    HeaderNav,
    goBack
  }
}
</script>
<style lang="less" scoped>
.myself{
  .content{
    background:rgb(237,237,237);
    padding-top:0.2rem;
    padding-left: 0.2rem;
    box-sizing: border-box;
  }
  .idCard{
    width:85%;
    height:30%;
    background:#fff;
    border-radius:10px;
    margin:0 auto;
    margin-top: 1.2rem;
    padding:0.5rem;
    box-sizing: border-box;
    position: relative;
    .nameMsg{
      margin-bottom: 0.2rem;
    }
    .nameMsgName{
      font-size: 0.38rem;
    }
    .nameMsgHao{
      margin-left:0.5rem;
    }
    .nameMsg_3{
      display: inline-block;
      margin-top: 0.2rem;
    }
    .logout{
      color: #ff6700;
      position:absolute;
      right:0.3rem;
      bottom:0.3rem;
    }
  }
}
</style>

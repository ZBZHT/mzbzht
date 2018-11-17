<template>
  <div class="index" :style="{height: height + 'px'}">
    <p class="title">中邦智慧教学系统欢迎您</p>
  </div>
</template>
<script>

import axios from 'axios'

export default {
  name: 'Index',
  data () {
    return {
      height: window.innerHeight
    }
  },
  computed: {
  },
  mounted () {
    axios.get('/api/user/getServerIP', { // 获取服务器ip请求
      params: {
        user: 234
      }
    }).then((res) => {
      if (res.data.code === 0) {
        console.log(res.data.serverIP.Ip)
        this.$store.commit('serverIP', res.data.serverIP.Ip)
      }
      // console.log(this.$store.state.serverIP);
    }).catch(function (error) {
      console.log('error init.' + error)
    })
    this._timeOut = setInterval(function () {
      this.$router.push('/courseIndex')
    }.bind(this), 3000)
  },
  methods: {
    handleResize (event) {
      this.height = window.innerHeight
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
    clearInterval(this._timeOut)
  }
}
</script>
<style>
.index{
  background: linear-gradient(rgb(149,82,84), rgb(124,38,40), rgb(122,18,19));
  padding-top: 50%;
  padding-left: 14%;
  box-sizing: border-box;
}
.index .title{
  font-size: 0.6rem;
  color: #fff;
  width: 82%;
  text-align: center;
}
</style>

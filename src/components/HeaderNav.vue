<template>
  <div class="headerNav">
    <mt-header>
      <router-link to="/courseIndex" slot="left">
        <img class="brand" alt="Brand" src="../assets/imgs/zbtLogo.png">
      </router-link>
      <mt-button slot="right" v-if="nickName">
        {{nickName}}
      </mt-button>
      <mt-button slot="right" v-if="!nickName" @click="simplePrompt">登录</mt-button>
    </mt-header>
    <mt-navbar v-model="selected" v-if="changeClass >= 0">
      <mt-tab-item :id=index v-for="(item, index) in navData" :key="index">
        <div class="navImg" v-if="showIcon !== 0"
             @click="changNav(index)">
          <i class="iconfont" v-if="index == 0">&#xe600;</i>
          <i class="iconfont iconfont2" v-if="index == 1">&#xe8cb;</i>
          <i class="iconfont iconfont3" v-if="index == 2">&#xe791;</i>
          <i class="iconfont iconfont2" v-if="index == 3">&#xe624;</i>
          <i class="iconfont iconfont4" v-if="index == 4">&#xe797;</i>
        </div>
        <p @click="changNav(index)"
           :class="{'changeFont':changeClass === index}">
          {{item.label}}
        </p>
      </mt-tab-item>
    </mt-navbar>
  </div>

</template>
<script>

import { Navbar, Header } from 'mint-ui'

export default {
  name: 'Header',
  data () {
    return {
      changeClass: '',
      navData: [
        {
          'label': '课程',
          'background': 'courseIndex.png'
        },
        {
          'label': '实训',
          'background': 'exerciseIndex.png'
        },
        {
          'label': '练习',
          'background': 'testIndex.png'
        },
        {
          'label': '资源',
          'background': 'sourceIndex.png'
        },
        {
          'label': '大赛',
          'background': 'competitionIndex.png'
        }
      ],
      selected: '',
      nickName: '',
      showIcon: ''
    }
  },
  components: {
    Header,
    Navbar
  },
  mounted () {
    //    页面挂载获取cookie，如果存在username的cookie，则不需登录
    if (this.$store.state.username) {
      this.nickName = this.$store.state.username
    }
    // console.log(this.$route.path)
    if (this.$route.path !== '/courseIndex') {
      this.showIcon = 0
    } else if (this.$route.path === '/courseIndex') {
      this.showIcon = 1
    }
    //    title根据路由改变样式
    if (this.$route.path === '/course') {
      this.changeClass = 0
    } else if (this.$route.path === '/exerciseIndex') {
      this.changeClass = 1
    } else if (this.$route.path === '/testIndex') {
      this.changeClass = 2
    } else if (this.$route.path === '/sourceIndex') {
      this.changeClass = 3
    } else if (this.$route.path === '/competitionIndex') {
      this.changeClass = 4
    } else if (this.$route.path === '/courseDetail') {
      this.changeClass = -1
    } else if (this.$route.path === '/test') {
      this.changeClass = -1
    } else if (this.$route.path === '/showPractice') {
      this.changeClass = -1
    } else if (this.$route.path === '/exerciseDetail') {
      this.changeClass = -1
    } else if (this.$route.path === '/exerciseDetailTwo') {
      this.changeClass = -1
    }
  },
  methods: {
    changNav (index) {
      //      console.log(index)
      if (index === 0) {
        this.$router.push('/course')
      } else if (index === 1) {
        this.$router.push('/exerciseIndex')
      } else if (index === 2) {
        this.$router.push('/testIndex')
      } else if (index === 3) {
        this.$router.push('/sourceIndex')
      } else if (index === 4) {
        this.$router.push('/competitionIndex')
      }
    },
    simplePrompt () {
      this.$router.push('/login')
    }
  },
  beforeDestroy: function () {
  }
}
</script>
<style lang="less">
  .mint-header{
    background-color: inherit;
    color:#000;
    box-shadow: 0 3px 5px #ccc;
  }
  .mint-header img{
    width:3rem;
  }
  .headerNav {
    .mint-tab-item-label{
      color:#000;
      font-size:0.29rem ;
    }
    .mint-navbar .mint-tab-item.is-selected{
      border-bottom: 3px solid rgb(122,18,19);
      color:rgb(122,18,19)
    }
    .iconfont{
      font-size: 48px;
    }
    .iconfont{
      color:#000;
    }
    .iconfont2{
      color:rgb(122,18,19);
    }
    .iconfont3{
       color:rgb(95,99,104);
     }
    .iconfont4{
      font-size: 53px;
      color:#000;
    }
    .changeFont{
      color:rgb(122,18,19);
      font-weight: bolder;
      font-size: 0.34rem;
    }
  }
</style>

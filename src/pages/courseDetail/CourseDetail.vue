<template>
  <div class="courseDetail">
    <!--header--><!--nav-->
    <Header-nav></Header-nav>
    <div>
      <p class="detailTitle">
        {{detailItem.label}}
      </p>
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">简介</mt-tab-item>
        <mt-tab-item id="2">微课</mt-tab-item>
        <mt-tab-item id="3">课件</mt-tab-item>
        <mt-tab-item id="4">评价</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected" class="courseContainer">
        <mt-tab-container-item id="1">
          <p class="courseDescribe">
            {{detailItem.describe}}
          </p>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div>
            <video id="video-box" controls="true" controlslist="nodownload" :src="'http://192.168.0.251:8000/resource/' + this.videoPath + detailItem.videoTitle[0].videoTitle">
            </video>
          </div>
        </mt-tab-container-item>

        <mt-tab-container-item id="3">
          <div id="courseppt">
            <mt-swipe ref="swipe"
                      :show-indicators="false"
                      class="swipe"
                      :style="{height: height / 3.5 + 'px'}"
                      :auto="0"
                      @change="handleChange">
              <mt-swipe-item v-for="(item,index) in lists" :key="index">
                <img class="coursepptImg" :src="'http://192.168.0.251:8000' + item.img"/>
              </mt-swipe-item>
            </mt-swipe>
            <p class="page">第{{pptIndex + 1}}页,共{{total}}页</p>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <!--<rater v-model="data3"></rater>-->
          <div class="appraise-box">

          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>

import HeaderNav from '@/components/HeaderNav'
import { Navbar } from 'mint-ui'
import { Rater } from 'vux'
import axios from 'axios'
// import core from '../assets/js/core.js'
export default {
  name: 'Course',
  data () {
    return {
      height: window.innerHeight,
      selected: '1',
      videoPath: '',
      lists: [],
      total: '',
      pptIndex: '',
      data3: ''
    }
  },
  computed: {
    detailItem () {
      return this.$store.state.courseDetail
    }
  },
  mounted () {
    //    获取请求路径
    this.videoPath = this.$store.state.urlSrc
    this.getPPT()
  },
  methods: {
    // 请求PPT
    getPPT () {
      axios.post ('/readResource/getPPT', {
        data: {
          userId: this.userId,
          fileName: this.videoPath + this.detailItem.teachingMaterial + '/'
        }
      }).then((res) => {
        console.log(res)
        this.lists = res.data.result.courseList
        this.total = this.lists.length
      })
    },
    //    切换PPT时发生的事件
    handleChange (index) {
      this.pptIndex = index
    }
  },
  components: {
    HeaderNav,
    Navbar,
    Rater
  },
  beforeDestroy: function () {
  }
}
</script>
<style lang="less">
  .courseDetail{
    .detailTitle{
      text-align:center;
      font-size: 0.4rem;
      margin-top:20px;
      margin-bottom:20px;
    }
    .mint-tab-item-label{
      color:#000;
      font-size:0.29rem ;
    }
    .mint-navbar .mint-tab-item.is-selected{
      border-bottom: 3px solid rgb(122,18,19);
      color:rgb(122,18,19)
    }
    .courseContainer{
      padding:15px;
      box-sizing: border-box;
    }
    .courseDescribe{
      text-align: left;
      text-indent: 2em;
    }
    #video-box{
      width:100%;
    }
    .swipe{
      width:100%;
      height:100px;
    }
    .coursepptImg{
      width:100%;
      height:100%;
    }
    .page{
      text-align: right;
      margin-top: 10px;
    }
  }
</style>

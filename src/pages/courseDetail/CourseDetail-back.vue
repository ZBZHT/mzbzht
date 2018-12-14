<template>
  <div class="courseDetail">
    <!--header--><!--nav-->
    <Header-nav></Header-nav>
    <div>
      <p class="goBack" @click="goBack">
        <go-back></go-back>
      </p>
      <p class="detailTitle">
        {{detailItem.label}}
      </p>
      <mt-navbar v-model="selected" @click.native="changeTab(selected)">
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
            <video id="video-box" controls="true" controlslist="nodownload" :src="'http://'+ $store.state.serverIP + ':8000/resource/' + $store.state.urlSrc + detailItem.videoTitle[0].videoTitle">
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
                <img preview="1" class="coursepptImg" :src="'http://'+ $store.state.serverIP +':8000' + item.img"/>
              </mt-swipe-item>
            </mt-swipe>
            <p class="page">第{{pptIndex + 1}}页,共{{total}}页</p>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <div class="appraise-box">
            <p class="appraiseTitle">全部评价</p>
            <hr>
            <p v-show="appraiseContent.appraiseMsg.length == 0">暂无评价</p>
            <div class="showAppraise" v-for="(item,index) in appraiseContent.appraiseMsg">
              <div class="AppraiseMsg">
                <p class="AppraiseUser">{{item.user}}</p>
                <div class="AppraiseStar">
                  <rater class="rater" star="☻" disabled v-model="item.appShowStar"></rater>
                </div>
              </div>
              <div class="AppraiseText">
                {{item.text}}
              </div>
              <div class="AppraiseTime">{{item.date}}</div>
              <hr>

              <div class="showReplyClass">
                <div class="showReplyMsg">
                  <p class="AppraiseUser" v-show="appraiseContent.appraiseMsg[index].replyText != '' ">【{{userName}}】老师:</p>
                  <p class="showReplyText">{{item.replyText}}</p>
                  <p class="AppraiseTime">{{item.replyDate}}</p>
                </div>
                <div class="replyEventButtons" v-show="userSession == 1">
                  <x-button mini type="warn" @click.native="showReply(index)">
                    回复
                  </x-button>
                  <div class="replyEvent" v-show="appraiseContent.appraiseMsg[index].replyText != '' ">
                    <!--<el-button size="small" type="primary" @click="showReply(index)">-->
                    <!--修改回复-->
                    <!--</el-button>-->
                    <x-button  type="default" @click.native="deleteReply(index)">
                      删除回复
                    </x-button>
                  </div>
                </div>

                <div v-show="replyShow == index">
                  <textarea autofocus class="replyText" type="text" v-model="replyText" />
                  <div class="replyButtons">
                    <x-button mini type="primary" @click.native="submitReply(index)">确定</x-button>
                    <x-button mini @click.native="cancelReply(index)">取消</x-button>
                  </div>

                </div>

              </div>
            </div>

            <p class="appraiseTitle">我要评价</p>
            <div class="IwantAppraise">

              <div class="block">
                <span class="demonstration">综合评价</span>
                <rater star="☻" v-model="date1"></rater>
              </div>
              <textarea class="AppraiseNowText" type="text" v-model="text"/>
            </div>

            <div class="shopList">
              <div class="block">
                <span class="demonstration">教学内容</span>
                <rater star="☻" v-model="date2"></rater>
              </div>
              <div class="block">
                <span class="demonstration">任课老师</span>
                <rater star="☻" v-model="date3"></rater>
              </div>

            </div>

            <x-button mini type="primary" @click.native="submitComments()">提交评论</x-button>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>

import HeaderNav from '@/components/HeaderNav'
import goBack from '@/components/goBack'
import { Navbar } from 'mint-ui'
import { Rater, XButton } from 'vux'
import axios from 'axios'
import core from '../../assets/js/core.js'
// import core from '../assets/js/core.js'
export default {
  name: 'Course',
  data () {
    return {
      userType: this.$store.state.userType,
      userId: this.$store.state.userID,
      userName: this.$store.state.username,
      height: window.innerHeight,
      selected: '1',
      videoPath: '',
      lists: [],
      total: '',
      pptIndex: '',
      appraiseContent: {
        title: [],
        appraiseMsg: {}
      },
      userSession: 0,
      replyShow: -1,
      replyText: '',
      date1: 0,
      date2: 0,
      date3: 0,
      text: '',
      appraiseIndex: [],
      commentPath: '',
      data: ''
    }
  },
  computed: {
    detailItem () {
      return this.$store.state.courseDetail
    }
  },
  mounted () {
    this.getLeftData()
    // 判断当前是否是老师
    // console.log(this.userType)
    if (this.userType === 'EA' || this.userType === 'T') {
      this.userSession = 1
      // console.log(this.userSession)
    } else {

    }
    //    获取请求路径
    this.videoPath = this.$store.state.urlSrc
    console.log('11', this.videoPath)    //    console.log(this.videoPath)
    this.commentPath = this.videoPath.split('/')
    var str = []
    for (var i = 0; i < this.commentPath.length - 1; i++) {
      str.push(this.commentPath[i])
    }
    this.commentPath = str
    this.getPPT()
    //    获取评论
    this.getComment()
  },
  methods: {
    //    切换tab
    changeTab (val) {
      if (val === 2) {
      } else {
        console.log(val)
        this.clickTabsStop()
      }
    },
    // 点击微课视频暂停开始
    clickTabsStop () {
      var myVideo = document.getElementById('video-box')
      myVideo.pause()
    },
    //    获取左边数据
    getLeftData () {
      axios.post('/teacherCMS/getCenterTree', {
        data: {
          userID: this.userID,
          userType: this.userType
        }
      }).then((res) => {
        this.data = res.data[0].children[0].children
        this.findParent()
      })
    },
    // 进入页面时的请求地址
    findParent () {
      var data = this.$store.state.courseDetail
//      console.log(this.data)
      var id = data.courseId
      var coursePath = []
      var homeworkPath = []
      id = id.toString()
      if (id > 1110 && id < 1200) {
        if (id >= 1111 && id < 1120) {
          homeworkPath.push(this.data[0].label)
          homeworkPath.push(this.data[0].children[0].label)
          homeworkPath.push(this.data[0].children[0].children[0].label)
          homeworkPath.push(data.label)
          coursePath.push(this.data[0].label)
          coursePath.push(this.data[0].children[0].label)
          coursePath.push(this.data[0].children[0].children[0].label)
          coursePath.push(data.label)
          coursePath.push(this.$store.state.courseDetail.teachingMaterial)
        } else if (id >= 1120 && id < 1130) {
          homeworkPath.push(this.data[0].label)
          homeworkPath.push(this.data[0].children[0].label)
          homeworkPath.push(this.data[0].children[0].children[1].label)
          homeworkPath.push(data.label)
          coursePath.push(this.data[0].label)
          coursePath.push(this.data[0].children[0].label)
          coursePath.push(this.data[0].children[0].children[1].label)
          coursePath.push(data.label)
          coursePath.push(this.$store.state.courseDetail.teachingMaterial)
        } else if (id >= 1130 && id < 1140) {
          homeworkPath.push(this.data[0].label)
          homeworkPath.push(this.data[0].children[0].label)
          homeworkPath.push(this.data[0].children[0].children[2].label)
          homeworkPath.push(data.label)
          coursePath.push(this.data[0].label)
          coursePath.push(this.data[0].children[0].label)
          coursePath.push(this.data[0].children[0].children[2].label)
          coursePath.push(data.label)
          coursePath.push(this.$store.state.courseDetail.teachingMaterial)
        } else if (id >= 1140 && id < 1150) {
          homeworkPath.push(this.data[0].label)
          homeworkPath.push(this.data[0].children[0].label)
          homeworkPath.push(this.data[0].children[0].children[3].label)
          homeworkPath.push(data.label)
          coursePath.push(this.data[0].label)
          coursePath.push(this.data[0].children[0].label)
          coursePath.push(this.data[0].children[0].children[3].label)
          coursePath.push(data.label)
          coursePath.push(this.$store.state.courseDetail.teachingMaterial)
        } else if (id >= 1150 && id < 1160) {
          homeworkPath.push(this.data[0].label)
          homeworkPath.push(this.data[0].children[0].label)
          homeworkPath.push(this.data[0].children[0].children[4].label)
          homeworkPath.push(data.label)
          coursePath.push(this.data[0].label)
          coursePath.push(this.data[0].children[0].label)
          coursePath.push(this.data[0].children[0].children[4].label)
          coursePath.push(data.label)
          coursePath.push(this.$store.state.courseDetail.teachingMaterial)
        } else if (id >= 1160 && id < 1170) {
          homeworkPath.push(this.data[0].label)
          homeworkPath.push(this.data[0].children[0].label)
          homeworkPath.push(this.data[0].children[0].children[5].label)
          homeworkPath.push(data.label)
          coursePath.push(this.data[0].label)
          coursePath.push(this.data[0].children[0].label)
          coursePath.push(this.data[0].children[0].children[5].label)
          coursePath.push(data.label)
          coursePath.push(this.$store.state.courseDetail.teachingMaterial)
        } else if (id >= 1170 && id < 1180) {
          homeworkPath.push(this.data[0].label)
          homeworkPath.push(this.data[0].children[0].label)
          homeworkPath.push(this.data[0].children[0].children[6].label)
          homeworkPath.push(data.label)
          coursePath.push(this.data[0].label)
          coursePath.push(this.data[0].children[0].label)
          coursePath.push(this.data[0].children[0].children[6].label)
          coursePath.push(data.label)
          coursePath.push(this.$store.state.courseDetail.teachingMaterial)
        } else if (id >= 1180 && id < 1190) {
          homeworkPath.push(this.data[0].label)
          homeworkPath.push(this.data[0].children[0].label)
          homeworkPath.push(this.data[0].children[0].children[7].label)
          homeworkPath.push(data.label)
          coursePath.push(this.data[0].label)
          coursePath.push(this.data[0].children[0].label)
          coursePath.push(this.data[0].children[0].children[7].label)
          coursePath.push(data.label)
          coursePath.push(this.$store.state.courseDetail.teachingMaterial)
        } else if (id >= 1190 && id < 120) {
          homeworkPath.push(this.data[0].label)
          homeworkPath.push(this.data[0].children[0].label)
          homeworkPath.push(this.data[0].children[0].children[8].label)
          homeworkPath.push(data.label)
          coursePath.push(this.data[0].label)
          coursePath.push(this.data[0].children[0].label)
          coursePath.push(this.data[0].children[0].children[8].label)
          coursePath.push(data.label)
          coursePath.push(this.$store.state.courseDetail.teachingMaterial)
        }
      } else if (id > 100 && id < 200) {
        if (id === 110) {
          homeworkPath.push(this.data[0].label)
          homeworkPath.push(data.label)
          homeworkPath.push(data.children[0].label)
          homeworkPath.push(data.children[0].children[0].label)
          coursePath.push(this.data[0].label)
          coursePath.push(data.label)
          coursePath.push(data.children[0].label)
          coursePath.push(data.children[0].children[0].label)
          coursePath.push(this.$store.state.courseDetail.teachingMaterial)
        } else if (id > 110 && id < 120) {
          homeworkPath.push(this.data[0].label)
          homeworkPath.push(this.data[0].children[0].label)
          homeworkPath.push(data.label)
          homeworkPath.push(data.children[0].label)
          coursePath.push(this.data[0].label)
          coursePath.push(this.data[0].children[0].label)
          coursePath.push(data.label)
          coursePath.push(data.children[0].label)
          coursePath.push(this.$store.state.courseDetail.teachingMaterial)
        } else if (id > 120 && id < 130) {
          coursePath.push(this.data[0].label)
          coursePath.push(this.data[0].children[1].label)
          coursePath.push(data.label)
          coursePath.push(data.children[0].label)
          homeworkPath = coursePath
        } else if (id === 120) {
          coursePath.push(this.data[0].label)
          coursePath.push(data.label)
          coursePath.push(data.children[0].label)
          coursePath.push(data.children[0].children[0].label)
          homeworkPath = coursePath
        }
      } else if (id > 200 && id < 300) {
        if (id === 210 || id === 220 || id === 230 || id === 240 || id === 250 || id === 260) {
          coursePath.push(this.data[1].label)
          coursePath.push(data.label)
          coursePath.push(data.children[0].label)
          homeworkPath = coursePath
        } else if (id > 210 && id < 220) {
          coursePath.push(this.data[1].label)
          coursePath.push(this.data[1].children[0].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 220 && id < 230) {
          coursePath.push(this.data[1].label)
          coursePath.push(this.data[1].children[1].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 230 && id < 240) {
          coursePath.push(this.data[1].label)
          coursePath.push(this.data[1].children[2].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 240 && id < 250) {
          coursePath.push(this.data[1].label)
          coursePath.push(this.data[1].children[3].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 250 && id < 260) {
          coursePath.push(this.data[1].label)
          coursePath.push(this.data[1].children[4].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 260 && id < 270) {
          coursePath.push(this.data[1].label)
          coursePath.push(this.data[1].children[5].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        }
      } else if (id > 300 && id < 400) {
        if (id === 310 || id === 320 || id === 330 || id === 340 || id === 350) {
          coursePath.push(this.data[2].label)
          coursePath.push(data.label)
          coursePath.push(data.children[0].label)
          homeworkPath = coursePath
        } else if (id > 310 && id < 320) {
          coursePath.push(this.data[2].label)
          coursePath.push(this.data[2].children[0].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 320 && id < 330) {
          coursePath.push(this.data[2].label)
          coursePath.push(this.data[2].children[1].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 330 && id < 340) {
          coursePath.push(this.data[2].label)
          coursePath.push(this.data[2].children[2].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 340 && id < 350) {
          coursePath.push(this.data[2].label)
          coursePath.push(this.data[2].children[3].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 350 && id < 360) {
          coursePath.push(this.data[2].label)
          coursePath.push(this.data[2].children[4].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        }
      } else if (id > 400 && id < 500) {
        if (id === 410 || id === 420 || id === 430 || id === 440 || id === 450 || id === 460) {
          coursePath.push(this.data[3].label)
          coursePath.push(data.label)
          coursePath.push(data.children[0].label)
          homeworkPath = coursePath
        } else if (id > 410 && id < 420) {
          coursePath.push(this.data[3].label)
          coursePath.push(this.data[3].children[0].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 420 && id < 430) {
          coursePath.push(this.data[3].label)
          coursePath.push(this.data[3].children[1].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 430 && id < 440) {
          coursePath.push(this.data[3].label)
          coursePath.push(this.data[3].children[2].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 440 && id < 450) {
          coursePath.push(this.data[3].label)
          coursePath.push(this.data[3].children[3].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 450 && id < 460) {
          coursePath.push(this.data[3].label)
          coursePath.push(this.data[3].children[4].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 460 && id < 470) {
          coursePath.push(this.data[3].label)
          coursePath.push(this.data[3].children[5].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        }
      } else if (id > 500 && id < 600) {
        coursePath.push(this.data[4].label)
        coursePath.push(data.label)
        homeworkPath = coursePath
      } else if (id > 600 && id < 700) {
        coursePath.push(this.data[5].label)
        coursePath.push(data.label)
        homeworkPath = coursePath
      } else if (id >= 700 && id < 800) {
        var allData = this.data
        if (id === 700 || id === 710 || id === 720 || id === 730 || id === 740 || id === 750 || id === 760 || id === 770 || id === 780 || id === 790) {
          if (id === 700) {
            coursePath.push(data.children[0].label)
            coursePath.push(data.children[0].children[0].label)
            homeworkPath = coursePath
          } else {
            coursePath.push(data.label)
            coursePath.push(data.children[0].label)
            homeworkPath = coursePath
          }
        } else if (id > 710 && id < 720) {
          coursePath.push(allData[6].children[0].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 720 && id < 730) {
          coursePath.push(allData[6].children[1].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 730 && id < 740) {
          coursePath.push(allData[6].children[2].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 740 && id < 750) {
          coursePath.push(allData[6].children[3].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 750 && id < 760) {
          coursePath.push(allData[6].children[4].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 760 && id < 770) {
          coursePath.push(allData[6].children[5].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 770 && id < 780) {
          coursePath.push(allData[6].children[6].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 780 && id < 790) {
          coursePath.push(allData[6].children[7].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        } else if (id > 790 && id < 800) {
          coursePath.push(allData[6].children[8].label)
          coursePath.push(data.label)
          homeworkPath = coursePath
        }
      }
//      console.log('course',coursePath)
//      console.log('homeworkPath',homeworkPath)
      var pptPath = ''
      for (var i = 0; i < coursePath.length; i++) {
        pptPath = pptPath + coursePath[i] + '/'
      }
      var videoParh = ''
      for (var j = 0; j < homeworkPath.length; j++) {
        videoParh = videoParh + homeworkPath[j] + '/'
      }
      this.videoPath = videoParh
      console.log('22', this.videoPath)
      console.log('33', videoParh)
      //console.log(this.videoPath + this.$store.state.courseDetail.videoTitle[0].videoTitle)
      //请求PPT
      axios.post ('/readResource/getPPT', {
        data: {
          userId: this.userId,
          fileName: pptPath
        }
      }).then((res) => {
        console.log(res)
        this.lists = res.data.result.courseList
        this.total = this.lists.length
      })
      this.commentPath = homeworkPath
//      console.log(this.commentPath)
      this.getComment()
    },
    //    返回上一级
    goBack () {
      this.$store.commit('showPractice', '1')
      this.$router.go(-1)
    },
    // 提交评论
    submitComments () {
      // this.appraiseIndex = []
      if (this.user === '') {
        var con = confirm('请登录')
        if (con === true) {
          this.$router.push({path: '/loginPage'})
        } else {
          return false
        }
      } else {
        if (this.text === '') {
          alert('评论不能为空')
        } else {
          // console.log(currCourse)
          if (this.date1 === '') {
            this.date1 = 0
          } else {

          }
          this.appraiseIndex.unshift({
            user: this.userName,
            appShowStar: this.date1,
            text: this.text,
            date: core.formatDate('yyyy-MM-dd hh:mm:ss', new Date()),
            replyText: '',
            replyName: '',
            replyDate: '',
            contentAppraise: this.date2,
            teacherAppraise: this.date3
          })
          this.appraiseContent.title = this.commentPath
          this.appraiseContent.appraiseMsg = this.appraiseIndex

          this.date1 = 0
          this.date2 = 0
          this.date3 = 0

          // console.log(this.appraiseContent)
          this.appraiseUpdate()
          this.text = ''
        }
      }
    },
    // 提交回复
    submitReply (index) {
      if (this.user === '') {
        var con = confirm('请登录')
        if (con === true) {
          this.$router.push({path: '/loginPage'})
        } else {
          return false
        }
      } else {
        if (this.replyText === '') {
          alert('回复不能为空')
        } else {
          // console.log(this.appraiseContent[index])
          this.appraiseContent.appraiseMsg[index].replyText = this.replyText
          this.appraiseContent.appraiseMsg[index].replyName = this.userName
          this.appraiseContent.appraiseMsg[index].replyDate = core.formatDate('yyyy-MM-dd hh:mm:ss', new Date())
          // console.log(this.appraiseContent)
          this.appraiseUpdate(this.commentPath)
          this.replyText = ''
        }
      }
      this.showReplyText = index
      this.replyShow = -1
    },
    // 评论的更新请求
    appraiseUpdate () {
      this.appraiseContent.title = this.commentPath
      axios({
        method: 'get',
        url: '/readComments/updateComment',
        params: {
          appraiseContent: this.appraiseContent
        }
      }).then(function (res) {
        //  console.log(res.data.result)
      })
    },
    // 点击显示回复
    showReply (index) {
      this.replyShow = index
    },
    // 取消回复
    cancelReply () {
      this.replyShow = -1
      this.replyText = ''
    },
    // 删除回复
    deleteReply (index) {
      this.appraiseContent.appraiseMsg[index].replyText = ''
      this.appraiseContent.appraiseMsg[index].replyName = ''
      this.appraiseContent.appraiseMsg[index].replyDate = ''
      this.appraiseUpdate()
    },
    // 获取评论请求
    getComment () {
      this.appraiseIndex = []
      this.appraiseContent.appraiseMsg = this.appraiseIndex
      axios.get ('/readComments/getComment', {
        params: {
          user: this.userName,
          title: this.commentPath
        }
      }).then((res) => {
//        console.log(res.data.result)
        this.appraiseIndex = res.data.result.appraiseMsg
        this.appraiseContent.appraiseMsg = this.appraiseIndex
//        console.log(this.appraiseIndex)
      })
    },
    // 请求PPT
    getPPT () {
      var fileName = ''
      if (String(this.detailItem.courseId) > String(1200)) {
        fileName = this.videoPath
      } else {
        fileName = this.videoPath + this.detailItem.teachingMaterial
      }
//      console.log('123', fileName)
      axios.post ('/readResource/getPPT', {
        data: {
          userId: this.userId,
          fileName: fileName
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
    goBack,
    Navbar,
    Rater,
    XButton
  },
  beforeDestroy: function () {
  }
}
</script>
<style lang="less">
  .courseDetail{
    .goBack{
      margin-top:0.2rem;
      margin-left: 0.2rem;
    }
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
      padding-bottom: 35px;
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
    .vux-rater-inner{
      .vux-rater-box{
        font-size: 18px;
      }
    }
    .appraise-box{
      width: 90%;
      margin:0 5%;
      position: relative;
      top: 20px;
      .appraiseTitle{
        font-weight: normal;
        word-wrap: break-word;
        font-size: 14px;
        padding: 6px;
        background:rgb(159,83,85);
        width: 22%;
        text-align: center;
        border-radius:50px;
        color: #fff;
      }
      .AppraiseNowText{
        margin-top: 10px;
        margin-bottom: 10px;
        height: 60px;
        width: 100%;
        font-size: 20px;
        background: rgb(237,237,237);
      }
      .IwantAppraise{
        width: 100%;
        border-top:1px solid #ccc;
        border-left:1px solid #ccc;
        border-right:1px solid #ccc;
        padding:10px;
        box-sizing:border-box;
        text-align:left;
        margin-top: 10px;
      }
      .showAppraise{
        text-align:left;
        margin-bottom:10px;
      }
      .AppraiseMsg{
        display:flex;
      }
      .AppraiseUser{
        font-weight:bolder;
        font-size:15px;
        margin-right:10px;
        line-height: 1.8;
      }
      .AppraiseTime{
        text-align:right;
        font-size:13px;
        margin-top: 5px;
      }
      .AppraiseText{
        margin-left:58px;
      }
      .replyText{
        margin-top: 10px;
        margin-bottom: 5px;
        height: 35px;
        width: 100%;
        font-size: 20px;
        background: rgb(237,237,237);
      }
      .showReplyText{
        margin-left:50px;
      }
      .replyEventButtons{
        position:relative;
      }
      .replyEvent{
        position:absolute;
        top:0;
        left:0;
      }
      .weui-btn + .weui-btn {
        margin-top: 0;
      }
      .shopList{
        border-top:1px dashed #ccc;
        border-bottom:1px solid #ccc;
        border-left:1px solid #ccc;
        border-right:1px solid #ccc;
        padding-top:20px;
        padding-left:10px;
        box-sizing: border-box;
        margin-bottom:10px;
        width: 100%;
      }
      .block{
        display:flex;
        margin-bottom:12px;
      }
      .block span{
        margin-right:2px;
      }
      .demonstration{
        line-height:1.8;
      }
      .weui-btn{
        font-size: 12px;
      }
    }
  }
</style>

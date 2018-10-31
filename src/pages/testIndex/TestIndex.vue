<template>
  <div class="textIndex">
    <!--header--><!--nav-->
    <Header-nav></Header-nav>
    <div class="textContent">
      <ul class="leftTree">
        <li class="leftItem"
            v-for="(item, index) in leftTree"
            @click="changeItem(item,index)"
            :class="{'changeBg':changeClass === index}"
            :key="index">
          {{item}}
        </li>
      </ul>
      <div class="rightCon">
        <div v-show="showLi === 0" class="test">
          <p>请选择练习范围:</p>
          <!--0级-->
          <input v-model='dataRangeValue0' class="inputCourseRange" type="text" @focus="getInput0()">
          <mt-popup
            v-model="popupVisible0"
            position="bottom">
            <p class="sureButton" @click="sureButton0()">确定</p>
            <picker :data='dataRange0' v-model='dataRangeValue0' @on-change='change0'></picker>
          </mt-popup>
          <!--1级-->
          <input v-model='dataRangeValue1' class="inputCourseRange" type="text" @focus="getInput1()">
          <mt-popup
            v-model="popupVisible1"
            position="bottom">
            <p class="sureButton" @click="sureButton1()">确定</p>
            <picker :data='dataRange1' v-model='dataRangeValue1' @on-change='change1'></picker>
          </mt-popup>
          <!--2级-->
          <div v-show="isTwo === 0">
            <input v-model='dataRangeValue2' class="inputCourseRange" type="text" @focus="getInput2()">
            <mt-popup
              v-model="popupVisible2"
              position="bottom">
              <p class="sureButton" @click="sureButton2()">确定</p>
              <picker :data='dataRange2' v-model='dataRangeValue2' @on-change='change2'></picker>
            </mt-popup>
          </div>
          <!--3级-->
          <div v-show="isNew === 0">
            <input v-model='dataRangeValue3' class="inputCourseRange" type="text" @focus="getInput3()">
            <mt-popup
              v-model="popupVisible3"
              position="bottom">
              <p class="sureButton" @click="sureButton3()">确定</p>
              <picker :data='dataRange3' v-model='dataRangeValue3' @on-change='change3'></picker>
            </mt-popup>
          </div>

          <p>请选择题数:</p>
          <input v-model='dataNumValue' class="inputCourseRange" type="text" @focus="getInputNum()">
          <mt-popup
            v-model="popupVisible4"
            position="bottom">
            <picker :data='dataNum' v-model='dataNumValue' @on-change='changeNum'></picker>
          </mt-popup>
          <x-button mini type="primary" @click.native="submitReply()">创建练习</x-button>
        </div>
        <div v-show="showLi === 1" class="history">
          <ul>
            <li class="practiceItem" v-for="(item, index) in practiceData" :key="index">
              <span>{{index + 1}}.</span>
              <span class="preItemSpan">练习题目：{{item.currTestNum}}</span>
              <p class="preItemP">创建时间：{{item.startTime}}</p>
              <p class="preItemP">练习数目：{{item.question.length}}</p>
              <p class="preItemP">练习分数：{{item.sorce}}</p>
              <p class="showButton">
                <x-button mini type="primary" @click.native="showPractice(item)">查看练习</x-button>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import HeaderNav from '@/components/HeaderNav'
import { Picker, XButton } from 'vux'
import { Popup } from 'mint-ui'
import axios from 'axios'
import core from '../../assets/js/core.js'

export default {
  name: 'Course',
  data () {
    return {
      showLi: 0,
      user: this.$store.state.username,
      leftTree: ['在线练习', '历史练习'],
      isNew: 0,
      isTwo: 0,
      changeClass: 0,
      dataRange0: [],
      dataRange1: [],
      dataRange2: [],
      dataRange3: [],
      dataRangeValue: [],
      dataRangeValue0: [],
      dataRangeValue1: [],
      dataRangeValue2: [],
      dataRangeValue3: [],
      dataNum: [['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']],
      dataNumValue: [],
      popupVisible0: false,
      popupVisible1: false,
      popupVisible2: false,
      popupVisible3: false,
      popupVisible4: false,
      Upicker0: [],
      Upicker1: [],
      Upicker2: [],
      Upicker3: [],
      UpickerId0: [],
      UpickerId1: [],
      UpickerId2: [],
      UpickerId3: [],
      sendId0: '',
      sendId1: '',
      sendId2: '',
      sendId3: '',
      sendIdArray: [],
      resData: '',
      sendName0: '',
      sendName1: '',
      sendName2: '',
      sendName3: '',
      sendNameArray: [],
      practiceData: []
    }
  },
  computed: {
  },
  mounted () {
    //    获取左边数据
    this.getLeftData()
  },
  methods: {
    //    提交
    submitReply () {
      this.sendIdArray = []
      this.sendNameArray = []
      this.sendIdArray.push(this.sendId0)
      this.sendIdArray.push(this.sendId1)
      this.sendNameArray.push(this.sendName0)
      this.sendNameArray.push(this.sendName1)
      if (this.sendName0 === '新能源汽车' || this.sendName0 === '汽车发动机' || this.sendName0 === '底盘检修' || this.sendName0 === '汽车电气') {
        this.sendIdArray.push(this.sendId2)
        this.sendNameArray.push(this.sendName2)
      }
      if (this.sendName0 === '新能源汽车') {
        this.sendIdArray.push(this.sendId3)
        this.sendNameArray.push(this.sendName3)
      }
      //      创建练习
      axios({
        method: 'get',
        url: '/readTestQuestion/stuNewExercise',
        params: {
          user: this.user,
          name: this.sendNameArray,
          nameId: this.sendIdArray,
          timeHour: 0,
          timeMin: 30,
          num: this.dataNumValue
        }
      }).then((res) => {
        if (res.data.code === 0) {
          console.log(res.data)
        } else {
          this.errorMsg('未创建成功')
        }
      })
      // 跳转
      this.$router.push('/test')
      this.$router.go(0)
    },
    //    点击确定按钮
    sureButton0 () {
      this.popupVisible0 = false
    },
    sureButton1 () {
      this.popupVisible1 = false
    },
    sureButton2 () {
      this.popupVisible2 = false
    },
    sureButton3 () {
      this.popupVisible3 = false
    },
    //    获取左边数据
    getLeftData () {
      axios.post('/teacherCMS/getCenterTree', {
        data: {
          userID: this.userID,
          userType: this.userType
        }
      }).then((res) => {
        var picker0 = []
        this.resData = res.data[0].children[0].children
        //        console.log(this.resData)
        for (var i = 0; i < this.resData.length - 1; i++) {
          picker0.push(this.resData[i].label)
          this.UpickerId0.push(this.resData[i].courseId)
          //          picker00.push(resData[i].label)
        }
        this.Upicker0 = picker0
        //        0级数据
        this.$set(this.dataRange0, 0, this.Upicker0)
        //        console.log(this.dataRange0)
      })
    },
    //    获取题数input焦点
    getInputNum () {
      this.popupVisible4 = true
    },
    //    获取练习范围焦点0级
    getInput0 () {
      this.popupVisible0 = true
    },
    //    获取练习范围焦点1级
    getInput1 () {
      this.popupVisible1 = true
    },
    //    获取练习范围焦点0级
    getInput2 () {
      this.popupVisible2 = true
    },
    //    获取练习范围焦点0级
    getInput3 () {
      this.popupVisible3 = true
    },
    //    获得练习范围值
    change0 (value) {
      this.dataRangeValue0 = value
      //      console.log('new Value', value)
      var picker1 = []
      if (value[0] !== '新能源汽车') {
        this.isNew = 1
        if (value[0] !== '汽车空调' && value[0] !== '汽车维护') {
          this.isTwo = 0
        } else {
          this.isTwo = 1
        }
      } else {
        this.isNew = 0
      }
      //      console.log(this.isNew)
      //      console.log(this.isTwo)
      for (var i = 0; i < this.Upicker0.length; i++) {
        if (value[0] === this.Upicker0[i]) {
          this.sendId0 = this.UpickerId0[i]
          this.sendName0 = value[0]
          for (var j = 0; j < this.resData[i].children.length; j++) {
            picker1.push(this.resData[i].children[j].label)
            this.UpickerId1.push(this.resData[i].children[j].courseId)
            this.Upicker1.push(this.resData[i].children[j])
          }
          //          this.dataRange1.splice(1, 1, picker1)
          this.$set(this.dataRange1, 0, picker1)
        }
      }
    },
    change1 (value) {
      this.dataRangeValue1 = value
      console.log('new Value', value)
      var picker2 = []
      for (var i = 0; i < this.Upicker1.length; i++) {
        if (value[0] === this.Upicker1[i].label) {
          this.sendId1 = this.UpickerId1[i]
          this.sendName1 = value[0]
          for (var j = 0; j < this.Upicker1[i].children.length; j++) {
            picker2.push(this.Upicker1[i].children[j].label)
            this.UpickerId2.push(this.Upicker1[i].children[j].courseId)
            this.Upicker2.push(this.Upicker1[i].children[j])
          }
          //          this.dataRange1.splice(1, 1, picker1)
          this.$set(this.dataRange2, 0, picker2)
        } else {
        }
      }
    },
    change2 (value) {
      this.dataRangeValue2 = value
      //        console.log('new Value', value)
      var picker3 = []
      for (var i = 0; i < this.Upicker2.length; i++) {
        if (value[0] === this.Upicker2[i].label) {
          this.sendId2 = this.UpickerId2[i]
          this.sendName2 = value[0]
          for (var j = 0; j < this.Upicker2[i].children.length; j++) {
            picker3.push(this.Upicker2[i].children[j].label)
            this.UpickerId3.push(this.Upicker2[i].children[j].courseId)
            this.Upicker3.push(this.Upicker2[i].children[j])
          }
          //          this.dataRange1.splice(1, 1, picker1)
          this.$set(this.dataRange3, 0, picker3)
        }
      }
    },
    change3 (value) {
      for (var i = 0; i < this.Upicker3.length; i++) {
        if (value[0] === this.Upicker3[i].label) {
          this.sendId3 = this.UpickerId3[i]
          this.sendName3 = value[0]
        }
      }
    },
    //    获取题数值
    changeNum (value) {
      this.dataNumValue = value
      //      console.log('new Value', value)
    },
    //    点击左侧列表
    changeItem (item, index) {
      this.changeClass = index
      if (index === 0) {
        this.showLi = 0
      } else {
        this.showLi = 1
        this.historyPractice()
      }
    },
    // 在线练习,--历史练习
    historyPractice () {
      axios.get('/readTestQuestion/stuHistoryPractice', {
        params: {
          user: this.user
        }
      }).then((res) => {
        console.log(res.data)
        this.practiceData = res.data.testQuestionInfo
        for (var i = 0; i < this.practiceData.length; i++) {
          this.practiceData[i].startTime = core.formatDate('yyyy-MM-dd hh:mm:ss', new Date(this.practiceData[i].startTime))
        }
      })
    },
    //  查看练习
    showPractice (item) {
      console.log(item)
      this.$store.commit('showPracticeData', item)
      this.$router.push('showPractice')
    }
  },
  components: {
    HeaderNav,
    Picker,
    Popup,
    XButton
  },
  beforeDestroy: function () {
  }
}
</script>
<style lang="less">
  .textIndex{
    .textContent{
      display:flex;
    }
    .leftTree{
      background:rgb(237,237,237);
      width:21%;
      text-align:center;
    }
    .rightCon{
      width:75%;
      padding: 0.2rem;
      box-sizing: border-box;
      overflow: auto;
      border-top:1px solid rgb(122,18,19);
    }
    .leftItem{
      line-height:1.5rem;
      border-right:1px solid rgb(122,18,19);
    }
    .changeBg{
      background:#fff;
      border-left:1px solid rgb(122,18,19);
      border-top:1px solid rgb(122,18,19);
      border-bottom:1px solid rgb(122,18,19);
      border-right:1px solid #fff;
      color:rgb(122,18,19);
    }
    .inputCourseRange{
      border:2px solid rgb(137,191,298);
      height: 0.6rem;
      width: 80%;
      text-align: center;
      border-radius: 10px;
      margin-top: 0.2rem;
      margin-bottom: 0.2rem;
      padding-left: 0.3rem;
      box-sizing: border-box;
    }
    .mint-popup{
      width:100%;
      padding: 0.2rem;
      box-sizing: border-box;
    }
    .sureButton{
      text-align:right;
      font-size: 0.38rem;
    }
    .history{
      .practiceItem{
        background:rgb(237,237,237);
        margin-bottom:0.3rem;
        padding:0.15rem;
        box-sizing: border-box;
        border-radius: 10px;
      }
      .preItemSpan{
        margin-left:0.2rem;
        font-size: 0.32rem;
      }
      .preItemP{
        margin-left:0.5rem;
        font-size: 0.32rem;
      }
      .showButton{
        text-align: right;
      }
    }
  }
</style>

<template>
  <div class="textIndex">
    <!--header--><!--nav-->
    <Header-nav></Header-nav>
    <div class="textContent">
      <ul class="leftTree" :style="{'height': height - 91 + 'px'}">
        <li class="leftItem"
            v-for="(item, index) in leftTree"
            @click="changeItem(item,index)"
            :class="{'changeBg':changeClass === index}"
            :key="index">
          {{item}}
        </li>
      </ul>
      <div class="rightCon">
        <div v-if="showLi === 0" class="test">
          <!--0级-->
          <div class="addCreate">
            <div class="deleteIcon" v-for="(item, index) in showInpRealArray" :key="index">
              <div class="inputCourseRange"
                   @click="editor(index)"
                   :class="{'addHeight':!item.length}" :id="inputCR(index)">
                <span  v-for="(item2, index2) in item" :key="index2">
                  {{item2}}
                  <span v-show="index2 !== item.length - 1"> | </span>
                </span>
              </div>
              <i class="iconfont" @click="deleteData(index)">&#xeafa;</i>
            </div>
          </div>
          <p class="addClick" @click="getInput0()" v-show="addButton !== 1">
            <i class="iconfont iconfontAdd">&#xe8a8;</i>
            <span class="fontAdd">添加(最多8项)</span>
          </p>
          <mt-popup
            v-model="popupVisible0"
            position="bottom">
            <span :class="{'currInput':currInputClass === 0}" v-show="!Value0">请选择</span>
            <span @click="cliInput0"
                  class="inputCourseRangeI">
              {{Value0}}
            </span>
            <span :class="{'currInput':currInputClass === 1}" v-show="!Value1 && Value0">请选择</span>
            <span @click="cliInput1"
                  class="inputCourseRangeI">
              {{Value1}}
            </span>
            <span :class="{'currInput':currInputClass === 2}" v-show="!Value2 && Value1 && Value0 && showOther !== 1 && showOthData3 === 0">请选择</span>
            <span @click="cliInput2"
                  v-show="showOthData3 === 0"
                  class="inputCourseRangeI">
              {{Value2}}
            </span>
            <span :class="{'currInput':currInputClass === 3}" v-show="!Value3 && Value2 && Value1 && Value0 && showOther !== 1 && showOthData4 === 0">请选择</span>
            <span @click="cliInput3"
                  v-show="showOthData4 === 0"
                  class="inputCourseRangeI">
              {{Value3}}
            </span>
            <!--<picker :data='dataRange0' v-model="dataRangeValue0" @on-change='change0'></picker>-->
            <div class="my-picker">
              <p v-for="(item, index) in dataRange0[0]" :key="index" @click='change0(item)'>
                {{item}}
              </p>
            </div>
          </mt-popup>
          <p>请选择题数:</p>
          <div class="inputCourseRange" @click="getInputNum()">
            {{dataNumValue}}
          </div>
          <p>请输入练习标题（选填）:</p>
          <input v-model="inputTitle" class="inputCourseRange" type="text">
          <mt-popup
            v-model="popupVisible4"
            position="bottom">
            <!--<picker :data='dataNum' v-model='dataNumValue' @on-change='changeNum'></picker>-->
            <div class="my-picker">
              <p v-for="(item, index) in dataNum" :key="index" @click='changeNum(item)'>
                {{item}}
              </p>
            </div>
          </mt-popup>
          <x-button mini type="primary" @click.native="submitReply()">创建练习</x-button>
        </div>
        <div v-if="showLi === 1" class="history">
          <ul>
            <li class="practiceItem" v-for="(item, index) in practiceData" :key="index">
              <span>{{index + 1}}.</span>
              <span class="preItemSpan" v-show="item.title">练习题目：{{item.title}}</span>
              <span class="preItemSpan" v-show="!item.title">练习题目：{{item.theme}}</span>
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
      height: window.innerHeight,
      showLi: 0,
      user: this.$store.state.username,
      leftTree: ['在线练习', '历史练习'],
      isNew: 0,
      isTwo: 0,
      changeClass: 0,
      currInputClass: 0,
      showOther: 0,
      showOthData3: 0,
      showOthData4: 0,
      dataRange0: [],
      dataRangeValue0: [],
      Value0: '',
      Value1: '',
      Value2: '',
      Value3: '',
      dataNum: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
      dataNumValue: 10,
      popupVisible0: false,
      popupVisible4: false,
      Upicker0: [],
      Upicker1: [],
      UpickerId0: [],
      UpickerId1: [],
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
      practiceData: [],
      realData: [],
      currVal: '',
      clickNum: 0,
      temSave0: [],
      temSave1: [],
      temSave2: [],
      temSave3: [],
      temSaveAll0: [],
      temSaveAll1: [],
      temSaveAll2: [],
      temSaveAll3: [],
      originData: [],
      UoriginData: [],
      showInput: [],
      showInpLength: '',
      showInputReal: [],
      showInpRealArray: [],
      arrayPath: [],
      arrPaCh: [],
      bigArrayPath: [],
      bigarrPaCh: [],
      bigArrayIndex: 10,
      inputTitle: '',
      addButton: 0
    }
  },
  computed: {
  },
  mounted () {
    //    获取左边数据
    this.getLeftData()
    if (this.$store.state.showPractice === 1) {
      this.changeItem('在线练习', 1)
    } else if (this.$store.state.showPractice === 0) {
    }
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
          num: this.dataNumValue,
          title: this.inputTitle
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
    //    获取左边数据
    getLeftData () {
      axios.post('/teacherCMS/getCenterTree', {
        data: {
          userID: this.userID,
          userType: this.userType
        }
      }).then((res) => {
        var picker0 = []
        this.originData = res.data[0].children[0].children
        this.resData = res.data[0].children[0].children
        //        console.log(this.resData)
        for (var i = 0; i < this.resData.length - 1; i++) {
          picker0.push(this.resData[i].label)
          this.UpickerId0.push(this.resData[i].courseId)
          //          picker00.push(resData[i].label)
        }
        this.UoriginData = picker0
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
      this.cliInput0()
    },
    //    点击确定按钮
    sureButton0 () {
      this.showOther = 0
      this.showInput.push(this.currVal)
      var showInputLength
      if (this.showInput[0] === '新能源汽车') {
        showInputLength = 4
        this.showOthData3 = 0
        this.showOthData4 = 0
      } else if (this.showInput[0] === '汽车空调' || this.showInput[0] === '汽车维护') {
        showInputLength = 2
        this.showOthData3 = 1
        this.showOthData4 = 1
      } else {
        showInputLength = 3
        this.showOthData3 = 0
        this.showOthData4 = 1
      }
      this.showInput.pop(this.showInput[this.showInput.length - 1])
      if (this.showInput.length < showInputLength) {
        //        console.log(this.showInpLength)
        this.showInput.push(this.currVal)
      } else if (this.showInput.length === showInputLength) {
        this.showInput.pop(this.showInput[this.showInput.length - 1])
        this.showInput.push(this.currVal)
      } else {
      }
      this.arrayPath.push(this.Upicker0)
      this.arrPaCh.push(this.resData)
      if (this.realData) {
        this.Upicker0 = this.realData
//        console.log(this.Upicker0)
        this.resData = this.Upicker1
        this.$set(this.dataRange0, 0, this.realData)
        if (this.clickNum < 4) {
          if (this.clickNum === 0) {
            this.temSave0 = this.Upicker0
            this.temSaveAll0 = this.resData
            this.clickNum += 1
          } else if (this.clickNum === 1) {
            this.temSave1 = this.Upicker0
            this.temSaveAll1 = this.resData
            this.clickNum += 1
          } else if (this.clickNum === 2) {
            this.temSave2 = this.Upicker0
            this.temSaveAll2 = this.resData
            this.clickNum += 1
          } else if (this.clickNum === 3) {
            this.temSave3 = this.Upicker0
            this.temSaveAll3 = this.resData
            this.clickNum += 1
          }
        } else {
        }
      } else {
        this.popupVisible0 = false
//        console.log(this.bigArrayPath)

        this.showOther = 1
        this.showInputReal = this.showInput
//        console.log(this.showInput)
        var temArray = []
        temArray.push(this.showInputReal)
        //        this.showInpRealArray.push(temArray[0])
//        this.showInpRealArray.splice(1, 1, temArray[0])

        //        this.showInpRealArray[this.showInpRealArray.length] = temArray[0]
        this.showInputReal.push(this.currVal)
        this.showInput.pop(this.showInput[this.showInput.length - 1])
//        console.log(this.bigArrayIndex)
//        console.log(this.showInputReal)
        if (this.bigArrayIndex <= this.bigArrayPath.length) {
          this.$set(this.showInpRealArray, this.bigArrayIndex, temArray[0])
          this.bigArrayPath[this.bigArrayIndex] = this.arrayPath
          this.bigarrPaCh[this.bigArrayIndex] = this.arrPaCh
//          this.$set(this.bigArrayPath, this.bigArrayIndex, this.arrayPath)
//          this.$set(this.bigarrPaCh, this.bigArrayIndex, this.arrPaCh)
          this.bigArrayIndex = 10
        } else {
          this.$set(this.showInpRealArray, this.bigArrayPath.length, temArray[0])
          this.bigArrayPath.push(this.arrayPath)
          this.bigarrPaCh.push(this.arrPaCh)
        }
        if (this.showInpRealArray.length <= 7) {
          this.addButton = 0
        } else {
          this.addButton = 1
        }
      }
      if (this.Value0) {
        if (this.Value1) {
          if (this.Value2) {
            if (this.Value3) {
              this.Value3 = this.currVal
            } else {
              this.Value3 = this.currVal
            }
            if (showInputLength === 3) {
              this.Value2 = this.currVal
            }
          } else {
            this.Value2 = this.currVal
            this.currInputClass = 3
          }
          if (showInputLength === 2) {
            this.Value1 = this.currVal
          }
        } else {
          this.Value1 = this.currVal
          this.currInputClass = 2
        }
      } else {
        this.Value0 = this.currVal
        this.currInputClass = 1
      }
    },
    inputCR (index) {
      return 'inputCR' + index
    },
    //    修改已有范围
    editor (index) {
      this.bigArrayIndex = index
////      console.log(this.bigArrayIndex)
//      this.popupVisible0 = true
////      this.cliInput0()
//      var temData = [], temPath = [], temPathAll = []
//      temData = this.showInpRealArray[index]
//      this.Value0 = temData[0]
//      this.Value1 = temData[1]
//      temPath = this.bigArrayPath[index]
//      temPathAll = this.bigarrPaCh[index]
////      this.Upicker0 = temPath[this.arrayPath.length - 1]
////      this.resData = temPathAll[this.arrPaCh.length - 1]
//      this.$set(this.dataRange0, 0, temPath[temPath.length - 1])
//      if (!this.dataRange0) {
//        if (this.clickNum === 1) {
//          this.Upicker0 = temPath[1]
//          this.resData  = temPathAll[1]
//          this.$set(this.dataRange0, 0, temPath[1])
//          this.clickNum += 1
//        } else if (this.clickNum === 2) {
//          this.Upicker0 = temPath[2]
//          this.resData  = temPathAll[2]
//          this.$set(this.dataRange0, 0, temPath[2])
//          this.clickNum += 1
//        }
//      }
////      console.log(temPath)
////      console.log(this.dataRange0)
//      if (temData.length === 3) {
//        this.Value2 = temData[2]
//        this.showOthData3 = 0
//        this.showOthData4 = 1
//      } else if (temData.length === 4) {
//        this.Value2 = temData[2]
//        this.Value3 = temData[3]
//        this.showOthData3 = 0
//        this.showOthData4 = 0
//      } else if (temData.length === 2) {
//        this.showOthData3 = 1
//        this.showOthData4 = 1
//      }
      this.popupVisible0 = true
      this.cliInput0()
    },
    deleteData (index) {
//      console.log(index)
      this.showInpRealArray.splice(index, 1)
//      this.$set(this.showInpRealArray, index, this.showInpRealArray)
//      console.log(this.showInpRealArray)
    },
    //    获得练习范围值
    change0 (value) {
      if (this.showInpRealArray.length <= 7) {
        this.addButton = 0
        this.currVal = value
        //      console.log('new Value', value)
        var picker1 = []
        this.Upicker1 = []
        for (var i = 0; i < this.Upicker0.length; i++) {
          if (value === this.Upicker0[i]) {
            this.sendId0 = this.UpickerId0[i]
            this.sendName0 = value
            if (this.resData[i].children) {
              for (var j = 0; j < this.resData[i].children.length; j++) {
                picker1.push(this.resData[i].children[j].label)
                this.UpickerId1.push(this.resData[i].children[j].courseId)
                this.Upicker1.push(this.resData[i].children[j])
              }
              this.realData = picker1
            } else {
              this.realData = ''
            }
          }
        }
        this.sureButton0()
      } else {
        this.addButton = 1
      }
    },
    cliInput0 () {
      this.arrayPath = []
      this.arrPaCh = []
      if (this.UoriginData) {
        this.currInputClass = 0
        this.showOther = 0
        this.Upicker0 = this.UoriginData
        this.resData = this.originData
        this.$set(this.dataRange0, 0, this.UoriginData)
        this.Value0 = ''
        this.Value1 = ''
        this.Value2 = ''
        this.Value3 = ''
        this.temSave0 = []
        this.temSaveAll0 = []
        this.temSave1 = []
        this.temSaveAll1 = []
        this.temSave2 = []
        this.temSaveAll2 = []
        this.clickNum = 0
        this.showInput = []
      } else {
      }
    },
    cliInput1 () {
      if (this.Value1) {
        this.currInputClass = 1
        this.showOther = 0
        this.Upicker0 = this.temSave0
        this.resData = this.temSaveAll0
        this.$set(this.dataRange0, 0, this.temSave0)
        this.Value1 = ''
        this.Value2 = ''
        this.Value3 = ''
        this.temSave1 = []
        this.temSaveAll1 = []
        this.temSave2 = []
        this.temSaveAll2 = []
        this.clickNum = 1
        var showInp = []
        showInp.push(this.showInput[0])
        this.showInput = showInp
      } else {
      }
    },
    cliInput2 () {
      this.currInputClass = 2
      this.showOther = 0
      //      console.log(this.temSave1)
      if (this.Value2) {
        this.Upicker0 = this.temSave1
        this.resData = this.temSaveAll1
        this.$set(this.dataRange0, 0, this.temSave1)
        this.Value2 = ''
        this.Value3 = ''
        this.clickNum = 2
        var showInp = []
        showInp.push(this.showInput[0])
        showInp.push(this.showInput[1])
        this.showInput = showInp
      } else {
      }
    },
    cliInput3 () {
      if (this.Value3) {
        this.currInputClass = 3
        this.showOther = 0
        this.Upicker0 = this.temSave2
        this.resData = this.temSaveAll2
        this.$set(this.dataRange0, 0, this.temSave2)
        this.Value3 = ''
        this.clickNum = 3
      } else {
      }
    },
    //    获取题数值
    changeNum (value) {
      this.dataNumValue = value
      //      console.log('new Value', value)
    },
    //    点击左侧列表
    changeItem (item, index) {
      this.$store.commit('showPractice', 0)
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
      background:rgb(240,240,240);
    }
    .leftTree{
      background:rgb(255,255,255);
      width:21%;
      text-align:center;
    }
    .rightCon{
      width:79%;
      padding: 0.2rem;
      box-sizing: border-box;
      overflow: auto;
      border-top:1px solid rgb(122,18,19);
      .addClick{
        border: 2px solid #89bfff;
        width: 80%;
        height: 0.45rem;
        background: #89bfff;
        color: #fff;
        text-align: center;
        border-radius: 10px;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        padding: 0.1rem;
        position: relative;
        .iconfontAdd{
          font-size: 0.55rem;
          position: absolute;
          left:1.2rem;
          top:0.1rem;
        }
        .fontAdd{
          margin-bottom:0.1rem;
          position: absolute;
          right:1rem;
          top:0.21rem;
        }
      }
      .addCreate{
        .deleteIcon{
          display: flex;
          align-items: center;
        }
        .iconfont{
          font-size: 0.6rem;
          margin-left: 0.1rem;
          color: rgb(122,18,19);
        }
      }
    }
    .leftItem{
      padding:1rem 0 1rem 0;
      border-right:1px solid rgb(122,18,19);
    }
    .changeBg{
      background:rgb(240,240,240);
      border-left:1px solid rgb(122,18,19);
      border-top:1px solid rgb(122,18,19);
      border-bottom:1px solid rgb(122,18,19);
      border-right:1px solid rgb(240,240,240);
      color:rgb(122,18,19);
    }
    .inputCourseRange{
      border:2px solid rgb(137,191,298);
      width: 80%;
      background: #fff;
      text-align: center;
      border-radius: 10px;
      margin-top: 0.2rem;
      margin-bottom: 0.2rem;
      padding: 0.1rem;
    }
    .addHeight{
      height:0.5rem;
    }
    .inputCourseRangeI{
      width: 24%;
      display: inline-block;
    }
    .my-picker{
      width:100%;
      font-size:0.32rem;
      line-height:0.88rem;
      height: 4.4rem;
      overflow:auto;
      vertical-align: middle;
      color:#5a5a5a;
    }
    .mint-popup{
      width:100%;
      padding-top: 0.3rem;
      box-sizing: border-box;
      text-align: center;
    }
    .currInput{
      display: inline-block;
      border-bottom: 2px solid #7a1213;
      margin-bottom: 0.1rem;
      padding: 0.1rem;
      color: #7a1213;
      font-weight: bold;
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
        font-size: 0.28rem;
      }
      .preItemP{
        margin-left:0.5rem;
        font-size: 0.28rem;
      }
      .showButton{
        text-align: right;
      }
    }
  }
</style>

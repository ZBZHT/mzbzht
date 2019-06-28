<template>
  <div class="CompetitionIndex">
    <!--header--><!--nav-->
    <Header-nav></Header-nav>
    <div class="exerciseIndexContent">
      <ul class="leftTree" :style="{'height': height - 91 + 'px'}">
        <li class="leftItem"
            v-for="(item,index) in leftTree"
            @click="changeItem(index)"
            :class="{'changeBg':changeClass === index}"
            :key="index">
          {{item.label}}
        </li>
      </ul>
      <div class="rightCon" :style="{height: height - 120 + 'px'}">
        <!--当前课堂-->
        <div  v-show="changeItemState === 0">
          <sign-con class="currCourse"></sign-con>
        </div>
        <!--请假申请-->
        <div v-show="changeItemState === 1">
          <button class="IHaveToGo">我要请假</button>
          <div class="IHaveToGoCon">
            <p>请假时间:</p>
            <div class="timeGroup">
              <div>
                <input class="inputDate" @click="openPickerYearStart()" type="text" v-model="yearStart">:
                <input class="inputDate" @click="openPickerTimeStart()" type="text" v-model="timeStart">
              </div>
              <p class="pop-title">至</p>
              <div>
                <input class="inputDate" @click="openPickerYearEnd()" type="text" v-model="yearEnd">:
                <input class="inputDate" @click="openPickerTimeEnd()" type="text" v-model="timeEnd">
              </div>
            </div>
            <mt-datetime-picker
              ref="pickerYearStart"
              type="date"
              @confirm="handleConfirmStart"
              year-format="{value} 年"
              month-format="{value} 月"
              date-format="{value} 日"
              v-model="yearStartPicker">
            </mt-datetime-picker>
            <mt-datetime-picker
              ref="pickerTimeStart"
              type="time"
              @confirm="handleConfirmTimeStart"
              v-model="timeStartPicker">
            </mt-datetime-picker>
            <mt-datetime-picker
              ref="pickerYearEnd"
              type="date"
              @confirm="handleConfirmEnd"
              year-format="{value} 年"
              month-format="{value} 月"
              date-format="{value} 日"
              v-model="yearEndPicker">
            </mt-datetime-picker>
            <mt-datetime-picker
              ref="pickerTimeEnd"
              type="time"
              @confirm="handleConfirmTimeEnd"
              v-model="timeEndPicker">
            </mt-datetime-picker>
            <div>
              <p class="pop-TimeTitle">请假事由:</p>
              <input class="inputReason" type="text" v-model="leaveReason">
            </div>
          </div>
          <button class="IHaveToGo IHaveToGoSubmit" @click="leaveSubmit()">提交</button>
        </div>
        <!--请假记录-->
        <div  v-show="changeItemState === 2">
          <ul class="cellUl">
            <li class="cellLi"
                @click="showCellBox(index)"
                v-for="(item,index) in tableData"
                :key="index">
              <p class="cellP">
                <span class="cellTitle">{{item.date1}}</span>
                <span class="cellSpan">→</span>
              </p>
              <div class="cellBox"
                   @click="showCellBox(index)"
                   v-show="showCell === index">
                <p class="cellBoxP">请假事由：{{item.reason}}</p>
                <p class="cellBoxP">状态：
                  <i class="iconfont pass" v-if="item.state === 0">&#xe61c;</i>
                  <i class="iconfont icon-wait" v-if="item.state === 1">&#xe607;</i>
                  <i class="iconfont false" v-if="item.state === 2">&#xe633;</i>
                </p>
                <button class="downButDel"
                        @click="redelete(index,item)">删除</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

import HeaderNav from '@/components/HeaderNav'
import { Popup, MessageBox } from 'mint-ui'
import axios from 'axios'
import signCon from '../sign/SignCon.vue'
import moment from 'moment'

export default {
  name: 'Course',
  data () {
    return {
      height: window.innerHeight,
      userID: this.$store.state.userID,
      userType: this.$store.state.userType,
      leftTree: [
        {
          id: 3000,
          label: '当前课堂'
        },
        {
          id: 4000,
          label: '请假申请'
        },
        {
          id: 5000,
          label: '请假记录'
        }
      ],
      changeClass: 0,
      changeItemState: 0,
      tableData: [],
      showCell: '',
      form: {
        date: [],
        reason: ''
      },
      yearStart: '',
      yearStartPicker: new Date(),
      timeStart: '08:00',
      timeStartPicker: '08:00',
      yearEnd: '',
      yearEndPicker: new Date(),
      timeEnd: '20:00',
      timeEndPicker: '20:00',
      leaveReason: ''
    }
  },
  computed: {
  },
  mounted () {
    this.getStuLeaveMsg()
    //    请假时间初始值
    this.$nextTick(function () {
      this.yearStart = moment().format('YYYY-MM-DD')
      this.yearEnd = moment().format('YYYY-MM-DD')
    })
  },
  methods: {
    //    提交请假申请
    leaveSubmit () {
      let date1 = this.yearStart + ',' + this.timeStart
      let date2 = this.yearEnd + ',' + this.timeEnd
      let startTime = new Date(date1).getTime()
      let endTime = new Date(date2).getTime()
      if (startTime < endTime) {
        this.form.startDate = this.yearStart
        this.form.endDate = this.yearEnd
        this.form.startTime = this.timeStart
        this.form.endTime = this.timeEnd
        this.form.reason = this.leaveReason
        this.form.date.push(date1, date2)
        axios.post('/teacherCMS/newStuLeaveMsg', {
          data: {
            form: this.form
          }
        }).then((res) => {
          if (res.data.code === 0) {
            //          成功
            MessageBox('提示', '申请提交成功')
            this.yearStart = moment().format('YYYY-MM-DD')
            this.yearEnd = moment().format('YYYY-MM-DD')
            this.timeStart = '08:00'
            this.timeEnd = '20:00'
            this.yearStartPicker = new Date()
            this.yearEndPicker = new Date()
            this.timeStartPicker = '08:00'
            this.timeEndPicker = '20:00'
            this.leaveReason = ''
            this.getStuLeaveMsg()
          } else if (res.data.code === 1) {
            //          失败
            MessageBox('提示', '申请提交失败,请稍后再试')
          }
        })
      } else {
        MessageBox('提示', '申请提交失败，请核对请假时间')
      }
    },
    //    请假开始日期
    openPickerYearStart () {
      this.$refs.pickerYearStart.open()
    },
    //    确认请假开始日期
    handleConfirmStart () {
      this.yearStart = moment(this.yearStartPicker).format('YYYY-MM-DD')
      this.yearEnd = this.yearStart
    },
    //    请假结束日期
    openPickerYearEnd () {
      this.$refs.pickerYearEnd.open()
    },
    //    确认请假结束日期
    handleConfirmEnd () {
      this.yearEnd = moment(this.yearEndPicker).format('YYYY-MM-DD')
    },
    // 请假开始时间
    openPickerTimeStart () {
      this.$refs.pickerTimeStart.open()
    },
    //    确认请假开始时间
    handleConfirmTimeStart () {
      this.timeStart = this.timeStartPicker
    },
    //    请假结束时间
    openPickerTimeEnd () {
      this.$refs.pickerTimeEnd.open()
    },
    //    确认请假开始时间
    handleConfirmTimeEnd () {
      this.timeEnd = this.timeEndPicker
    },
    // 修改->删除
    redelete (index, item) {
      axios.post('/teacherCMS/dellStuLeaveMsg', {
        data: {
          item: item
        }
      }).then((res) => {
        if (res.data.code === 0) {
          this.getStuLeaveMsg()
        } else if (res.data.code === 1) {
          this.addDefeat(res.data.Msg)
        }
      })
    },
    //    点击显示每条详细信息
    showCellBox (index) {
      if (this.showCell === index) {
        this.showCell = ''
      } else {
        this.showCell = index
      }
    },
    // 获取请假信息
    getStuLeaveMsg () {
      axios.post('/teacherCMS/getStuLeaveMsg', {
        data: {
          form: ''
        }
      }).then((res) => {
        let resData = res.data.result
        if (res.data.code === 0) {
          this.tableData = []
          for (let i = 0; i < resData.length; i++) {
            // console.log(resData[i]);
            resData[i].date1 = resData[i].startDate + ',' + resData[i].startTime + '~' + resData[i].endDate + ',' + resData[i].endTime
          }
          this.tableData = resData
          //            console.log(this.tableData,'162')
        } else if (res.data.code === 1) {
          this.tableData = []
        }
      })
    },
    //    点击左侧列表
    changeItem (index) {
      this.changeClass = index
      this.changeItemState = index
    }
  },
  components: {
    HeaderNav,
    Popup,
    signCon,
    MessageBox
  },
  beforeDestroy: function () {
  }
}
</script>
<style>
  *{
    margin:0;
    padding:0;
  }
  .CompetitionIndex .leftTree{
    background:rgb(255,255,255);
    width:21%;
    text-align:center;
  }
  .CompetitionIndex .exerciseIndexContent{
    display:flex;
    background:rgb(240,240,240);
  }
  .CompetitionIndex .rightCon{
    width:79%;
    padding: 0.2rem;
    box-sizing: border-box;
    overflow: auto;
    border-top:1px solid rgb(122,18,19);
  }
  .CompetitionIndex .rightCon .cellUl{
    margin-top:0.2rem;
  }
  .CompetitionIndex .rightCon .cellLi{
    position: relative;
    /*margin-bottom:0.2rem;*/
    padding: 0.2rem 0 0.2rem 0;
    border-top: 1px solid rgb(200,200,200);
  }
  .CompetitionIndex .rightCon li:last-child
  {
    border-bottom: 1px solid rgb(200,200,200);
    /*padding-bottom: 0.2rem;*/
    box-sizing: border-box;
  }
  .CompetitionIndex .rightCon .cellTitle{
    display: inline-block;
    width:90%;
    line-height:0.4rem;
    height:0.4rem;
    font-weight: bold;
  }
  .CompetitionIndex .rightCon .cellSpan{
    position:absolute;
    right:0;
    line-height:0.4rem;
  }
  .CompetitionIndex .rightCon .cellBox{
    background: rgb(237,237,237);
    padding:0.15rem;
    box-sizing: border-box;
  }
  .CompetitionIndex .rightCon .cellBoxP{
    font-size: 0.24rem;
    margin-bottom:0.1rem;
  }
  .CompetitionIndex .rightCon .cellBoxP .pass{
    color: green;
  }
  .CompetitionIndex .rightCon .cellBoxP .icon-wait{
    color:orange;
  }
  .CompetitionIndex .rightCon .cellBoxP .false{
    color: red;
  }
  .CompetitionIndex .rightCon .downButDel{
    background: darkred;
    margin-right:0.4rem;
    margin-left:40%;
    padding:0.05rem 0.15rem 0.05rem 0.15rem;
    font-size: 12px;
    color:#fff;
    font-weight: bold;
    border-radius:4px;
  }
  .leftItem{
    padding:1rem 0 1rem 0;
    border-right:1px solid rgb(122,18,19);
  }
  .CompetitionIndex .changeBg{
    background:rgb(240,240,240);
    border-left:1px solid rgb(122,18,19);
    border-top:1px solid rgb(122,18,19);
    border-bottom:1px solid rgb(122,18,19);
    border-right:1px solid rgb(240,240,240);
    color:rgb(122,18,19);
  }
  .CompetitionIndex .rightCon .popLeave{
    width: 80%;
    height:25%;
    padding:0.1rem;
  }
  .CompetitionIndex .rightCon .pop-title{
    text-align: center;
    margin-top:0.2rem;
    margin-bottom:0.2rem;
  }
  .CompetitionIndex .rightCon .pop-TimeTitle{
    margin-top:2.2rem;
  }
  .CompetitionIndex .rightCon .timeGroup{
    position: fixed;
    margin-top:0.1rem;
    margin-bottom:0.4rem;
  }
  .CompetitionIndex .rightCon .inputDate{
    width: 45%;
    border:1.5px solid dodgerblue ;
    border-radius: 5px;
    margin-right: 1.4%;
    /*padding:0.1rem 0 0.1rem 0.4rem;*/
    /*box-sizing: border-box;*/
    text-align: center;
  }
  .CompetitionIndex .rightCon .inputReason{
    width: 102%;
    border:2px solid dodgerblue ;
    border-radius: 5px;
    margin-right: 1.4%;
    margin-top:0.1rem;
    padding:0.1rem 0 0.1rem 0.1rem;
    box-sizing: border-box;
  }
  .CompetitionIndex .IHaveToGo {
    padding:0.1rem 0.2rem 0.1rem 0.2rem;
    margin-top:0.2rem;
    margin-left: 0.2rem;
    margin-bottom: 0.2rem;
    background-color: dodgerblue;
    color:#fff;
    font-weight: bold;
    border-radius:4px;
  }
  .CompetitionIndex .IHaveToGoCon{
    padding:0.2rem;
  }
  .CompetitionIndex .IHaveToGoSubmit {
    background-color: limegreen;
    margin-left: 45%;
    margin-top:0.5rem;
  }
</style>

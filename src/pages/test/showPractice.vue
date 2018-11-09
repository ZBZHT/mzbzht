<template>
  <div class="Test">
    <!--header--><!--nav-->
    <Header-nav></Header-nav>
    <div class="test">
      <div class="top">
        查看练习
      </div>
      <div class="middle">
        <p class="queNum">
          <span>{{currNum}}</span>
          <span>/{{allNum}}</span>
        </p>
        <hr>
        <div class="content">
          <p class="queDesc">{{currQue[0].desc}}</p>
          <p class="queOptions" v-for="(item, index) in currQue[0].options" :key="index">
            <i class="iconfont" v-show="showRight === index">&#xe603;</i>
            {{item}}
          </p>
        </div>
        <p class="ans">正确答案：{{currQue[0].answer}}</p>
      </div>
      <div class="bottom">
        <p class="changeQue" @click="pro"><</p>
        <p class="showAllQue" @click="showAllQue()">答题卡</p>
        <mt-popup
          v-model="popupVisible"
          position="bottom">
          <div class="spans">
            <span v-for="(item, index) in allNum"
                  :key="index"
                  @click="jumpTo(index)">
              {{item}}
            </span>
          </div>
        </mt-popup>
        <p class="changeQue" @click="next">></p>
      </div>
    </div>
  </div>
</template>
<script>

import HeaderNav from '@/components/HeaderNav'
import axios from 'axios'
import { Checklist, XButton } from 'vux'
import { Popup } from 'mint-ui'
export default {
  name: 'Test',
  data () {
    return {
      user: this.$store.state.username,
      allNum: '',
      currQue: [],
      currNum: 1,
      radioValue: [],
      resData: '',
      popupVisible: false,
      ansArray: [],
      currState: [],
      currTestNum: '',
      showRight: ''
    }
  },
  computed: {
  },
  mounted () {
    this.getExercise()
  },
  methods: {
    //    点击答题卡跳转
    jumpTo (index) {
      if (this.$store.state.showPracticeData.currAnswer[this.currNum - 1] === 'A') {
        this.showRight = 0
      } else if (this.$store.state.showPracticeData.currAnswer[this.currNum - 1] === 'B') {
        this.showRight = 1
      } else if (this.$store.state.showPracticeData.currAnswer[this.currNum - 1] === 'C') {
        this.showRight = 2
      } else if (this.$store.state.showPracticeData.currAnswer[this.currNum - 1] === 'D') {
        this.showRight = 3
      } else if (this.$store.state.showPracticeData.currAnswer[this.currNum - 1] === '') {
        this.showRight = ''
      }
      this.currNum = index + 1
      this.currQue = this.resData[this.currNum - 1]
      if (this.ansArray[this.currNum - 1]) {
        this.radioValue = this.radioValArray[this.currNum - 1]
        //        console.log('val', this.radioValue)
      }
    },
    //    答题卡
    showAllQue () {
      this.popupVisible = true
    },
    //    点击下一题
    next () {
      if (this.currNum < this.allNum) {
        if (this.$store.state.showPracticeData.currAnswer[this.currNum - 1] === 'A') {
          this.showRight = 0
        } else if (this.$store.state.showPracticeData.currAnswer[this.currNum - 1] === 'B') {
          this.showRight = 1
        } else if (this.$store.state.showPracticeData.currAnswer[this.currNum - 1] === 'C') {
          this.showRight = 2
        } else if (this.$store.state.showPracticeData.currAnswer[this.currNum - 1] === 'D') {
          this.showRight = 3
        } else if (this.$store.state.showPracticeData.currAnswer[this.currNum - 1] === '') {
          this.showRight = ''
        }
        this.currNum ++
        this.currQue = this.resData[this.currNum - 1]
        if (this.ansArray[this.currNum - 1]) {
          this.radioValue = this.currState[this.currNum - 1]
        }
      }
    },
    //    点击上一题
    pro () {
      if (this.currNum > 1) {
        if (this.$store.state.showPracticeData.currAnswer[this.currNum - 1] === 'A') {
          this.showRight = 0
        } else if (this.$store.state.showPracticeData.currAnswer[this.currNum - 1] === 'B') {
          this.showRight = 1
        } else if (this.$store.state.showPracticeData.currAnswer[this.currNum - 1] === 'C') {
          this.showRight = 2
        } else if (this.$store.state.showPracticeData.currAnswer[this.currNum - 1] === 'D') {
          this.showRight = 3
        } else if (this.$store.state.showPracticeData.currAnswer[this.currNum - 1] === '') {
          this.showRight = ''
        }
        this.currNum --
        this.currQue = this.resData[this.currNum - 1]
        if (this.ansArray[this.currNum - 1]) {
          this.radioValue = this.currState[this.currNum - 1]
        }
      }
    },
    //      获取试题
    getExercise () {
      if (this.$store.state.showPracticeData.currAnswer[0] === 'A') {
        this.showRight = 0
      } else if (this.$store.state.showPracticeData.currAnswer[0] === 'B') {
        this.showRight = 1
      } else if (this.$store.state.showPracticeData.currAnswer[0] === 'C') {
        this.showRight = 2
      } else if (this.$store.state.showPracticeData.currAnswer[0] === 'D') {
        this.showRight = 3
      } else if (this.$store.state.showPracticeData.currAnswer[0] === '') {
        this.showRight = ''
      }
      console.log('val', this.$store.state.showPracticeData)
      this.currState = this.$store.state.showPracticeData.currState
      this.resData = this.$store.state.showPracticeData.question
      this.allNum = this.$store.state.showPracticeData.question.length
      this.currQue = this.resData[0]
      this.currNum = 1
    }
  },
  components: {
    HeaderNav,
    Checklist,
    XButton,
    Popup
  },
  beforeDestroy: function () {
  }
}
</script>
<style lang="less">
  .Test{
    .test{
      padding:0.2rem;
      box-sizing: border-box;
      .top{
        margin:0.5rem;
        text-align: center;
        font-size:0.38rem;
      }
      .queNum{
        margin-bottom:0.5rem;
      }
      .queDesc{
        font-size:0.38rem;
        margin-top:0.5rem;
        margin-bottom:0.5rem;
      }
      .queOptions{
        font-size: 0.34rem;
        margin-left: 1.1rem;
        border-top: 1px solid #eee;
        height: 0.9rem;
        line-height: 0.9rem;
      }
      .bottom{
        border-top:1px solid #ccc;
        width:100%;
        height:1rem;
        position: fixed;
        left: 0;
        bottom:0;
        display: flex;
        padding:0.2rem 0.3rem 0.2rem 0.3rem;
        box-sizing: border-box;
      }
      .changeQue{
        font-size: 0.7rem;
      }
      .showAllQue{
        margin: 0.2rem 0 0 3rem;
        width: 80%;
      }
      .ans{
        font-size: 0.35rem;
        text-align: right;
        margin: 0.2rem;
      }
      .mint-popup{
        width:100%;
        height: 3rem;
        overflow: auto;
        .spans{
          text-align: center;
        }
        span{
          font-size: 0.3rem;
          margin: 0.3rem;
          display: inline-block;
          width: 10%;
          height:0.8rem;
          line-height:0.8rem;
          border: 1px solid #000;
          border-radius: 50%;
        }
        .isWrite{
          background: rgb(124,211,59);
        }
      }
    }
  }
</style>

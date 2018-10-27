<template>
  <div class="Test">
    <!--header--><!--nav-->
    <Header-nav></Header-nav>
    <div class="test">
      <div class="top">
        章节练习
      </div>
      <div class="middle">
        <p class="queNum">
          <span>{{currNum}}</span>
          <span>/{{allNum}}</span>
        </p>
        <hr>
        <div class="content">
          <p class="queDesc">{{currQue.desc}}</p>
          <checklist :options="currQue.options" v-model="radioValue" :max="1" @on-change="change"></checklist>

        </div>
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
                  :class="{isWrite:ansArray[index]}"
                  @click="jumpTo(index)">
              {{item}}
            </span>
          </div>
        </mt-popup>
        <x-button mini type="warn" @click.native="submitReply()">提交</x-button>
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
      radioValArray: [],
      currTestNum: ''
    }
  },
  computed: {
  },
  mounted () {
    this.getExercise()
  },
  methods: {
    //    提交
    submitReply () {
      axios({
        method: 'get',
        url: '/readTestQuestionInfo/submitQuestionInfo',
        params: {
          user: this.user,
          currTestNum: this.testQuestion,
          startTime: new Date(),
          currAnswer: this.ansArray,
          currState: this.radioValArray,
          error: this.ansArray,
          sorce: 10,
          testTimeMinutes: 10,
          testTimeSeconds: 20,
          currIsId: this.ansArray,
          isCheckNum: this.ansArray.length
        }
      }).then(
        function (res) {
          console.log(res)
          if (res.data.code === 0) {
            // alert(this.sorce);
            alert ('提交成功')
            this.$router.push('/testIndex')
          } else {
            this.errorMsg('未提交成功')
          }
        }
      )
    },
    //    点击答题卡跳转
    jumpTo (index) {
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
        this.currNum ++
        this.currQue = this.resData[this.currNum - 1]
        if (this.ansArray[this.currNum - 1]) {
          this.radioValue = this.radioValArray[this.currNum - 1]
        }
      }
    },
    //    点击上一题
    pro () {
      if (this.currNum > 1) {
        this.currNum --
        this.currQue = this.resData[this.currNum - 1]
        if (this.ansArray[this.currNum - 1]) {
          this.radioValue = this.radioValArray[this.currNum - 1]
        }
      }
    },
    //    选择答案
    change (val, label) {
//      console.log(label)
      var str = label[0]
      var ans = str.substr(0, 1)
      this.$set(this.ansArray, this.currNum - 1, ans)
      this.$set(this.radioValArray, this.currNum - 1, label)
      console.log(this.ansArray)
      //      setTimeout(function () {
      //        if (this.currNum < this.allNum) {
      //          this.next()
      //        }
      //      }.bind(this), 1000)
    },
    //      获取试题
    getExercise () {
      axios.get('/readTestQuestion/getTestExercise', {
        params: {
          user: this.user
        }
      }).then((res) => {
        console.log(res.data.testQuestion)
        this.currTestNum = res.data.testQuestion.currTestNum
        this.resData = res.data.testQuestion.question
        console.log(this.resData)
        this.allNum = res.data.testQuestion.question.length
        this.currQue = this.resData[0]
        this.currNum = 1
        console.log(this.currQue)
      })
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
        margin:0.2rem 0 0 1rem;
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
          background: rgb(221,81,69);
          border-radius: 50%;
        }
        .isWrite{
          background: rgb(124,211,59);
        }
      }
    }
  }
</style>

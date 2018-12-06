<template>
  <div class="Test">
    <!--header--><!--nav-->
    <!--<Header-nav></Header-nav>-->
    <div class="test">
      <span class="goBack" @click="goBack">
        <go-back></go-back>
      </span>
      <x-button class="submit" mini type="warn" @click.native="submitReply()">提交</x-button>
      <div class="top">
        <p v-show="resultData.title">{{resultData.title}}</p>
        <p v-show="!resultData.title">{{resultData.theme}}</p>
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
        <i class="iconfont changeQue"
           :class="{'isFOrL':isfirst === 1}"
           @click="pro">&#xe606;</i>
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
        <i class="iconfont changeQue"
           :class="{'isFOrL':islast === 1}"
           @click="next">&#xe605;</i>
      </div>
    </div>
  </div>
</template>
<script>

import HeaderNav from '@/components/HeaderNav'
import goBack from '@/components/goBack'
import axios from 'axios'
import { Checklist, XButton } from 'vux'
import { Popup, MessageBox } from 'mint-ui'
export default {
  name: 'Test',
  data () {
    return {
      user: this.$store.state.username,
      allNum: '',
      currQue: {
        options: []
      },
      currNum: 1,
      radioValue: [],
      resData: '',
      popupVisible: false,
      ansArray: [],
      radioValArray: [],
      currTestNum: '',
      isfirst: 0,
      islast: 0,
      resultData: ''
    }
  },
  computed: {
  },
  mounted () {
    setTimeout(function () {
      this.getExercise()
    }.bind(this), 10)
  },
  methods: {
    //    返回上一级
    goBack () {
      MessageBox.confirm('', {
        message: '练习还未提交，是否提交',
        confirmButtonText: '提交',
        cancelButtonText: '返回'
      }).then(action => {
        if (action === 'confirm') { // 确认的回调
          this.submitReply()
        }
      }).catch(err => {
        if (err === 'cancel') { // 取消的回调
          this.$router.push('/testIndex')
        }
      })
    },
    //    提交
    submitReply () {
      var sorce = 0
      //      console.log(this.resData)
      for (var i = 0; i < this.resData.length; i++) {
      //        console.log(this.resData[i].answer)
        if (this.resData[i].answer === this.ansArray[i]) {
          sorce += 1
        }
      }
      console.log('ans', this.ansArray)
      axios({
        method: 'get',
        url: '/readTestQuestionInfo/submitQuestionInfo',
        params: {
          user: this.user,
          currTestNum: this.currTestNum,
          startTime: new Date(),
          currAnswer: this.ansArray,
          currState: this.radioValArray,
          error: this.ansArray,
          sorce: sorce,
          testTimeMinutes: 10,
          testTimeSeconds: 20,
          currIsId: this.ansArray,
          isCheckNum: this.ansArray.length
        }
      }).then((res) => {
        //        console.log(res)
        if (res.data.code === 0) {
          // alert(this.sorce);
          MessageBox.confirm('', {
            message: '答对题数：' + sorce + ',请在历史练习中查看',
            confirmButtonText: '确定'
          }).then(action => {
            if (action === 'confirm') { // 确认的回调
              this.$router.push('/testIndex')
            }
          }).catch(err => {
            if (err === 'cancel') { // 取消的回调
              this.$router.push('/testIndex')
            }
          })
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
      this.isfirst = 0
      if (this.currNum < this.allNum) {
        this.currNum ++
        this.currQue = this.resData[this.currNum - 1]
        if (this.ansArray[this.currNum - 1]) {
          this.radioValue = this.radioValArray[this.currNum - 1]
        }
        if (this.currNum === this.allNum) {
          this.islast = 1
        }
      }
    },
    //    点击上一题
    pro () {
      this.islast = 0
      if (this.currNum > 1) {
        this.currNum --
        this.currQue = this.resData[this.currNum - 1]
        if (this.ansArray[this.currNum - 1]) {
          this.radioValue = this.radioValArray[this.currNum - 1]
        }
      }
      if (this.currNum === 1) {
        this.isfirst = 1
      }
    },
    //    选择答案
    change (val, label) {
      var str = label[0]
      if (!str) {
      } else {
        var ans = str.substr(0, 1)
        //        console.log('ans', str.substr(0, 1))
        this.$set(this.ansArray, this.currNum - 1, ans)
        this.$set(this.radioValArray, this.currNum - 1, label)
      }
    },
    //      获取试题
    getExercise () {
      axios.get('/readTestQuestion/getTestExercise', {
        params: {
          user: this.user
        }
      }).then((res) => {
                console.log(res.data.testQuestion)
        this.resultData = res.data.testQuestion
        this.currTestNum = res.data.testQuestion.currTestNum
        this.resData = res.data.testQuestion.question
        //        console.log(this.resData)
        this.allNum = res.data.testQuestion.question.length
        this.currQue = this.resData[0]
        //        console.log(this.currQue)
        this.currNum = 1
        if (this.currNum === 1) {
          this.isfirst = 1
        }
        //        console.log(this.currQue)
      })
    }
  },
  components: {
    HeaderNav,
    goBack,
    Checklist,
    XButton,
    Popup,
    MessageBox
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
      position: relative;
      .submit{
        position: absolute;
        top:4%;
        right:4%;
      }
      .goBack{
        margin-top:0.2rem;
        margin-left: 0.2rem;
        margin-right: 4.6rem;
      }
      .top{
        margin:0.5rem;
        text-align: center;
        font-size:0.38rem;
      }
      .queNum{
        margin-bottom:0.5rem;
      }
      .content{
        margin-bottom:1rem;
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
        background: #fff;
      }
      .changeQue{
        font-size: 0.68rem;
        width: 8%;
        text-align: center;
      }
      .showAllQue{
        margin: 0.2rem 2rem 0 2.5rem;
        width: 60%;
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
          width: 40px;
          height: 40px;
          line-height: 40px;
          background: rgb(221,81,69);
          border-radius: 50%;
        }
        .isWrite{
          background: rgb(124,211,59);
        }
      }
      .isFOrL{
        color:#ccc;
      }
    }
  }
</style>

<template>
  <div class="CompetitionIndex">
    <!--header--><!--nav-->
    <Header-nav></Header-nav>
    <div class="exerciseIndexContent">
      <ul class="leftTree" :style="{'height': height - 91 + 'px'}">
        <li class="leftItem"
            v-for="(item,index) in leftTree"
            :style="{'line-height': (height - 88) / 6 + 'px'}"
            @click="changeItem(item,index)"
            :class="{'changeBg':changeClass === index}"
            :key="index">
          {{item.label}}
        </li>
      </ul>
      <div class="rightCon" :style="{height: height - 120 + 'px'}">
        <table>
          <tr class="rightTr"  @click="jumpCourseDetail(item)" v-for="(item,index) in secondData" :key="index">
            <b>{{item.label}}</b>
            <div class="allTd" v-show="item.children">
              <td class="rightTd" @click="clickCourse(item,item2)" v-for="(item2,index2) in item.children" :key="index2">
                <i v-if="index2 === 0" class="iconfont">&#xe8cb;</i>
                <i v-if="index2 === 1" class="iconfont">&#xe6a7;</i>
                <i v-if="index2 === 2" class="iconfont">&#xe620;</i>
                <i v-if="index2 === 3" class="iconfont">&#xe634;</i>
                <i v-if="index2 === 4" class="iconfont">&#xe602;</i>
                <i v-if="index2 === 5" class="iconfont">&#xe63d;</i>
                <i v-if="index2 === 6" class="iconfont">&#xe655;</i>
                <i v-if="index2 === 7" class="iconfont">&#xe601;</i>
                <i v-if="index2 === 8" class="iconfont">&#xe749;</i>
                <i v-if="index2 === 9" class="iconfont">&#xe614;</i>
                <i v-if="index2 === 10" class="iconfont">&#xe73c;</i>
                <i v-if="index2 === 11" class="iconfont">&#xe72a;</i>
                <i v-if="index2 === 12" class="iconfont">&#xe630;</i>
                <i v-if="index2 === 13" class="iconfont">&#xe604;</i>
                <i v-if="index2 === 14" class="iconfont">&#xe602;</i>
                <i v-if="index2 === 15" class="iconfont">&#xe63d;</i>
                <p>{{item2.label}}</p>
              </td>
            </div>
          </tr>
        </table>
      </div>
    </div>

  </div>
</template>
<script>

import HeaderNav from '@/components/HeaderNav'
import { Popup } from 'mint-ui'
import axios from 'axios'
export default {
  name: 'Course',
  data () {
    return {
      height: window.innerHeight,
      userID: this.$store.state.userID,
      userType: this.$store.state.userType,
      leftTree: [],
      changeClass: 0,
      urlSrc: '新能源汽车/',
      secondData: [],
      forthData: []
    }
  },
  computed: {
  },
  mounted () {
    //    获取左边数据
    this.getLeftData()
  },
  methods: {
    jumpCourseDetail (item) {
      if (this.changeClass === 0) {
      } else {
        console.log(item)
//        this.$router.push('/exerciseDetailTwo')
//        this.$store.commit('exerciseData', item)
      }
//      this.$store.commit('courseDetail', item)
//      this.$store.commit('urlSrc', this.urlSrc)
    },
    //    点击课程，新能源弹框，其他跳转
    clickCourse (agoItem, item) {
      console.log(agoItem, item)
//      this.$router.push('/exerciseDetail')
//      this.$store.commit('exerciseData', item)
    },
    //    获取左边数据
    getLeftData () {
      axios.post('/teacherCMS/getCenterTree', {
        data: {
          userID: this.userID
        }
      }).then((res) => {
        console.log(res.data[0].children[4].children)
        var resData = res.data[0].children[4].children
        for (var i = 0; i < resData.length - 1; i++) {
          this.leftTree.push(resData[i])
        }
        this.secondData = this.leftTree[0].children
        //        console.log(this.leftTree)
      })
    },
    //    点击左侧列表
    changeItem (item, index) {
      this.urlSrc = item.label + '/'
      //      console.log(this.urlSrc)
      this.changeClass = index
      this.secondData = this.leftTree[index].children
      //      console.log(this.secondData)
    }
  },
  components: {
    HeaderNav,
    Popup
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
  .CompetitionIndex .rightCon .rightTr{
    margin-bottom: 0.8rem;
    display:block
  }
  .CompetitionIndex .rightCon .allTd{
    background: #fff;
    padding: 0.3rem;
    box-sizing: border-box;
  }
  .CompetitionIndex .rightCon .rightTd{
    display: inline-block;
    width: 27%;
    margin-left: 5%;
    height: 1.8rem;
    text-align: center;
    margin-bottom: 12px;
    border-radius: 5px;
    vertical-align: top;
  }
  .leftItem{
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
  .CompetitionIndex .rightCon .rightTr b{
    font-weight:bolder;
    display: block;
    margin-bottom:5px;
  }
  .CompetitionIndex .rightCon .rightTr p{
    margin-top:8px;
    font-size: 0.24rem;
  }
  .CompetitionIndex .iconfont {
    font-size: 34px;
  }
  .CompetitionIndex .mint-popup{
    width: 78%;
  }
  .CompetitionIndex .rightCon .mint-button{
    width: 100%;
    background-color: rgb(237,237,237);
  }
  .CompetitionIndex .rightCon .modelFont{
    font-size:17px;
    margin: 25px;
  }
</style>

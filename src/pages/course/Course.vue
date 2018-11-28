<template>
  <div class="course">
    <!--header--><!--nav-->
    <Header-nav></Header-nav>
    <div class="courseContent">
      <ul class="leftTree">
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
          <tr class="rightTr" @click="jump2(item)" v-for="(item,index) in secondData" :key="index">
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
        <mt-popup
          v-model="popupVisible"
          :closeOnClickModal=false
          popup-transition="popup-fade">
          <template>
            <p class="modelFont" v-for="(item,index) in forthData"
               :key="index"
               @click="jumpCourseDetail(item)" >{{item.label}}</p>
            <mt-button @click="popupVisible = false">取消</mt-button>
          </template>
        </mt-popup>
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
      forthData: [],
      popupVisible: false
    }
  },
  computed: {
  },
  mounted () {
    //    获取左边数据
    this.getLeftData()
  },
  methods: {
    jump2 (item) {
      if (this.changeClass === 4 || this.changeClass === 5) {
        this.urlSrc = this.urlSrc + item.label + '/'
        this.$store.commit('courseDetail', item)
        this.$store.commit('urlSrc', this.urlSrc)
        this.$router.push('/courseDetail')
      } else {
      }
    },
    jumpCourseDetail (item) {
      if (this.changeClass === 0) {
        this.urlSrc = this.urlSrc + item.label + '/'
      } else {
      }
      this.$store.commit('courseDetail', item)
      this.$store.commit('urlSrc', this.urlSrc)
      this.$router.push('/courseDetail')
    },
    //    点击课程，新能源弹框，其他跳转
    clickCourse (agoItem, item) {
      this.urlSrc = this.urlSrc + agoItem.label + '/'
      this.forthData = []
      if (this.changeClass === 0) {
        this.urlSrc = this.urlSrc + item.label + '/'
        for (var i = 0; i < item.children.length; i++) {
        //          console.log(item.children[i])
          this.forthData.push(item.children[i])
        }
        this.popupVisible = true
      } else {
        //        console.log(item)
        this.urlSrc = this.urlSrc + item.label + '/'
        this.jumpCourseDetail(item)
      }
    },
    //    获取左边数据
    getLeftData () {
      axios.post('/teacherCMS/getCenterTree', {
        data: {
          userID: this.userID,
          userType: this.userType
        }
      }).then((res) => {
        var resData = res.data[0].children[0].children
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
  .course .leftTree{
    width:21%;
    text-align:center;
    background:rgb(255,255,255);
  }
  .course .courseContent{
    display:flex;
    background:rgb(240,240,240);
  }
  .course .rightCon{
    width:79%;
    padding: 0.2rem;
    box-sizing: border-box;
    overflow: auto;
    border-top:1px solid rgb(122,18,19);
  }
  .course .rightCon .rightTr{
    margin-bottom: 0.8rem;
    display:block
  }
  .course .rightCon .allTd{
    background: #fff;
    padding: 0.3rem;
    box-sizing: border-box;
  }
  .course .rightCon .rightTd{
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
  .course .changeBg{
    background:rgb(240,240,240);
    border-left:1px solid rgb(122,18,19);
    border-top:1px solid rgb(122,18,19);
    border-bottom:1px solid rgb(122,18,19);
    border-right:1px solid rgb(240,240,240);
    color:rgb(122,18,19);
  }
  .course .rightCon .rightTr b{
    font-weight:bolder;
    display: block;
    margin-bottom:5px;
  }
  .course .rightCon .rightTr p{
    margin-top:8px;
    font-size: 0.24rem;
  }
  .course .iconfont {
    font-size: 34px;
  }
  .course .mint-popup{
    width: 78%;
  }
  .course .rightCon .mint-button{
    width: 100%;
    background-color: rgb(237,237,237);
  }
  .course .rightCon .modelFont{
    font-size:17px;
    margin: 25px;
  }
</style>

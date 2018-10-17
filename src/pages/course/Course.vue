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
          <tr class="rightTr" v-for="(item,index) in secondData" :key="index">
            <b>{{item.label}}</b>
            <td class="rightTd" @click="clickCourse(item,item2)" v-for="(item2,index2) in item.children" :key="index2">
              <i class="iconfont">&#xe8cb;</i>
              <p>{{item2.label}}</p>
            </td>
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
    this.getLeftData()
  },
  methods: {
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
    background:rgb(237,237,237);
    width:25%;
    text-align:center;
  }
  .course .courseContent{
    display:flex;
  }
  .course .rightCon{
    width:75%;
    margin: 10px;
    overflow: auto;
  }
  .course .rightCon .rightTd{
    display:inline-block;
    width:29%;
    margin-left:3%;
    height: 1.8rem;
    text-align:center;
    margin-bottom:20px;
  }
  .course .changeBg{
    background:#fff;
    border-left:3px solid rgb(122,18,19);
  }
  .course .rightCon .rightTr b{
    font-weight:bolder;
    display: block;
    margin-bottom:20px;
  }
  .course .rightCon .rightTr p{
    margin-top:8px;
  }
  .course .iconfont {
    font-size: 46px;
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

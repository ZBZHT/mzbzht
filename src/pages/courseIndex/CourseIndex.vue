<template>
  <div class="courseIndex">
    <!--header-->
    <Header-nav></Header-nav>
    <!--nav-->

    <!--context-->
    <div class="bestCourse">
      <i class="iconfont iconfontBest">&#xe61f;</i>
      <span>精品课程</span>
      <ul class="best">
        <li class="bestLine" v-for="(item, index) in bestClassData2" :key="index">{{item.label}}</li>
      </ul>
      <!--<ul class="best1">-->
        <!--<li class="bestCol" v-for="(item, index) in bestClassData3" :key="index">-->
          <!--<div class="bestTitle">-->
            <!--<p class="bestTitleMain">{{item.label}}</p>-->
            <!--<p class="bestDesc">{{item.describe}}</p>-->
          <!--</div>-->
        <!--</li>-->
      <!--</ul>-->
      <mt-cell class="best1" :title=item.label  v-for="(item, index) in bestClassData2" :key="index">
        <p class="bestDesc">{{item.describe}}</p>
        <img class="bestCell" slot="icon" src="../../../src/assets/imgs/course.png" width="110" height="70">
      </mt-cell>
    </div>
    <div class="suggeCourse">
      <i class="iconfont iconfontSugge">&#xe77c;</i>
      <span>实战推荐</span>
      <span class="moreCourse">更多>></span>
      <ul class="best">
        <li class="bestLine" v-for="item in 2">{{item}}</li>
      </ul>
      <mt-cell class="best1" :title=item.label  v-for="(item, index) in bestClassData2" :key="index">
        <p class="bestDesc">{{item.describe}}</p>
        <img class="bestCell" slot="icon" src="../../../src/assets/imgs/course.png" width="110" height="70">
      </mt-cell>
    </div>
  </div>
</template>
<script>

import { TabItem, Cell } from 'mint-ui'
import HeaderNav from '@/components/HeaderNav'
import axios from 'axios'

export default {
  name: 'CourseIndex',
  data () {
    return {
      userType: this.$store.state.userType,
      bestClassData2: [],
      bestClassData3: []
    }
  },
  computed: {
  },
  mounted () {
    // 获取精品课程
    axios.post('/teacherCMS/getBestCourse', {
      data: {
        userType: this.userType
      }
    }).then((res) => {
      // console.log(res.data)
      this.bestClassData = res.data.result[0].bestCourse
      this.bestClassData2 = []
      this.bestClassData3 = []
      for (var i = 0; i < this.bestClassData.length; i++) {
        if (i <= 1) {
          this.bestClassData2.push(this.bestClassData[i])
        } else {
          this.bestClassData3.push(this.bestClassData[i])
        }
      }
      this.pageData = res.data.result[0].suggCourse
    })
  },
  methods: {
  },
  beforeDestroy: function () {
  },
  components: {
    HeaderNav,
    TabItem,
    Cell
  }
}
</script>
<style>
  .courseIndex .mint-navbar{
    margin-top:17px;
    height:2rem;
    margin-bottom:15px;
  }
  .courseIndex .mint-tab-item-label .navImg{
    height:1rem;
    margin:10px;
  }
  .courseIndex .mint-navbar .mint-tab-item{
    padding:0;
  }
  .courseIndex .mint-navbar .mint-tab-item.is-selected{
    border-bottom: 3px solid rgb(122,18,19);
    color:rgb(122,18,19)
  }
  .courseIndex .mint-tab-item-label{
    color:#000;
    font-size:0.29rem ;
  }
  .courseIndex .bestCourse{
    background: rgb(245,245,245);
    padding:0.2rem;
    box-sizing: border-box;
  }
  .courseIndex .best{
    display: flex;
    margin-top:10px;
  }
  .courseIndex .bestLine{
    width:45%;
    height:2rem;
    margin:6px;
    background: url("../../../src/assets/imgs/course.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 5px;
    box-shadow: 0 0 12px rgb(130,150,170);
    padding: 10px;
    box-sizing: border-box;
    font-size: 0.34rem;
    font-weight: bolder;
    padding-top: 37px;
    text-align: center;
  }
  .courseIndex .best1{
    margin-top:10px;
  }
  .courseIndex .mint-cell-wrapper{
    padding:0;
    margin-left:6px;
  }
  .courseIndex .bestCol{
    margin:6px;
    width:30%;
    height:1.5rem;
    position: relative;
    background: url("../../../src/assets/imgs/course.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 5px;
  }
  .courseIndex .bestCell{
    border-radius: 5px;
  }
  .courseIndex .mint-cell-text{
    vertical-align: top;
    margin-left: 5px;
  }
  .courseIndex .bestDesc{
    /*color:rgb(50,50,50);*/
    /*margin-top: 8px;*/
    width:60%;
    position:absolute;
    top: 0.45rem;
    right: 0.25rem;
    font-size: 0.28rem;
  }
  .courseIndex .suggeCourse{
    padding:0.2rem;
    box-sizing: border-box;
  }
  .courseIndex .iconfontBest{
    margin-right:2px;
    margin-left:2px;
    color:rgb(130,150,170);
  }
  .courseIndex .iconfontSugge{
    margin-right:2px;
    margin-left:2px;
    color:rgb(250,0,0);
  }
  .courseIndex .moreCourse{
    text-align: right;
    display: block;
    margin-top: -15px;
  }
</style>

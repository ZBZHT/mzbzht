<template>
  <div class="moreCourse">
    <Header-nav></Header-nav>
    <div class="content" :style="{'height': height - 41 + 'px'}">
      <p class="goBack" @click="goBack">
        <go-back></go-back>
      </p>
      <div class="suggest" v-for="(item, index) in pageData" :key="index">
        <img v-if="index == 0" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bestclass16.png" width="110" height="70">
        <img v-if="index == 1" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bottomLeft1.png" width="110" height="70">
        <img v-if="index == 2" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bottomLeft2.png" width="110" height="70">
        <img v-if="index == 3" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bottomLeft3.png" width="110" height="70">
        <img v-if="index == 4" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bottomMiddle1.png" width="110" height="70">
        <img v-if="index == 5" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bottomMiddle2.png" width="110" height="70">
        <img v-if="index == 6" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bottomMiddle3.png" width="110" height="70">
        <img v-if="index == 7" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bottomMiddle4.png" width="110" height="70">
        <img v-if="index == 8" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bottomMiddle5.png" width="110" height="70">
        <img v-if="index == 9" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bottomMiddle6.png" width="110" height="70">
        <img v-if="index == 10" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bottomMiddle7.png" width="110" height="70">
        <img v-if="index == 11" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bottomMiddle8.png" width="110" height="70">
        <img v-if="index == 12" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bestclass3.png" width="110" height="70">
        <img v-if="index == 13" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bestclass4.png" width="110" height="70">
        <img v-if="index == 14" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bestclass5.png" width="110" height="70">
        <img v-if="index == 15" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bestclass10.png" width="110" height="70">
        <img v-if="index == 16" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bestclass11.png" width="110" height="70">
        <img v-if="index == 17" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bestclass12.png" width="110" height="70">
        <img v-if="index == 18" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bestclass13.png" width="110" height="70">
        <img v-if="index == 19" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bestclass14.png" width="110" height="70">
        <img v-if="index == 20" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bestclass15.png" width="110" height="70">
        <img v-if="index == 21" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bestclass16.png" width="110" height="70">
        <img v-if="index == 22" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/course.png" width="110" height="70">
        <img v-if="index == 23" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bestclass4.png" width="110" height="70">
        <img v-if="index == 24" @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/bestclass3.png" width="110" height="70">
        <div class="sDesc">
          <p @click="jumpCourseDetail(item)" class="sDescT">{{item.label}}</p>
          <p @click="jumpCourseDetail(item)" class="sDescD">{{item.describe}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import HeaderNav from '@/components/HeaderNav'
import core from '../../assets/js/core.js'
import goBack from '@/components/goBack'

export default {
  name: 'Myself',
  data () {
    return {
      height: window.innerHeight,
      userID: this.$store.state.userID,
      username: this.$store.state.username,
      userType: this.$store.state.userType,
      userT: core.userType(this.$store.state.userType),
      pageData: ''
    }
  },
  mounted () {
    // 获取精品课程
    axios.post('/teacherCMS/getBestCourse', {
      data: {
        userType: this.userType
      }
    }).then((res) => {
      this.pageData = res.data.result[0].suggCourse
    })
  },
  methods: {
    //    跳转至课程详情页
    jumpCourseDetail (item) {
      this.$store.commit('courseDetail', item)
      //      this.$store.commit('urlSrc', this.urlSrc)
      this.$router.push('/courseDetail')
    },
    //    返回上一级
    goBack () {
      this.$router.go(-1)
    }
  },
  components: {
    HeaderNav,
    goBack
  }
}
</script>
<style lang="less" scoped>
.moreCourse{
  .content{
    padding-top:0.2rem;
    padding-left: 0.2rem;
    box-sizing: border-box;
    .suggest{
      margin-top:10px;
      display: flex;
      padding: 0.1rem;
      box-sizing: border-box;
    }
    .Simg{
      border-radius: 5px;
      width:30%;
    }
    .sDesc{
      margin-left: 0.2rem;
    }
    .sDescT{
      font-size: 0.32rem;
      margin-bottom: 0.1rem;
    }
    .sDescD{
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      color: #aaa;
    }
  }
}
</style>

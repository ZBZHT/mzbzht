<template>
  <div class="moreCourse">
    <Header-nav></Header-nav>
    <div class="content" :style="{'height': height - 41 + 'px'}">
      <p class="goBack" @click="goBack">
        <<返回
      </p>
      <div class="suggest" v-for="(item, index) in pageData" :key="index">
        <img @click="jumpCourseDetail(item)" class="Simg" src="../../../src/assets/imgs/course.png" width="110" height="70">
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
    HeaderNav
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
      height: 0.84rem;
      color: #aaa;
    }
  }
}
</style>

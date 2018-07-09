<template>
  <div class="sign">
    <section class="user-info">
      <div class="name">{{name}}</div>
      <div class="grade">{{grade}}</div>
    </section>
    <section class="course-info">
      <div class="course">{{course}}</div>
    </section>
    <section class="sign-btn">
      <button class="btn" @click="stuSignIn()">请点击签到</button>
      <button class="nobtn">请点击签到</button>
    </section>
    <section class="sign-p">
      <p @click="backHome()">回到首页</p>
    </section>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Sign',
  data () {
    return {
      name: this.$store.state.username,
      grade: '一年级二班',
      course: '',
      stuCourse: ''
    }
  },
  mounted () {
    axios.post('/teacherCMS/getAllStuClass', {
      data: {
        stuCourse: ''
      }
    }).then((res) => {
      console.log(res.data.result)
      this.course = res.data.result.courseName
      this.stuCourse = res.data.result
    })
  },
  methods: {
    stuSignIn () {
      axios.post('/teacherCMS/stuSignIn', {
        data: {
          stuCourse: this.stuCourse
        }
      }).then((res) => {
        // console.log(res.data.result);
        if (res.data.code === 0) {
          this.addSuccess('已签到')
        }
      })
    },
    backHome () {

    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/variables.styl"
  .sign
    padding-top 1rem
  .user-info
    display flex
    justify-content center
    .name
      margin-right .5rem
  .course-info
    margin-top .5rem
    display flex
    justify-content center
  .sign-btn
    margin-top .5rem
    justify-content center
    text-align center
    .btn
      width: 50%
      height .5rem
      background-color $bgColor
  .sign-p{
    text-align:right;
    margin-right:20px;
    margin-top:30px;
  }
  .sign-btn .nobtn{
    width: 50%
    height: 0.5rem;
    background-color: #aaa;
  }
</style>

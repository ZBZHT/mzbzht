<template>
  <div class="idCard">
    <div v-if="haveCourse===false">
      <p style="text-align: center;margin-top: 50px;">暂无课程</p>
    </div>
    <div v-if="haveCourse===true">
      <section class="courseName-info">
        <p class="courseName">{{stuCourse.courseName}}</p>
      </section>
      <section class="course-info">
        <p class="teacherTN" v-show="stuCourse.teacher">上课时间:{{stuCourse.date}}</p>
        <p class="teacherTN" v-show="stuCourse.teacher">任课教师:{{stuCourse.teacher}}</p>
      </section>
      <section class="sign-btn">
        <button class="btn"
                v-if="showBut === true && showReadlyBut === true"
                @click="centerDialogVisible = true,stuSignIn()">签到</button>
        <div v-if="showReadlyBut === false">
          <button class="nobtn" @click="stuSignIn()">已签到</button>
        </div>
        <!--<p>注：请在课前30分钟内签到</p>-->
        <button class="nobtn" v-if="showBut === false && showReadlyBut === true">请在课前30分钟内签到</button>

      </section>
      <!--<section class="sign-p">-->
        <!--<button @click="backHome()" v-if="showBut === false">跳转至系统首页</button>-->
      <!--</section>-->
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'Myself',
  data () {
    return {
      name: this.$store.state.username,
      course: '',
      stuCourse: '',
      centerDialogVisible: false,
      showBut: true,
      showReadlyBut: true,
      haveCourse: false
    }
  },
  mounted () {
    this.getStudentCourseInfo()
  },
  methods: {
    //    获取学生上课及签到信息
    getStudentCourseInfo () {
      axios.post('/teacherCMS/getStuThatDayCourseMsg', {
        data: {
          stuCourse: ''
        }
      }).then((res) => {
        let resCourse = res.data.result
        // console.log(resCourse,'139')
        if (!resCourse) {
          this.haveCourse = false
        } else {
          this.haveCourse = true
          if (res.data.code === 0) {
            let startTime = new Date(moment(resCourse.courseDate + ',' + resCourse.startTime).format('YYYY-MM-DD,HH:mm')).getTime() - 60 * 30 * 1000
            let endTime = new Date(moment(resCourse.courseDate + ',' + resCourse.endTime).format('YYYY-MM-DD,HH:mm')).getTime()
            let newTime = new Date().getTime()
            resCourse.date = resCourse.startTime + '~' + resCourse.endTime
            this.stuCourse = resCourse
            if (startTime <= newTime && newTime < endTime) {
              this.showBut = true
              // console.log(this.showBut)
            } else {
              this.showBut = false
            }
            this.getFirstData()
            // console.log(this.showBut);
          } else if (res.data.code === 1) {
            this.showBut = false
          }
        }
      })
    },
    // 学生签到
    stuSignIn () {
      axios.post('/teacherCMS/stuSignIn', {
        data: {
          stuCourse: this.stuCourse
        }
      }).then((res) => {
        // console.log(res.data.result);
        if (res.data.code === 0) {
          //   this.addSuccess('签到成功')
          this.getFirstData()
        }
      })
    },
    getFirstData () {
      axios.post('/teacherCMS/getSignInMsg', {
        data: {
          stuCourse: this.stuCourse
        }
      }).then((res) => {
        // console.log(res.data.result);
        if (res.data.code === 0) {
          let resState = res.data.result.state
          if (resState === 0 || resState === 1 || resState === 2 || resState === 3) {
            this.showReadlyBut = false
          } else {
            this.showReadlyBut = true
          }
        }
      })
    },
    backHome () {
      this.$router.push('/courseIndex')
    }
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.idCard {
  width: 85%;
  height: 30%;
  background: #fff;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 0.6rem;
  padding: 0.5rem;
  box-sizing: border-box;
  position: relative;
  text-align: center;
  .courseName-info {
    font-size: 0.35rem;
    margin-bottom: 0.2rem;
  }
  .teacherTN {
    font-weight: bold;
    margin-bottom: 0.2rem;
  }
  .btn {
    padding:0.1rem 0.2rem 0.1rem 0.2rem;
    margin-top:0.2rem;
    margin-bottom: 0.2rem;
    background-color: limegreen;
    color:#fff;
    font-weight: bold;
    border-radius:4px;
  }
  .nobtn {
    padding:0.1rem 0.2rem 0.1rem 0.2rem;
    margin-top:0.2rem;
    margin-bottom: 0.2rem;
    background-color: dodgerblue;
    color:#fff;
    font-weight: bold;
    border-radius:4px;
  }
}
</style>

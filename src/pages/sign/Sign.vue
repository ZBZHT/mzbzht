<template>
  <div class="sign">
    <section class="user-info">
      <div class="name">{{name}}</div>
      <p class="time">{{stuCourse.date}}</p>
    </section>
    <section class="course-info">
      <p class="courseName">{{stuCourse.courseName}}</p>
      <p class="teacherName">({{stuCourse.teacher}})</p>
    </section>
    <p style="text-align: center">注：请在课前30分钟内签到</p>
    <section class="sign-btn">
      <el-dialog
        :visible.sync="centerDialogVisible"
        :close-on-click-modal="false"
        :show-close="false"
        width="63%"
        center>
        <span>点击确定将跳转至系统首页</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible = false,backHome()">确 定</el-button>
        </span>
      </el-dialog>
      <button class="btn"
              @click="centerDialogVisible = true,stuSignIn()"
              v-if="showBut === true">请点击签到</button>
      <button class="nobtn" v-else>请在课前30分钟内签到</button>
    </section>
    <section class="sign-p">
      <p @click="backHome()" v-if="showBut === false">跳转至系统首页</p>
    </section>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'Sign',
  data () {
    return {
      name: this.$store.state.username,
      course: '',
      stuCourse: '',
      centerDialogVisible: false,
      showBut: true
    }
  },
  mounted () {
    axios.post('/teacherCMS/getAllStuClass', {
      data: {
        stuCourse: ''
      }
    }).then((res) => {
      console.log(res)
      let resCourse = res.data.result
      if (res.data.code === 0) {
        let startTime = new Date(moment(resCourse.courseDate + ',' + resCourse.startTime).format("YYYY-MM-DD,HH:mm")).getTime();
        let newTime = new Date().getTime() + 60 * 30 * 1000
        resCourse.date = resCourse.startTime + '~' + resCourse.endTime
        this.stuCourse = resCourse
        if (newTime < startTime) {
          this.showBut = false
        } else {
          this.showBut = true
        }
        // console.log(this.showBut);
      }
    })
  },
  methods: {
    // 添加成功后提示信息
    addSuccess (msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'success'
      })
    },
    // 添加失败提示信息
    addDefeat (msg) {
      this.$message.error(msg)
    },
    handleClick (tab, event) {
      console.log(tab, event)
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
          this.addSuccess('签到成功')
        }
      })
    },
    backHome () {
      window.location.href = 'http://192.168.2.251'
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
    margin-bottom .5rem
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
  .sign .el-dialog{
    width:63%;
  }
  .sign .el-dialog--center .el-dialog__body{
    text-align:center;
  }
</style>

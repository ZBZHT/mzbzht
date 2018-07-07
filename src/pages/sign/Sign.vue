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
      <button class="btn">签到</button>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Sign',
  data () {
    return {
      name: '谢晓东',
      grade: '一年级二班',
      course: '新能源电池课程'
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
</style>

<template>
  <div class="signPage">
    <div class="content" :style="{'height': height - 41 + 'px'}">
      <p class="goBack" @click="goBack">
        <go-back></go-back>
      </p>
      <sign-con></sign-con>
    </div>
  </div>
</template>
<script>
import goBack from '@/components/goBack'
import signCon from './SignCon.vue'

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
  },
  methods: {
    //    返回上一级
    goBack () {
      this.$router.go(-1)
    }
  },
  components: {
    goBack,
    signCon
  }
}
</script>
<style lang="less" scoped>
  .signPage {
    .content {
      height: 666px;
      background: rgb(237, 237, 237);
      padding-top: 0.2rem;
      padding-left: 0.2rem;
      box-sizing: border-box;
    }
  }
</style>

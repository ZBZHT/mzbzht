<template>
  <div class="index" :style="{height: height + 'px'}">
    <p class="title">中邦智慧教学系统欢迎您</p>
  </div>
</template>
<script>

export default {
  name: 'Index',
  data () {
    return {
      height: window.innerHeight
    }
  },
  computed: {
  },
  mounted () {
    window.setInterval(function () {
      this.$router.push('/sign')
    }.bind(this), 3000)
  },
  methods: {
    handleResize (event) {
      this.height = window.innerHeight
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
<style>
.index{
  background: linear-gradient(rgb(149,82,84), rgb(124,38,40), rgb(122,18,19));
  padding-top: 50%;
  padding-left: 14%;
  box-sizing: border-box;
}
.index .title{
  font-size: 0.6rem;
  color: #fff;
  width: 82%;
  text-align: center;
}
</style>

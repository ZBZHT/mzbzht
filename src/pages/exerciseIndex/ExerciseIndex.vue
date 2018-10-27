<template>
  <div class="exerciseIndex">
    <!--header--><!--nav-->
    <Header-nav></Header-nav>
    <div class="exerciseContent">
      <ul class="leftTree">
        <li class="leftItem">
          在线练习
        </li>
        <li class="leftItem">
          历史练习
        </li>
      </ul>
      <div class="rightCon">

      </div>
    </div>
  </div>
</template>
<script>

import HeaderNav from '@/components/HeaderNav'

export default {
  name: 'Course',
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  },
  components: {
    HeaderNav
  },
  beforeDestroy: function () {
  }
}
</script>
<style lang="less">
  .exerciseIndex{
    .exerciseContent{
      display:flex;
      border-top:3px solid rgb(122,18,19);
    }
    .leftTree{
      background:rgb(237,237,237);
      width:25%;
      text-align:center;
    }
    .rightCon{
      width:75%;
      padding: 0.2rem;
      box-sizing: border-box;
      overflow: auto;
    }
  }
</style>

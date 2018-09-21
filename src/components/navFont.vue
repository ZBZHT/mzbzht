<template>
  <div class="navFont">
    <mt-navbar v-model="selected">
      <mt-tab-item :id=index v-for="(item, index) in navData" :key="index">
        <div class="navImg"
             @click="changNav(index)">
        </div>
        {{item.label}}
      </mt-tab-item>
    </mt-navbar>

  </div>

</template>
<script>

import { Header } from 'mint-ui'

export default {
  name: 'Header',
  data () {
    return {
      navData: [
        {
          'label': '课程',
          'background': 'courseIndex.png'
        },
        {
          'label': '实训',
          'background': 'exerciseIndex.png'
        },
        {
          'label': '练习',
          'background': 'testIndex.png'
        },
        {
          'label': '资源',
          'background': 'sourceIndex.png'
        },
        {
          'label': '大赛',
          'background': 'competitionIndex.png'
        }
      ],
      selected: ''
    }
  },
  components: {
    Header
  },
  mounted () {
  },
  methods: {
    changNav (index) {
      console.log(index)
      if (index === 0) {
        this.$router.push('/Course')
      } else if (index === 1) {
        console.log('11')
      }
    }
  },
  beforeDestroy: function () {
  }
}
</script>
<style>
  .mint-header{
    background-color: inherit;
    color:#000;
    box-shadow: 0 3px 5px #ccc;
  }
  .mint-header img{
    width:3rem;
  }
  .heaerNav .mint-tab-item-label{
    color:#000;
    font-size:0.29rem ;
  }
  .heaerNav .mint-navbar .mint-tab-item.is-selected{
    border-bottom: 3px solid rgb(122,18,19);
    color:rgb(122,18,19)
  }
</style>

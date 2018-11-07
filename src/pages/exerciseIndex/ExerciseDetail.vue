<template>
  <div class="ExerciseDetail">
    <!--header--><!--nav-->
    <Header-nav></Header-nav>
    <div>
      <p class="detailTitle">

      </p>
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">简介</mt-tab-item>
        <mt-tab-item id="2">微课</mt-tab-item>
        <mt-tab-item id="3">课件</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected" class="courseContainer">
        <mt-tab-container-item id="1">
          <div class="exerEngImg" v-for="(item,index) in exerEngImg" :key="index">
            <img :src=" 'http://'+ $store.state.serverIP +':8000' + '/resource/imgs/' + item.engImage">
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">

        </mt-tab-container-item>

        <mt-tab-container-item id="3">

        </mt-tab-container-item>

      </mt-tab-container>
    </div>
  </div>
</template>
<script>

import HeaderNav from '@/components/HeaderNav'
import { Navbar } from 'mint-ui'
import { Rater, XButton } from 'vux'
import axios from 'axios'
import core from '../../assets/js/core.js'
// import core from '../assets/js/core.js'
export default {
  name: 'ExerciseDetail',
  data () {
    return {
      userType: this.$store.state.userType,
      userName: this.$store.state.username,
      height: window.innerHeight,
      selected: '1'
    }
  },
  computed: {
    exerEngImg () {
      return this.$store.state.exerciseData.engImg
    },
    exerEngRule () {
      return this.$store.state.exerciseData.engRule
    },
    exerLabel () {
      return this.$store.state.exerciseData.label
    }
  },
  mounted () {

  },
  methods: {

  },
  components: {
    HeaderNav,
    Navbar,
    Rater,
    XButton
  },
  beforeDestroy: function () {
  }
}
</script>
<style lang="less">
  .ExerciseDetail{
    .detailTitle{
      text-align:center;
      font-size: 0.4rem;
      margin-top:20px;
      margin-bottom:20px;
    }
    .mint-tab-item-label{
      color:#000;
      font-size:0.29rem ;
    }
    .mint-navbar .mint-tab-item.is-selected{
      border-bottom: 3px solid rgb(122,18,19);
      color:rgb(122,18,19)
    }
    .courseContainer{
      padding:15px;
      box-sizing: border-box;
      padding-bottom: 35px;
      img{
        width:100%;
      }
    }
  }
</style>

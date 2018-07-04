<template>
  <div>
    <div class="title">热销推荐</div>
    <ul>
      <li
        class="item border-bottom"
        v-for="item of list"
        :key="item.id"
      >
        <img class="item-img" :src="item.imgUrl" />
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-desc">{{item.desc}}</p>
          <button class="item-button">查看详情</button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'HomeRecommend',
  props: {
    list: Array
  },
  data () {
    return {
      recommendList: [
        {
          id: '0001',
          imgUrl: 'http://img1.qunarzz.com/sight/p0/1707/55/55264df7e02bc409a3.water.jpg_200x200_fef9e1c3.jpg',
          title: '南京欢乐水魔方',
          desc: '南京欢乐水魔方描述'
        },
        {
          id: '0002',
          imgUrl: 'http://img1.qunarzz.com/sight/p0/1707/55/55264df7e02bc409a3.water.jpg_200x200_fef9e1c3.jpg',
          title: '南京欢乐水魔方',
          desc: '南京欢乐水魔方描述'
        },
        {
          id: '0003',
          imgUrl: 'http://img1.qunarzz.com/sight/p0/1707/55/55264df7e02bc409a3.water.jpg_200x200_fef9e1c3.jpg',
          title: '南京欢乐水魔方',
          desc: '南京欢乐水魔方描述'
        }
      ]
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .title
    margin-top: .2rem
    line-height .8rem
    background-color #eee
    text-indent .2rem
  .item
    display flex
    overflow hidden
    height 1.9rem
    .item-img
      width 1.7rem
      height 1.7rem
      padding .1rem
    .item-info
      flex 1
      min-width 0
      padding: .1rem
      .item-title
        line-height .54rem
        font-size .32rem
        ellipsis()
      .item-desc
        line-height .4rem
        color #ccc
        ellipsis()
      .item-button
        margin-top .16rem
        background-color #ff9300
        line-height .44rem
        padding 0 .2rem
        border-radius .06rem
        color #ffffff
</style>

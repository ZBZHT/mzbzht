<template>
  <div class="sourceIndex">
    <!--header--><!--nav-->
    <Header-nav></Header-nav>
    <div class="textContent">
      <ul class="leftTree" :style="{'height': height - 91 + 'px'}">
        <li class="leftItem"
            v-for="(item, index) in leftTree"
            @click="changeItem(item,index)"
            :class="{'changeBg':changeClass === index}"
            :key="index">
          {{item}}
        </li>
      </ul>
      <div class="rightCon">
        <div v-show="showLi === 0">
          <ul>
            <li class="cellLi"
                @click="showCellBox(index)"
                v-for="(item,index) in msgArrLittle"
                :key="index">
              <p class="cellP">
                <span class="cellTitle">{{item.fileName}}</span>
                <span class="cellSpan">></span>
              </p>
              <div class="cellBox"
                   @click="showCellBox(index)"
                   v-show="showCell === index">
                <p class="cellBoxP">上传时间：{{item.birthTime}}</p>
                <p class="cellBoxP">上传者：{{item.personName}}</p>
                <p class="cellBoxP">文件大小：{{item.size}}</p>
                <button class="downBut" @click="sendName(item.fileName)">下载</button>
                <button class="downBut"
                        @click="fileDelete(index,msgArrLittle,item)"
                        v-show="$store.state.username == item.personName">删除</button>
              </div>
            </li>
          </ul>
        </div>
        <div v-show="showLi === 1">
          <ul>
            <li class="cellLi"
                @click="showCellBox(index)"
                v-for="(item,index) in courseWareArr"
                :key="index">
              <p class="cellP">
                <span class="cellTitle">{{item.fileName}}</span>
                <span class="cellSpan">></span>
              </p>
              <div class="cellBox"
                   @click="showCellBox(index)"
                   v-show="showCell === index">
                <p class="cellBoxP">上传时间：{{item.birthTime}}</p>
                <p class="cellBoxP">上传者：{{item.personName}}</p>
                <p class="cellBoxP">文件大小：{{item.size}}</p>
                <button class="downBut" @click="sendName(item.fileName)">下载</button>
                <button class="downBut"
                        @click="fileDelete(index,courseWareArr,item)"
                        v-show="$store.state.username == item.personName">删除</button>
              </div>
            </li>
          </ul>
        </div>
        <div v-show="showLi === 2">
          <ul>
            <li class="cellLi"
                @click="showCellBox(index)"
                v-for="(item,index) in videoArr"
                :key="index">
              <p class="cellP">
                <span class="cellTitle">{{item.fileName}}</span>
                <span class="cellSpan">></span>
              </p>
              <div class="cellBox"
                   @click="showCellBox(index)"
                   v-show="showCell === index">
                <p class="cellBoxP">上传时间：{{item.birthTime}}</p>
                <p class="cellBoxP">上传者：{{item.personName}}</p>
                <p class="cellBoxP">文件大小：{{item.size}}</p>
                <button class="downBut" @click="sendName(item.fileName)">下载</button>
                <button class="downBut"
                        @click="fileDelete(index,videoArr,item)"
                        v-show="$store.state.username == item.personName">删除</button>
              </div>
            </li>
          </ul>
        </div>
        <div v-show="showLi === 3">
          <ul>
            <li class="cellLi"
                @click="showCellBox(index)"
                v-for="(item,index) in otherArr"
                :key="index">
              <p class="cellP">
                <span class="cellTitle">{{item.fileName}}</span>
                <span class="cellSpan">></span>
              </p>
              <div class="cellBox"
                   @click="showCellBox(index)"
                   v-show="showCell === index">
                <p class="cellBoxP">上传时间：{{item.birthTime}}</p>
                <p class="cellBoxP">上传者：{{item.personName}}</p>
                <p class="cellBoxP">文件大小：{{item.size}}</p>
                <button class="downBut" @click="sendName(item.fileName)">下载</button>
                <button class="downBut"
                        @click="fileDelete(index,otherArr,item)"
                        v-show="$store.state.username == item.personName">删除</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import HeaderNav from '@/components/HeaderNav'
import axios from 'axios'
import { MessageBox } from 'mint-ui'

export default {
  name: 'Course',
  data () {
    return {
      height: window.innerHeight,
      showLi: 0,
      leftTree: ['全部教程', '教学课件', '教学微课', '其他教材'],
      changeClass: 0,
      msgArr: [],
      msgArrLittle: [],
      courseWareArr: [],
      videoArr: [],
      otherArr: [],
      showCell: ''
    }
  },
  computed: {
  },
  mounted () {
    this.loadFile()
  },
  methods: {
    // 删除文件
    fileDelete (index, rows, row) {
      if (row.personName === this.$store.state.username) {
        MessageBox.confirm('', {
          message: '确定要删除吗？',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action === 'confirm') { // 确认的回调
            rows.splice(index, 1)
            // console.log(row);
            axios({
              method: 'get',
              url: '/fileUpDown/fileDelete',
              params: {
                delData: row
              }
            }).then((res) => { // 处理返回的文件流
              let resFileName = res.data.fileName
              dellArrE(this.msgArr, resFileName)
              dellArrE(this.courseWareArr, resFileName)
              dellArrE(this.videoArr, resFileName)
              dellArrE(this.otherArr, resFileName)

              function dellArrE (arr, resFileName) {
                if (resFileName) {
                  for (let i = 0; i < arr.length; i++) {
                    if (arr[i].name === resFileName) {
                      arr.splice(i, 1)
                    }
                  }
                }
              }
              this.msgArr = []
              this.loadFile()
            })
          }
        }).catch(err => {
          if (err === 'cancel') { // 取消的回调
          }
        })
      } else {
        this.DefeatMsg('只能删除自己上传的文件哦！')
      }
    },
    //    下载
    sendName (item) {
      console.log(item)
      axios({
        method: 'get',
        url: '/fileUpDown/download',
        responseType: 'blob',
        params: {
          downloadName: item
        }
      }).then((res) => { // 处理返回的文件流
        let content = res.data
        console.log(res.data)
        //        移动端下载
        let blob = new Blob([content])
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = item
        link.click()
        window.URL.revokeObjectURL(link.href)
      })
    },
    //    获取数据
    loadFile () {
      axios.get('/fileUpDown/loadFile', {
        params: {
          user: 6666
        }
      }).then((res) => {
        for (let i = 0; i < res.data.result.length; i++) {
          this.msgArr.push(res.data.result[i])
        }
        this.msgArrLittle = []
        this.courseWareArr = []
        this.videoArr = []
        this.otherArr = []
        for (let j = 0; j < res.data.result.length; j++) {
          if (this.msgArr[j].fileType === 1) {
            this.msgArrLittle.push(this.msgArr[j])
          } else if (this.msgArr[j].fileType === 2) {
            console.log(this.msgArr[j])
            this.courseWareArr.push(this.msgArr[j])
          } else if (this.msgArr[j].fileType === 3) {
            this.videoArr.push(this.msgArr[j])
          } else if (this.msgArr[j].fileType === 4) {
            this.otherArr.push(this.msgArr[j])
          }
        }
        console.log(this.msgArr)
        console.log(this.msgArrLittle)
        console.log(this.courseWareArr)
        console.log(this.videoArr)
        console.log(this.otherArr)
      })
    },
    //    点击显示每条详细信息
    showCellBox (index) {
      if (this.showCell === index) {
        this.showCell = ''
      } else {
        this.showCell = index
      }
    },
    //    点击左侧列表
    changeItem (item, index) {
      this.showCell = ''
      this.changeClass = index
      if (index === 0) {
        this.showLi = 0
      } else if (index === 1) {
        this.showLi = 1
      } else if (index === 2) {
        this.showLi = 2
      } else if (index === 3) {
        this.showLi = 3
      }
    }
  },
  components: {
    HeaderNav,
    MessageBox
  },
  beforeDestroy: function () {
  }
}
</script>
<style lang="less">
  .sourceIndex{
    .textContent{
      display:flex;
    }
    .leftTree{
      background:rgb(237,237,237);
      width:21%;
      text-align:center;
    }
    .leftItem{
      line-height:1.5rem;
      border-right:1px solid rgb(122,18,19);
    }
    .changeBg{
      background:#fff;
      border-left:1px solid rgb(122,18,19);
      border-top:1px solid rgb(122,18,19);
      border-bottom:1px solid rgb(122,18,19);
      border-right:1px solid #fff;
      color:rgb(122,18,19);
    }
    .rightCon{
      width:75%;
      padding: 0.2rem;
      box-sizing: border-box;
      overflow: auto;
      border-top:1px solid rgb(122,18,19);
      .cellLi{
        position: relative;
        margin-bottom:0.2rem;
        border-top: 1px solid rgb(220,220,220);
      }
      li:last-child
      {
        border-bottom: 1px solid rgb(220,220,220);
        padding-bottom: 0.1rem;
        box-sizing: border-box;
      }
      .cellP{

      }
      .cellTitle{
        display: inline-block;
        width:90%;
        line-height:0.4rem;
        height:0.4rem;
      }
      .cellSpan{
        position:absolute;
        right:0;
        line-height:0.4rem;
      }
      .cellBox{
        background: rgb(237,237,237);
        padding:0.15rem;
        box-sizing: border-box;
      }
      .cellBoxP{
        font-size: 0.24rem;
        margin-bottom:0.1rem;
      }
      .downBut{
        background: #fff;
        margin-right:0.4rem;
      }
    }
  }
</style>

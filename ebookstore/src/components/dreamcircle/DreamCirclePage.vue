<template>
  <scroller class="wrapper scroller" show-scrollbar="false" @viewappear="viewWillAppear()" @viewdisappear="viewWillDisappear()">
    <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
      <text class="indicator-text">Refreshing ...</text>
      <loading-indicator class="indicator"></loading-indicator>
    </refresh>
    <div v-bind:key="mIdx" v-for="(model, mIdx) in dataArray" class="item">
      <div class="userInfo row">
        <image class="userImage" :src="model.userLogo"></image>
        <div class="simpleInfo">
          <div class="row">
            <text class="userName">{{model.userName}}</text>
          </div>
          <text class="publishTime">{{formatDate(model.createTime)}}</text>
        </div>
      </div>
      <div class="contentC">
        <text class="userContent">{{model.contentWord}}</text>
        <div class="conentImageC" v-if="model.contentPicArray && model.contentPicArray.length > 0">
          <scroller class="contentImageScroller" scroll-direction="horizontal" show-scrollbar="false">
            <div class="imgCell" v-bind:key="cIdx" v-for="(contentImage, cIdx) in model.contentPicArray">
              <image class="contentImage" :src="contentImage" resize="cover"></image>
            </div>
          </scroller>
          <!-- <waterfall class="waterfall" column-count="3" column-width="200px" show-scrollbar="false" scroll-direction="horizontal">
            <cell class="cell" v-for="contentImage in model.contentPicArray">
              <image class="contentImage" :src="contentImage"></image>
            </cell>
          </waterfall> -->
        </div>
        <div class="bookContent" v-if="model.content">
          <image class="bookCover" :src="model.content.cover" resize="cover"></image>
          <text class="bookName">{{model.content.name}}</text>
        </div>
      </div>
      <div class="bottomLine"></div>
      <!-- <text>{{JSON.stringify(model)}}</text> -->
    </div>
    <loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
      <text class="indicator-text">Loading ...</text>
      <loading-indicator class="indicator"></loading-indicator>
    </loading>
    <wxc-loading :show="isLoadingShow"
                 :type="loadingType"></wxc-loading>
  </scroller>
</template>

<script>
import { WxcLoading } from 'weex-ui'
import MxrUtil from '../../utils/util.js'

export default {
  components: { WxcLoading },
  name: 'BookstorePage',
  data () {
    return {
      dataArray: [],
      loadinging: false,
      page: 1,
      rows: 30,
      hasMoreData: true,
      refreshing: false,
      isLoadingShow: false,
      loadingType: 'trip'
    }
  },
  created: function () {
    this.loadDreamCircleData()
  },
  methods: {
    viewWillAppear () {
      this.isLoadingShow = true
    },
    viewWillDisappear () {
      this.isLoadingShow = false
    },
    formatDate (timeinterval) {
      let date = new Date(timeinterval)
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
    },
    onloading (event) {
      this.loadinging = true
      if (this.hasMoreData) {
        this.loadDreamCircleData()
      }
    },
    onrefresh (event) {
      this.refreshing = true
      this.page = 1
      this.loadDreamCircleData()
    },
    loadDreamCircleData () {
      let param = {uid: 'CgbNAwAx', page: this.page, rows: this.rows}
      MxrUtil.get('/community/dynamics', param, (res) => {
        this.loadinging = false
        this.refreshing = false
        this.isLoadingShow = false
        if (res.ok) {
          let array = res.data.Body.list
          for (let model of array) {
            if (model.contentPic && model.contentPic.length > 0) {
              model.contentPicArray = model.contentPic.split(',')
            } else {
              model.contentPicArray = []
            }
          }
          if (this.page === 1) {
            this.dataArray = array
          } else {
            let tempArray = this.dataArray
            for (let m of array) {
              tempArray.push(m)
            }
            this.dataArray = tempArray
          }

          if (array.length >= this.rows) {
            this.hasMoreData = true
            this.page++
          } else {
            this.hasMoreData = false
          }
          this.hasMoreData = array.length >= this.rows
        }
      })
    }
  }
}
</script>

<style scoped>
  .wrapper {
    width: 750px;
    /*justify-content: center;*/
    /* align-items: center; */
    /*margin-bottom: 90px;*/
  }
  .scroller {
    padding-left: 30px;
    padding-right: 30px;
  }
  .item {
    margin-top: 30px;
  }
  .row {
    flex-direction: row;
  }
  .userImage {
    height: 80px;
    width: 80px;
    border-radius: 40px;
  }
  .simpleInfo {
    margin-left: 30px;
  }
  .publishTime {
    font-size: 20px;
    color: #999;
  }
  .contentC {
    margin-left: 110px;
    margin-right: 30px;
  }
  .userContent {
    font-size: 28px;
    color: #333;
  }
  .conentImageC {
    margin-top: 20px;
  }
  .contentImageScroller {
    height: 220px;
    flex-direction: row;
  }
  .contentImage {
    width: 200px;
    height: 200px;
    border-radius: 10px;
    margin-right: 30px;
  }
  .bookContent {
    padding: 16px 16px 16px 16px;
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
    background-color: #eee;
  }
  .bookCover {
    width: 70px;
    height: 70px;
    border-radius: 8px;
  }
  .bookName {
    margin-left: 20px;
    font-size: 24px;
    color: #666;
  }
  .bottomLine {
    margin-top: 30px;
    /* margin-left: 20px; */
    /* margin-right: 20px; */
    height: 1px;
    background-color: #e0e0e0;
  }
  .loading {
    width: 750px;
    display: -ms-flex;
    display: -webkit-flex;
    display: flex;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    align-items: center;
  }
  .indicator-text {
    color: #888888;
    font-size: 42px;
    text-align: center;
  }
  .indicator {
    margin-top: 16px;
    height: 40px;
    width: 40px;
    color: blue;
  }
  .refresh {
    width: 750px;
    display: -ms-flex;
    display: -webkit-flex;
    display: flex;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    align-items: center;
  }
</style>

<template>
    <scroller :scrollStyle="scrollStyle">
        <!-- 直显示取消按钮 always-show-cancel="showCancel"-->
        <!-- 前面展示选项   mod="hasDep" depName="书城"-->
        <wxc-searchbar class="searchBar" ref="wxc-searchbar"
                       @wxcSearchbarCancelClicked="wxcSearchbarCancelClicked"
                       @wxcSearchbarInputReturned="wxcSearchbarInputReturned"
                       @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput"
                       @wxcSearchbarCloseClicked="wxcSearchbarCloseClicked"
                       @wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus"
                       @wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur"
                       placeholder="请输入关键词(zone:key)"
                       theme="yellow"
                       returnKeyType="search"
                       autofocus="autofocus"
        ></wxc-searchbar>
        <div class="wrapper">
            <!--课程-->
            <text v-if="this.courseArray.length > 0" class="sectionTitle">课程</text>
            <div class="cell inline alignItemCenter" v-bind:key="cIdx" v-for="(course, cIdx) in courseArray">
                <image class="courseImage" :src="course.courseImageUrl"></image>
                <div class="courseInfoContainer" v-if="course.courseType === 1">
                    <text class="courseNameText">{{course.courseName}}</text>
                    <wxc-rich-text class="courseRichText"
                                   :config-list="getCourseRichText(course)"
                    ></wxc-rich-text>
                    <wxc-rich-text class="courseReadTimeRichText"
                                   :config-list="getCourseReadTimeRichText(course)"
                    ></wxc-rich-text>
                </div>
                <div class="courseInfoContainer" v-else-if="course.courseType === 2">
                    <text class="courseNameText">{{course.courseName}}</text>
                    <text class="courseDescText">{{course.description}}</text>
                </div>
            </div>
            <!--专区-->
            <text v-if="this.zoneArray.length > 0" class="sectionTitle">专区</text>
            <div class="cell" v-bind:key="zIdx" v-for="(zone, zIdx) in zoneArray" @click="goZonePage(zone.zoneId)">
                <text class="zoneTitleText">{{zone.zoneName}}</text>
                <image class="zoneImage" :src="zone.zoneCover"></image>
            </div>
            <!--图书-->
            <text v-if="this.bookArray.length > 0" class="sectionTitle">图书</text>
            <div class="cell" v-bind:key="bIdx" v-for="(book, bIdx) in bookArray" @click="goBookDetailPage(book.bookGUID)">
                <div class="inline alignItemCenter">
                    <image class="bookImage" :src="book.bookCoverURL"></image>
                    <div class="bookInfoContainer">
                        <text class="bookNameText">{{book.bookName}}</text>
                        <text class="bookDescText">{{book.bookDESC}}</text>
                        <text class="bookReadTimeText">阅读：{{book.bookReadTimes}}</text>
                    </div>
                </div>
            </div>
        </div>
        <wxc-loading :show="isLoadingShow"
                     type="trip"
                     loading-text="loading"></wxc-loading>
    </scroller>
</template>

<script>
  import MxrUtil from '../../utils/util.js'
  import { WxcSearchbar, WxcLoading, WxcRichText } from 'weex-ui'
  const navigator = weex.requireModule('navigator')

  export default {
    components: { WxcSearchbar, WxcLoading, WxcRichText },
    name: 'SearchPage',
    data () {
      return {
        searchText: '',
        isDisabled: true,
        autofocus: false,
        isLoadingShow: false,
        courseArray: [],
        zoneArray: [],
        bookArray: [],
        scrollStyle: {}
      }
    },
    created () {
      // titleBar.showTitleBar(false)
      this.scrollStyle = {height: MxrUtil.getPageHeight()}
    },
    methods: {
      setValue () {
        // this.$refs['wxc-searchbar'].setValue('点击了手动设置输入框内容的开关');
      },
      wxcSearchbarInputOnFocus (e) {
        this.value = e.value
        // modal.toast({ 'message': 'onfocus', 'duration': 1 })
      },
      wxcSearchbarInputOnBlur () {
        // modal.toast({ 'message': 'onbulr', 'duration': 1 })
        this.$refs['wxc-searchbar'].autoBlur()
      },
      /// 点击清空按钮
      wxcSearchbarCloseClicked (e) {
        this.value = e.value
        // modal.toast({ 'message': 'close.click', 'duration': 1 })
      },
      /// changed
      wxcSearchbarInputOnInput (e) {
        this.value = e.value
        // modal.toast({ 'message': 'wxcSearchbarInputOnInput', 'duration': 1 })
      },
      /// 点击取消按钮
      wxcSearchbarCancelClicked () {
        // modal.toast({ 'message': 'cancel.click', 'duration': 1 })
        this.$refs['wxc-searchbar'].autoBlur()
      },
      wxcSearchbarInputReturned (e) {
        this.value = e.value
        this.searchKey(this.value)
        // modal.toast({ 'message': 'wxcSearchbarInputReturned', 'duration': 1 })
      },
      searchKey (key) {
        this.isLoadingShow = true
        // modal.toast({ 'message': 'search : ' + key, 'duration': 1 })
        MxrUtil.get('/search/all', {page: 1, rows: 30, keyWord: this.value}, (res) => {
          this.isLoadingShow = false
          if (res.ok) {
            console.log(res)
            this.bookArray = res.data.Body && res.data.Body.book && res.data.Body.book.content
            this.courseArray = res.data.Body && res.data.Body.course
            this.zoneArray = res.data.Body && res.data.Body.zone
          }
        })
      },
      // 返回course的富文本
      getCourseRichText (course) {
        // course.courseName+course.unitNum+course.partNum+course.personNum
        return [{
          type: 'text',
          value: '课时 ',
          style: {
            color: '#999999'
          }
        }, {
          type: 'text',
          value: '' + course.unitNum,
          style: {
            color: '#ff7e77'
          }
        }, {
          type: 'text',
          value: ' | 课件 ',
          style: {
            color: '#999999'
          }
        }, {
          type: 'text',
          value: '' + course.partNum,
          style: {
            color: '#ff7e77'
          }
        }, {
          type: 'text',
          value: ' | 图书 ',
          style: {
            color: '#999999'
          }
        }, {
          type: 'text',
          value: '' + course.bookNum,
          style: {
            color: '#ff7e77'
          }
        }]
      },
      getCourseReadTimeRichText (course) {
        return [{
          type: 'text',
          value: '' + course.personNum,
          style: {
            color: '#ff7e77'
          }
        }, {
          type: 'text',
          value: '人阅读',
          style: {
            color: '#999999'
          }
        }]
      },
      goBookDetailPage (bookGUID) {
        navigator.push({
          url: `${MxrUtil.weexLocation}/views/BookDetailPage.js?bookGuid=${bookGUID}`,
          animated: 'true'
        }, event => {
          console.log('>>> push book detail callback ', event)
        })
      },
      goZonePage (zoneId) {
        navigator.push({
          url: `${MxrUtil.weexLocation}/views/bookstore/subjectbooks.js?recommendId=${zoneId}`,
          animated: 'true',
          titleBarHidden: 'true'
        }, event => {
          console.log('>>>>> push subject callback ', event)
        })
      }
    }
  }
</script>

<style scoped>
    .searchBar {
        position: fixed;
        left: 0px;
        top: 0px;
        z-index: 9999;
    }
    .wrapper {
        margin-top: 84px;
        padding-left: 20px;
        padding-right: 20px;
        justify-content: center;
    }
    .inline {
        flex-direction: row;
    }
    .alignItemCenter {
        align-items: center;
    }
    .sectionTitle {
        margin-top: 20px;
        font-size: 40px;
        color: #333333;
    }
    .cell {
        margin-top: 20px;
    }
    .courseInfoContainer {
        margin-left: 30px;
        width: 440px;
    }
    .courseImage {
        width: 220px;
        height: 140px;
        border-radius: 10px;
    }
    .courseNameText {
        font-size: 30px;
    }
    .courseRichText {
        margin-top: 10px;
    }
    .courseReadTimeRichText {
        margin-top: 10px;
    }
    .courseDescText {
        font-size: 26px;
        lines: 2;
        text-overflow: ellipsis;
        color: #999999;
        margin-top: 10px;
    }
    .zoneTitleText {
        font-size: 30px;
        color: #333333
    }
    .zoneImage {
        margin-top: 10px;
        width: 710px;
        height: 300px;
        border-radius: 10px;
    }
    .bookImage {
        width: 180px;
        height: 240px;
        border-radius: 10px;
    }
    .bookInfoContainer {
        width: 480px;
        margin-left: 30px;
    }
    .bookNameText {
        lines: 1;
        font-size: 30px;
        color: #333333;
    }
    .bookDescText {
        lines: 2;
        font-size: 24px;
        color: #999999;
        text-overflow: ellipsis;
        margin-top: 20px;
    }
    .bookReadTimeText {
        lines: 1;
        font-size: 24px;
        color: #999999;
        margin-top: 20px;
    }
</style>

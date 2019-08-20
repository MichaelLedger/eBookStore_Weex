<template>
  <scroller class="wrapper" show-scrollbar="false">
    <slider v-if="bannerArray.length > 0" class="slider" interval="3000" auto-play="true">
      <div class="frame" v-bind:key="bIdx" v-for="(banner, bIdx) in bannerArray">
        <image class="bannerImg" resize="stretch" :src="banner.imageUrl"></image>
      </div>
    </slider>
    <div class="videoContainer">
      <div class="videoCell" v-bind:key="idx" v-if="(idx % 2) === 0" v-for="(video, idx) in videoArray">
        <div class="inline videoHContainer">
          <div class="cell cellLeft" @click="goVideoCourseDetail(video.courseId)">
            <image class="image" :src="videoArray[idx].courseCoverUrl"></image>
            <text class="videoNameLable">{{videoArray[idx].courseName}}</text>
          </div>
          <div class="cell cellRight" v-if="videoArray[idx+1]" @click="goVideoCourseDetail(videoArray[idx+1].courseId)">
            <image class="image" :src="videoArray[idx + 1] && videoArray[idx + 1].courseCoverUrl"></image>
            <text class="videoNameLable">{{videoArray[idx + 1] && videoArray[idx + 1].courseName}}</text>
          </div>
        </div>
      </div>
    </div>
  </scroller>
</template>

<script>
import MxrUtil from '../../utils/util.js'
const navigator = weex.requireModule('navigator')

export default {
  data () {
    return {
      bannerArray: [],
      videoArray: []
    }
  },
  created: function () {
    // 获取banner数据
    MxrUtil.get('/course/banners', {}, (res) => {
      if (res.ok) {
        this.bannerArray = res.data.Body
      }
    })
    // 获取视频数据数据
    MxrUtil.get('/course/videoCourses', {courseType: 0, gradeType: 0, pageNo: 1, pageSize: 1000}, (res) => {
      if (res.ok) {
        this.videoArray = res.data.Body && res.data.Body.list
      }
    })
  },
  methods: {
    goVideoCourseDetail: function (courseId) {
      navigator.push({
        url: `${MxrUtil.weexLocation}/views/classroom/videocoursedetail.js?courseId=${courseId}`,
        animated: 'true'
      }, event => {
        console.log('>>>>> push video course callback ', event)
      })
    }
  }
}
</script>

<style scoped>
  .wrapper {
    width: 750px;
    background-color: #f4f4f4;
    padding-left: 20px;
    padding-right: 20px;
    /*align-items: center;*/
    /*margin-bottom: 90px;*/
  }
  /* slider */
  .bannerImg {
    /* flex: 1; */
    width: 710px;
    height: 300px;
    border-radius: 10px;
  }
  .slider {
    /* margin-top: 25px;
    margin-left: 25px; */
    padding-top: 20px;
    width: 720px;
    height: 300px;
    /* border-radius: 10px; */
  }
  .frame {
    width: 710px;
    height: 300px;
    position: relative;
  }
  /**/
  .videoContainer {
    width: 710px;
  }
  .videoCell {
    margin-top: 20px;
  }
  .videoHContainer {
    width: 710px;
    justify-content: space-between;
  }
  .inline {
    flex-direction: row;
  }
  /* waterfall */
  .waterfall{
    padding-top: 40px;
    width: 690px;
  }
  .cell {

  }
  .cellRight {
    direction: rtl;
  }
  .image {
    width: 345px;
    height: 250px;
    border-radius: 8px;
  }
  .videoNameLable {
    font-size: 30px;
    color: #666;
    width: 345px;
    lines: 1;
  }
</style>

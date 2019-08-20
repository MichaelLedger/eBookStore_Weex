<template>
    <div class="wrapper">
        <div class="courseinfo">
            <image class="image" :src="videoModel.courseCoverUrl"></image>
            <text class="coursetext">{{videoModel.courseDesc}}</text>
        </div>
        <list class="list" show-scrollbar="false">
            <cell v-for="videoItem in videoList" @click="goVideoPlay(videoItem.resourceNo)">
                <div class="celldiv">
                    <text>{{videoItem.videoName}}</text>
                </div>
            </cell>
        </list>
    </div>
</template>

<script>
  import MxrUtil from '../../utils/util.js'
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        courseId: undefined,
        videoList: [],
        videoModel: undefined
      }
    },
    created : function () {
      const url = weex.config.bundleUrl;
      let queryJson = MxrUtil.parseUrlParam(url)
      this.courseId = queryJson['courseId']
      MxrUtil.get('/course/videoCourses/' + this.courseId, {courseId: this.courseId}, (res) => {
        if (res.ok) {
          this.videoModel = res.data.Body
          this.videoList = res.data.Body && res.data.Body.videoList
        }
      })
    },
    methods: {
      goVideoPlay (resourceNo) {
        navigator.push({
          url: `${MxrUtil.weexLocation}/views/classroom/videocourseplay.js?courseId=${this.courseId}&resourceNo=${resourceNo}`,
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
        background-color: #f4f4f4;
        padding-left: 20px;
        padding-right: 20px;
        align-items: center;
    }
    .courseinfo {
        flex-direction: row;
        width: 720px;
    }
    .image {
        width: 200;
        height: 150;
        border-radius: 8px;
        margin-right: 20px;
    }
    .list {
        margin-top: 20px;
    }
    .coursetext {
        width: 500px;
        font-size: 26px;
        color: #666;
    }
    .celldiv {
        width: 720px;
        padding-bottom: 20px;
    }
</style>

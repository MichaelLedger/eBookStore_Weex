<template>
    <div class="wrapper">
        <video class="video" :src="aliVideoUrl" autoplay controls
               @start="onstart" @pause="onpause" @finish="onfinish" @fail="onfail"></video>
        <text class="info">state: {{state}}</text>
    </div>
</template>

<script>
  import MxrUtil from '../../utils/util.js'
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        courseId: undefined,
        resourceNo: undefined,
        videoUrl: undefined,
        aliVideoUrl: undefined,
        state: '----'
      }
    },
    created: function () {
      const url = weex.config.bundleUrl
      let queryJson = MxrUtil.parseUrlParam(url)
      this.courseId = queryJson['courseId']
      this.resourceNo = queryJson['resourceNo']
      this.videoUrl = queryJson['videoUrl']
      MxrUtil.get('/course/videoCourses/video/detail', {courseId: this.courseId, resourceNo: this.resourceNo}, (res) => {
        if (res.ok) {
          this.aliVideoUrl = res.data.Body && res.data.Body.videoUrl
        }
      })
    },
    methods: {
      onstart (event) {
        this.state = 'onstart'
      },
      onpause (event) {
        this.state = 'onpause'
      },
      onfinish (event) {
        this.state = 'onfinish'
      },
      onfail (event) {
        this.state = 'onfinish'
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
    .video {
        width: 710px;
        height: 350px;
        margin-top: 60px;
    }
    .info {
        margin-top: 40px;
        font-size: 40px;
        text-align: center;
    }
</style>

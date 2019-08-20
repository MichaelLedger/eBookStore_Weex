<template>
    <div class="wrapper">
        <waterfall class="waterfall" column-count="3" column-width="200px" show-scrollbar="false">
            <cell class="cell" v-for="book in books" @click="goBookDetailPage(book.bookGUID)">
                <image class="image" :src="book.bookCoverURL"></image>
                <text class="bookNameLable">{{book.bookName}}</text>
            </cell>
        </waterfall>
    </div>
</template>

<style scoped>
    .wrapper {
        background-color: #f4f4f4;
        padding-left: 30px;
        padding-right: 30px;
        align-items: center;
    }
    .waterfall{
        padding-top: 40px;
        width: 690px;
    }
    .cell {
        padding-bottom: 20px;
    }
    .image {
        width: 200px;
        height: 280px;
        border-radius: 8px;
    }
    .bookNameLable {
        font-size: 30px;
        color: #666;
        lines: 1;
    }
</style>

<script>
  import MxrUtil from '../../utils/util.js'
  const navigator = weex.requireModule('navigator')
  // https://bs-api.mxrcorp.cn/core/home/recommend/136/books?page=1&recommendId=136&rows=50
  export default {
    data () {
      return {
        recommendId: undefined,
        books: []
      }
    },
    created: function () {
      const url = weex.config.bundleUrl;
      let queryJson = MxrUtil.parseUrlParam(url)
      this.recommendId = queryJson['recommendId']
      const api = '/core/home/recommend/' + this.recommendId + '/books'
      const param = {page: 1, rows: 50, recommendId: this.recommendId}
      MxrUtil.get(api, param, res => {
        if (res.ok) {
          this.books = res.data.Body.list
        }
      })
      console.log('>>>>> recommendId : ',this.recommendId)
    },
    methods: {
      goBookDetailPage: function (bookGuid) {
        console.log('>>>>> click book bookGuid: ', bookGuid)
        navigator.push({
          url: `${MxrUtil.weexLocation}/views/BookDetailPage.js?bookGuid=${bookGuid}`,
          animated: 'true',
          titleBarHidden: 'true'
        }, event => {
          console.log('>>> push bookdetail callback ', event)
        })
      }
    }
  }
</script>

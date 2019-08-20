<template>
    <wxc-tab-bar :tab-titles="tabTitles"
                 :tab-styles="tabStyles"
                 title-type="icon"
                 @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected"
                 isTabView="false"
                 class="tabBar">
        <div class="item-container" :style="contentStyle"><home-page></home-page></div>
        <div class="item-container" :style="contentStyle"><class-romm></class-romm></div>
        <div class="item-container" :style="contentStyle"><circle-page></circle-page></div>
    </wxc-tab-bar>
</template>

<style scoped>
    .item-container {
        width: 750px;
        background-color: #f2f3f4;
        /*align-items: center;*/
        /*justify-content: center;*/
        /*margin-bottom: 120px;*/
    }
</style>

<script>
  import { Utils, WxcTabBar } from 'weex-ui'
  import MxrUtil from '../utils/util.js'
  import TabBar from './TabBar.vue'
  import NavigationBar from './NavigationBar.vue'
  import HomePage from '../components/bookstore/BookStorePage.vue'
  import CirclePage from '../components/dreamcircle/DreamCirclePage.vue'
  import ClassRomm from '../components/classroom/ClassRoomPage.vue'
  export default {
    components: { TabBar, WxcTabBar, NavigationBar, CirclePage, HomePage, ClassRomm },
    data: () => ({
      tabTitles: [{
        title: '书城',
        icon: 'https://liulong.site/weex/icons/icon_tab_bookstore_nor.png',
        activeIcon: 'https://liulong.site/weex/icons/icon_tab_bookstore_sel.png'
      }, {
        title: 'AR课堂',
        icon: 'https://liulong.site/weex/icons/icon_tab_classroom_nor.png',
        activeIcon: 'https://liulong.site/weex/icons/icon_tab_classroom_sel.png'
        // badge: 5
      }, {
        title: '梦想圈',
        icon: 'https://liulong.site/weex/icons/icon_tab_circle_nor.png',
        activeIcon: 'https://liulong.site/weex/icons/icon_tab_circle_sel.png'
      }],
      tabStyles: {
        bgColor: '#FFFFFF',
        titleColor: '#666666',
        activeTitleColor: '#52ceff',
        activeBgColor: '#FFFFFF',
        isActiveTitleBold: true,
        iconWidth: 44,
        iconHeight: 44,
        width: 160,
        height: 100,
        fontSize: 24,
        textPaddingLeft: 10,
        textPaddingRight: 10
      },
      mainHeight: 0
    }),
    created () {
      const tabPageHeight = MxrUtil.getPageHeight() - (MxrUtil.isIOS() ? (90) : 120)
      this.contentStyle = {height: tabPageHeight}
      this.mainHeight = Utils.env.getScreenHeight()
    },
    methods: {
      wxcTabBarCurrentTabSelected (e) {
        const index = e.page
        console.log(index)
      },
      minibarRightButtonClick () {
      }
    }
  }
</script>

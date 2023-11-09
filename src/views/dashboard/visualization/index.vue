<template>
  <see-web-site :web-site-list="webSiteList"></see-web-site>
</template>

<script>
import SeeWebSite from '@/components/seeWebSite/index.vue'
export default {
  components: {
    SeeWebSite
  },
  data() {
    return {
      webSiteList: [
        {
          name: '可视化组件库',
          svg: '可视化',
          urlList: [
            {
              name: 'echart官网',
              svg: 'echart',
              url: 'https://echarts.apache.org/zh/index.html'
            },
            {
              name: 'MCChart',
              svg: 'MCChart',
              url: 'http://echarts.zhangmuchen.top/#/index'
            },
            {
              name: 'chartLib',
              svg: 'chartLib',
              url: 'http://chartlib.datains.cn'
            },
            {
              name: 'ppchart',
              svg: 'ppchart',
              url: 'https://ppchart.com/#/'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

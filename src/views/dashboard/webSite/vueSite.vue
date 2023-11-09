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
          name: 'vue',
          svg: 'vue',
          urlList: [
            {
              name: 'vue2',
              svg: 'vue',
              url: 'https://v2.cn.vuejs.org/v2/guide/'
            },
            {
              name: 'router2',
              svg: 'router',
              url: 'https://v3.router.vuejs.org/zh/installation.html'
            },
            {
              name: 'vuex2',
              svg: 'vuex',
              url: 'https://v3.vuex.vuejs.org/zh/'
            },
            {
              name: 'vue3',
              svg: 'vue3',
              url: 'https://cn.vuejs.org/guide/introduction.html'
            },
            {
              name: 'router3',
              svg: 'router3',
              url: 'https://v3.router.vuejs.org/zh/installation.html'
            },
            {
              name: 'vuex3',
              svg: 'vuex3',
              url: 'https://v3.vuex.vuejs.org/zh/'
            }
          ]
        },
        {
          name: 'UI框架',
          svg: 'UI',
          urlList: [
            {
              name: 'ElementUI',
              svg: 'elementui',
              url: 'https://element.eleme.cn/#/zh-CN'
            },
            {
              name: 'iView',
              svg: 'iview',
              url: 'http://v4.iviewui.com/docs/introduce'
            },
            {
              name: 'Ant Design Vue',
              svg: 'antd',
              url: 'https://www.antdv.com/components/overview-cn'
            },
            {
              name: 'DataV(大屏专用)',
              svg: 'datav',
              url: 'http://datav.jiaminghi.com/guide/'
            }
          ]
        },
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
              name: 'echart社区1',
              svg: 'echart1',
              url: 'http://echarts.zhangmuchen.top/#/index'
            },
            {
              name: 'echart社区2',
              svg: 'echart2',
              url: 'http://chartlib.datains.cn'
            },
            {
              name: 'echart社区3',
              svg: 'echart3',
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

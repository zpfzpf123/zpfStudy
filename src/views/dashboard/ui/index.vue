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
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

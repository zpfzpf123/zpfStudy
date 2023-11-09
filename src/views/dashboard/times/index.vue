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
          name: '时间处理',
          svg: 'times',
          urlList: [
            {
              name: "moment",
              svg: 'moment',
              url: 'http://momentjs.cn/docs/'
            },
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

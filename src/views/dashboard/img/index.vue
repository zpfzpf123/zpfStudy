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
          name: '图标网站',
          svg: 'icon',
          urlList: [
            {
              name: '阿里巴巴图标库',
              svg: 'alibaba',
              url: 'https://www.iconfont.cn/'
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

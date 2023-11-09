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
          name: 'js',
          svg: 'js',
          urlList: [
            {
              name: 'ES6',
              svg: 'ES6',
              url: 'https://es6.ruanyifeng.com/'
            },
            {
              name: 'lodash',
              svg: 'lodash',
              url: 'https://www.lodashjs.com/'
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

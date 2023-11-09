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
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

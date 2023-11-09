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
          name: '实用网站',
          svg: 'usefulURLs',
          urlList: [
            {
              name: '奶牛快传',
              svg: 'nnkc',
              url: 'https://cowtransfer.com/'
            },
            {
              name: '百度翻译',
              svg: 'bdfy',
              url: 'http://fanyi.baidu.com/'
            },
            {
              name: 'GitHub',
              svg: 'Github',
              url: 'https://github.com/'
            },
            {
              name: 'Vue example',
              svg: 'vueEx',
              url: 'https://vuejsexamples.com/'
            },
            {
              name: 'elementui生成器',
              svg: 'createElementui',
              url: 'https://mrhj.gitee.io/form-generator/#/'
            },
            {
              name: 'vue-element-admin',
              svg: 'vue-element-admin',
              url: 'https://panjiachen.github.io/vue-element-admin-site/zh/guide/'
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

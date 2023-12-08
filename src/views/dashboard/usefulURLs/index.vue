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
          name: '人工智能',
          svg: 'ai',
          urlList: [
            {
              name: 'bingChat',
              svg: 'bingChat',
              url: 'https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx'
            },
            {
              name: 'bard',
              svg: 'bard',
              url: 'https://bard.google.com/chat'
            },
          ]
        },
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
        },
        {
          name: 'vpn',
          svg: 'vpn',
          urlList: [
            {
              name: 'iKun',
              svg: 'ikun',
              url: 'https://ikuuu.me/user#'
            },
            {
              name: '一元机场',
              svg: '一元机场',
              url: 'https://xn--4gq62f52gdss.com/#/dashboard'
            },
          ]
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

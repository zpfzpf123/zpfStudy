<template>
  <see-web-site :web="web"></see-web-site>
</template>

<script>
import SeeWebSite from '@/components/seeWebSite/index.vue'

export default {
  components: {
    SeeWebSite
  },
  data() {
    return {
      web: 'http'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

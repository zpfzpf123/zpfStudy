<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  //min-height: calc(100vh - 50px);
  width: 100%;
  height: 89vh;
  position: relative;
  overflow: auto;
  // 滚动条整体部分
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  // 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
  &::-webkit-scrollbar-button {
    display: none;
  }
  // 滚动条的轨道（里面装有Thumb）
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  // 滚动条的轨道（里面装有Thumb）
  &::-webkit-scrollbar-track-piece {
    background-color: transparent;
  }
  // 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
  &::-webkit-scrollbar-thumb {
    background: #2ac06d;
    cursor: pointer;
    border-radius: 4px;
  }
  // 边角，即两个滚动条的交汇处
  &::-webkit-scrollbar-corner {
    display: none;
  }
  // 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件
  &::-webkit-resizer {
    display: none;
  }
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    //min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

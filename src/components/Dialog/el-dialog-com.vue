<template>
  <div id="Dialog">
    <el-dialog
      :title="title"
      :fullscreen="fullscreen"
      :center="center"
      :visible="visible"
      :width="width"
      :custom-class="customClass"
      @open="openDialog"
      @close="closeDialog"
    >
      <template v-slot:title>
        <slot name="title" />
      </template>
      <template v-slot:default>
        <slot name="content" />
      </template>
      <template v-slot:footer>
        <slot name="footer" />
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Dialog',
  props: {
    // 是否显示弹框
    visible: {
      type: Boolean,
      default: false
    },
    // 弹框标题
    title: {
      type: String,
      default: ''
    },
    // 弹框宽度
    width: {
      type: String,
      default: '50%'
    },
    // Dialog 的自定义类名
    customClass: {
      type: String,
      default: ''
    },
    // 标题是否居中
    center: {
      type: Boolean,
      default: true
    },
    // 弹框是否全屏显示
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * 打开弹窗回调
     * */
    openDialog() {
      console.log('你打开了弹窗')
      this.$emit('openDialog')
    },
    /**
     * 关闭弹窗回调
     * */
    closeDialog() {
      this.$emit('closeDialog', false)
      console.log('你关闭了弹窗')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog__header {
  height: 5vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

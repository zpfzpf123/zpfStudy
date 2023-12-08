<template>
  <el-row :gutter="40" class="panel-group">
    <el-card v-for="item of webSiteList" :key="item.url">
      <template v-slot:header>
        <svg-icon :icon-class="item.svg" class-name="card-panel-icon"/>
        <span class="header-name">{{ item.name }}</span>
      </template>
      <el-col v-for="list of item.urlList" :key="list.name" class="card-panel-col">
        <div class="card-panel" @click="goToWebsite(list.url)">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon :icon-class="list.svg" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{ list.name }}
            </div>
          </div>
        </div>
      </el-col>
    </el-card>
  </el-row>
</template>

<script>

export default {
  props: {
    webSiteList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    goToWebsite(url) {
      window.open(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin: 18px 0 20px 0 !important;
  .card-panel-col {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
    width: max-content;
  }

  .card-panel {
    //height: 108px;
    width: max-content;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #59d0cd;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border: 1px solid #52aedb;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    padding: 5px 15px;

    &:hover {
      background: #f0f2f5;
      color: #1890ff;
      border: 1px solid #2ac06d;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .1);
    }

    .card-panel-icon-wrapper {
      border-radius: 6px;
    }

    .card-panel-icon {
      font-size: 35px;
    }

    .card-panel-description {
      .card-panel-text {
        font-size: 28px;
        margin-left: 15px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}

.el-card {
  margin: 20px 30px;

  .el-card__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .svg-icon {
      width: 3em;
      height: 3em;
      vertical-align: -0.75em;
      fill: currentColor;
      overflow: hidden;
    }
  }
}

.header-name {
  font-size: 30px;
  color: #2ac06d;
  margin-left: 30px;
}
</style>

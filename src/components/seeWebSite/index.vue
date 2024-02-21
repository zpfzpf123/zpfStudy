<template>
  <el-row :gutter="40" v-if="webSite.length" class="panel-group">
    <!--    <el-card>-->
    <!--      <button class="pan-btn tiffany-btn" @click="addWebSite">-->
    <!--        新增网站-->
    <!--      </button>-->
    <!--    </el-card>-->
    <el-card v-for="item of webSite" :key="item.url">
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
    <el-dialog-com
      :visible="dialogVisible"
      title="新增网站"
      @closeDialog="dialogVisible = $event"
    >
      <template v-slot:content>
        <el-form ref="webSite" :model="webSite" label-width="80px" :rules="rules">
          <el-form-item label="网站名称" prop="name">
            <el-input v-model="webSite.name"/>
          </el-form-item>
          <el-form-item label="网站图标" prop="name">
            <el-input v-model="webSite.svg"/>
          </el-form-item>
          <el-form-item label="网站地址" prop="name">
            <el-input v-model="webSite.url"/>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:footer>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </template>
    </el-dialog-com>
  </el-row>
</template>

<script>

import elDialogCom from '@/components/Dialog/el-dialog-com.vue'
import WebSite from '@/api/webSite'
import db from '../../../static/db'
export default {
  components: { elDialogCom },
  props: {
    web: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false, // 是否显示弹框
      webSite: [], // 网站列表
      rules: {
        name: [
          { required: true, message: '请输入网站名称', trigger: 'blur' }
        ],
        svg: [
          { required: true, message: '请输入网站图标', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入网站地址', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    environment() {
      return process.env.NODE_ENV
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * @description 初始化
     * */
    init() {
      if (this.environment === 'development') {
        WebSite.getWebSite(this.web).then(res => {
          this.webSite = []
          this.webSite.push(...res)
        })
      } else {
        this.webSite = []
        this.webSite.push(...db[this.web])
      }
    },
    /**
     * @description 跳转网站
     * @param url 网站地址
     * */
    goToWebsite(url) {
      window.open(url)
    },
    /**
     * @description 新增网站
     * */
    addWebSite() {
      this.dialogVisible = true
    },
    submitForm() {
      this.$refs.webSite.validate(valid => {
        if (valid) {

        }
      })
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

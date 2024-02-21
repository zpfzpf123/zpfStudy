<template>
  <div id="btn-table">
    <el-card class="top">
      <div class="btn">
        <el-form ref="inquire" label-width="80px" :model="inquire" inline>
          <el-form-item label="文章标题" prop="name">
            <el-input v-model="inquire.name_like"/>
          </el-form-item>
          <el-form-item label="文章类型" prop="type">
            <el-select v-model="inquire.type" placeholder="请选择文章类型">
              <el-option
                v-for="item of noteTypeList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 20px">
            <button class="pan-btn green-btn" @click.prevent="reset">重置</button>
          </el-form-item>
          <el-form-item
            v-if="environment === 'development'"
            style="margin-left: 20px"
          >
            <button class="pan-btn tiffany-btn" @click="addNote">
              新增文章
            </button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card style="margin-top: 20px; width: 100%">
      <div class="table">
        <el-table
          :data="noteList"
          :column="column"
          height="64vh"
          :default-sort="{ prop: 'recommendationIndex', order: 'descending' }"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50"
          />
          <el-table-column
            v-for="item in column"
            :key="item.label"
            :prop="item.prop"
            :label="item.label"
            align="center"
          />
          <el-table-column
            width="200px"
            label="推荐指数"
            sortable
            prop="recommendationIndex"
          >
            <template slot-scope="scope">
              <el-rate
                v-model="scope.row.recommendationIndex"
                disabled
                show-score
                text-color="#ff9900"
                :max="5"
                :min="1"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="300">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="viewInfo(scope.$index, scope.row)"
              >预览
              </el-button>
              <el-button
                v-if="environment === 'development'"
                style="margin-left: 20px"
                type="warning"
                @click="editInfo(scope.$index, scope.row)"
              >修改
              </el-button>
              <el-popconfirm
                style="margin-left: 20px"
                title="确定要删除选择项吗？"
                @onConfirm="delInfo(scope.$index, scope.row)"
              >
                <el-button
                  v-if="environment === 'development'"
                  slot="reference"
                  type="danger"
                >删除文章
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog-com
      :visible="showAddNote"
      :title="status === 0 ? '新增文章' : '修改文章'"
      fullscreen
      @closeDialog="closeAddNote"
    >
      <template v-slot:content>
        <el-form ref="note" :model="note" label-width="120px" :rules="rules">
          <el-form-item label="文章标题" prop="name">
            <el-input v-model="note.name"/>
          </el-form-item>
          <el-form-item label="文章类型" prop="type">
            <el-select v-model="note.type" placeholder="请选择文章类型">
              <el-option
                v-for="item of noteTypeList"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="推荐指数"
            class="postInfo-container-item"
            prop="recommendationIndex"
          >
            <el-rate
              v-model="note.recommendationIndex"
              :max="5"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              :low-threshold="1"
              :high-threshold="5"
              style="display: inline-block"
            />
          </el-form-item>
          <el-form-item label="文章内容" prop="content">
            <v-md-editor
              v-model="note.content"
              :disabled-menus="[]"
              :include-level="[1, 2, 3, 4]"
              height="400px"
              @upload-image="handleUploadImage"
            />
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:footer>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </template>
    </el-dialog-com>
    <el-dialog-com
      :visible="showDetail"
      title=""
      width="80vw"
      @closeDialog="closeDetail"
    >
      <template v-slot:content>
        <div class="detail">
          <v-md-editor
            v-if="showDetail"
            v-model="articleDetails"
            left-toolbar="fullscreen toc"
            right-toolbar=""
            :include-level="[1, 2, 3]"
            height="70vh"
            @copy-code-success="handleCopyCodeSuccess"
          />
        </div>
      </template>
    </el-dialog-com>
  </div>
</template>
<script>
import Note from '@/api/note'
import elDialogCom from '@/components/Dialog/el-dialog-com.vue'
import db from '../../../static/db'
import github from '@/request/github'
import { Loading } from 'element-ui'

export default {
  name: 'StudyNote',
  components: {
    elDialogCom
  },
  data() {
    return {
      status: 0, // 0新增，1修改
      noteList: [],
      initList: [],
      showAddNote: false,
      showDetail: false,
      articleDetails: '',
      noteTypeList: [
        {
          label: 'vue',
          value: 'vue'
        },
        {
          label: 'js',
          value: 'js'
        },
        {
          label: 'css',
          value: 'css'
        },
        {
          label: 'uniapp',
          value: 'uniapp'
        },
        {
          label: 'ai',
          value: 'ai'
        },
        {
          label: 'component',
          value: 'component'
        }
      ],
      // 组名信息
      note: {
        name: '',
        type: '',
        recommendationIndex: 0,
        content: ''
      },
      inquire: {
        name_like: '',
        type: ''
      },
      rules: {
        name: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        type: [
          { required: true, message: '请选择文章类型', trigger: 'change' }
        ]
      },
      column: [
        {
          prop: 'name',
          label: '标题'
        },
        {
          prop: 'type',
          label: '类型'
        }
      ]
    }
  },
  computed: {
    condition() {
      return { name: this.inquire.name_like, type: this.inquire.type }
    },
    environment() {
      return process.env.NODE_ENV
    }
  },
  watch: {
    condition: {
      handler(val) {
        this.queryTheArticle()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async handleUploadImage(event, insertImage, files) {
      const reader = new FileReader()

      function getBase64(file) {
        return new Promise((resolve) => {
          reader.onload = function(event) {
            const fileContent = event.target.result
            resolve(fileContent.split(',')[1])
          }
          reader.readAsDataURL(file)
        })
      }

      const content = await getBase64(files[0]) // 目前上传接口支持上传base64格式图片，所以先将不是base6格式的文件流转化成base64,如果是base64格式忽略这一步
      const loadingInstance = Loading.service({
        fullscreen: true,
        text: '图片上传中...'
      })
      const imgUrl = await github.uploader(content, files[0])
      if (imgUrl) {
        this.$message.success(
          '上传github成功！！回显由于网络延迟，显示不出来或显示较缓慢属于正常现象'
        )
        this.$nextTick(() => {
          // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close()
        })
      }
      // 此处只做示例
      insertImage({
        url: `https://github.com/zpfzpf123/images/blob/master/${files[0].name}?raw=true`,
        desc: 'files.name',
        width: 'auto',
        height: 'auto'
      })
    },
    init() {
      if (this.environment === 'development') {
        Note.getNote()
          .then((list) => {
            this.noteList = []
            this.noteList.push(...list)
          })
      } else {
        this.noteList = []
        this.noteList.push(...db.note)
        this.initList = []
        this.initList.push(...db.note)
      }
    },
    addNote() {
      this.status = 0
      this.showAddNote = true
      this.note = Object.assign(
        {},
        {
          name: '',
          type: '',
          recommendationIndex: 0,
          content: '',
          id: ''
        }
      )
      this.$nextTick(() => {
        this.$refs.note.resetFields()
      })
    },
    queryTheArticle() {
      const condition = Object.fromEntries(
        Object.entries(this.inquire).filter(
          ([key, value]) => value != null && value !== ''
        )
      )
      if (this.environment === 'development') {
        Note.getNote(condition)
          .then((list) => {
            this.noteList = []
            this.noteList.push(...list)
          })
      } else {
        this.noteList = this.initList.filter((item) => {
          return (
            item.name.includes(this.inquire.name_like) &&
            item.type.includes(this.inquire.type)
          )
        })
      }
    },
    reset() {
      this.inquire = Object.assign(
        {},
        {
          name_like: '',
          type: ''
        }
      )
    },
    closeAddNote() {
      this.showAddNote = false
    },
    submitForm() {
      this.$refs.note.validate((valid) => {
        if (!valid) {
          return false
        }
        if (!this.note.recommendationIndex) {
          this.$message.warning('请选择推荐指数')
          return false
        }
        if (!this.note.content) {
          this.$message.warning('请填写文章内容')
          return false
        }
        if (this.status === 0) {
          const id = this.noteList.length + 1
          Note.postNote({
            ...this.note,
            id
          }).then((_) => {
            this.$message.success('添加文章成功！')
            this.init()
            this.showAddNote = false
          })
        } else if (this.status === 1) {
          Note.putNote(this.note.id, this.note).then((res) => {
            this.$message.success('修改文章成功！')
            this.init()
            this.showAddNote = false
          })
        }
      })
    },
    closeDetail() {
      this.showDetail = false
    },
    viewInfo(index, val) {
      this.showDetail = true
      this.$nextTick(() => {
        this.articleDetails = val.content
      })
    },
    editInfo(index, val) {
      this.status = 1
      this.showAddNote = true
      this.$nextTick(() => {
        this.$refs.note.resetFields()
        this.note = Object.assign(
          {},
          {
            name: val.name,
            type: val.type,
            recommendationIndex: val.recommendationIndex,
            content: val.content,
            id: val.id
          }
        )
      })
    },
    delInfo(index, val) {
      Note.delNote(val.id).then((res) => {
        this.$message.success('删除成功！')
      })
    },
    handleCopyCodeSuccess() {
      this.$message.success('复制成功！')
    }
  }
}
</script>
<style scoped lang="scss">
#btn-table {
  //width: 100%;
  //height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  margin: 20px;

  .top {
    width: 100%;
    height: 10vh;
  }

  .btn {
    width: 100%;
    flex: 1;
    display: flex;
    column-gap: 20px;
    justify-items: center;
    align-items: center;
  }

  .table {
    width: 100%;
    flex: 6;

    ::v-deep .el-table {
      .el-table__body-wrapper {
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
          background: #42b983;
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
    }
  }
}

.el-select {
  width: 100%;
}

.detail {
  overflow: auto;

  ::v-deep .github-markdown-body {
    overflow-y: auto;
  }

  ::v-deep .v-note-wrapper {
    padding: 0;
    margin: 0;
    max-width: none;
  }

  ::v-deep .v-md-textarea-editor {
    display: none;
  }

  ::v-deep .v-md-editor__editor-wrapper {
    display: none;
  }
}

.top {
  ::v-deep .el-card__body {
    padding: 0 !important;
    height: 100%;

    .btn {
      height: 100%;
      display: flex;
      align-items: center;

      .el-form {
        height: 100%;
        padding: 10px;

        .el-form-item {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>

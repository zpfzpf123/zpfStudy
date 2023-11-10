<template>
  <div id="btn-table">
    <el-card class="top">
      <div class="btn">
        <el-form
          ref="inquire"
          label-width="80px"
          :model="inquire"
          inline
        >
          <el-form-item label="文章标题" prop="name">
            <el-input v-model="inquire.name_like"/>
          </el-form-item>
          <el-form-item label="文章类型" prop="type">
            <el-select v-model="inquire.type" placeholder="请选择文章类型">
              <el-option v-for="item of noteTypeList" :key="item.label" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 20px">
            <button class="pan-btn green-btn" @click="queryTheArticle">查询</button>
          </el-form-item>
          <el-form-item style="margin-left: 20px">
            <button class="pan-btn green-btn" @click="reset">重置</button>
          </el-form-item>
          <el-form-item style="margin-left: 20px">
            <button class="pan-btn tiffany-btn" @click="addNote">新增文章</button>
          </el-form-item>
        </el-form>

        <!--        <el-popconfirm title="确定要删除选择项吗？" @onConfirm="delSelect">-->
        <!--          <el-button slot="reference" type="danger" @click="del">批量删除</el-button>-->
        <!--        </el-popconfirm>-->
      </div>
    </el-card>
    <el-card style="margin-top: 20px;width: 100%;">
      <div class="table">
        <el-table
          :data="noteList"
          :column="column"
          height="400px"
        >
          <el-table-column
            type="selection"
            width="100"
          />
          <el-table-column
            v-for="item in column"
            :key="item.label"
            fixed
            :prop="item.prop"
            :label="item.label"
            align="center"
          />
          <el-table-column width="200px" label="推荐指数">
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
          <el-table-column label="操作" align="center" width="170">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="viewInfo(scope.$index, scope.row)"
              >预览
              </el-button>
              <!--              <el-button-->
              <!--                type="primary"-->
              <!--                @click="handleEdit(scope.$index, scope.row)"-->
              <!--              >修改-->
              <!--              </el-button>-->
              <!--              <el-popconfirm-->
              <!--                title="确定删除这一项吗？"-->
              <!--                style="margin-left: 10px"-->
              <!--                @onConfirm="handleDelete(scope.$index, scope.row)"-->
              <!--              >-->
              <!--                <el-button-->
              <!--                  slot="reference"-->
              <!--                  type="danger"-->
              <!--                >删除-->
              <!--                </el-button>-->
              <!--              </el-popconfirm>-->

            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog-com
      :visible="showAddNote"
      title="新增文章"
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
              <el-option v-for="item of noteTypeList" :key="item.label" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="推荐指数" class="postInfo-container-item" prop="recommendationIndex">
            <el-rate
              v-model="note.recommendationIndex"
              :max="5"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              :low-threshold="1"
              :high-threshold="5"
              style="display:inline-block"
            />
          </el-form-item>
          <el-form-item label="文章内容" prop="content">
            <v-md-editor v-model="note.content" :include-level="[1,2,3,4]" height="400px"/>
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
            :defaultShowToc="true"
            left-toolbar="fullscreen toc"
            right-toolbar=""
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

export default {
  name: 'StudyNote',
  components: {
    elDialogCom
  },
  data() {
    return {
      noteList: [],
      showAddNote: false,
      showDetail: false,
      showToc: false,
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
        }
      ],
      // 组名信息
      note: {
        name: '',
        type: '',
        recommendationIndex: '',
        content: ''
      },
      inquire: {
        name_like: '',
        type: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
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
  mounted() {
    this.init()
  },
  methods: {
    init() {
      Note.getNote().then(list => {
        console.log(list)
        this.noteList = []
        this.noteList.push(...list)
      }).catch(_=>{
        this.noteList = []
        this.noteList.push(...db.note)
      })
    },
    addNote() {
      this.showAddNote = true
      this.note = Object.assign({}, {
        name: '',
        type: '',
        recommendationIndex: '',
        content: ''
      })
      this.$refs.note.resetFields()
    },
    queryTheArticle() {
      const condition = Object.fromEntries(
        Object.entries(this.inquire).filter(([key, value]) => value != null && value !== '')
      )
      console.log(condition)
      Note.getNote(condition).then(list => {
        this.noteList = []
        this.noteList.push(...list)
      }).catch(_=>{

      })
    },
    reset() {
      this.inquire = Object.assign({}, {
        name_like: '',
        type: ''
      })
    },
    closeAddNote() {
      this.showAddNote = false
    },
    submitForm() {
      console.log(this.note)
      this.$refs.note.validate(valid => {
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
        console.log(this.note)
        const id = this.noteList.length+1
        Note.postNote(
          {
            ...this.note,
            id
          }
        ).then(_ => {
          this.$message.success('添加文章成功！')
          this.init()
          this.showAddNote = false
        })
      })
    },
    closeDetail() {
      this.showDetail = false
    },
    viewInfo(index, val) {
      this.showDetail = true
      this.$nextTick(() => {
        this.articleDetails = val.content
        setTimeout(()=>{
          this.showToc=true
        },1000)
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
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  margin: 20px;

  .top {
    width: 100%;
    height: 15vh;
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
  }

}

.el-select {
  width: 100%;
}

.detail {
  overflow:auto;
  ::v-deep .github-markdown-body{
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

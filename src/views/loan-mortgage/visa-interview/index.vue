<template>
  <div class="app-container">
    <h2>面签列表</h2>
    <el-table :data="visaInterviewList" v-loading.body="visaInterviewListLoading" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column :sortable="true" prop="rootId" label="贷款编号" width="200"></el-table-column>
      <el-table-column :sortable="true" prop="clientName" label="客户姓名"></el-table-column>
      <el-table-column :sortable="true" prop="clientPhone" label="联系方式" width="200"></el-table-column>
      <el-table-column :sortable="true" prop="state" label="当前状态"
        :filter-method="filterState"
        :filters="[{ text: '待填写相关表格', value: 'open' }, { text: '已完成', value: 'finish' }, { text: '已关闭', value: 'close' }]"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <template v-if="scope.row.state == 'open'">
            <el-tag :type="scope.row.extra.catalogState.done ? 'success' : 'primary'">
              {{scope.row.extra.catalogState.message}}
            </el-tag>
            <el-tag :type="scope.row.extra.formState.done ? 'success' : 'primary'">
              {{scope.row.extra.formState.message}}
            </el-tag>
            <el-tag :type="scope.row.extra.visaState.done ? 'success' : 'primary'">
              {{scope.row.extra.visaState.message}}
            </el-tag>
          </template>
          <el-tag :type="tagState(scope.row.state)" v-else>
            {{formateState(scope.row.state)}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.state == 'open' ? false : true" type="primary" size="mini" @click="goNext(scope.row)">办理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getVisaListByEmployeeId
} from '@/api/mortgage'
export default {
  name: 'visa-interview',
  data () {
    return {
      visaInterviewList: null,
      visaInterviewListLoading: true
    }
  },
  created () {
    this.getVisaInterviewList()
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    getVisaInterviewList () {
      getVisaListByEmployeeId(this.userId).then(({ data }) => {
        this.visaInterviewListLoading = false
        if (data) {
          this.visaInterviewList = data
        } else {
          this.$message({
            type: 'error',
            message: '面签列表获取失败'
          })
        }
      })
    },
    goNext (item) {
      this.$router.push({ path: `/loan-mortgage/visa-interview/edit-info/${item.id}` })
    },
    tagState (item) {
      switch (item) {
        case 'open':
          return 'primary'
        case 'finish':
          return 'success'
        case 'close':
          return 'danger'
        default:
          return 'info'
      }
    },
    formateState (state) {
      switch (state) {
        case 'open':
          return '待填写相关表格'
        case 'finish':
          return '已完成'
        case 'close':
          return '已关闭'
        default:
          return '其他'
      }
    },
    filterState (value, row) {
      return row.state === value
    }
    // assignTask (item) {
    //   this.selectedTask = item
    //   getAssignUserList(this.departmentId).then(response => {
    //     this.assignUserListLoading = false
    //     if (response.data.status) {
    //       this.assignUserList = response.data.data
    //       this.assignUserList.forEach(function (item) {
    //         let prefix = '1'
    //         for (let i = 0; i < 10; i++) {
    //           prefix += Math.floor(Math.random() * 10)
    //         }
    //         item.phone = prefix
    //       })
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: '可分配用户列表获取失败，请稍候重试'
    //       })
    //     }
    //   })
    //   this.dialogTableVisible = true
    // },
    // assignTaskToUser (item) {
    //   assignTaskToUser(this.selectedTask.taskId, item.id).then(response => {
    //     if (response.data.status) {
    //       this.dialogTableVisible = false
    //       this.$message({
    //         type: 'success',
    //         message: '任务分配成功'
    //       })
    //       this.GetVisaInterviewList()
    //     }
    //   })
    //   console.log(item)
    // }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    background-color: #fff;
  }
</style>

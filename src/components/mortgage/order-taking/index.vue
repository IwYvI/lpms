<template>
  <div class="app-container">
    <h2>客户交接表</h2>
    <el-form :model="checklistForm" :rules="rules" ref="checklistForm" label-width="200px">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="完成时间" prop="finishTime">
            <el-date-picker placeholder="选择日期" value-format="timestamp" v-model="checklistForm.finishTime"></el-date-picker>
          </el-form-item>
          <el-form-item label="客户姓名" prop="clientName">
            <el-input clearable v-model="checklistForm.clientName"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="clientPhone">
            <el-input clearable v-model="checklistForm.clientPhone" placeholder="请填写手机号"></el-input>
          </el-form-item>
          <el-form-item label="证件类型" prop="clientIdType">
            <el-select v-model="checklistForm.clientIdType" placeholder="请选择">
              <el-option v-for="item in cardType.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="clientIdNumber">
            <el-input clearable v-model="checklistForm.clientIdNumber"></el-input>
          </el-form-item>
          <el-form-item label="工作种类" prop="clientWorkType">
            <el-select v-model="checklistForm.clientWorkType" placeholder="请选择">
              <el-option v-for="item in workType.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作单位" prop="clientWorkUnit">
            <el-input clearable v-model="checklistForm.clientWorkUnit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <el-button @click.prevent="addHouseProperty" type="primary">添加房产信息</el-button>
          </el-form-item>
          <div v-for="(item, index) in checklistForm.houses" :key="item.id" class="house-info">
            <el-form-item :label="'房产' + (index + 1) + '：'" style="font-weight:bold"><el-button @click.prevent="removeHouseProperty(item)" type="danger">删除</el-button></el-form-item>
            <el-form-item label="面积（性质）" :prop="'houses.' + index + '.area'" :rules="[{ required: true, message: '面积不能为空' }, { type: 'number', message: '面积必须为数字值' }]">
              <el-input clearable v-model.number="item.area" type="number" min="0" @input="calcTotalPrice(item.area, item.enquiryResult, index)"><template slot="append">平米</template></el-input>
            </el-form-item>
            <el-form-item label="询价结果" :prop="'houses.' + index + '.enquiryResult'" :rules="[{ required: true, message: '询价结果不能为空' }, { type: 'number', message: '询价结果必须为数字值' }]">
              <el-input clearable v-model.number="item.enquiryResult" type="number" min="0" @input="calcTotalPrice(item.area, item.enquiryResult, index)"><template slot="append">元/平米</template></el-input>
            </el-form-item>
            <el-form-item label="总价" :prop="'houses.' + index + '.totalPrice'">
              <el-input v-model.number="item.totalPrice" type="number" readonly><template slot="append">元</template></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <el-alert title="如没有房产，请点击删除按钮" type="warning"></el-alert>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="10">
          <el-form-item label="单子来源渠道" prop="checklistSource">
            <el-select v-model="checklistForm.checklistSource" placeholder="请选择">
              <el-option v-for="item in listSource.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="中介名称" prop="agentName">
            <el-input clearable v-model="checklistForm.agentName"></el-input>
          </el-form-item>
          <el-form-item label="其他备注事项" prop="remark">
            <el-input clearable type="textarea" v-model="checklistForm.remark" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="借款品种" prop="loanVariety">
            <el-select v-model="checklistForm.loanVariety" placeholder="请选择">
              <el-option v-for="item in loanVariety.value" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请贷款金额" prop="loanAmount">
            <el-input clearable v-model.number="checklistForm.loanAmount" type="number"><template slot="append">元</template></el-input>
          </el-form-item>
          <el-form-item label="申请贷款期限" prop="loanPeriod">
            <el-input clearable v-model.number="checklistForm.loanPeriod" type="number"><template slot="append">月</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="">
        <el-button type="primary" :loading="formLoading" @click="submitForm('checklistForm')">提交</el-button>
        <el-button @click="resetForm('checklistForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <flow-complete-dialog
      :loanId="loanId"
      :loanStatus="loanStatus"
      :loanLastStatus="loanLastStatus"
      :dialogVisible="dialogVisible"
      :showReturnButton="false"
      :listPath="listPath"
      :nextPath="nextPath"
    ></flow-complete-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getStaticIndexByKey, saveChecklist, getChecklistById, createTask } from '@/api/mortgage'

export default {
  name: 'order-taking',
  data () {
    return {
      checklistForm: {
        finishTime: null,
        clientName: null,
        clientPhone: null,
        clientIdType: null,
        clientIdNumber: null,
        clientWorkType: null,
        clientWorkUnit: null,
        loanVariety: null,
        loanAmount: null,
        loanPeriod: null,
        houses: [{
          area: null,
          enquiryResult: null,
          totalPrice: null
        }],
        checklistSource: null,
        agentName: null,
        remark: null
      },
      rules: {
        finishTime: [{ required: true, message: '完成时间不能为空' }],
        clientName: [{ required: true, message: '姓名不能为空' }],
        clientPhone: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[0-9]{10}$/, message: '手机号格式错误' }
        ],
        clientIdType: [{ required: true, message: '请选择证件类型' }],
        clientIdNumber: [
          { required: true, message: '证件号码不能为空' },
          { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/, message: '证件号码格式错误' }
        ],
        clientWorkType: [{ required: true, message: '请选择工作种类' }],
        clientWorkUnit: [{ required: true, message: '工作单位不能为空' }],
        loanVariety: [{ required: true, message: '请选择借款品种' }],
        loanAmount: [
          { required: true, message: '贷款金额不能为空' },
          { type: 'integer', message: '贷款金额必须为整数值' }
        ],
        loanPeriod: [
          { required: true, message: '贷款期限不能为空' },
          { type: 'integer', message: '贷款期限必须为整数值' }
        ],
        checklistSource: [{ required: true, message: '请选择单子来源渠道' }],
        agentName: [{ required: true, message: '中介不能为空' }]
      },
      formLoading: false,
      loanId: '',
      loanStatus: '',
      loanLastStatus: '',
      dialogVisible: false,
      listPath: '',
      nextPath: '/loan-mortgage/interview',
      cardType: {
        key: 'mortgagechecklistcardtype',
        value: []
      },
      workType: {
        key: 'mortgagechecklistworktype',
        value: []
      },
      loanVariety: {
        key: 'mortgagechecklistloanvariety',
        value: []
      },
      listSource: {
        key: 'mortgagechecklistsource',
        value: []
      }
    }
  },
  props: {
    checklistId: '',
    showFlowDialog: {
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    removeHouseProperty (house) {
      const index = this.checklistForm.houses.indexOf(house)
      if (index !== -1) {
        this.$confirm('是否清除该条房产信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.checklistForm.houses.splice(index, 1)
        }).catch(() => {})
      }
    },
    addHouseProperty () {
      this.checklistForm.houses.push({
        area: null,
        enquiryResult: null,
        totalPrice: null
      })
    },
    calcTotalPrice (area, singlePrice, index) {
      if (area && singlePrice) {
        if (parseFloat(area).toString() !== 'NaN' && parseFloat(singlePrice).toString() !== 'NaN') {
          this.checklistForm.houses[index].totalPrice = area * singlePrice
        } else {
          this.checklistForm.houses[index].totalPrice = null
        }
      } else {
        this.checklistForm.houses[index].totalPrice = null
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 显示流程弹窗，表明是在流程中引用
          if (this.showFlowDialog) {
            this.$confirm('请确认客户交接表填写无误，是否提交？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'info',
                message: '正在处理...'
              })
              this.formLoading = true
              createTask(this.userId).then(({ data }) => {
                if (data) {
                  const checklistId = data.id
                  this.loanLastStatus = data.des
                  saveChecklist(this.checklistForm, checklistId).then(({ data }) => {
                    // 关闭所有消息
                    this.$message.closeAll()
                    this.formLoading = false
                    if (data) {
                      this.loanId = data.rootId
                      this.loanStatus = data.des
                      this.dialogVisible = true
                    } else {
                      this.$message({
                        type: 'error',
                        message: '客户交接表保存失败'
                      })
                    }
                  })
                } else {
                  this.$message.closeAll()
                  this.formLoading = false
                  this.$message({
                    type: 'error',
                    message: '任务创建失败'
                  })
                }
              })
            }).catch(() => {})
          } else {
            // 不显示流程弹窗，表明是在订单管理中引用
            this.formLoading = true
            saveChecklist(this.checklistForm, this.checklistId).then(({ data }) => {
              this.formLoading = false
              if (data) {
                this.$message({
                  type: 'success',
                  message: '客户交接表保存成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '客户交接表保存失败'
                })
              }
            })
          }
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getStaticIndex (staticIndex) {
      getStaticIndexByKey(staticIndex.key).then(({ data }) => {
        if (data) {
          staticIndex.value = data[staticIndex.key]
        } else {
          this.$message({
            type: 'error',
            message: '静态索引获取失败'
          })
        }
      })
    }
  },
  created () {
    this.getStaticIndex(this.cardType)
    this.getStaticIndex(this.workType)
    this.getStaticIndex(this.loanVariety)
    this.getStaticIndex(this.listSource)
    if (this.checklistId) {
      getChecklistById(this.checklistId).then(({ data }) => {
        if (data) {
          // console.log(data)
          this.checklistForm = JSON.parse(JSON.stringify(data))
          // 类型转换
          this.checklistForm.loanPeriod = parseInt(this.checklistForm.loanPeriod)
          this.checklistForm.houses.forEach(item => {
            item.area = parseFloat(item.area)
            item.enquiryResult = parseFloat(item.enquiryResult)
          })
        } else {
          this.$message({
            type: 'error',
            message: '客户交接表数据获取失败'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    padding: 20px;
    background-color: #fff;
  }
</style>

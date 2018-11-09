import qs from 'qs'
import request from '@/utils/request'

// 抵押贷款api

// ***********************接单开始***************************
// export function saveCheckList (checklist, employeeId) {
//   return request({
//     url: '/checklist/save',
//     method: 'post',
//     data: qs.stringify({
//       checklist,
//       employeeId
//     })
//   })
// }
export function getCheckList (checklistId) {
  return request({
    url: `/checklist/${checklistId}`,
    method: 'get'
  })
}
// ***********************接单结束***************************

// ***********************面谈开始***************************
// 根据id获取某人的面谈任务
export function getInterviewById (id) {
  return request({
    url: `/task/m/view/${id}`,
    method: 'get'
  })
}
// 获取所有的面谈任务列表
export function getInterviewList () {
  return request({
    url: '/task/m/view',
    method: 'get'
  })
}
// 添加面谈建议
export function saveInterviewSuggestion (advice, taskId, employeeId) {
  return request({
    url: '/view/save',
    method: 'post',
    data: qs.stringify({
      advice,
      taskId,
      employeeId
    })
  })
}
// 废单
export function wasteSheet (taskId, employeeId) {
  return request({
    url: '/view/suspend',
    method: 'post',
    data: qs.stringify({
      taskId,
      employeeId
    })
  })
}
// 获取可分配用户列表
export function getAssignUserList (departmentId) {
  return request({
    url: `/employee/allModel/${departmentId}`,
    method: 'get'
  })
}
// 分配任务
export function assignTaskToUser (taskId, employeeId) {
  return request({
    url: '/task/m/assign',
    method: 'post',
    data: qs.stringify({
      taskId,
      employeeId
    })
  })
}
// ***********************面谈结束***************************

// ***********************面签开始***************************
// 获取所有面签列表
export function getVisaInterviewList () {
  return request({
    url: '/task/m/visa',
    method: 'get'
  })
}
// 根据用户id获取面签
export function getVisaInterviewById (id) {
  return request({
    url: `/task/m/visa/${id}`,
    method: 'get'
  })
}

// 根据贷款id，检查面签状态
export function checkVisaStatus (loanId) {
  return request({
    url: '/task/m/checkVisaStatus',
    method: 'get',
    params: { loanId }
  })
}

// 根据id获取面签部分的资料目录表
export function getVisaInterviewCatalog (catalogId) {
  return request({
    url: `/visa/catalog/${catalogId}`,
    method: 'get'
  })
}
// 保存资料目录表
export function saveVisaInterviewCatalog (catalog, taskId, employeeId) {
  return request({
    url: '/visa/catalog/save',
    method: 'post',
    data: qs.stringify({
      catalog,
      taskId,
      employeeId
    })
  })
}

// 根据id获取面签部分的个人贷款申请表
export function getVisaInterviewForm (formId) {
  return request({
    url: `/visa/form/${formId}`,
    method: 'get'
  })
}
// 保存个人贷款申请表
export function saveVisaInterviewForm (form, taskId) {
  return request({
    url: '/visa/form/save',
    method: 'post',
    data: qs.stringify({
      form,
      taskId
    })
  })
}
// 保存面签
export function saveVisaInterview (time, address, taskId) {
  return request({
    url: '/visa/save',
    method: 'post',
    data: qs.stringify({
      time,
      address,
      taskId
    })
  })
}

// ***********************面签结束***************************

// ***********************评估下单开始***************************
// 根据员工id获取评估下单列表
export function getOrderListById (employeeId) {
  return request({
    url: `/task/m/order/${employeeId}`,
    method: 'get'
  })
}
export function checkOrderStatus (loanId) {
  return request({
    url: '/task/m/checkOrderStatus',
    method: 'get',
    params: {
      loanId
    }
  })
}
export function setOrderStatus (time, company, taskId) {
  return request({
    url: '/order/state/save',
    method: 'post',
    data: qs.stringify({
      time,
      company,
      taskId
    })
  })
}
export function saveReports (time, type, reports, taskId) {
  return request({
    url: '/order/report/save',
    method: 'post',
    data: qs.stringify({
      time,
      type,
      reports,
      taskId
    })
  })
}
// ***********************评估下单结束***************************

// ***********************审批开始***************************

export function getApproveListById (employeeId) {
  return request({
    url: `/task/m/approve/${employeeId}`,
    method: 'get'
  })
}
export function confirmCatalogComplete (taskId, employeeId, catalog) {
  return request({
    url: '/approve/completeData',
    method: 'post',
    data: qs.stringify({
      taskId,
      employeeId,
      catalog
    })
  })
}

export function finishBaoshen (time, taskId) {
  return request({
    url: '/approve/submit',
    method: 'post',
    data: qs.stringify({
      time,
      taskId
    })
  })
}

export function getLoanCondition () {
  return request({
    url: '/loanCondition/all',
    method: 'get'
  })
}

export function confirmApproveStatus (approve, taskId) {
  return request({
    url: '/approve/save',
    method: 'post',
    data: qs.stringify({
      approve,
      taskId
    })
  })
}
export function saveReport (time, reports, taskId) {
  return request({
    url: '/approve/report/save',
    method: 'post',
    data: qs.stringify({
      time,
      reports,
      taskId
    })
  })
}

// ***********************审批结束***************************

// ***********************抵押结束***************************

export function getMortgageListById (employeeId) {
  return request({
    url: `/task/m/mortgage/${employeeId}`,
    method: 'get'
  })
}

export function confirmMortgage (time, taskId) {
  return request({
    url: '/mortgage/confirm',
    method: 'post',
    data: qs.stringify({
      time,
      taskId
    })
  })
}

export function guaranteeFlow (needStamp, stampTime, guaranteeTime, taskId, loanId) {
  return request({
    url: '/mortgage/guarantee',
    method: 'post',
    data: qs.stringify({
      needStamp,
      stampTime,
      guaranteeTime,
      taskId,
      loanId
    })
  })
}
// ***********************抵押结束***************************

// ***********************收费开始***************************

export function getChargeListById (employeeId) {
  return request({
    url: `/task/m/charge/${employeeId}`,
    method: 'get'
  })
}

export function confirmCharge (time, taskId) {
  return request({
    url: '/charge/confirm',
    method: 'post',
    data: qs.stringify({
      time,
      taskId
    })
  })
}

// ***********************收费结束***************************

// ***********************放款开始***************************

export function getLoanListById (employeeId) {
  return request({
    url: `/task/m/loan/${employeeId}`,
    method: 'get'
  })
}

export function confirmLoan (taskId) {
  return request({
    url: '/loan/confirm',
    method: 'post',
    data: qs.stringify({
      taskId
    })
  })
}

// ***********************放款结束***************************

// 静态索引
// export function getStaticIndexByKey (key) {
//   return request({
//     url: '/tableValue/value/{key}',
//     method: 'get',
//     params: {
//       key
//     }
//   })
// }

// ************************* 以下为v2 *******************************

// ************************* 主任务开始 *******************************

/**
 * 创建新的抵押任务
 * @param {*} employeeId 员工id
 */
export function createTask (employeeId) {
  return request({
    url: '/mortgage',
    method: 'post',
    data: qs.stringify({
      employeeId
    })
  })
}

// ************************* 主任务结束 *******************************

// ************************* 接单开始 *******************************
/**
 * 保存接单表
 * @param {*} checkList 接单表对象
 * @param {*} checklistId 接单表id
 */
export function saveCheckList ({
  datetime,
  clientName,
  clientPhone,
  clientIdType,
  clientIdNumber,
  clientWorkType,
  clientWorkUnit,
  loanVariety,
  loanAmount,
  loanPeriod,
  checklistSource,
  agentName,
  remark,
  houses
}, checklistId) {
  return request({
    url: `/mortgage/checklist/${checklistId}`,
    method: 'post',
    data: qs.stringify({
      checklistId,
      datetime,
      clientName,
      clientPhone,
      clientIdType,
      clientIdNumber,
      clientWorkType,
      clientWorkUnit,
      loanVariety,
      loanAmount,
      loanPeriod,
      checklistSource,
      agentName,
      remark,
      houses: JSON.stringify(houses)
    })
  })
}

// ************************* 接单结束 *******************************

// ************************* 面谈开始 *******************************

/**
 * 获取面谈列表
 */
export function getViewList () {
  return request({
    url: '/mortgage/view',
    method: 'get'
  })
}
/**
 * 根据员工id获取面谈列表
 * @param {*} employeeId 员工id
 */
export function getViewListByEmployeeId (employeeId) {
  return request({
    url: `/mortgage/view/employee/${employeeId}`,
    method: 'get'
  })
}

/**
 * 保存面谈数据
 * @param {*} param0 面谈建议表
 * @param {*} viewId 面谈id
 */
export function saveView ({
  finishTime,
  proposedInstitution,
  proposedClerk,
  proposedAmount,
  proposedTime,
  rate,
  repaymentType,
  clientPurposeType,
  clientPurpose,
  surveyOpinion
}, viewId) {
  return request({
    url: `/mortgage/view/${viewId}`,
    method: 'post',
    data: qs.stringify({
      viewId,
      finishTime,
      proposedInstitution,
      proposedClerk,
      proposedAmount,
      proposedTime,
      rate,
      repaymentType,
      clientPurposeType,
      clientPurpose,
      surveyOpinion
    })
  })
}
// ************************* 面谈结束 *******************************

// ************************* 表单字段及静态索引管理开始 *******************************

/**
 * 根据key获取索引列表
 * @param {string} key 索引key
 */
export function getStaticIndexByKey (key) {
  return request({
    url: '/tableValue/value',
    method: 'get',
    params: {
      key
    }
  })
}

// ************************* 表单字段及静态索引管理结束 *******************************

// ************************* 以上为v2 *******************************

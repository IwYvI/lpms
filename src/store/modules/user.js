import { login, logout } from '@/api/login'
import {
  setToken, removeToken,
  getPhone, setPhone, removePhone,
  getUsername, setUsername, removeUsername,
  getUserId, setUserId, removeUserId,
  getDepartmentId, setDepartmentId, removeDepartmentId
} from '@/utils/auth'

const user = {
  state: {
    phone: getPhone(),
    username: getUsername(),
    userId: getUserId(),
    departmentId: getDepartmentId()
  },
  mutations: {
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    },
    SET_DEPARTMENT_ID: (state, departmentId) => {
      state.departmentId = departmentId
    }
  },

  actions: {
    // 登录
    LoginByUsername ({ commit }, userInfo) {
      const username = userInfo.name.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          setToken(response.headers.token)
          const data = response.data.data
          if (data) {
            setPhone(data.phone)
            setUsername(data.name)
            setUserId(data.id)
            setDepartmentId(data.departmentId)
            commit('SET_PHONE', data.phone)
            commit('SET_USERNAME', data.name)
            commit('SET_USER_ID', data.id)
            commit('SET_DEPARTMENT_ID', data.departmentId)
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          removeToken()
          removePhone()
          removeUsername()
          removeUserId()
          removeDepartmentId()
          commit('SET_PHONE', '')
          commit('SET_USERNAME', '')
          commit('SET_USER_ID', '')
          commit('SET_DEPARTMENT_ID', '')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user

<template>
  <scroll-bar>
    <img :src="isCollapse ? logoMini : logo" alt="永兴日成贷款管理系统" :width="isCollapse ? '36px' : '180px'">
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import logo from '@/assets/logo-new.png'
import logoMini from '@/assets/loan.png'
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  data () {
    return {
      logo,
      logoMini
    }
  },
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes () {
      return this.$router.options.routes
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>

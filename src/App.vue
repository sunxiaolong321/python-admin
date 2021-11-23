<template>
  <el-container v-if="showMenu" class="container">
    <el-aside class="aside">
      <div class="head">侧标题栏</div>
      <el-menu default-active="1" background-color="#222832" text-color="#fff" :router="true">
        <el-sub-menu index="1">
          <template #title>试题相关</template>
          <el-menu-item-group>
            <el-menu-item index="/dashboard">仪表盘</el-menu-item>
            <el-menu-item index="/testcases">试题管理</el-menu-item>
            <el-menu-item index="/demo">Demo</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container class="content">
      <el-header height="50px">
        <Header></Header>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </el-container>

  <el-container v-else class="container" v-loading="loading">
    <router-view @loading="changeLoading" />
  </el-container>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { toRefs, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      showMenu: false,
      loading: false
    })

    watch(() => route.path, (path) => {
      if (path === '/login') {
        state.showMenu = false
      } else {
        state.showMenu = true
      }
    })

    const changeLoading = (value) => {
      state.loading = value
    }

    return {
      ...toRefs(state),
      changeLoading
    }
  }
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
  background-color: #ffffff;
}
.container {
  background: #f2f6fc;
  height: 100vh;
}
.aside {
  width: 200px !important;
  background-color: #222832;
  overflow: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
.aside::-webkit-scrollbar {
  display: none;
}
.head {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}

.content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}
</style>
<style>
.el-header,
.el-footer {
  background-color: #fff;
  color: (--el-text-color-primary);
  height: 50px;
  text-align: center;
  line-height: 50px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: bold;
}
.el-main {
  margin-block: 10px;
  flex: 1;
  overflow: hidden;
}
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.el-menu {
  border-right: none !important;
}
.el-submenu {
  border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.el-submenu:first-child {
  border-top: none;
}
.el-submenu [class^="el-icon-"] {
  vertical-align: -1px !important;
}
a {
  color: #409eff;
  text-decoration: none;
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
.el-popper__arrow {
  display: none;
}
</style>

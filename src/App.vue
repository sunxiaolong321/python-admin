<template>
  <el-container class="container">
    <el-aside class="aside">
      <div class="head">侧标题栏</div>
      <el-menu default-active="1" background-color="#222832" text-color="#fff" :router="true">
        <el-sub-menu index="1">
          <template #title>试题相关</template>
          <el-menu-item-group>
            <el-menu-item index="/testcase">试题管理</el-menu-item>
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
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: "App",
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
  background-color: #ffffff;
}
.container {
  background: #F2F6FC;
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
  /* margin-top: 10px; */
  background: #fff;
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

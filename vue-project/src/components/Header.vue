<template>
  <div class="header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand">
      <img :src="imgSrc" alt="" class="img">
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">首页</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getOut } from '../model/getData.js'
export default {
  name: 'Header',
  data () {
    return {
      imgSrc: 'http://elm.cangdu.org/img/default.jpg'
    }
  },
  methods: {
    async handleCommand (command) {
      if (command === 'home') {
        this.$router.push('/manage')
      }
      if (command === 'logout') {
        let res = await getOut()
        if (res.code === 0) {
          this.$message({
            showClose: true,
            message: '退出成功',
            type: 'success'
          })
          this.$router.push('/')
        } else {
          this.$message({
            showClose: true,
            message: '退出失败',
            type: 'error'
          })
        }
      }
    }
  }
}
</script>

<style scoped>
  .header {
    height: 60px;
    background: #EFF2F7;
    padding: 0 30px 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .img {
    width: 36px;
    height: 36px;
    border-radius:50%;
  }
</style>

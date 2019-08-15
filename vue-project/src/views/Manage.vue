<template>
  <div class="manage">
    <el-row style="height:100%">
    <el-col :span="4" style="min-height:100%" class="listForm" v-if="isLogin">
      <el-menu :default-active="defaultActive" style="min-height: 100%" class="el-menu-vertical-demo"  background-color="#324057" text-color="#e4e4e4" active-text-color="#20a0ff" router>
        <el-menu-item index="manage">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">数据管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="userList">用户列表</el-menu-item>
            <el-menu-item index="shopList">商家列表</el-menu-item>
            <el-menu-item index="orderList">订单列表</el-menu-item>
            <el-menu-item index="foodList">食品列表</el-menu-item>
            <el-menu-item index="adminList">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-plus"></i>
            <span slot="title">添加数据</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="addShop">添加商铺</el-menu-item>
            <el-menu-item index="addGoods">添加商品</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="20" class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Manage',
  data () {
    return {
      header: '首页'
    }
  },
  mounted(){
    let token = localStorage.getItem('ACCESS_TOKEN')
    if(token) this.$store.commit('updateToken',{token})
  },
  computed: {
    defaultActive () {
      return this.$route.path.replace('/', '')
    },
    isLogin () {
      return  !!this.$store.state.accessToken
    }
  }
}
</script>

<style scoped>
  .el-menu-vertical-demo {
    height: 100vh;
  }
  i {
    color : '#e4e4e4';
  }
  .content {
    height: 100%;
    overflow: auto;
  }
  .manage {
    position: fixed;
    width: 100%;
    height: 100%;
  }

</style>

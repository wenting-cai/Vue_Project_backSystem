<template>
  <div class="user">
    <Header></Header>
    <div class="container">
      <el-table :data="tableData" stripe style="width:100%" class="table">
        <el-table-column prop="user_name" label="姓名" ></el-table-column>
        <el-table-column prop="create_time" label="注册日期" ></el-table-column>
        <el-table-column prop="city" label="地址" ></el-table-column>
        <el-table-column prop="admin" label="权限" ></el-table-column>
      </el-table>
    </div>
    <div class="pageination">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="size" layout = "total,prev,pager,next"  :total="total" :hide-on-single-page="true"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import { getAdminList, getAdminCount } from '../model/getData'
export default {
  name: 'UserList',
  data () {
    return {
      tableData: [],
      total: 0,
      size: 16,
      currentPage: 1,
      offset: 0
    }
  },
  components: {
    Header
  },
  created () {
    this.initDate()
  },
  methods: {
    async initDate () {
      try {
        let count = await getAdminCount()
        if (count.code === 0) {
          this.total = +count.count
        } else {
          throw Error('获取数据错误')
        }
        this.getAdminList()
      } catch (e) {
        console.log('获取数据失败')
      }
    },
    async getAdminList () {
      this.tableData = await getAdminList({ offset: this.offset, limit: this.size })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.size
      this.getAdminList()
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px 0 40px 20px;
}
</style>

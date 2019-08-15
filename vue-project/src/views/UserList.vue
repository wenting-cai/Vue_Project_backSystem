<template>
  <div class="user">
    <Header></Header>
    <div class="container">
      <el-table :data="tableData" stripe style="width:100%" class="table">
        <el-table-column type="index"  ></el-table-column>
        <el-table-column prop="registerDate" label="注册日期" ></el-table-column>
        <el-table-column prop="userName" label="用户姓名" ></el-table-column>
        <el-table-column prop="registerAddress" label="注册地址" ></el-table-column>
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
import { getUserList, userCount } from '../model/getData'
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
        let count = await userCount()
        if (count.code === 0) {
          this.total = +count.count
        } else {
          throw Error('获取数据错误')
        }
        this.getUserList()
      } catch (e) {
        console.log('获取数据失败')
      }
    },
    async getUserList () {
      let result = await getUserList({ offset: this.offset, limit: this.size })
      if (result.code === 0) {
        this.tableData = result.data
      } else {
        throw new Error('获取数据失败')
      }
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.size
      this.getUserList()
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px 0 40px 20px;
}
</style>

<template>
  <div class="shopList">
    <Header></Header>
    <div class="container">
      <el-table :data="tableDate" style="width:100%" @expand-change="expand" :expand-row-keys="expandRow" row-key="id">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户名">{{props.row.username}}</el-form-item>
              <el-form-item label="店铺名称">{{props.row.restaurant_name}}</el-form-item>
              <el-form-item label="收货地址">{{props.row.user_address}}</el-form-item>
              <el-form-item label="店铺ID">{{props.row.address_id}}</el-form-item>
              <el-form-item label="店铺地址">{{props.row.restraunt_address}}</el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单ID" prop="id"></el-table-column>
        <el-table-column label="总价格" prop="total_amount"></el-table-column>
        <el-table-column label="订单状态" prop="status_bar.title"></el-table-column>
        </el-table>
      <div class="pageination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="size"
          layout="total,prev,pager,next"
          :total="total"
          :hide-on-single-page="true"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import { getOrderCount, getOrderList, getUserInfo } from '../model/getData'
export default {
  name: 'OrderList',
  data () {
    return {
      tableDate: [],
      selectForm: {},
      selectOption: '',
      options: [],
      dialogTableVisible: false,
      formLabelWidth: '120px',
      currentPage: 1,
      size: 15,
      offset: 0,
      total: 0,
      expandRow: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async getOrder () {
      this.tableDate = await getOrderList({ offset: this.offset, limit: this.size })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.size
      this.getOrder()
    },
    async initData () {
      try {
        let count = await getOrderCount()
        if (count.code === 0) {
          this.total = +count.count
          console.log(this.total)
        } else {
          throw Error('获取数据错误')
        }
        this.getOrder()
      } catch (e) {
        throw Error('获取数据错误')
      }
    },
    async getSelectItem (row) {
      let users = await getUserInfo(row.user_id)
      this.selectForm = { ...row, ...{ username: users.username, user_address: users.user_address } }
      let filtered = this.tableDate.findIndex(item => item.id === row.id)
      this.tableDate.splice(filtered, 1, this.selectForm)
    },
    expand (row, status) {
      let temp = this.expandRow
      let isTrue = temp.find(item => item === row.id)
      if (isTrue) {
        this.expandRow = this.expandRow.filter(item => item !== row.id)
      } else {
        this.expandRow.push(row.id)
        this.getSelectItem(row)
      }
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #409eff;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

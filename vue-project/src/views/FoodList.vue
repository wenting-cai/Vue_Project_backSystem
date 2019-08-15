<template>
  <div class="shopList">
    <Header></Header>
    <div class="container">
      <el-table :data="tableDate" style="width:100%" @expand-change="expand" :expand-row-keys="expandRow" row-key="item_id">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="食品名称">{{props.row.name}}</el-form-item>
              <el-form-item label="餐馆名称">{{props.row.restranut_name}}</el-form-item>
              <el-form-item label="食品ID">{{props.row.item_id}}</el-form-item>
              <el-form-item label="餐馆ID">{{props.row.restaurant_id}}</el-form-item>
              <el-form-item label="食品介绍">{{props.row.description}}</el-form-item>
              <el-form-item label="餐馆地址">{{props.row.restranut_address}}</el-form-item>
              <el-form-item label="食品评分">{{props.row.rating}}</el-form-item>
              <el-form-item label="食品分类">{{props.row.catagory_name}}</el-form-item>
              <el-form-item label="月销售量">{{props.row.month_sales}}</el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="食品名称" prop="name"></el-table-column>
        <el-table-column label="食品介绍" prop="description"></el-table-column>
        <el-table-column label="评分" prop="rating"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="info" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleCancel(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="修改食品信息" :visible.sync="dialogTableVisible">
        <el-form :model="selectForm">
          <el-form-item label="食品名称" :label-width="formLabelWidth">
            <el-input v-model="selectForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="食品介绍" :label-width="formLabelWidth">
            <el-input v-model="selectForm.description" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="食品分类" :label-width="formLabelWidth">
            <el-select v-model="selectOption" @change="handleChange">
              <el-option v-for="item in options" :key="item.value" :lable="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食品图片" :label-width="formLabelWidth">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.tpicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img :src="selectForm.imgUrl" v-if="selectForm.imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-table :data="gridData" width="100%" fit>
          <el-table-column property="specs_name" label="规格"></el-table-column>
          <el-table-column property="packing_fee" label="包装费" ></el-table-column>
          <el-table-column property="price" label="价格" ></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="removeSpecs(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button @click="innerVisible = true" type="warning" style="margin:30px 200px 0 400px">添加规格</el-button>
        <el-dialog title="添加规格" :visible.sync="innerVisible" append-to-body>
          <el-form :model="addGrid" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="规格" prop="specs_name">
              <el-input v-model="addGrid.specs_name"></el-input>
            </el-form-item>
            <el-form-item label="包装费">
              <el-input-number v-model="addGrid.packing_fee"  :min="0" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="价格">
              <el-input-number v-model="addGrid.price"  :min="20" :max="100" ></el-input-number>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="innerVisible=false">取消</el-button>
            <el-button type="primary" @click="addGridRecord">确定</el-button>
          </div>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible=false">取消</el-button>
          <el-button type="primary" @click="updateFood" >确定</el-button>
        </div>
      </el-dialog>
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
import { getFoodList, getFoodCount, getRestaurant, getMenu, getMenuList, updateFoodList, cancelFoodList } from '../model/getData'
export default {
  name: 'ShopList',
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
      total: 17,
      ruleForm: {
        size: ''
      },
      rules: {
        specs_name: [{ required: true, message: '请输入规格', trigger: 'blur' }]
      },
      spec_num: 0,
      spec_price: 20,
      innerVisible: false,
      expandRow: [],
      gridData: [],
      addGrid: {
        specs_name: '',
        packing_fee: '',
        price: ''
      }
    }
  },
  created () {
    this.initData()
    this.getOptionsList()
  },
  methods: {
    async getFood () {
      this.tableDate = await getFoodList({ offset: this.offset, limit: this.size })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.size
      this.getFood()
    },
    async initData () {
      try {
        let count = await getFoodCount()
        if (count.code === 0) {
          this.total = +count.count
        } else {
          throw Error('获取数据错误')
        }
        this.getFood()
      } catch (e) {
        throw Error('获取数据错误')
      }
    },
    async handleEdit (index, row) {
      this.dialogTableVisible = true
      this.selectForm = row
      this.gridData = row.specfoods
      // console.log(this.tableDate)
      let { name } = await getMenu(row.category_id)
      this.selectOption = name
      // console.log(this.selectOption)
      if (!this.options.length) {
        this.getOptionsList()
      }
    },
    handleChange () {
      console.log(this.options)
      // console.log(this.selectOption)
    },
    handleAvatarSuccess (res, file) {
      this.selectForm.imgUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像只能是JPG格式')
      }
      if (!isLt2M) {
        this.$message.error('上传头片大小不能超过2MB')
      }
      return isJPG && isLt2M
    },
    async getOptionsList () {
      try {
        let catories = await getMenuList()
        if (catories.length) {
          let addNew = {}
          catories.forEach((item, index) => {
            addNew = {
              value: item.name,
              label: item.name
            }
            this.options.push(addNew)
          })
        }
      } catch (e) {
        throw new Error('options 获取数据失败')
      }
    },
    async handleCancel (index, row) {
      let cancelResult = await cancelFoodList({ ID: row.item_id })
      if (cancelResult.code === 0) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        await this.getFood()
        this.initData()
      }
      if (cancelResult.code === 1) {
        this.$message.error('亲,您的权限不足')
      }
    },
    async getSelectItem (row) {
      let restaurant = await getRestaurant(row.restaurant_id)
      let category = await getMenu(row.category_id)
      this.selectForm = { ...row, ...{ restranut_name: restaurant.name,
        restranut_address: restaurant.address,
        catagory_name: category.name } }
      let filtered = this.tableDate.findIndex(item => item.item_id === row.item_id)
      console.log(filtered)
      this.tableDate.splice(filtered, 1, this.selectForm)
      // console.log(this.tableDate)
    },
    expand (row, status) {
      let temp = this.expandRow
      let isTrue = temp.find(item => item === row.item_id)
      if (isTrue) {
        this.expandRow = this.expandRow.filter(item => item !== row.item_id)
      } else {
        this.expandRow.push(row.item_id)
        this.getSelectItem(row)
      }
    },
    addGridRecord () {
      this.innerVisible = false
      this.gridData.push(this.addGrid)
      console.log(this.gridData)
    },
    removeSpecs (index, row) {
      this.gridData.splice(index, 1)
    },
    async updateFood () {
      console.log(this.selectForm)
      this.dialogTableVisible = false
      let result = await updateFoodList(this.selectForm)
      if (result.code === 0) {
        this.$message({
          type: 'success',
          message: '更新食品信息成功'
        })
      } else {
        this.$message.error('更新食品信息失败')
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
.avatar-uploader, .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width:100px;
}
 .avatar-uploader:hover {
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

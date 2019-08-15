<template>
  <div class="shopList">
    <Header></Header>
    <div class="container">
      <el-table :data="tableDate" style="width:100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺名称">{{props.row.name}}</el-form-item>
              <el-form-item label="店铺地址">{{props.row.address}}</el-form-item>
              <el-form-item label="店铺介绍">{{props.row.introduce}}</el-form-item>
              <el-form-item label="店铺ID">{{props.row.ID}}</el-form-item>
              <el-form-item label="联系电话">{{props.row.phone}}</el-form-item>
              <el-form-item label="评分">{{props.row.score}}</el-form-item>
              <el-form-item label="销售量">{{props.row.sell}}</el-form-item>
              <el-form-item label="分类">{{props.row.catagory}}</el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="店铺名称" prop="name"></el-table-column>
        <el-table-column label="店铺地址" prop="address"></el-table-column>
        <el-table-column label="店铺介绍" prop="introduce"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="info" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="success" @click="addFoods(scope.$index,scope.row)">添加食品</el-button>
            <el-button size="mini" type="danger" @click="handleCancel(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="修改店铺信息" :visible.sync="dialogTableVisible">
        <el-form :model="selectForm">
          <el-form-item label="店铺名称" :label-width="formLabelWidth">
            <el-input v-model="selectForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth">
            <el-input v-model="selectForm.address" autocomplete="off"></el-input>
            <span>当前城市:西安</span>
          </el-form-item>
          <el-form-item label="店铺介绍" :label-width="formLabelWidth">
            <el-input v-model="selectForm.introduce" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="selectForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="店铺分类" :label-width="formLabelWidth">
            <el-cascader
              v-model="selectOption"
              :options="options"
              :props="{expandTrigger:'hover'}"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="商铺图片" label-width="100px">
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
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible=false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
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
import { getShopList, getShopCount, getCatoryList, updateShopList, cancelList } from '../model/getData'
export default {
  name: 'ShopList',
  data () {
    return {
      tableDate: [
        {
          name: '好滋好味鸡蛋仔',
          introduce: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          phone: '10333',
          sell: 12,
          ID: 88,
          score: 4.2,
          catagory: '异国料理/日韩料理',
          imgUrl: 'https://img14.360buyimg.com/n1/jfs/t15409/194/537034837/165965/31f3de9a/5a2f9636N7c532b49.jpg'
        }
      ],
      selectForm: {
        name: '好滋好味鸡蛋仔',
        introduce: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        phone: '10333',
        sell: 12,
        ID: 88,
        score: 4.2,
        catagory: '便当',
        imgUrl: 'https://img14.360buyimg.com/n1/jfs/t15409/194/537034837/165965/31f3de9a/5a2f9636N7c532b49.jpg'
      },
      selectOption: [],
      options: [],
      dialogTableVisible: false,
      formLabelWidth: '120px',
      currentPage: 1,
      size: 15,
      offset: 0,
      total: 17
    }
  },
  created () {
    this.initData()
    this.getOptionsList()
  },
  methods: {
    addFoods (index, row) {
      this.$router.push('/addGoods?restaurant_id=' + row.restaurant_id)
    },
    async getShop () {
      this.tableDate = await getShopList({ offset: this.offset, limit: this.size })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.size
      this.getShop()
    },
    async initData () {
      try {
        let count = await getShopCount()
        if (count.code === 0) {
          this.total = +count.count
        } else {
          throw Error('获取数据错误')
        }
        this.getShop()
      } catch (e) {
        throw Error('获取数据错误')
      }
    },
    handleEdit (index, row) {
      this.dialogTableVisible = true
      this.selectForm = row
      this.selectOption = row.catagory.split('/')
      // console.log(row)
      if (!this.options.length) {
        this.getOptionsList()
      }
    },
    handleChange () {
      console.log(this.selectOption)
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
        let catories = await getCatoryList()
        if (catories.length) {
          catories.forEach((item, index) => {
            if (item.sub_categories.length) {
              let addNew = {
                value: item.name,
                label: item.name,
                children: []
              }
              item.sub_categories.forEach((item, index) => {
                if (index === 0) return
                addNew.children.push({
                  value: item.name,
                  label: item.name
                })
              })
              this.options.push(addNew)
            }
          })
        }
      } catch (e) {
        throw new Error('options 获取数据失败')
      }
    },
    async confirm () {
      this.dialogTableVisible = false
      let params = this.selectForm
      params.catagory = this.selectOption.join('/')
      let returnRecord = await updateShopList(params)
      if (returnRecord.code === 0) {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }
      if (returnRecord.code === 1) {
        this.$message.error('此商铺用作展示不能用来修改')
      }
      this.initData()
    },
    async handleCancel (index, row) {
      let cancelResult = await cancelList({ ID: row.ID })
      if (cancelResult.code === 0) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        await this.getShop()
        this.initData()
        console.log(this.total)
      }
      if (cancelResult.code === 1) {
        this.$message.error('亲,您的权限不足')
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
  width:120px;
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
  width: 120px;
  height: 120px;
  display: block;
}
</style>

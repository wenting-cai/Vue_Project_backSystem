<template>
  <div class="addShop">
    <Header></Header>
    <el-row class="row">
      <el-col :span="15">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="店铺名称" prop="name">
            <el-input v-model="ruleForm.name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="ruleForm.address" size="small" placeholder="输入详细地址"></el-input>
            <span>当前城市：西安</span>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="ruleForm.phone" size="small"></el-input>
          </el-form-item>
          <el-form-item label="店铺简介" prop="introduce">
            <el-input v-model="ruleForm.introduce" size="small"></el-input>
          </el-form-item>
          <el-form-item label="店铺标语" prop="logo">
            <el-input v-model="ruleForm.logo" size="small"></el-input>
          </el-form-item>
          <el-form-item label="店铺分类" prop="catagory">
            <el-cascader
              v-model="ruleForm.catagory"
              :options="catagoryList"
              :props="{ expandTrigger: 'hover' }"
              size="small"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="店铺特点">
            <span>品牌保证</span>
            <el-switch v-model="ruleForm.brand" label="品牌保证"></el-switch>
            <span>蜂鸟专送</span>
            <el-switch v-model="ruleForm.fengBird"></el-switch>
            <span>新开店铺</span>
            <el-switch v-model="ruleForm.newShop"></el-switch>
            <div class="special">
              <span>外卖宝</span>
              <el-switch v-model="ruleForm.takeoutFood"></el-switch>
              <span>准时达</span>
              <el-switch v-model="ruleForm.ontime"></el-switch>
              <span>开发票</span>
              <el-switch v-model="ruleForm.bill"></el-switch>
            </div>
          </el-form-item>
          <el-form-item label="配送费" size="middle">
            <el-input-number v-model="ruleForm.deliveryFee" :min="0" :max="100" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="起送价" size="middle">
            <el-input-number v-model="ruleForm.startFee" :min="0" :max="100" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="营业时间" size="middle">
            <el-time-select
              placeholder="起始时间"
              v-model="ruleForm.startTime"
              :picker-options="{
           start: '05:30',
           step: '00:15',
           end: '24:00'
          }"
              class="startTime"
            ></el-time-select>
            <el-time-select
              placeholder="结束时间"
              v-model="ruleForm.endTime"
              :picker-options="{
          start: '05:30',
          step: '00:15',
          end: '24:00',
          minTime: ruleForm.startTime
          }"
            ></el-time-select>
          </el-form-item>
          <el-form-item label="上传店铺图像">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="ruleForm.imgUrl" :src="ruleForm.imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传营业执照">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="ruleForm.licence" :src="ruleForm.licence" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传餐饮许可证">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="ruleForm.service_licence" :src="ruleForm.service_licence" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="优惠活动" size="small">
            <el-select v-model="ruleForm.activi" clearable placeholder="请选择" @change="changeActivity">
              <el-option
                v-for="item in activityList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-table :data="acitvityRecord" stripe width="100%">
            <el-table-column label="活动标题" prop="title"></el-table-column>
            <el-table-column label="活动名称" prop="name"></el-table-column>
            <el-table-column label="活动详情" prop="detail"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="danger" @click="removeActivity(scope.$index, scope.row )">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-form-item class="bottom">
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getCatoryList, submitShopList } from '../model/getData'
import Header from '../components/Header'
export default {
  name: 'AddShop',
  components: {
    Header
  },
  data () {
    return {
      ruleForm: {
        name: '',
        address: '',
        phone: '',
        introduce: '',
        logo: '',
        brand: true,
        fengBird: true,
        newShop: true,
        takeoutFood: true,
        ontime: true,
        bill: true,
        deliveryFee: 10,
        startFee: 30,
        imgUrl: '',
        startTime: '',
        endTime: '',
        licence: '',
        service_licence: '',
        activi: '满减优惠',
        catagory: ['快餐便当', '简餐']
      },
      activityList: [
        {
          value: '满减优惠',
          label: '满减优惠'
        },
        {
          value: '优惠大酬宾',
          label: '优惠大酬宾'
        },
        {
          value: '新用户立减',
          label: '新用户立减'
        },
        {
          value: '进店领券',
          label: '进店领券'
        }
      ],
      catagoryList: [],
      rules: {
        name: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
      },
      acitvityRecord: [
        { title: '减', name: '满减优惠', detail: '满30减50, 满60减8' }
      ]
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    addActivity (detail) {
      let temp = {}
      temp.name = this.ruleForm.activi
      temp.detail = detail
      switch (this.ruleForm.activi) {
        case '满减优惠' :
          temp.title = '满'
          break
        case '优惠大酬宾' :
          temp.title = '优'
          break
        case '新用户立减' :
          temp.title = '新'
          break
        case '进店领券' :
          temp.title = '领'
          break
      }
      this.acitvityRecord.push(temp)
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
              this.catagoryList.push(addNew)
            }
          })
        }
      } catch (e) {
        throw new Error('options 获取数据失败')
      }
    },
    changeActivity () {
      this.$prompt('请输入活动详情', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.addActivity(value)
      }, () => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    removeActivity (index, row) {
      this.acitvityRecord.splice(index, 1)
    },
    async submitShopList () {
      let result = await submitShopList(this.ruleForm)
      if (result.code === 0) {
        this.$message({
          type: 'success',
          message: '创建成功，请去商家列表中查看'
        })
        this.$refs.ruleForm.resetFields()
      } else {
        this.$message.error('创建失败，请重试')
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.catagory = this.ruleForm.catagory.join('/')
          //  console.log(this.ruleForm.catagory)
          this.submitShopList()
        } else {
          this.$message.error('提交错误')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  created () {
    this.getOptionsList()
  },
  beforeRouteLeave (to, from, next) {
    this.$message({
      type: 'warning',
      message: '要离开增加店铺'
    })
    next()
  }
}
</script>

<style scoped>
.row {
  padding-top: 30px;
  padding-left: 350px;
}
span {
  margin-left: 5px;
  margin-right: 5px;
}
.special {
  margin-top: 5px;
}
.startTime {
  margin-right: 10px;
}
.avatar-uploader, .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100px;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.bottom {
  margin-top: 15px;
  margin-left: 200px;
}
</style>

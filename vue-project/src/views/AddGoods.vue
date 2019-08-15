<template>
  <div class="addGoods">
    <Header></Header>
      <el-row class="row">
        <el-col :span="14" :offset="4">
            <p class="demonstration">选择食品种类</p>
            <el-form :model="catoryForm"  :rules="rules" ref="catoryForm" label-width="100px" class="form" >
                <el-row class="selectCatory">
                  <el-form-item label="食品种类" prop="category_id">
                    <el-select v-model="catoryForm.category_id" placeholder="请选择" style="width:100%">
                      <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value" clearable></el-option>
                    </el-select>
                  </el-form-item>
                </el-row>
                <el-row class="addCatory" :style="showCatory ? 'height:185px' : '0'" >
                  <div class="add_category_row">
                    <el-form-item label="食品种类">
                      <el-input v-model="addFoods.name"></el-input>
                    </el-form-item>
                    <el-form-item label="种类描述">
                      <el-input v-model="addFoods.description"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="sumbitCatory">提交</el-button>
                    </el-form-item>
                  </div>
                </el-row>
                <el-row class="btnToAdd" >
                  <i class="el-icon-caret-top edit_icon" v-if="showCatory" ></i>
                  <i class="el-icon-caret-bottom edit_icon" v-else ></i>
                  <span @click="isShow">添加食品种类</span>
                </el-row>
                <p class="addFoods">添加食品</p>
                <el-row class="addAllFoods">
                  <el-form-item label="食品名称" prop="name">
                    <el-input v-model="catoryForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="食品详情" prop="description">
                    <el-input v-model="catoryForm.description"></el-input>
                  </el-form-item>
                  <el-form-item label="食品活动" prop="activity">
                    <el-input v-model="catoryForm.activity"></el-input>
                  </el-form-item>
                  <el-form-item label="上传食品图像" prop="imgUrl">
                    <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="catoryForm.imgUrl" :src="catoryForm.imgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="食品特点" prop="special">
                    <el-select v-model="catoryForm.special" multiple placeholder="请选择">
                      <el-option v-for="item in specialList" :key="item.value" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="食品规格" prop="specfoods.specs_name">
                    <el-radio v-model="catoryForm.specfoods.specs_name" label="单规格">单规格</el-radio>
                    <el-radio v-model="catoryForm.specfoods.specs_name" label="多规格">多规格</el-radio>
                  </el-form-item>
                  <el-form-item label="包装费" prop="specfoods.packing_fee">
                    <el-input-number v-model="catoryForm.specfoods.packing_fee" :min="0" :max="100"></el-input-number>
                  </el-form-item>
                  <el-form-item label="价格" prop="specfoods.price">
                    <el-input-number v-model="catoryForm.specfoods.price" :min="1" :max="100"></el-input-number>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('catoryForm')">确认添加食品</el-button>
                    <el-button type="warning" @click="resetForm('catoryForm')">重置</el-button>
                  </el-form-item>
                </el-row>
            </el-form>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import Header from '../components/Header'
import { getMenuList, addFoodsCatory, addFoods } from '../model/getData.js'
import { rename } from 'fs';
export default {
  name: 'AddGoods',
  components: {
    Header
  },
  data () {
    return {
      catoryForm: {
        category_id: '',
        description: '',
        name: '',
        imgUrl: '',
        specfoods : {
          packing_fee: 10,
          price: 20,
          specs_name:'单规格'
        },
        special:[],
        restaurant_id:''
      },
      selectOptions: [],
      specialList: [
        {
          label: '新品',
          value: '新品'
        },
        {
          label: '尝鲜',
          value: '尝鲜'
        },
        {
          label: '招牌',
          value: '招牌'
        }
      ],
      addFoods: {
        name: '',
        description: ''
      },
      showCatory: false,
      rules: {
        name: [{ required: true, message: '请输入食品名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    change () {
      console.log(this.catoryForm.name)
    },
    isShow () {
      this.showCatory = !this.showCatory
    },
    handleAvatarSuccess (res, file) {
      this.catoryForm.imageUrl = URL.createObjectURL(file.raw)
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
    async addFood () {
      let { code } = await addFoods(this.catoryForm)
      if (code === 0) {
        this.$message({ type: 'success', message: '添加成功'})
        this.$refs.catoryForm.resetFields()
      } else {
        this.$message.error('添加失败')
      }
    },
    submitForm (catoryForm) {
      this.$refs[catoryForm].validate((valid) => {
        if (valid) {
         this.addFood()
        } else {
          this.$message.error('请重试')
        }
      })
    },
    resetForm (catoryForm) {
      this.$refs[catoryForm].resetFields()
    },
    async getFoodsCatoryList () {
      let result = await getMenuList()
      // console.log(result)
      result.map((item,index) => {
        item.value = item.id
        item.label = item.name
      })
      this.selectOptions = result
    },
    async sumbitCatory () {
      let { code } = await addFoodsCatory(this.addFoods)
      if (code === '0') {
        this.$message({
          type: 'success',
          message: '提交成功'
        })
        this.addFoods.name = ''
        this.addFoods.description = ''
        this.showCatory = !this.showCatory
        this.getFoodsCatoryList()
      } else {
        this.$message.error('提交失败')
      }
    }
  },
  created () {
    if ( this.$route.query.restaurant_id) {
      this.catoryForm.restaurant_id = this.$route.query.restaurant_id
    } else {
      this.$confirm('添加商品需要选择一个商铺，现在就去选择商铺吗？','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/shopList')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    }
    this.getFoodsCatoryList()
  },
  computed: {
    selectValue() {
      return this.selectOptions[this.catoryForm.catory]|| {}
    }
  }
}
</script>

<style scoped lang="less">
  .row {
    /* padding-left: 400px; */
    margin-top: 20px;
  }
  p {
    text-align: center;
    margin-bottom: 10px;
  }
  .form {
    min-width: 400px;
    .selectCatory {
      border: 1px solid #eaeefb;
      padding: 10px 20px 30px 10px;
      border-radius: 6px;
      &:hover {
        box-shadow: 0 0 8px 0 rgba(232,237,250,.6),  0 2px 4px 0 rgba(232,237,250,.5);
        transition: all 400ms;
      }
    }
    .showEdit {
      height: 185px;
    }
    .addCatory {
      border-top: 1px solid #eaeefb;
      // padding: 10px 20px 10px;
      background: #f9fafc;
      border: 1px solid #eaeefb;
      border-top: none;
      border-bottom: none;
      box-sizing: border-box;
      overflow: hidden;
      height:0;
      transition: all 400ms;
    }
    .add_category_row {
      background: #f9fafc;
      padding: 10px 30px 0px 10px;
      border: 1px solid #eaeefb;
      border-top: none;
    }
    .btnToAdd {
      border: 1px solid #eaeefb;
      border-top: none;
      height: 40px;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
      color: #999;
      cursor: pointer;
      transition: all 400ms;
      span {
        font-size: 14px;
      }
      &:hover {
        background: #f9fafc; 
        transition: all 400ms;
        .edit_icon, span {
          color:#20a0ff;
        }
      }
    }
  }
  .addFoods {
    margin: 20px 0;
  }
  .addAllFoods {
    border: 1px solid #eaeefb;
    padding: 10px 8px 10px 40px;
    &:hover {
      box-shadow: 0 0 8px 0 rgba(232,237,250,.6),  0 2px 4px 0 rgba(232,237,250,.5);
      transition: all 400ms;
    }
  }
   .avatar-uploader, .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width:100px;
  }
  .el-upload--text {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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

</style>

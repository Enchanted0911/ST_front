<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="'/public/01.xlsx'" target="_blank" download="01.xlsx" >点击下载模版</a>
        </el-tag>

      </el-form-item>

      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :headers="authHeader"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API+'/rabbit/back/subject'"
          name="file"
          accept=".xlsx">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import store from '@/store'
import { getToken } from '@/utils/auth'
export default {
    data() {
        return {
            BASE_API: process.env.VUE_APP_BASE_API, // 接口API地址
            importBtnDisabled: false, // 按钮是否禁用,
            loading: false,
            authHeader: {'Authorization': ''}
        }
    },
    created() {

    },
    methods:{
        //点击按钮上传文件到接口里面
        submitUpload() {
            this.importBtnDisabled = true
            this.loading = true

            // 设置header
            if (store.getters.token) {
              this.authHeader['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
            }
            // js: document.getElementById("upload").submit()
            this.$refs.upload.submit()
            this.importBtnDisabled = false
            this.loading = false
        },
        //上传成功
        fileUploadSuccess(response) {
            //提示信息
            this.loading = false
            this.$message({
                type: 'success',
                message: '添加课程分类成功'
            })
            //跳转课程分类列表
            //路由跳转
            this.$router.push({path:'/edu/subject/list'})
        },
        //上传失败
        fileUploadError() {
            this.loading = false
            this.$message({
                type: 'error',
                message: '添加课程分类失败'
            })
        }
    }
}
</script>

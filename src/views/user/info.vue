<template>
  <div class="app-container">
    <el-form
      ref="ruleForm"
      :model="user"
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="String(user.avatar)" />
        <!-- 文件上传按钮 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          >更换头像
        </el-button>
        <image-cropper
          v-show="imagecropperShow"
          :key="imagecropperKey"
          :width="300"
          :height="300"
          :url="BASE_API + '/rabbit/back/oss/acl-user-avatar'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>

      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="user.nickName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :disabled="saveBtnDisabled"
          @click="submitForm('ruleForm')"
          >保存</el-button
        >
        <el-button @click="resetForm('ruleForm')">清空</el-button>
        <el-button @click="recoverForm()">还原</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import userApi from "@/api/acl/user";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
export default {
  components: { ImageCropper, PanThumb },
  mounted() {
    window.Vue = this;
  },
  data() {
    return {
      user: {
        username: "",
        nickName: "",
        avatar: "",
      },
      recoverUser: {},
      // 上传弹框组件是否显示
      imagecropperShow: false,
      imagecropperKey: 0, // 上传组件key值
      BASE_API: process.env.VUE_APP_BASE_API, // 获取dev.env.js里面地址
      saveBtnDisabled: false, // 保存按钮是否禁用,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 1,
            max: 17,
            message: "长度在 1 到 17 个字符",
            trigger: "blur",
          },
        ],
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 1,
            max: 17,
            message: "长度在 1 到 17 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    close() {
      // 关闭上传弹框的方法
      this.imagecropperShow = false;
      // 上传组件初始化
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    // 上传成功方法
    cropSuccess(data) {
      this.imagecropperShow = false;
      // 上传之后接口返回图片地址
      this.user.avatar = data;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    fetchData() {
      userApi.currentUserInfo().then((response) => {
        this.user = response.data;
        this.recoverUser = JSON.parse(JSON.stringify(this.user))
      });
    },
    submitForm(formName) {
      this.saveBtnDisabled = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userApi.updateUserSelf(this.user).then((response) => {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            this.fetchData()
          });
        } else {
          this.$message.error('请正确设置用户信息');
          return false;
        }
      });
      this.saveBtnDisabled = false
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    recoverForm() {
      this.user = JSON.parse(JSON.stringify(this.recoverUser))
    },
  },
};
</script>
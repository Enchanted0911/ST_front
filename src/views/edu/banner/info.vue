<template>
  <div class="app-container">
    banner详情
    <el-form label-width="120px">
      <el-form-item label="banner标题">
        <el-input v-model="banner.title" />
      </el-form-item>
      <el-form-item label="banner排序">
        <el-input-number
          v-model="banner.sort"
          controls-position="right"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="banner链接">
        <el-input v-model="banner.linkUrl" />
      </el-form-item>
      <el-form-item label="banner图片">
        <img :src="this.banner.imageUrl" width="800px">
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="toggleShow()"
        >更换banner
        </el-button>
        <image-cropper
          v-show="show"
          :key="imagecropperKey"
          no-circle
          no-square
          :width="1920"
          :height="480"
          :url="BASE_API + '/eduOss/fileOss/banner'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import bannerApi from '@/api/edu/banner'
import ImageCropper from '@/components/ImageCropper'
export default {
  components: {
    ImageCropper
  },
  data() {
    return {
      show: false,
      imagecropperKey: 0,
      banner: {
        title: '',
        sort: 0,
        linkUrl: '',
        imageUrl: ''
      },
      BASE_API: process.env.VUE_APP_BASE_API, // 获取dev.env.js里面地址
      saveBtnDisabled: false // 保存按钮是否禁用,
    }
  },
  watch: {
    // 监听
    $route(to, from) {
      // 路由变化方式，路由发生变化，方法就会执行
      this.init()
    }
  },
  created() {
    // 页面渲染之前执行
    this.init()
  },
  methods: {
    close() {
      // 关闭上传弹框的方法
      this.show = false
      this.imagecropperKey = this.imagecropperKey + 1
    },
    toggleShow() {
      this.show = true
    },
    cropSuccess(data) {
      this.show = false
      // 上传之后接口返回图片地址
      this.banner.imageUrl = data.url
      this.imagecropperKey = this.imagecropperKey + 1
    },
    init() {
      // 判断路径有id值,做修改
      if (this.$route.params && this.$route.params.id) {
        // 从路径获取id值
        const id = this.$route.params.id
        // 调用根据id查询的方法
        this.getInfo(id)
      } else {
        // 路径没有id值，做添加
        // 清空表单
        this.banner = {}
      }
    },
    // 根据banner id查询的方法
    getInfo(id) {
      bannerApi.getBannerInfo(id).then((response) => {
        this.banner = response.data.banner
      })
    },
    saveOrUpdate() {
      if (!this.banner.id) {
        this.saveBanner()
      } else {
        this.updateBanner()
      }
    },
    // 修改banner的方法
    updateBanner() {
      bannerApi.updateBannerInfo(this.banner).then((response) => {
        // 提示信息
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        // 回到列表页面 路由跳转
        this.$router.push({ path: '/edu/banner/list' })
      })
    },
    // 添加banner的方法
    saveBanner() {
      bannerApi.addBanner(this.banner).then((response) => {
        // 添加成功
        // 提示信息
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        // 回到列表页面 路由跳转
        this.$router.push({ path: '/edu/banner/list' })
      })
    }
  }
}
</script>

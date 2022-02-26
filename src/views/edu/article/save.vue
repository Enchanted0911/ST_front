<template>
  <div class="app-container">
    <h2 style="text-align: center">编辑文章信息</h2>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="articleInfo.title"
          placeholder=" 示例：年度十佳牛马人"
        />
      </el-form-item>

      <!-- 所属分类 TODO -->
      <el-form-item label="文章分类">
        <el-select
          v-model="articleInfo.subjectParentId"
          placeholder="一级分类"
          @change="subjectLevelOneChanged"
        >
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>

        <!-- 二级分类 -->
        <el-select v-model="articleInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="发布者">
        <el-input
          v-model="articleInfo.createdBy"
          :disabled="true"
        />
      </el-form-item>

      <el-form-item label="文章内容">
        <tinymce v-model="articleInfo.content" :height="300" />
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import articleApi from "@/api/edu/article";
import articleContentApi from "@/api/edu/articleContent";
import subjectApi from "@/api/edu/subject";
import Tinymce from "@/components/Tinymce";
export default {
  components: { Tinymce },
  data() {
    return {
      saveBtnDisabled: false,
      articleInfo: {
        id: "",
        title: "",
        subjectId: "", // 二级分类id
        subjectParentId: "", // 一级分类id
        content: ""
      },
      articleId: "",
      subjectOneList: [], // 一级分类
      subjectTwoList: [], // 二级分类
    };
  },
  created() {
    // 获取路由id值
    if (this.$route.params && this.$route.params.id) {
      this.articleId = this.$route.params.id;
      // 调用根据id查询课程的方法
      this.getInfo();
    } else {
      // 初始化一级分类
      this.getOneSubject();
    }
  },
  methods: {
    getInfo() {
      articleApi.articleDetails(this.articleId).then((response) => {
        this.articleInfo = response.data;
      });
      subjectApi.gainSubject().then((response) => {
          // 2 获取所有一级分类
          this.subjectOneList = response.data;
          // 3 把所有的一级分类数组进行遍历，
          for (var i = 0; i < this.subjectOneList.length; i++) {
            // 获取每个一级分类
            var oneSubject = this.subjectOneList[i];
            // 比较当前articleInfo里面一级分类id和所有的一级分类id
            if (this.articleInfo.subjectParentId === oneSubject.id) {
              // 获取一级分类所有的二级分类
              this.subjectTwoList = oneSubject.subjectTwoResList;
            }
          }
        });
      articleContentApi.articleContentDetails(this.articleId).then((response) => {
          this.articleInfo.content = response.data.content
      });
    },
    // 点击某个一级分类，触发change，显示对应二级分类
    subjectLevelOneChanged(value) {
      // value就是一级分类id值
      // 遍历所有的分类，包含一级和二级
      for (var i = 0; i < this.subjectOneList.length; i++) {
        // 每个一级分类
        var oneSubject = this.subjectOneList[i];
        // 判断：所有一级分类id 和 点击一级分类id是否一样
        if (value === oneSubject.id) {
          // 从一级分类获取里面所有的二级分类
          this.subjectTwoList = oneSubject.subjectTwoResList;
          // 把二级分类id值清空
          this.articleInfo.subjectId = "";
        }
      }
    },
    // 查询所有的一级分类
    getOneSubject() {
      subjectApi.gainSubject().then((response) => {
        this.subjectOneList = response.data;
      });
    },
    // 添加课程
    addArticle() {
      articleApi.saveArticle(this.articleInfo).then((response) => {
        // 提示
        this.$message({
          type: "success",
          message: "添加文章信息成功!",
        });
        // 跳转到第二步
        this.$router.push({
          path: "/edu/article/list/"
        });
      });
    },
    // 修改课程
    updateArticle() {
        this.articleInfo.id = this.articleId
      articleApi.updateArticle(this.articleInfo).then((response) => {
        // 提示
        this.$message({
          type: "success",
          message: "修改文章信息成功!",
        });
        // 跳转到第二步
        this.$router.push({ path: "/edu/article/list/" });
      });
    },
    saveOrUpdate() {
      // 判断添加还是修改
      if (!this.articleInfo.id) {
        // 添加
        this.addArticle();
      } else {
        this.updateArticle();
      }
    },
  },
};
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>

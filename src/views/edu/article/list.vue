<template>
  <div class="app-container">
    文章列表

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="articlePage.title" placeholder="文章标题" />
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="articlePage.createdBy"
          clearable
          filterable
          placeholder="发布者"
        >
          <el-option
            v-for="item in aclUserList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="articlePage.subjectParentId"
          clearable
          filterable
          @change="subjectLevelOneChanged"
          placeholder="一级学科分类"
        >
          <el-option
            v-for="item in subjectOneList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="articlePage.subjectId"
          clearable
          filterable
          placeholder="二级学科分类"
        >
          <el-option
            v-for="item in subjectTwoList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (articlePage.page - 1) * articlePage.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" align="center" />

      <el-table-column prop="subjectParentName" label="一级学科" align="center" />

      <el-table-column prop="subjectName" label="二级学科" align="center" />

      <el-table-column prop="likesNum" label="获赞数" align="center" />

      <el-table-column prop="collectsNum" label="收藏数" align="center" />

      <el-table-column prop="commentsNum" label="评论数" align="center" />

      <el-table-column prop="createdBy" label="发布者" align="center" />

      <el-table-column prop="createdTime" label="添加时间" width="160" align="center" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/article/save/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >修改</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="articlePage.page"
      :page-size="articlePage.pageSize"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>
<script>
import articleApi from "@/api/edu/article";
import subjectApi from "@/api/edu/subject";
import userApi from "@/api/acl/user";

export default {
  // 写核心代码位置
  data() {
    // 定义变量和初始值
    return {
      subjectOneList: [], // 一级分类
      subjectTwoList: [], // 二级分类
      list: [], // 查询之后接口返回集合
      total: 0, // 总记录数
      articlePage: {
        page: 1,
        pageSize: 10,
        title: "",
        subjectParentId: '',
        subjectId: '',
        createdBy: '',
      },
      aclUserList: [],
    };
  },
  created() {
    // 页面渲染之前执行，一般调用methods定义的方法
    // 调用
    this.getList();
    this.getSubjectInfo();
    this.getAclUserList();
  },
  methods: {
    getAclUserList() {
      userApi.listUser().then((response) => {
        // 2 获取所有一级分类
        this.aclUserList = response.data;
      });
    },
    getSubjectInfo() {
      subjectApi.gainSubject().then((response) => {
        // 2 获取所有一级分类
        this.subjectOneList = response.data;
        // 3 把所有的一级分类数组进行遍历，
        for (var i = 0; i < this.subjectOneList.length; i++) {
          // 获取每个一级分类
          var oneSubject = this.subjectOneList[i];
          // 比较当前articlePage里面一级分类id和所有的一级分类id
          if (this.articlePage.subjectParentId === oneSubject.id) {
            // 获取一级分类所有的二级分类
            this.subjectTwoList = oneSubject.subjectTwoResList;
          }
        }
      });
    },
    getList(page = 1) {
      this.articlePage.page = page;
      articleApi.pageArticle(this.articlePage).then((response) => {
        // 请求成功
        this.list = response.data.rows;
        this.total = response.data.total;
      });
    },
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
          this.articlePage.subjectId = "";
        }
      }
    },
    resetData() {
      // 清空的方法
      // 表单输入项数据清空
      this.articlePage = {page: 1, pageSize: 10};
      // 查询所有文章数据
      this.getList();
    },
    // 删除文章的方法
    removeDataById(id) {
      this.$confirm("此操作将永久删除文章记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 点击确定，执行then方法
        // 调用删除的方法
        articleApi.removeArticle(id).then((response) => {
          // 删除成功
          // 提示信息
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 回到列表页面
          this.getList();
        });
      }); // 点击取消，执行catch方法
    },
  },
};
</script>

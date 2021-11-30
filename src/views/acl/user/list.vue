<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
         <el-input v-model="userPage.username" placeholder="用户名"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 工具条 -->
    <div>
      <el-button type="danger" size="mini" @click="addUser()" v-if="hasPerm('user.add')">添加</el-button>
      <el-button type="danger" size="mini" @click="removeRows()" v-if="hasPerm('user.remove')">批量删除</el-button>

    </div>

    <!-- 用户列表 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        width="55" />

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (userPage.page - 1) * userPage.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="username" label="用户名" width="150" />

      <el-table-column prop="nickName" label="用户昵称" />

      <el-table-column prop="createdTime" label="创建时间" width="180"/>

      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <router-link :to="'/acl/user/role/'+scope.row.id">
            <el-button type="info" size="mini" icon="el-icon-info" v-if="hasPerm('user.assign')"></el-button>
          </router-link>
          <router-link :to="'/acl/user/update/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit" v-if="hasPerm('user.update')"></el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)" v-if="hasPerm('user.remove')"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="userPage.page"
      :total="total"
      :page-size="userPage.pageSize"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center;"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="fetchData"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
import userApi from '@/api/acl/user'

export default {
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: null, // 讲师列表
      total: 0, // 数据库中的总记录数
      multipleSelection: [], // 批量选择中选择的记录列表
      userPage: {
        page: 1,
        pageSize: 10,
        username: null
      }
    }
  },

  // 生命周期函数：内存准备完毕，页面尚未渲染
  created() {
    this.fetchData()
  },

  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
  },

  methods: {

    // 当页码发生改变的时候
    changeSize(size) {
      this.userPage.pageSize = size
      this.fetchData(1)
    },

    addUser(){
      this.$router.push({ path: '/acl/user/add' })
    },

    // 加载讲师列表数据
    fetchData(page = 1) {
      // 异步获取远程数据（ajax）
      this.userPage.page = page

      userApi.pageUser(this.userPage).then(
        response => {
          this.list = response.data.rows
          this.total = response.data.total

          // 数据加载并绑定成功
          this.listLoading = false
        }
      )
    },

    // 重置查询表单
    resetData() {
      this.userPage.username = ''
      this.fetchData()
    },

    // 根据id删除数据
    removeDataById(id) {
      // debugger
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // promise
        // 点击确定，远程调用ajax
        return userApi.removeUser(id)
      }).then((response) => {
        this.fetchData(this.userPage.page)
        if (response.success) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 当表格复选框选项发生变化的时候触发
    handleSelectionChange(selection) {
      this.multipleSelection = selection
    },

    // 批量删除
    removeRows() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择要删除的记录!'
        })
        return
      }

      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // promise
        // 点击确定，远程调用ajax
        // 遍历selection，将id取出放入id列表
        var idList = []
        this.multipleSelection.forEach(item => {
          idList.push(item.id)
        })
        // 调用api
        return userApi.removeBatchUser(idList)
      }).then((response) => {
        this.fetchData(this.userPage.page)
        if (response.success) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>



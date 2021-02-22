<template>
    <div class="user-container">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>顾客管理</el-breadcrumb-item>
            <el-breadcrumb-item>顾客列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片区域 -->
        <el-card>
            <!-- 搜素区域 -->
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input clearable placeholder="输入用户名称" v-model="queryInfo.username"  @clear="getUserList"  >
                        <el-button style="background-color:#97d8ae;" slot="append" icon="el-icon-search" @click="searchInfo" ></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <!-- 顾客列表区域 -->
            <el-table
                :header-cell-style="{background:'#97d8ae',color:'black'}"
                :data="userlist" border >
                <el-table-column 
                prop="_id"
                label="ID"></el-table-column>
                <el-table-column 
                prop="name"
                label="顾客姓名"></el-table-column>
                <el-table-column 
                prop="username"
                label="用户名称"></el-table-column>
                <el-table-column 
                prop="phone"
                label="手机号码"></el-table-column>
                <el-table-column 
                prop="sex"
                label="性别"></el-table-column>
                <el-table-column 
                prop="avatar"
                label="用户头像">
                    <template slot-scope="scope">
                        <img :src="scope.row.avatar" alt="" style="height:3rem">
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="220">
                    <template slot-scope="scope">
                        <!--  修改 -->
                        <el-button type="success" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row._id)">修改</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="small" @click="remove(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                
            </el-table>
            <!-- 分页区 -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.page"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="queryInfo.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>


            <!-- 修改顾客信息对话框  -->
            <el-dialog
            title="修改顾客"
            :visible.sync="editDialogVisible"
            width="50%"
            @close="editDialogClosed"
            >
            <el-form :model="editForm" :rules="registerFormRules"  ref="editFormRef" label-width="90px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="用户名"  prop="username">
                    <el-input v-model="editForm.username"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="editForm.sex">
                        <el-radio label="女"></el-radio>
                        <el-radio label="男"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="editForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL + '/upload'"
                    :show-file-list="false"
                    :on-success="res => $set(editForm, 'avatar' , res.url)"
                    >
                        <img v-if="editForm.avatar" :src="editForm.avatar" class="avatar" >
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
 
            </el-form>
            <span slot="footer" >
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="success" @click="editUserInfo">确 定</el-button>
            </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>

export default {

    data() {
        var checkMobile = (rule, value, cb) => {
            const regMobile = /^1[34578]\d{9}$/
            if (regMobile.test(value)) {
                return cb()
            }
            //返回一个错误提示
            cb(new Error('请输入合法的手机号码'))
        }
        return {
            queryInfo: {
                username: '',
                page: 1,
                // size: 5,
            },
            total: 0,
            // 用户列表
            userlist: [],
            // 对话框显示隐藏
            editDialogVisible: false,
            // 编辑用户信息
            editForm: {
            },
            // 用户表单验证规则
            registerFormRules: {
                name: [
                    { required: true, message: '请填写姓名', trigger: 'blur'},
                    { min: 2, max: 5, message: '姓名长度在2-5个字符之间', trigger: 'blur'}
                ],
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur'},
                    { min: 1, max: 20, message: '用户名长度在2-8个字符之间', trigger: 'blur'}
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                phone: [
                    { required: true, message: '请填写手机号码', trigger: 'blur'},
                    { validator: checkMobile, message: '号码格式不正确，请重新输入', trigger: 'blur'}
                ],
            },
        }
    },
    methods: {
        // 获取用户列表
        async getUserList() {
            const res = await this.$http.post('page/users', {page: this.queryInfo.page, size: this.queryInfo.size}) 
            console.log(res)
            this.queryInfo.page = res.data.page 
            this.queryInfo.size = res.data.size
            this.total = res.data.total
            this.userlist = res.data.records
        },
        // 根据用户名
        async searchInfo() {
            if(this.queryInfo.username.trim() == '') {
                return this.$message.warning('请输入用户名')
            }
            const res = await this.$http.post('user', {username: this.queryInfo.username.trim()})
            // console.log(data)
            this.userlist = res.data
            // this.userlist.push( res ) 
        },
        // 展示修改用户对话框
        async showEditDialog(id) {
            const {data: res} = await this.$http.get(`/rest/users/${id}` )
            this.editForm = res
            this.editDialogVisible = true
        },
        // 修改用户信息
        editUserInfo() {
            this.$refs.editFormRef.validate( async valid => {
                if(!valid) return
                // 发起修改用户数据请求
                const data = await this.$http.put(`/rest/users/${this.editForm._id}`, this.editForm)
                // 关闭对话框
                this.editDialogVisible = false
                // 刷新数据列表
                this.getUserList()
                // 提示修改成功
                this.$message.success('更新用户成功')
            })
        },

        
        // 删除
        remove(row) {
            this.$confirm(`确定要删除顾客"${row.name}"`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            })
            .then(async () => {
            await this.$http.delete(`rest/users/${row._id}`)
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
            // 注意重新获取列表
            this.getUserList()
            })
        },
        // 监听修改用户对话框的关闭事件
        editDialogClosed(){
            // 清空表单
            this.$refs.editFormRef.resetFields()
        },

        // 监听size改变的事件
        handleSizeChange(newSize) {
            this.queryInfo.size = newSize
            this.getUserList()
        },
        // 监听 页码值 改变的事件
        handleCurrentChange(newPage) {
            this.queryInfo.page = newPage
            this.getUserList()
        }
    },
    created() {
        this.getUserList()
    }

}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
/deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-table {
    margin-top: 20px;
}
.el-pagination {
    margin-top: 20px;
}
</style>
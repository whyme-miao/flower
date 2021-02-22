<template>
    <div class="">
        <el-card>
            <h3>管理员列表</h3>
                <el-table :data="item" border>
                    <el-table-column prop="_id" label="ID" width="240"></el-table-column>
                    <el-table-column prop="username" label="用户名"></el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="150">
                    <template slot-scope="scope">
                        <el-button type="success" size="small" 
                        @click="$router.push(`/admin_users/edit/${scope.row._id}`)">编辑</el-button>
                        <el-button type="danger" size="small" 
                        @click="remove(scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            item: []
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get('/rest/admin_users')
            this.item = res.data
        },
        async remove(row) {
            this.$confirm(`此操作将永久删除分类 "${row.username}", 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.$http.delete(`/rest/admin_users/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.fetch()
            })
        }
    },
    created() {
        this.fetch()
    }
}

</script>

<style lang='scss'>


</style>
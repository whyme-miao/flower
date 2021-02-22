<template>
    <div class="">
        <el-card>
            <h3>库存列表</h3>
                <el-table :data="item" border>
                    <el-table-column prop="_id" label="ID" width="240"></el-table-column>
                    <el-table-column prop="classify.name" label="所属分类"></el-table-column>
                    <el-table-column prop="picture" label="图片展示">
                        <template slot-scope="scope">
                        <img :src="scope.row.picture" alt="" style="height:3rem">
                    </template>
                    </el-table-column>
                    <el-table-column prop="flowertitle.flowerTitle" label="鲜花标题"></el-table-column>
                    <el-table-column prop="total" label="数量/束"></el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="150">
                    <template slot-scope="scope">
                        <el-button type="success" size="small" 
                        @click="$router.push(`/stocks/edit/${scope.row._id}`)">编辑</el-button>
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
            const res = await this.$http.get('/rest/stocks')
            this.item = res.data
            console.log(this.item)
        },
        async remove(row) {
            this.$confirm(`此操作将永久删除分类 "${row.name}", 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.$http.delete(`/rest/stocks/${row._id}`)
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
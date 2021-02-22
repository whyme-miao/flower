<template>
    <div class="">
        <el-card>
            <h3>鲜花列表</h3>
                <el-table :data="item" border>
                     <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="详情描述">
                                    <span>{{ props.row.description }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                        </el-table-column>
                    <el-table-column prop="_id" label="ID" width="240"></el-table-column>
                    <el-table-column prop="picture" label="图片展示">
                        <template slot-scope="scope">
                            <img :src="scope.row.picture" alt="" style="height:3rem">
                        </template>
                    </el-table-column>
                    <el-table-column prop="flowerTitle" label="标题"></el-table-column>
                    <el-table-column prop="classify.name" label="所属类别"></el-table-column>
                    <!-- <el-table-column prop="description" label="简介"></el-table-column> -->
                    <el-table-column prop="sold" label="已售/束"></el-table-column>
                    <el-table-column prop="price" label="鲜花价格/元"></el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="250">
                    <template slot-scope="scope">
                        <el-button type="success" size="small" 
                        @click="$router.push(`/flowers/edit/${scope.row._id}`)">编辑</el-button>
                        <el-button type="danger" size="small" 
                        @click="remove(scope.row)">删除</el-button>
                        <!-- <el-button type="info" size="small" 
                        @click="$router.push(`/stocks/update/${scope.row._id}`)">编辑存储</el-button> -->
                        <el-button type="info" size="small" 
                        @click="editstock(scope.row._id)">添加存储</el-button>
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
            item: [],
            stocklist:[],
            flag: false
        }
    },
    methods: {
        async editstock(id) {
            const res = await this.$http.get('/rest/stocks')
            this.stocklist = res.data
            this.stocklist.forEach(item => {
                if(item.flowertitle._id == id) {
                    this.$message({
                        type: 'warning',
                        message: '以存在,勿重复添加!'
                    });
                    this.flag = true
                }

            })
            if(!this.flag) {
                
                this.$router.push('/stocks/update/' + id)
            }
            this.flag = false
            
        },
        async fetch() {
            const res = await this.$http.get('/rest/flowers')
            this.item = res.data
            // console.log(this.item)
        },
        async remove(row) {
            this.$confirm(`此操作将永久删除分类 "${row.flowertitle}", 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.$http.delete(`/rest/flowers/${row._id}`)
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

.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>
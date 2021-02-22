<template>
    <div class="">
        <el-card>
            <h3>{{ id ? '编辑' : '新建'}}库存</h3>
            <el-form label-width="120px" @submit.native.prevent="save">
                <el-form-item label="鲜花图片">
                    <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :on-success="res => $set(model, 'picture' , res.url)"
                    >
                        <img v-if="model.picture" :src="model.picture" class="avatar" >
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="所属分类">
                    <el-select v-model="model.classify">
                        <el-option v-for="item in parents" :key="item._id"
                        :label="item.name"
                        :value="item._id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="鲜花标题">
                    <el-select v-model="model.flowertitle">
                        <el-option v-for="item in flowers" :key="item._id"
                        :label="item.flowerTitle"
                        :value="item._id"
                        ></el-option>
                    </el-select>
                    <!-- <el-input v-model="model.flowerTitle"></el-input> -->
                </el-form-item>
                <el-form-item label="数量">
                    <el-input v-model="model.total"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" native-type="submit">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    props: {
        id: {},
        idd: {}
    },
    data() {
        return {
            model: {
                classify:'',
                flowertitle:'',
                picture: '',

            },
            parents: [],
            flowers: [],
            // 鲜花id数组
            flowerIds: [],
        }
    },
    methods: {
        async save() {
            let res 
            if( this.id ) {
                res = await this.$http.put(`rest/stocks/${this.id}`, this.model)
            }else {
                res = await this.$http.post('rest/stocks', this.model)
            }
            this.$router.push('/stocks/list')
            this.$message({
                type: 'success',
                message: '保存成功'
            })
        },

        async fetch() {
            const res = await this.$http.get(`rest/stocks/${this.id}`)
            this.model = res.data
        },
        // 根据传递过来的id获取鲜花信息
        async fetchFlowersId() {
            // for( i in this.flowerIds)
            const res = await this.$http.get(`rest/flowers/${this.idd}`)
            this.model.classify = res.data.classify
            this.model.flowertitle = res.data._id
            this.model.picture = res.data.picture

        },
        // 获取关联分类
        async fetchParents() {
            const res = await this.$http.get('rest/categories')
            this.parents = res.data
        },
        // 获取关联鲜花
        async fetchFlowers() {
            const res = await this.$http.get('rest/flowers')
            this.flowers = res.data
            this.flowerids = res.data.map(item => {
                return item._id
            })
        }
    },
    created() {
        this.fetchParents()
        this.fetchFlowers()
        this.idd && this.fetchFlowersId()
        this.id && this.fetch()
    }
}

</script>

<style lang='scss'>


</style>
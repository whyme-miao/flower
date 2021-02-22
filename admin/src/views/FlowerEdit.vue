<template>
    <div class="">
        <el-card>
            <h3>{{ id ? '编辑' : '新建'}}花种</h3>
            <el-form label-width="120px" @submit.native.prevent="save">
                <el-form-item label="鲜花分类">
                    <el-select v-model="model.classify">
                        <el-option v-for="item in classify" :key="item._id"
                        :label="item.name"
                        :value="item._id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL + '/upload'"
                    :show-file-list="false"
                    :on-success="res => $set(model, 'picture' , res.url)"
                    >
                        <img v-if="model.picture" :src="model.picture" class="avatar" >
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="model.flowerTitle"></el-input>
                </el-form-item>
                <!-- <el-form-item label="库存">
                    <el-input v-model="model.num"></el-input>
                </el-form-item> -->
                <el-form-item label="价格">
                    <el-input v-model="model.price"></el-input>
                </el-form-item>
                <el-form-item label="详情">
                    <vue-editor useCustomImageHandler @image-added="handleImageAdded"  v-model="model.description"></vue-editor>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" native-type="submit">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    components: {
        VueEditor
    },
    props: {
        id: {}
    },
    data() {
        return {
            model: {},
            classify: [],
        }
    },
    methods: {
        // editor处理上传文件
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            const formData = new FormData();
            formData.append("file", file);
            const res = await this.$http.post('upload', formData)
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            resetUploader();
        },

        async save() {
            let res 
            if( this.id ) {
                res = await this.$http.put(`/rest/flowers/${this.id}`, this.model)
            }else {
                res = await this.$http.post('/rest/flowers', this.model)
            }
            this.$router.push('/flowers/list')
            this.$message({
                type: 'success',
                message: '保存成功'
            })
        },

        async fetch() {
            const res = await this.$http.get(`/rest/flowers/${this.id}`)
            this.model = res.data
        },

        async fetchClassify() {
            const res = await this.$http.get('/rest/categories')
            this.classify = res.data
            // console.log(this.classify)
        },

    },
    created() {
        this.fetchClassify()
        this.id && this.fetch()
    }
}

</script>

<style lang='scss' scoped>
// /deep/ .avatar-uploader .el-upload {
//     border: 1px dashed #d9d9d9;
//     border-radius: 6px;
//     cursor: pointer;
//     position: relative;
//     overflow: hidden;
// }
// .avatar-uploader .el-upload:hover {
//   border-color: #409EFF;
// }
// .avatar-uploader-icon {
//   font-size: 28px;
//   color: #8c939d;
//   width: 178px;
//   height: 178px;
//   line-height: 178px;
//   text-align: center;
// }
// .avatar {
//   width: 178px;
//   height: 178px;
//   display: block;
// }


</style>
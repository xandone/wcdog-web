<template>
    <div class=" edit-root">
        <el-col class="add-root">
            <header class="form-header">新增段子</header>
            <el-form label-width="110px" class="demo-formData" :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="段子标题" prop="title">
                    <el-input v-model="ruleForm.title" placeholder="请输入标题" style='width: 500px' clearable></el-input>
                </el-form-item>
                <el-form-item label="段子种类">
                    <el-select v-model="ruleForm.type" placeholder="ruleForm.type">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传首页图片">
                    <el-input placeholder="请在这里粘贴图片地址" v-model="ruleForm.coverImg" style='width: 500px;margin-bottom: 10px'>
                    </el-input>
                    <div>
                        <el-image style="width: 120px; height: 120px" class="avatar" v-if="ruleForm.coverImg" :src="ruleForm.coverImg">
                        </el-image>
                    </div>
                    <!--   <el-upload class="avatar-uploader" :action="baseUrl + '/v1/addimg/shop'" :show-file-list="false" :on-success="handleShopAvatarScucess" :before-upload="beforeAvatarUpload">
                        <el-image style="width: 120px; height: 120px" class="avatar" v-if="ruleForm.coverImg" :src="ruleForm.coverImg"></el-image>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
                </el-form-item>
                <el-form-item label="选择标签" prop='tags'>
                    <el-checkbox-group v-model="ruleForm.tags">
                        <el-checkbox name='tags' label="0" border size="medium">经典</el-checkbox>
                        <el-checkbox name='tags' label="1" border size="medium">荤笑话</el-checkbox>
                        <el-checkbox name='tags' label="2" border size="medium">精分</el-checkbox>
                        <div style="margin-top: 10px">
                            <el-checkbox name='tags' label="3" border size="medium">脑残</el-checkbox>
                            <el-checkbox name='tags' label="4" border size="medium">冷笑话</el-checkbox>
                        </div>
                    </el-checkbox-group>
                </el-form-item>
                <div class="edit-area">
                    <div ref="editor" style="text-align:left"></div>
                </div>
                <el-form-item class='edit-btn'>
                    <el-button @click="submitForm('ruleForm')" type="primary">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </div>
</template>
<script>
import E from 'wangeditor'
import { baseUrl, baseImgPath } from '@/config/env'
import { mapState } from 'vuex'

export default {
    name: 'editor',
    components: {
    },
    computed: {
        ...mapState([
            'userInfo'
        ])
    },
    created() {},
    data() {
        return {
            info: {},
            baseUrl,
            input: '',
            editorContent: '',
            editorText: '',
            options: [{
                value: '0',
                label: '网络'
            }, {
                value: '1',
                label: '自创'
            }, {
                value: '2',
                label: '听说'
            }],
            value: '',
            ruleForm: {
                title: '',
                type: '0',
                tags: ['0'],
                coverImg: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入段子标题', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                tags: [
                    { type: 'array', required: true, message: '请至少选择一个标签', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        getEtContent() {
            return this.editorContent;
        },
        getEtText() {
            return this.editorText;
        },
        beforeAvatarUpload() {},
        handleShopAvatarScucess() {},
        resetForm(formName) {
            // this.$refs['formName'].resetFields();
            this.ruleForm = {
                title: '',
                type: '0',
                tags: ['0'],
                coverImg: '',
            };
        },
        submitForm(formName) {
            if (!this.userInfo || this.userInfo.userId === '-1') {
                alert('请先登录');
                return;
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addJokes();
                } else {
                    this.openToast('请填写完整信息');
                    return false;
                }
            });
        },
        addJokes() {
            this.$axios.post(`/joke/add`, {
                    title: this.ruleForm.title,
                    jokeUserId: this.userInfo.userId,
                    content: this.getEtText(),
                    contentHtml: this.getEtContent(),
                    category: this.ruleForm.type,
                    tags: JSON.stringify(this.ruleForm.tags),
                    coverImg: this.ruleForm.coverImg,
                })
                .then((response) => {
                    const result = response.data;
                    if (result && result.code === 200) {
                        this.resetForm();
                        this.openSuccess('恭喜，发表成功!');
                    } else if (result.code === 201) {
                        this.openToast('发布失败，您处于禁言状态');
                    } else {
                        this.openToast('发布失败，服务器异常');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        },
        openToast(msg) {
            this.$notify.error({
                title: '错误',
                message: msg
            });
        },
        openSuccess(msg) {
            this.$message({
                message: msg,
                type: 'success'
            });
        },
    },
    mounted() {
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
            this.editorContent = html
            this.editorText = editor.txt.text();
        }
        editor.create()
    }

}
</script>
<style lang="scss">
@import "@/common/base.scss";

.edit-root {
    width: $root_width_value;
    height: 100%;
    margin: 0 auto;
    padding-top: 55px;
}

.edit-area {
    text-align: left;
    margin: 0 20px;
}

.demo-formData {
    text-align: left;
}

.edit-btn {
    text-align: left;
    margin: 20px 0;
}

.form-header {
    width: 100%;
    text-align: center;
    margin: 20px auto;
    font-size: 20px;
}

.avatar-uploader .el-upload {
    width: 120px;
    height: 120px;
    line-height: 120px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}

.add-root {
    background-color: white;
    height: 100%;
}
</style>
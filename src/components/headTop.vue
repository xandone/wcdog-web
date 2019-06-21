<template>
    <div class="head-root">
        <div class="head-item">
            <a href="/">
            <span  class="head-words">WCDOG</span>
            </a>
            <div class="search-root">
                <el-input placeholder="请输入关键字" v-model="key" style="width: 100%;" size="small" @keyup.enter.native="searchJokes">
                    <el-button @click="searchJokes" slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="user-info">
                <el-popover placement="top-start" width="200" trigger="hover" content="">
                    <div class="app-qr-root">
                        <img class="app-qr-ic" src="@/assets/wc_app.jpg" alt="">
                        <div class="app-qr-tip">
                            <span>扫一扫</span>
                            <span>下载"旺财APP"</span>
                        </div>
                    </div>
                    <span slot="reference">App下载</span>
                </el-popover>
                <div class="login" v-if="!isShowUser"><span @click="loginDialogShow = true">登录</span><span>|</span><span>注册</span>
                </div>
                <el-dropdown @command="dealCommand" style="font-size: 12px" v-if="isShowUser" trigger="click">
                    <div class="user-name">
                        <img class="user-ic" :src="userBean.userIcon" alt="">
                        <span>{{userBean.nickname}}</span>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userCenter">主页</el-dropdown-item>
                        <el-dropdown-item command="userWrite">写段子</el-dropdown-item>
                        <el-dropdown-item command="userEdit">编辑</el-dropdown-item>
                        <el-dropdown-item command="userExit">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <el-dialog title="登录" :visible.sync="loginDialogShow" width="20%" :modal-append-to-body='false' class="login-dialog">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="ruleForm.name" autocomplete="off" placeholder='用户名'></el-input>
                </el-form-item>
                <el-form-item label="密　码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder='密码' show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class='login-btn' type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="exitDialogShow" width="20%" :modal-append-to-body='false'>
            <span>是否退出登录？</span>
            <span slot="footer" class="dialog-footer">
           <el-button @click="exitDialogShow = false">取 消</el-button>
            <el-button type="primary" @click="exitDialog">确 定</el-button>
           </span>
        </el-dialog>
    </div>
</template>
<script>
import { setStore, getStore, removeStore } from '@/utils/utils'
import { USER_INFO_KEY } from '@/config/env'
import { mapState } from 'vuex'
import vueEvent from '@/bus/vueEvent.js'
export default {
    data() {
        return {
            userBean: {},
            isShowUser: false,
            loginDialogShow: false,
            exitDialogShow: false,
            key: '',

            ruleForm: {
                name: '',
                pass: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        this.initUserInfo();
    },
    methods: {
        initUserInfo() {
            this.userBean = JSON.parse(getStore(USER_INFO_KEY));
            if (this.userBean) {
                this.isShowUser = !this.isShowUser;
                this.setStaticInfo(this.userBean);
            }
        },
        dealCommand(command) {
            if (command == 'userCenter') {
                this.$router.push('/personal');
            } else if (command == 'userWrite') {
                let routeData = this.$router.resolve({ path: '/jokeAdd', query: { jokeId: 12361 } });
                window.open(routeData.href, '_blank');
            } else if (command == 'userEdit') {} else if (command == 'userExit') {
                this.exitDialogShow = true
            }

        },
        loginDialog() {
            this.loginDialogShow = true;
        },
        exitDialog() {
            this.exitDialogShow = false;
            removeStore(USER_INFO_KEY);
            this.isShowUser = !this.isShowUser;
            this.setStaticInfo(null);
            this.$router.push('/')
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.login();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        login() {
            this.$axios.post(`/user/login`, {
                    name: this.ruleForm.name,
                    psw: this.ruleForm.pass
                })
                .then((response) => {
                    const user = response.data;
                    const userBean = user.data[0].userBean;
                    if (user.code === 200 && userBean) {
                        this.loginDialogShow = false;
                        this.userBean = userBean;
                        this.isShowUser = !this.isShowUser;
                        setStore(USER_INFO_KEY, userBean);
                        this.setStaticInfo(userBean);
                    } else {
                        alert("登录错误");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        setStaticInfo(user) {
            this.$store.commit('setUserInfo', user);
        },
        searchJokes() {
            vueEvent.$emit('search-key', this.key);
        }
    }
}
</script>
<style lang="scss">
@import "@/common/base.scss";

.head-root {
    position: fixed;
    width: 100%;
    height: 50px;
    background-color: white;
    z-index: 5;
}

.head-words {
    font-weight: bold;
    font-size: 18px;
    color: $text_blue;
    cursor: pointer;
}

.head-item {
    position: relative;
    display: flex;
    width: $root_width_value;
    height: 100%;
    align-items: center;
    margin: 0 auto;
}

.user-info {
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;

    span {
        font-size: 14px;
        margin-right: 10px;
    }

    span:nth-child(1) {
        cursor: pointer;
    }

    span:nth-child(2) {
        cursor: default;
    }

}

.user-ic {
    width: 30px;
    height: 30px;
    border-radius: 4px;
}

.app-qr-ic {
    width: 80px;
    height: 80px;
}

.app-qr-root {
    display: flex;
}

.app-qr-tip {
    display: flex;
    flex-direction: column;
    justify-content: center;

    span:nth-child(1) {
        margin-bottom: 10px;
    }
}

.user-name {
    display: flex;
    align-items: center;

    span {
        margin-left: 5px;
    }
}

.login {
    color: $text_blue;
}

.login-btn {
    width: 100%;
}

.login-dialog {}

.search-root {
    width: 350px;
    margin-left: 30px;
}
</style>
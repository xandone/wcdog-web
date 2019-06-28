<template>
    <div class="personal-root">
        <div class="personal-info">
            <img class="personal-ic" :src="userInfo.userIcon===null?require(`@/assets/wc_app.jpg`):userInfo.userIcon" alt="">
            <div>
                <div class="personal-name-root">
                    <span class="personal-name">{{userInfo.nickname}}</span>
                    <div v-if="!isShowEdit">
                        <span class="personal-talk" v-if="userInfo.talk">
                    <img src="../assets/talk_ic.png" alt="">{{userInfo.talk}}</span>
                        <span class="personal-address" v-if="userInfo.address">
                    <img src="../assets/address_ic.png" alt="">{{userInfo.address}}</span>
                    </div>
                </div>
                <div class="edit-info-root" v-if="isShowEdit">
                    <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 30}" placeholder="说点什么吧.." v-model="userInfo.talk" maxlength="300" show-word-limit style="width: 350px;">
                    </el-input>
                    <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" placeholder="所在城市.." v-model="userInfo.address" maxlength="100" show-word-limit style="width: 350px;" class="edit-info-address">
                    </el-input>
                    <div>
                        <el-button @click="isShowEdit=false" type="primary" size="mini" style="margin-top: 10px; width: 60px;" plain>取消</el-button>
                        <el-button @click="saveInfo" type="primary" size="mini" style="margin-top: 10px; width: 60px;">保存</el-button>
                    </div>
                </div>
            </div>
            <el-button @click="isShowEdit=!isShowEdit" class="edit" type="primary" plain size="small">编辑个人资料</el-button>
        </div>
        <div class="personal-main">
            <template>
                <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="我的" name="0"></el-tab-pane>
                    <el-tab-pane label="回复" name="1"></el-tab-pane>
                    <el-tab-pane label="点赞" name="2"></el-tab-pane>
                </el-tabs>
            </template>
            <jokeItem v-for="item in tableData" :bean='item'></jokeItem>
        </div>
    </div>
</template>
<script>
import jokeItem from '@/components/jokeItem'
import { mapState } from "vuex"
import { setStore } from '@/utils/utils'
import { USER_INFO_KEY } from '@/config/env'
import { JOKE_CATEGORY, JOKE_TAGS } from '@/config/env'

export default {
    components: {
        jokeItem,
    },
    computed: {
        ...mapState([
            'userInfo'
        ])
    },
    data() {
        return {
            tableData: [],
            page: 1,
            row: 10,
            activeName: "0",
            selfUrl: `/user/selfJokes`,
            isShowEdit: false,
        }
    },
    mounted() {
        this.getSelfJokes();
        window.scrollTo(0, 0);
    },
    methods: {
        getSelfJokes() {
            this.$axios.get(this.selfUrl, {
                    params: {
                        page: this.page,
                        row: this.row,
                        userId: this.userInfo.userId,
                    }
                })
                .then((response) => {
                    const joker = response.data;
                    const data = joker.data;
                    this.tableData = [];
                    data.forEach(item => {
                        const tableData = {};
                        tableData.articleCommentCount = item.articleCommentCount;
                        tableData.articleLikeCount = item.articleLikeCount;
                        tableData.content = item.content;
                        tableData.contentHtml = item.contentHtml;
                        tableData.coverImg = item.coverImg;
                        tableData.jokeId = item.jokeId;
                        tableData.jokeUserIcon = item.jokeUserIcon;
                        tableData.jokeUserId = item.jokeUserId;
                        tableData.jokeUserNick = item.jokeUserNick;
                        tableData.postTime = item.postTime;
                        tableData.title = item.title;
                        if (item.category) {
                            tableData.category = JOKE_CATEGORY[item.category];
                        } else {
                            tableData.category = JOKE_CATEGORY['0'];
                        }
                        if (item.tags) {
                            tableData.tags = JSON.parse(item.tags);
                        } else {
                            tableData.tags = ['0'];
                        }

                        this.tableData.push(tableData);
                    })
                })
                .catch((error) => {
                    console.log(error);
                });

        },
        handleClick(tab, event) {
            console.log(this.activeName);
            switch (this.activeName) {
                case '0':
                    this.selfUrl = `/user/selfJokes`;
                    break;
                case '1':
                    break;
                case '2':
                    this.selfUrl = `/user/thumb`;
                    break;
            }
            this.getSelfJokes();
        },
        saveInfo() {
            this.$axios.post(`/user/userInfo/modify`,
                    this.$qs.stringify({
                        'userId': this.userInfo.userId,
                        'talk': this.userInfo.talk,
                        'address': this.userInfo.address,
                    }))

                .then((response) => {
                    const result = response.data;
                    const bean = result.data[0];
                    if (bean && result.code === 200) {
                        setStore(USER_INFO_KEY, bean);
                        this.setStaticInfo(bean);
                        this.openSuccess('恭喜，保存成功!');
                        this.isShowEdit = false;
                    } else {
                        this.openToast('保存失败，服务器异常');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.openToast('服务器异常');
                });
        },
        setStaticInfo(user) {
            this.$store.commit('setUserInfo', user);
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
    }

}
</script>
<style lang='scss'>
@import "@/common/base.scss";

.personal-root {
    width: $root_width_value;
    height: 100%;
    margin: 0 auto;
    padding-top: 55px;
    position: relative;

    .personal-ic {
        width: 100px;
        height: 100px;
        border-radius: 5%;
    }
}

.personal-info {
    display: flex;
    position: relative;
    align-items: center;
    min-height: 220px;
    background-color: white;
    padding: 10px;

    .edit {
        position: absolute;
        right: 10px;
        bottom: 70px;
    }
}

.personal-name-root {
    display: flex;
    flex-direction: column;

    span {
        margin-left: 10px;
        width: 250px;
        word-break: break-all;
        white-space: normal;
    }
}

.personal-name {
    font-weight: 600;
    font-size: 20px;
    padding: 10px 21px;
}

.personal-main {
    margin-top: 10px;
    background-color: white;

    el-tab-pane {
        font-size: 50px;
    }
}

.personal-talk {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #666;

    img {
        margin-right: 5px;
    }
}

.personal-address {
    display: flex;
    align-items: center;
    height: 30px;
    font-size: 14px;
    color: #666;

    img {
        margin-right: 6px;
    }
}

.edit-info-root {
    display: flex;
    flex-direction: column;
    padding-left: 30px;

    .edit-info-address {
        margin-top: 8px;
    }
}
</style>
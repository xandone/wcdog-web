<template>
    <div class="personal-root">
        <div class="personal-info">
            <img class="personal-ic" :src="userInfo.userIcon" alt="">
            <div class="personal-name-root">
                <span class="personal-name">{{userInfo.nickname}}</span>
                <span>加快速度更何况是的肯定是客户刚开始当</span>
            </div>
            <el-button class="edit" type="primary" plain size="small">编辑个人资料</el-button>
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
import { mapState } from "vuex"
import jokeItem from '@/components/jokeItem'

const JOKE_CATEGORY = { "0": "网络", "1": "自创", "2": "听说" };
const JOKE_TAGS = { "0": "经典", "1": "荤笑话", "2": "精分", "3": "脑残", "4": "冷笑话" };

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
            selfUrl: `/admin/selfJokes`,
        }
    },
    mounted() {
        this.getSelfJokes();
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
                    this.selfUrl = `/admin/selfJokes`;
                    break;
                case '1':
                    break;
                case '2':
                    this.selfUrl = `/admin/thumb`;
                    break;
            }
            this.getSelfJokes();
        }

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
    height: 220px;
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
}

.personal-main {
    margin-top: 10px;
    background-color: white;

    el-tab-pane {
        font-size: 50px;
    }
}
</style>
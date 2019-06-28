<template>
    <div class="userview-root">
        <div class="userview-info">
            <img class="userview-ic" :src="userInfo.userIcon===null?require(`@/assets/wc_app.jpg`):userInfo.userIcon" alt="">
            <div class="userview-name-root">
                <span class="userview-name">{{userInfo.nickname}}</span>
                <span class="userview-talk" v-if="userInfo.talk">
                    <img src="../assets/talk_ic.png" alt="">{{userInfo.talk}}</span>
                <span class="userview-address" v-if="userInfo.address">
                    <img src="../assets/address_ic.png" alt="">{{userInfo.address}}</span>
            </div>
        </div>
        <div class="userview-main">
            <span class="tip1">他的动态</span>
            <jokeItem v-for="item in tableData" :bean='item'></jokeItem>
        </div>
    </div>
</template>
<script>
import jokeItem from '@/components/jokeItem'
import { JOKE_CATEGORY, JOKE_TAGS } from '@/config/env'

export default {
    components: {
        jokeItem,
    },
    data() {
        return {
            userInfo: {},
            jokeUserId: '',
            tableData: [],
            page: 1,
            row: 10,
        }
    },
    created() {},
    mounted() {
        this.jokeUserId = this.$route.params.jokeUserId;
        this.getUserInfo(this.jokeUserId);
        this.getSelfJokes();
        window.scrollTo(0, 0);
    },
    methods: {
        getUserInfo(userId) {
            this.$axios.get(`user/userInfo`, {
                    params: {
                        userId: userId,
                    }
                })
                .then((response) => {
                    const user = response.data;
                    this.userInfo = user.data[0];
                })
                .catch((error) => {
                    console.log(error);
                });

        },
        getSelfJokes() {
            this.$axios.get(`/user/selfJokes`, {
                    params: {
                        page: this.page,
                        row: this.row,
                        userId: this.jokeUserId,
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

        }
    }
}
</script>
<style lang="scss">
@import "@/common/base.scss";

.userview-root {
    width: $root_width_value;
    height: 100%;
    margin: 0 auto;
    padding-top: 55px;

    .userview-ic {
        width: 100px;
        height: 100px;
        border-radius: 5%;
    }
}

.userview-info {
    display: flex;
    position: relative;
    align-items: center;
    height: 220px;
    background-color: white;
    padding: 10px;
}

.userview-name-root {
    display: flex;
    flex-direction: column;

    span {
        margin-left: 10px;
        width: 250px;
        word-break: break-all;
        white-space: normal;
    }
}

.userview-name {
    font-weight: 600;
    font-size: 20px;
    padding: 10px 21px;
}

.userview-main {
    margin-top: 10px;
    background-color: white;

    .tip1 {
        display: block;
        font-size: 16px;
        padding: 10px 10px;
        border-bottom: 1px solid #f0f0f0;
    }

}

.userview-talk {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #666;

    img {
        margin-right: 5px;
    }
}

.userview-address {
    display: flex;
    align-items: center;
    height: 30px;
    font-size: 14px;
    color: #666;

    img {
        margin-right: 6px;
    }
}
</style>
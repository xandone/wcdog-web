<template>
    <div class="joke-root">
        <template v-if="tabsShow">
            <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="-1"></el-tab-pane>
                <el-tab-pane label="经典" name="0"></el-tab-pane>
                <el-tab-pane label="荤笑话" name="1"></el-tab-pane>
                <el-tab-pane label="精分" name="2"></el-tab-pane>
                <el-tab-pane label="脑残" name="3"></el-tab-pane>
                <el-tab-pane label="冷笑话" name="4"></el-tab-pane>
            </el-tabs>
        </template>
        <div v-if="isShowBanner" class="banner">
            <el-carousel height="250px">
                <el-carousel-item v-for="ban in bannerData">
                    <a :href="ban.articleUrl" target="_blank">
                        <span class="banner-title">{{ban.title}}</span>
                        <el-image class="banner-ic" :src="ban.imgUrl" :fit="fit"></el-image>
                    </a>
                </el-carousel-item>
            </el-carousel>
        </div>
        <span class="tip1" v-if="!tabsShow">搜索结果</span>
        <jokeItem v-for="item in tableData" :bean='item'></jokeItem>
    </div>
</template>
<script>
import jokeItem from '@/components/jokeItem'
import vueEvent from '@/bus/vueEvent.js'
const JOKE_CATEGORY = { "0": "网络", "1": "自创", "2": "听说" };
const JOKE_TAGS = { "0": "经典", "1": "荤笑话", "2": "精分", "3": "脑残", "4": "冷笑话" };
export default {
    components: {
        jokeItem,
    },
    data() {
        return {
            tableData: [],
            bannerData: [],
            page: 1,
            row: 10,
            activeName: '-1',
            isShowBanner: true,
            fit: 'cover',
            tabsShow: true
        }
    },
    created() {

    },
    mounted() {
        var _this = this;
        this.getJokes('-1');
        if (this.isShowBanner) {
            this.getBanners();
        }
        vueEvent.$on('search-key', function(key) {
            console.log('key===' + key);
            _this.dealSearchJokes(key);
        });
    },
    methods: {
        getJokes(tag) {
            this.$axios.get(`/joke/jokelist`, {
                    params: {
                        page: this.page,
                        row: this.row,
                        tag: tag,
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
        getBanners() {
            this.$axios.get(`/banner/list`)
                .then((response) => {
                    const banner = response.data;
                    const data = banner.data;
                    this.count = banner.total;
                    this.bannerData = [];
                    data.forEach(item => {
                        const bannerData = {};
                        bannerData.imgUrl = item.imgUrl;
                        bannerData.upTime = item.upTime;
                        bannerData.title = item.title;
                        bannerData.articleUrl = item.articleUrl;
                        bannerData.articelId = item.articelId;
                        this.bannerData.push(bannerData);
                    })
                })
                .catch((error) => {
                    console.log(error);
                });

        },
        handleClick(tab, event) {
            if (this.activeName === '-1') {
                this.isShowBanner = true;
            } else {
                this.isShowBanner = false;
            }
            this.getJokes(this.activeName);
            if (this.isShowBanner) {
                this.getBanners();
            }
        },
        dealSearchJokes(key) {
            if (!key) {
                alert('请输入搜索关键字');
                return;
            }
            this.$axios.get(`/joke/jokelist/foggy`, {
                    params: {
                        page: this.page,
                        row: this.row,
                        key: encodeURI(key),
                    }
                })
                .then((response) => {
                    const joker = response.data;
                    if (joker.code === 200) {
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
                        this.resetView();
                    } else {
                        openToast(joker.msg);
                    }

                })
                .catch((error) => {
                    console.log(error);
                });
        },
        resetView() {
            this.tabsShow = false;
            this.isShowBanner = false;
            window.scrollTo(0, 0);
        },
        openToast(msg) {
            this.$notify.error({
                title: '错误',
                message: msg
            });
        },

    }
}
</script>
<style lang='scss'>
.joke-root {
    width: 800px;
    background-color: white;

    .tip1 {
        display: block;
        font-size: 18px;
        padding: 10px 10px;
        border-bottom: 1px solid #f0f0f0;
    }
}

.tabs {
    padding: 0 10px;
}

.banner {
    padding: 10px;
    color: #475669;

    .banner-ic {
        width: 100%;
        height: 250px;
    }

    .banner-title {
        position: absolute;
        width: 160px;
        bottom: 10px;
        right: 10px;
        color: #eee;
        font-size: 14px;
        z-index: 2;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: right;
    }
}
</style>
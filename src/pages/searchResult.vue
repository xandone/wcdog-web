<template>
    <div class="search-result-root">
        <div class="search-content">
              <span class="tip1">搜索结果{{count}}条</span>
        <jokeItem v-for="item in tableData" :bean='item'></jokeItem>
        </div>
    </div>
</template>
<script>
import jokeItem from '@/components/jokeItem'
import vueEvent from '@/bus/vueEvent.js'
import { JOKE_CATEGORY,JOKE_TAGS } from '@/config/env'
export default {
    components: {
        jokeItem,
    },
    data() {
        return {
            tableData: [],
            count: 0,
            page: 1,
            row: 10,
            fit: 'cover',
            key: ''
        }
    },
    created() {

    },
    mounted() {
        this.key = this.$route.params.key;
        this.dealSearchJokes(this.key);
        var _this = this;
        vueEvent.$on('search-key', function(key) {
            _this.dealSearchJokes(key);
        });
    },
    methods: {
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
                        this.count = joker.total;
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
                        window.scrollTo(0, 0);
                    } else {
                        this.openToast(joker.msg);
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

    }
}
</script>
<style lang='scss'>
@import "@/common/base.scss";

.search-result-root {
    width: $root_width_value;
    height: 100%;
    margin: 0 auto;
    padding-top: 55px;
    position: relative;

}

.search-content {
    background-color: white;

    .tip1 {
        display: block;
        font-size: 16px;
        padding: 10px 10px;
        color: #666;
        border-bottom: 1px solid #f0f0f0;
    }
}
</style>
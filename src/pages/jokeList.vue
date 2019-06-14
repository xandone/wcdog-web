<template>
    <div class="joke-root">
        <jokeItem v-for="item in tableData" :bean='item'></jokeItem>
    </div>
</template>
<script>
import jokeItem from '@/components/jokeItem'
const JOKE_CATEGORY = { "0": "网络", "1": "自创", "2": "听说" };
const JOKE_TAGS = { "0": "经典", "1": "荤笑话", "2": "精分", "3": "脑残", "4": "冷笑话" };
export default {
    components: {
        jokeItem,
    },
    data() {
        return {
            tableData: [],
            page: 1,
            row: 20,
        }
    },
    created() {

    },
    mounted() {
        this.getJokes();
    },
    methods: {
        getJokes() {
            this.$axios.get(`/joke/jokelist`, {
                    params: {
                        page: this.page,
                        row: this.row
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

    }
}
</script>
<style lang='scss'>
.joke-root {
    width: 800px;
    background-color: white;
}
</style>
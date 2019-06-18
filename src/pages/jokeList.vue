<template>
    <div class="joke-root">
        <template>
            <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="-1"></el-tab-pane>
                <el-tab-pane label="经典" name="0"></el-tab-pane>
                <el-tab-pane label="荤笑话" name="1"></el-tab-pane>
                <el-tab-pane label="精分" name="2"></el-tab-pane>
                <el-tab-pane label="脑残" name="3"></el-tab-pane>
                <el-tab-pane label="冷笑话" name="4"></el-tab-pane>
            </el-tabs>
        </template>
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
            row: 10,
            activeName: '-1'
        }
    },
    created() {

    },
    mounted() {
        this.getJokes('-1');
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
        handleClick(tab, event) {
            this.getJokes(this.activeName);
        }

    }
}
</script>
<style lang='scss'>
.joke-root {
    width: 800px;
    background-color: white;
}

.tabs {
    padding: 0 10px;
}
</style>
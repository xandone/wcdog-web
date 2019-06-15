<template>
    <div>
        <div style="padding: 10px;">
            <span >{{comments}}</span>
            <div v-for='item in commentData'>
                <span>{{item.commentDetails}}</span>
            </div>
        </div>
        <div class="Pagination" style="text-align: left;margin-top: 10px;">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="count">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        isShowComment: false,
        jokeId: { type: String }
    },
    data() {
        return {
            commentData: [],
            page: 1,
            row: 10,
            count: 0,
            currentPage: 1,
        }
    },
    methods: {

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.page = val;
        },
        getJokeComments() {
            this.$axios.get(`/joke/comment/list`, {
                    params: {
                        page: this.page,
                        row: this.row,
                        jokeId: this.jokeId
                    }
                })
                .then((response) => {
                    const joker = response.data;
                    const data = joker.data;
                    this.count = joker.total;
                    this.commentData = [];
                    data.forEach(item => {
                        const tableData = {};
                        tableData.commentDate = item.commentDate;
                        tableData.commentDetails = item.commentDetails;
                        tableData.commentIcon = item.commentIcon;
                        tableData.commentId = item.commentId;
                        tableData.commentNick = item.commentNick;
                        tableData.commentUserId = item.commentUserId;
                        tableData.jokeId = item.jokeId;

                        this.commentData.push(tableData);
                    })
                })
                .catch((error) => {
                    console.log(error);
                });

        },

    },

    computed: {
        comments() {
            if (this.isShowComment) {
                console.log(12333);
                this.getJokeComments();
            }
        }
    }

}
</script>
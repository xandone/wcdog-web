<template>
    <div>
        <div style="padding: 10px;">
            <span >{{comments}}</span>
            <div v-for='item in commentData' class="comment-info-root">
                <div class="comment-user-info">
                    <div>
                        <img :src="item.commentIcon" alt="" class="comment-ic">
                        <span>{{item.commentNick}}</span>
                    </div>
                </div>
                <div class="conment-detail">
                    <span >{{item.commentDetails}}</span>
                </div>
                <span class="comment-date">
                            {{item.commentDate}}
                </span>
            </div>
        </div>
        <div class="Pagination" style="text-align: left;margin-top: 10px;">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="count">
            </el-pagination>
        </div>
        <div class="repaly-root">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="details" style="width: 700px;">
            </el-input>
            <el-button @click="addComment" type="primary" size="small" style="margin-left: 10px;">发布</el-button>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props: {
        isShowComment: false,
        jokeId: { type: String }
    },
    computed: {
        ...mapState([
            'userInfo'
        ]),
        comments() {
            if (this.isShowComment) {
                this.getJokeComments();
            }
        }
    },
    data() {
        return {
            commentData: [],
            page: 1,
            row: 10,
            count: 0,
            currentPage: 1,
            details: '',
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
        addComment() {
            if (!this.userInfo) {
                alert('请先登录');
                return;
            }
            if (!this.details) {
                alert('请输入回复内容');
                return;
            }
            this.$axios.post(`/joke/comment/add`, {
                    jokeId: this.jokeId,
                    userId: this.userInfo.userId,
                    details: this.details,
                })
                .then((response) => {
                    const result = response.data;
                    const data = result.data[0];
                    console.log(result.code);
                    if (result && result.code === 200) {
                        this.openSuccess('恭喜，发布成功!');
                        const tableData = {};
                        tableData.commentDetails = data.commentDetails;
                        tableData.commentIcon = data.commentIcon;
                        tableData.commentNick = data.commentNick;
                        tableData.commentDate = data.commentDate;
                        this.commentData.unshift(tableData);
                        this.count++;
                        this.details = '';
                        this.increment();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        },
        increment() {
            this.$emit('increment');
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

}
</script>
<style lang="scss">
.comment-info-root {
    border-bottom: 1px solid #f0f0f0;
    padding: 10px 0;
}

.repaly-root {
    margin-top: 10px;
}

.comment-ic {
    width: 30px;
    height: 30px;
    border-radius: 10%;
}

.comment-user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        display: flex;
        align-items: center;
        padding: 10px 0;

        span {
            margin-left: 10px;
            font-size: 14px;
            color: #555;
        }
    }
}

.comment-date {
    font-size: 13px;
    color: #bbb;
    padding-left: 40px;
}

.conment-detail {
    font-size: 14px;
    color: #333;
    padding: 10px 40px;
}
</style>
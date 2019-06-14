<template>
    <div class="item-root">
        <div class="content">
            <img @click="show(bean)" class="item_img" :src="bean.coverImg" alt="">
            <div class="item-text">
                <a class="transition joke-a" href="http://t.m.youth.cn/transfer/toutiao/url/3g.youth.cn/rdzx/201906/t20190613_11981448.htm?tt_group_id=6701898860630901259">有人整理了42年来的高考照片！</a>
                <span class="author">{{bean.jokeUserNick}}</span>
                <div class="approval">
                    <div><img src="../assets/approval.png" alt=""><span> {{bean.articleLikeCount}}</span></div>
                    <div @click="showComment"><img src="../assets/comment_ic.png"alt="">
                        <span> {{bean.articleCommentCount}}</span>
                    </div>
                </div>
                <span class="item-date"> {{bean.postTime}}</span>
            </div>
        </div>
        <div :class="isShowComment?'showEdit':'comment-root'">
            <div style="padding: 10px;">
                <span >评论</span>
            </div>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        bean: {
            type: Object
        }
    },
    data() {
        return {
            isShowComment: false,
            commentData: [],
            page: 1,
            row: 10,
            count: 0,
            currentPage: 1,
        }
    },

    methods: {
        show(bean) {
            alert(bean.coverImg);
        },
        showComment() {
            this.isShowComment = !this.isShowComment;
            if (this.isShowComment) {
                this.getJokeComments();
            }
            
        },
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
                        jokeId: this.bean.jokeId
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
    }
}
</script>
<style lang="scss">
item-span {
    font-size: 14px;
    color: #bbb;
}

.item-root {
    padding: 20px 10px;
    border-bottom: 1px solid #f0f0f0;
}

.content {
    display: flex;
    width: 100%;
    height: 130px;
}

.item-text {
    margin-left: 10px;
    position: relative;
    width: 100%;
    height: 100%;

    .author {
        line-height: 20px;
        @extend item-span;
        color: #555;
    }
}

.joke-a {
    font-size: 16px;
    color: #333;
}

.approval {
    display: flex;
    position: absolute;
    left: 0;
    bottom: 0;

    span {
        @extend item-span;
    }

    img {
        width: 20px;
        height: 20px;
    }

    div {
        display: flex;
        align-items: center;
    }

    div:nth-child(2) {
        margin-left: 15px;
    }

}


.item-date {
    @extend item-span;
    font-size: 13px;
    position: absolute;
    right: 0;
    bottom: 0;
}


.item_img {
    width: 260px;
    height: 130px;
    overflow: hidden;
}

.showEdit {
    height: 100px;
    overflow: hidden;
    transition: all 400ms;
    background: #f9fafc;
    margin-top: 20px;
}

.comment-root {
    height: 0;
    overflow: hidden;
    transition: all .3s ease;
    background: #f9fafc;
}
</style>
<template>
    <div class="item-root">
        <div class="content">
            <img  class="item_img" :src="bean.coverImg" alt="" v-if="bean.coverImg">
            <div class="item-text">
                <div class="title-tags">
                    <a class="transition joke-a" :href="['/jokeDetails/'+bean.jokeId]" target="_blank">
                        <span class="title-text">{{bean.title}}</span>
                    </a>
                    <div class="joke-tag-el">
                        <el-tag v-for='i in bean.tags' size='mini' type="success" style="margin-right: 10px">
                            {{JOKE_TAGS[i]}}
                        </el-tag>
                    </div>
                </div>
                <span class="author" @click="toUserView">{{bean.jokeUserNick}}</span>
                <div class="joke-content">
                    <span >{{bean.content}}</span>
                </div>
                <div class="approval">
                    <span>
                        <img @click="approvalJoke" src="../assets/approval.png" alt="">
                         {{bean.articleLikeCount}}
                    </span>
                    <span @click="showComment"><img src="../assets/comment_ic.png" alt="">
                         {{bean.articleCommentCount}}
                    </span>
                </div>
                <span class="item-date"> {{bean.postTime}}</span>
            </div>
            <span class="joke-type">{{bean.category}}</span>
        </div>
        <div :class="isShowComment?'showEdit':'comment-root'">
            <comments :isShowComment='isShowComment' :jokeId='bean.jokeId' :minRows='1' :maxRows='4' v-on:increment="increment"> </comments>
        </div>
    </div>
</template>
<script>
import comments from '@/components/comments'
import { mapState } from 'vuex'
import { JOKE_TAGS } from '@/config/env'

export default {
    props: {
        bean: {
            type: Object
        }
    },
    computed: {
        ...mapState([
            'userInfo'
        ]),
    },
    components: { comments },
    data() {
        return {
            isShowComment: false,
            JOKE_TAGS: JOKE_TAGS,
        }
    },

    methods: {
        showComment() {
            this.isShowComment = !this.isShowComment;
        },

        increment() {
            this.bean.articleCommentCount = this.bean.articleCommentCount + 1;
        },
        toUserView() {
            if (this.userInfo && this.bean.jokeUserId === this.userInfo.userId) {
                this.$router.push('/personal');
            } else {
                this.$router.push({
                    path: '/userView',
                    name: 'userView',
                    params: {
                        jokeUserId: this.bean.jokeUserId
                    }
                });
            }

        },
        approvalJoke() {
            if (!this.userInfo) {
                alert('请先登录');
                return;
            }
            this.$axios.get(`/joke/joke/thumbs`, {
                    params: {
                        jokeId: this.bean.jokeId,
                        jokeUserId: this.userInfo.userId,
                    }

                })
                .then((response) => {
                    const result = response.data;
                    if (result && result.code === 200) {
                        this.openSuccess('点赞成功!');
                        this.bean.articleLikeCount = this.bean.articleLikeCount + 1;
                    } else {
                        this.openWarning(result.msg);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        openWarning(msg) {
            this.$message({
                message: msg,
                type: 'warning'
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
<style lang="scss">
@import "@/common/base.scss";

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

.joke-content {
    height: 60px;
    overflow: hidden;
    font-size: 14px;
    color: #222;

    span {}
}

.title-tags {
    display: flex;
    align-items: center;

    a {
        margin-right: 10px;
    }

    .title-text {
        font-size: 16px;
        font-weight: 600;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: inline-block;
        width: 400px;
    }

    .joke-tag-el {
        position: absolute;
        right: 0px;
        top: 0px;
    }
}

.item-text {
    margin-left: 10px;
    position: relative;
    width: 100%;
    height: 100%;

    .author {
        line-height: 20px;
        @extend item-span;
        color: $text_blue;
        cursor: default;
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
        display: flex;
        align-items: center;
    }

    img {
        width: 20px;
        height: 20px;
        margin-right: 4px;
    }

    span:nth-child(2) {
        margin-left: 12px;
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
    border-radius: 3%;
}

.showEdit {
    display: block;
    overflow: hidden;
    transition: all 400ms;
    background: #f9fafc;
    margin-top: 20px;
}

.comment-root {
    display: none;
    overflow: hidden;
    transition: all .5s ease;
    background: #f9fafc;
}

.joke-type {
    width: 40px;
    font-size: 14px;
    color: #999;
}
</style>
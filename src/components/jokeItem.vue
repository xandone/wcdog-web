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
            <comments :isShowComment='isShowComment' :jokeId='bean.jokeId'> </comments>
        </div>
    </div>
</template>
<script>
import comments from '@/components/comments'
export default {
    props: {
        bean: {
            type: Object
        }
    },
    components: { comments },
    data() {
        return {
            isShowComment: false,
        }
    },

    methods: {
        show(bean) {
            alert(bean.coverImg);
        },
        showComment() {
            this.isShowComment = !this.isShowComment;

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
    height: 200px;
    overflow: hidden;
    transition: all 400ms;
    background: #f9fafc;
    margin-top: 20px;
}

.comment-root {
    height: 0;
    overflow: hidden;
    transition: all .5s ease;
    background: #f9fafc;
}
</style>
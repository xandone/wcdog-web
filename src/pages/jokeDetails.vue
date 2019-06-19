<template>
    <div class="details-root">
        <div class="content-bg">
            <span class="joke-title">{{jokeDetails.title}}</span>
            <div class="joke-user-info"><span>{{jokeDetails.jokeUserNick}}</span><span>{{jokeDetails.postTime}}</span></div>
            <div class="joke-content" v-html="jokeDetails.contentHtml"></div>
            <comments :isShowComment="true" :jokeId="jokeId" class="details-comment"></comments>
        </div>
    </div>
</template>
<script>
import comments from '@/components/comments'

const JOKE_CATEGORY = { "0": "网络", "1": "自创", "2": "听说" };
const JOKE_TAGS = { "0": "经典", "1": "荤笑话", "2": "精分", "3": "脑残", "4": "冷笑话" };
export default {
    data() {
        return {
            jokeId: this.$route.params.jokeId,
            jokeDetails: {}
        }
    },

    created() {
        this.getJokeDetails();
    },
    components: { comments },

    methods: {
        getJokeDetails() {
            this.$axios.get(`/joke/jokeDetails`, {
                    params: {
                        jokeId: this.jokeId
                    }
                })
                .then((response) => {
                    const joker = response.data;
                    const item = joker.data[0];
                    this.jokeDetails = {};
                    this.jokeDetails.articleCommentCount = item.articleCommentCount;
                    this.jokeDetails.articleLikeCount = item.articleLikeCount;
                    this.jokeDetails.content = item.content;
                    this.jokeDetails.contentHtml = item.contentHtml;
                    this.jokeDetails.coverImg = item.coverImg;
                    this.jokeDetails.jokeId = item.jokeId;
                    this.jokeDetails.jokeUserIcon = item.jokeUserIcon;
                    this.jokeDetails.jokeUserId = item.jokeUserId;
                    this.jokeDetails.jokeUserNick = item.jokeUserNick;
                    this.jokeDetails.postTime = item.postTime;
                    this.jokeDetails.title = item.title;
                    if (item.category) {
                        this.jokeDetails.category = JOKE_CATEGORY[item.category];
                    } else {
                        this.jokeDetails.category = JOKE_CATEGORY['0'];
                    }
                    if (item.tags) {
                        this.jokeDetails.tags = JSON.parse(item.tags);
                    } else {
                        this.jokeDetails.tags = ['0'];
                    }


                })
                .catch((error) => {
                    console.log(error);
                });
        },
    }
}
</script>
<style lang="scss">
@import "@/common/base.scss";

.details-root {
    width: $root_width_value;
    height: 100%;
    margin: 0 auto;
    padding-top: 55px;
}

.content-bg {
    padding: 10px;
    background-color: white;

    .joke-title {
        font-size: 22px;
        font-weight: 600;
        width: 100%;
        text-align: center;
        padding: 20px 0;
        display: block;
    }

    .joke-user-info {
        text-align: center;

        span {
            font-size: 13px;
            color: #999;
        }

        span:nth-child(1) {
            margin-right: 10px;
            color: $text_blue;
            cursor: default;
        }
    }

    .joke-content {
        height: 100%;
        text-align: left;
        padding: 0 30px 30px 30px;
        border-bottom: 1px solid #f0f0f0;
    }

    .details-comment {
        padding: 0 30px 50px 30px;
    }
}
</style>
<template>
    <div class="details-root">
        <div class="content-bg">
            <span class="joke-title">{{jokeDetails.title}}</span>
            <div class="joke-user-info">
                <span @click="toUserView">{{jokeDetails.jokeUserNick}}</span>
                <span>{{jokeDetails.postTime}}</span>
            </div>
            <div class="joke-content" v-html="jokeDetails.contentHtml"></div>
            <comments :isShowComment="true" :jokeId="jokeId" :minRows='3' :maxRows='6' class="details-comment"></comments>
        </div>
    </div>
</template>
<script>
import comments from '@/components/comments'
import { mapState } from 'vuex'
import { JOKE_CATEGORY, JOKE_TAGS } from '@/config/env'

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
    computed: {
        ...mapState([
            'userInfo'
        ]),
    },

    methods: {
        toUserView() {
            if (this.userInfo && this.jokeDetails.jokeUserId === this.userInfo.userId) {
                this.$router.push('/personal');
            } else {
                this.$router.push({
                    path: '/userView',
                    name: 'userView',
                    params: {
                        jokeUserId: this.jokeDetails.jokeUserId
                    }
                });
            }

        },
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
                    this.jokeDetails = item;
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
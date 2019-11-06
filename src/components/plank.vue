<template>
    <div>
        <div class="plank-text">
            <span>~公告~</span>
            <span>{{lastPlank.content}}</span>
            <span class="plank-time" style="font-size: 12px;">{{lastPlank.sendTimeStr}}</span>
        </div>
        <div class="plank-msg">
            <div class="plank-send">
                <el-input type="textarea" placeholder="刷个存在感吧.." :autosize="{ minRows: 1, maxRows: 2}" v-model="myTalk" maxlength="30" show-word-limit size="small" />
                <el-button @click="addTalk" style="margin-top: 10px" type="primary" size="mini">发送</el-button>
            </div>
            <div class="plank-item" v-for="item in talkData">
                <div class="plank-user">
                    <el-popover placement="bottom-start" width="200" trigger="hover" content="">
                        <img slot="reference" @click="toUserView(item)" class="plank-user-ic" :src="item.userIcon===null?require(`@/assets/wc_app.jpg`):item.userIcon" alt="">
                        <div class="talk-qr-root">
                            <img class="talk-qr-ic" :src="item.userIcon===null?require(`@/assets/wc_app.jpg`):item.userIcon" alt="">
                            <div class="talk-qr-tip">
                                <span>{{item.userNick}}</span>
                                <span>{{item.talk}}</span>
                            </div>
                        </div>
                    </el-popover>
                    <span class="plank-user-nick">{{item.userNick}}</span>
                </div>
                <div class="plank-user-talk-root">
                    <span class="plank-user-talk">{{item.talk}}</span>
                    <span class="plank-talk_time">{{item.sendTimeStr}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState([
            'userInfo'
        ])
    },
    mounted() {
        this.getLastPlank();
        this.getTalkList();
    },
    data() {
        return {
            myTalk: '',
            talkData: [],
            lastPlank: {}
        }
    },
    methods: {
        getLastPlank() {
            this.$axios.get(`/plank/planktalk/lastplank`)
                .then((response) => {
                    const result = response.data;
                    const data = result.data[0];
                    this.lastPlank.content = data.content;
                    this.lastPlank.sendTimeStr = data.sendTimeStr;
                })
                .catch((error) => {
                    this.lastPlank.content = "暂无公告";
                    console.log(error);
                });

        },
        getTalkList() {
            this.$axios.get(`/plank/talkList`, {
                    params: {
                        size: 5
                    }
                })
                .then((response) => {
                    const result = response.data;
                    const data = result.data;
                    this.talkData = [];
                    data.forEach(item => {
                        const talkItem = {};
                        talkItem.talk = item.talk;
                        talkItem.userIcon = item.userIcon;
                        talkItem.userId = item.userId;
                        talkItem.userNick = item.userNick;
                        talkItem.sendTime = item.sendTime;
                        talkItem.sendTimeStr = item.sendTimeStr;
                        this.talkData.push(talkItem);
                    })
                })
                .catch((error) => {
                    console.log(error);
                });

        },
        addTalk() {
            if (!this.userInfo) {
                alert('请先登录');
                return;
            }
            if (!this.myTalk) {
                alert('请输入说说');
                return;
            }
            this.$axios.post(`/plank/add`,
                    this.$qs.stringify({
                        'userId': this.userInfo.userId,
                        'talk': this.myTalk,
                    }))
                .then((response) => {
                    const result = response.data;
                    if (result && result.code === 200) {
                        this.openSuccess('恭喜，发表成功!');
                        const data = result.data[0];
                        let tableData = {};
                        tableData.userIcon = data.userIcon;
                        tableData.userNick = data.userNick;
                        tableData.talk = data.talk;
                        tableData.sendTimeStr = '刚刚';
                        tableData.userId = data.userId;
                        this.talkData.unshift(tableData)
                        if (this.talkData.length > 5) {
                            this.talkData.pop();
                        }
                        this.myTalk = '';
                    } else if (result.code === 201) {
                        this.openToast('发布失败，您处于禁言状态');
                    } else {
                        this.openToast('发布失败，服务器异常');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        },
        toUserView(item) {
            console.log(item);
            if (this.userInfo && item.userId === this.userInfo.userId) {
                this.$router.push('/personal');
            } else {
                this.$router.push({
                    path: '/userView',
                    name: 'userView',
                    params: {
                        jokeUserId: item.userId
                    }
                });
            }

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

    }
}
</script>
<style lang='scss'>
@import "@/common/base.scss";

.plank-text {
    width: 200px;
    height: 150px;
    background-color: white;
    margin-left: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: fixed;
    padding: 10px;

    span {
        font-size: 16px;
        color: #666;
        display: block;
    }

    span:nth-child(2) {
        margin-top: 20px;
        font-size: 14px;
    }
}

.plank-time {
    position: absolute;
    right: 10px;
    bottom: 10px;
}

.plank-msg {
    width: 200px;
    height: 400px;
    top: 230px;
    background-color: white;
    margin-left: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: fixed;
    padding: 10px;
}

.plank-item {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.plank-user {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.plank-user-ic {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}

.plank-user-nick {
    display: inline-block;
    color: $text_blue;
    font-size: 12px;
    width: 45px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
}

.plank-user-talk-root {
    display: flex;
    flex-direction: column;
}

.plank-user-talk {
    font-size: 12px;
    color: #999;
    width: 150px;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
}

.plank-send {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.plank-talk_time {
    display: block;
    width: 100%;
    text-align: right;
    font-size: 12px;
    color: #ccc;
    transform: scale(0.8);
}

.talk-qr-root {
    display: flex;
}

.talk-qr-ic {
    width: 80px;
    height: 80px;
    border-radius: 6%;
}

.talk-qr-tip {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    font-size: 12px;

    span:nth-child(1) {
        margin-bottom: 10px;
        color: $text_blue;
    }
}
</style>
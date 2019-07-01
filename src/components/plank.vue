<template>
    <div>
        <div class="plank-text">
            <span>~公告~</span>
            <span>fgdfgdf gdf的非官方大哥发的豆腐干豆腐鬼地方个鬼地方个的非官方的天</span>
        </div>
        <div class="plank-msg">
            <div class="plank-send">
                <el-input type="text" placeholder="请输入内容" v-model="myTalk" maxlength="25" show-word-limit size="small" />
                <el-button @click="addTalk" style="margin-top: 10px" type="primary" size="mini">发送</el-button>
            </div>
            <div class="plank-item" v-for="item in talkData">
                <div class="plank-user">
                    <img class="plank-user-ic" :src="item.userIcon===null?require(`@/assets/wc_app.jpg`):item.userIcon" alt="">
                    <span class="plank-user-nick">{{item.userNick}}</span>
                </div>
                <span class="plank-user-talk">{{item.talk}}</span>
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
        this.getTalkList();
    },
    data() {
        return {
            myTalk: '',
            talkData: []
        }
    },
    methods: {
        getTalkList() {
            this.$axios.get(`/plank/talkList`)
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
                    const data = result.data[0];
                    console.log(result.code);
                    if (result && result.code === 200) {
                        this.openSuccess('恭喜，发表成功!');
                        let tableData = {};
                        tableData.userIcon = data.userIcon;
                        tableData.userNick = data.userNick;
                        tableData.talk = data.talk;
                        this.talkData.unshift(tableData)
                        this.myTalk = '';
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

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
    height: 200px;
    background-color: white;
    margin-left: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: fixed;
    padding: 10px;

    span {
        font-size: 16px;
        color: #666;
        display: inline-block;
    }

    span:nth-child(2) {
        margin-top: 20px;
        font-size: 14px;
    }
}

.plank-msg {
    width: 200px;
    height: 500px;
    top: 290px;
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
    justify-content:center;
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

.plank-user-talk {
    font-size: 13px;
    color: #999;
    width: 150px;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.plank-send {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
</style>
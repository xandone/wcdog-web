<template>
    <div class="head-root">
        <div class="head-item">
            <span>WCDOG</span>
            头部
            <div class="user-info">
                <el-popover placement="top-start" width="200" trigger="hover" content="">
                    <div class="app-qr-root">
                        <img class="app-qr-ic" src="@/assets/wc_app.jpg" alt="">
                        <div class="app-qr-tip">
                            <span>扫一扫</span>
                            <span>下载旺财APP</span>
                        </div>
                    </div>
                    <span slot="reference">App下载</span>
                </el-popover>
                <span>大牛二虎</span>
                <img class="user-ic" src="https://upload-images.jianshu.io/upload_images/2518499-ac8c6a0db917e181.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="">
             </div>
            </div>
        </div>
</template>
<script>
</script>
<style lang="scss">
@import "@/common/base.scss";

.head-root {
    position: fixed;
    width: 100%;
    height: 50px;
    background-color: white;
    z-index: 5;
}

.head-item {
    position: relative;
    display: flex;
    width: $root_width_value;
    height: 100%;
    align-items: center;
    margin: 0 auto;
}

.user-info {
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;

    span {
        font-size: 14px;
        margin-right: 10px;
    }

    span:nth-child(1) {
        cursor: pointer;
    }

    span:nth-child(2) {
        cursor: default;
    }

}

.user-ic {
    width: 30px;
    height: 30px;
    border-radius: 4px;
}

.app-qr-ic {
    width: 80px;
    height: 80px;
}

.app-qr-root {
    display: flex;
}

.app-qr-tip {
    display: flex;
    flex-direction: column;
    justify-content: center;

    span:nth-child(1){
        margin-bottom: 10px;
    }
}
</style>
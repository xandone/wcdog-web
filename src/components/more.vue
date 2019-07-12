<template>
    <div class="more-root">
        <span @click="loadMore">{{showInfo}}</span>
    </div>
</template>
<script>
export default {
    props: {
        showInfo: { type: String }
    },
    data() {
        return {
          
        }
    },
    methods: {
        loadMore() {
            this.$emit('loadMore');
        }
    }
}
</script>
<style lang="scss">
.more-root {
    width: 800px;
    height: 80px;
    background-color: white;
    text-align: center;

    span {
        color: #999;
        font-size: 15px;
        line-height: 80px;
        padding: 10px;
        cursor: default;
    }
}
</style>
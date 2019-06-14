<template>
    <div id="app " class="fill">
        <headTop></headTop>
        <router-view />
    </div>
</template>
<script>
import headTop from '@/components/headTop'
export default {
    components: {
        headTop
    }
}
</script>
<style lang="scss">
@import "@/common/base.scss";

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.fill {
    width: 100%;
    height: 100%;
}
</style>
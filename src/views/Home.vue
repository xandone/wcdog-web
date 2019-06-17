<template>
    <div class=" fill">
        <div class="home-root">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import jokeList from '@/pages/jokeList'
import jokeAdd from '@/pages/jokeAdd'

export default {
    name: 'home',
    components: {
        jokeList,
        jokeAdd
    }
}
</script>
<style lang="scss">
@import "@/common/base.scss";

.home-root {
    width: $root_width_value;
    height: 100%;
    margin: 0 auto;
    padding-top: 55px;
}
</style>
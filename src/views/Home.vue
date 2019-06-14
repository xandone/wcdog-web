<template>
    <div class=" fill">
        <div class="home-root">
            <jokeList></jokeList>
        </div>
    </div>
</template>
<script>
import jokeList from '@/pages/jokeList'

export default {
    name: 'home',
    components: {
        jokeList,
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
<template>
    <div class=" fill">
        <div class="home-root">
            <jokeList></jokeList>
            <plank></plank>
        </div>
    </div>
</template>
<script>
import jokeList from '@/pages/jokeList'
import plank from '@/components/plank'
export default {
    name: 'home',
    components: {
        jokeList,
        plank,
    }
}
</script>
<style lang="scss">
@import "@/common/base.scss";

.home-root {
    width: $root_width_value;
    margin: 0 auto;
    padding-top: 55px;
    display: flex;
}
</style>
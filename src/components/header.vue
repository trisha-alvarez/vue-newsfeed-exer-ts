<template>
<div class="nav">
    <header>
        <span><router-link to="/"><i class="fas fa-home"></i></router-link></span>
        <span><router-link to="/news-feed"><i class="fas fa-newspaper"></i> News Feed</router-link></span>
    </header>
</div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent ({
    name: "header"
})
</script>

<style scoped>
.nav {
    margin: 50px 0;
}
span {
    padding: 20px;
}
a {
    color: #fff;
    text-decoration: inherit;
    font-size: 18px;
}
</style>
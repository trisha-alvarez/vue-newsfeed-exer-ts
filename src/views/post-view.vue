<template>
    <div class="row">
        <post :post="singlePost"/>
    </div>

    <div class="row">
        <router-view :post="singlePost" v-if="isMounted"/>
    </div>
</template>

<script lang="ts">
import IPost from '@/interface/posts'
import { defineComponent, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPost } from '@/composables/use-post'
import post from '@/components/post.vue'

export default defineComponent({
    name: 'PostView',
    components: {
        post
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const singlePost = ref<IPost>({
            title: '',
            author: '',
            date: '',
            content: '',
            id: ''
        })
        const isMounted = ref<boolean>(false)
        onMounted( async () => {
            const res = await fetchPost(props.id)
            singlePost.value = res
            isMounted.value = !isMounted.value
        })
        async function refetchPost() {
            const res = await fetchPost(props.id)
            singlePost.value = res
        }
        const route = useRoute()
        watch(
            () => route.path,
            refetchPost
        )

        return {
            singlePost,
            isMounted
        }
    },
})
</script>

<style scoped>
.text-right {
    text-align: right;
}
</style>
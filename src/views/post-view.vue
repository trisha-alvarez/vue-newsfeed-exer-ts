<template>
    <div class="row">
        <span class="text-right">
            <router-link :to="{name: postEditRoute, params: { post: singlePost }}">
                <button type="button" class="btn">
                    <i class="fas fa-edit" style="color: #219EBC"></i>
                </button>
            </router-link>

            <button type="button" class="btn" @click="postDelete">
                <i class="fas fa-trash" style="color: #E63946"></i>
            </button>
        </span>

        <post :post="singlePost"/>
    </div>

    <div class="row">
        <router-view :post="singlePost" />
    </div>
</template>

<script lang="ts">
import IPost from '@/interface/posts'
import { RouteNames } from '@/constants/route-names'
import { defineComponent, ref, onMounted } from 'vue'
import { fetchPost, deletePost } from '@/composables/post-requests'
import post from '@/components/post.vue'
import router from '@/router'

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

        const postEditRoute: string = RouteNames.POST_EDIT
        
        const postDelete = async () => {
            const res = await deletePost(props.id)
            if (res === 200) {
                router.push({ name: RouteNames.NEWS_FEED })
            }
        }
        
        onMounted( async () => {
            const res = await fetchPost(props.id)
            singlePost.value = res
        })

        return {
            singlePost,
            postDelete,
            postEditRoute
        }
    },
})
</script>

<style scoped>
.text-right {
    text-align: right;
}
</style>
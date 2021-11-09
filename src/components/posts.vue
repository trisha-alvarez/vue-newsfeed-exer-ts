<template>
    <div class="posts">
        <div v-for="post in posts" :key="post.id">
            <div class="row p-5">
                <h2>
                    {{post.title}}
                    <span class="text-right">
                        <button type="button" class="btn" @click="redirectPostEdit(post.id)">
                            <i class="fas fa-edit" style="color: #219EBC"></i>
                        </button>

                        <button type="button" class="btn" @click="postDelete(post.id)">
                            <i class="fas fa-trash" style="color: #E63946"></i>
                        </button>
                    </span>
                </h2>
                <small>{{post.author}} | {{formattedDate(post.date)}}</small>
                <p>{{excerpt(post.content, 15)}} <small class="text-right link-primary" @click="readMoreRedirect(post.id)">Read more</small></p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import IPost from '@/interface/posts'
import { formatDate, contentExcerpt } from '@/composables/use-util'
import { deletePost } from '@/composables/use-post'
import { RouteNames } from '@/constants/route-names'
import { defineComponent, PropType } from 'vue'
import router from '@/router'

export default defineComponent({
    name: 'posts',
    props: {
        posts: {
            type: Array as PropType<IPost[]>,
            required: true
        }
    },
    setup(props, { emit }) {
        const excerpt = (content: string, words: number): string => {
            return contentExcerpt(content, words)
        }
        const formattedDate = (date: string) => {
            return formatDate(date)
        }
        function readMoreRedirect(id: string): void {
            router.push({ 
                name: RouteNames.POST_VIEW, 
                params: { 
                    id: id
                }
            })
        }
        function redirectPostEdit(id: string): void {
            router.push({ 
                name: RouteNames.POST_EDIT, 
                params: { 
                    id: id
                }
            })
        }
        async function postDelete(id: string): Promise<void> {
            const res = await deletePost(id)
            if (res) {
                alert('Post deleted!')
                emit('refetchFeed', res)
            }
        }
        
        return {
            excerpt,
            formattedDate,
            readMoreRedirect,
            redirectPostEdit,
            postDelete
        }
    }
})
</script>

<style scoped>
.fas {
    font-size: 18px;
}
.row {
    background: #f1faeedc;
    margin: 0 0 50px 0;
    padding: 20px;
    border-radius: 10px;
}
h2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #1D3557;
    font-weight: 600;
}
h2, small, p {
    margin-bottom: 20px;
}
.text-right {
  text-align: right;
}
.link-primary {
    cursor: pointer;
}
</style>
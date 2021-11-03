<template>
    <div class="posts">
        <div v-for="post in posts" :key="post.id">
            <div class="row p-5">
                <h2>{{post.title}}</h2>
                <small>{{post.author}} | {{formatDate(post.date)}}</small>
                <p>{{contentExcerpt(post.content, 15)}} <small class="text-right"><router-link :to="{name: postViewRoute, params: { id: post.id }}">Read more</router-link></small></p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import IPost from '@/interface/posts'
import { RouteNames } from '@/constants/route-names'
import { defineComponent, PropType } from 'vue'
import moment from 'moment'

export default defineComponent({
    name: 'posts',
    props: {
        posts: {
            type: Array as PropType<IPost[]>,
            required: true
        }
    },
    setup() {
        const formatDate = (date: string): string => {
            return moment(String(date)).format('MMMM DD, YYYY')
        }
        const contentExcerpt = (content: string, words: number) => {
            return content.split(" ").splice(0, words).join(" ") + "..."
        }
        const postViewRoute: string = RouteNames.POST_VIEW
        return {
            contentExcerpt,
            formatDate,
            postViewRoute
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
</style>
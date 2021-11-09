<template>
  <div class="row">
    <div class="col-8">
      <posts :posts="postsList" @refetchFeed="refetchFeed"/>
    </div>
    <div class="col-4">
      <h5>Post something!</h5>
      <post-new @refetchFeed="refetchFeed"/>
    </div>
  </div>
</template>


<script lang="ts">
import IPost from '@/interface/posts'
import { defineComponent, ref, onMounted } from 'vue'
import { fetchPosts } from '@/composables/use-post'
import posts from '@/components/posts.vue'
import postNew from '@/components/post-new.vue'

export default defineComponent({
  name: 'NewsFeed',
  components: {
    posts,
    postNew
  },
  setup() {
    const postsList = ref<IPost[]>([])
    const refetchFeed = async (event: boolean) => {
      if(event) {
        const res = await fetchPosts()
        postsList.value = res
      }
    }
    onMounted( async () => {
      const res = await fetchPosts()
      postsList.value = res
    })
    
    return {
      postsList,
      refetchFeed
    }
  }
})
</script>

<style scoped>
.col-8 {
  padding-right: 5%;
}
</style>
<template>
  <div class="row">
    <div class="col-8">
      <posts :posts="postsList"/>
    </div>
    <div class="col-4">
      <h5>Post something!</h5>
      <post-new @newPost="newPost"/>
    </div>
  </div>
</template>


<script lang="ts">
import IPost from '@/interface/posts'
import { defineComponent, ref, onMounted, watch } from 'vue'
import { fetchPosts } from '@/composables/post-requests'
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

    onMounted( async () => {
      const res = await fetchPosts()
      postsList.value = res
    })

    const newPost = async (event: IPost) => {
      const res = await fetchPosts()
      postsList.value = res
    }

    return {
      newPost,
      postsList
    }
  }
})
</script>

<style scoped>
.col-8 {
  padding-right: 5%;
}
</style>
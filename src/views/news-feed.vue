<template>
  <div class="row">
    <div class="col-8">
      <posts :posts="postsList"/>
    </div>
    <div class="col-4">
      <h5>Post something!</h5>
      <post-new />
    </div>
  </div>
</template>


<script lang="ts">
import IPost from '@/interface/posts'
import { defineComponent, ref, onMounted } from 'vue'
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
      try {
        const res = await fetchPosts()
        postsList.value = res
      } catch(e) {
        alert("Error: Cannot load posts.")
      }
    })

    return {
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
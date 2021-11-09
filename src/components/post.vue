<template>
  <div class="row p-5">
      <span class="text-right">
        <button type="button" class="btn" @click="redirectPostEdit">
          <i class="fas fa-edit i-blue"></i>
        </button>

        <button type="button" class="btn" @click="postDelete">
            <i class="fas fa-trash i-red"></i>
        </button>
      </span>
      <h1>{{post.title}}</h1>
      <small>{{post.author}} | {{formattedDate}}</small>
      <p>{{post.content}}</p>
  </div>
</template>

<script lang="ts">
import IPost from '@/interface/posts'
import { RouteNames } from '@/constants/route-names'
import { computed, defineComponent, PropType } from 'vue'
import { formatDate } from '@/composables/use-util'
import { deletePost } from '@/composables/use-post'
import router from '@/router'

export default defineComponent({
    name: 'post',
    props: {
      post: {
        type: Object as PropType<IPost>,
        required: true
      }
    },
    setup(props) {
      const formattedDate = computed((): string => {
        return formatDate(props.post.date)
      })
      const postDelete = async (): Promise<void> => {
        const res = await deletePost(props.post.id)
        if (res) {
          router.push({ name: RouteNames.NEWS_FEED })
        }
      }
      const redirectPostEdit = (): void => {
        router.push({ 
          name: RouteNames.POST_EDIT, 
          params: { 
            id: props.post.id
          }
        })
      }
      return {
        formattedDate,
        postDelete,
        redirectPostEdit
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

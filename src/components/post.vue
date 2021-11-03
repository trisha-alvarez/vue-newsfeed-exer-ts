<template>
  <div class="row p-5">
      <h1>{{post.title}}</h1>
      <small>{{post.author}} | {{formatDate(post.date)}}</small>
      <p>{{post.content}}</p>
  </div>
</template>

<script lang="ts">
import IPost from '@/interface/posts'
import { defineComponent, PropType } from 'vue'
import moment from 'moment'

export default defineComponent({
    name: 'post',
    props: {
      post: {
        type: Object as PropType<IPost>,
        required: true
      }
    },
    setup() {
      const formatDate = (date: string): string => {
        return moment(String(date)).format('MMMM DD, YYYY')
      }
      
      return {
        formatDate
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

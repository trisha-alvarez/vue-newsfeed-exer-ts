<template>
  <div id="editModal" class="modal fade show d-block" tabindex="-1" role="dialog" data-show="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Post</h5>
        </div>
        <form @submit.prevent="onSubmit" id="update-form" class="add-form">
          <div class="form-control">
            <label>Title*</label>
            <input type="text" v-model="state.title" name="title" placeholder="Title*" />
          </div>
          <div class="form-control">
            <label>Author*</label>
            <input type="text" v-model="state.author" name="author" placeholder="Author*" />
          </div>
          <div class="form-control">
            <label>Date</label>
            <input type="date" v-model="state.date" name="date" placeholder="Date" />
          </div>
          <div class="form-control">
            <label>Content*</label>
            <textarea form="update-form" v-model="state.content" name="content" placeholder="Content*"></textarea>
          </div>

          <small v-if="invalidInput" class="text-center">*Please fill required fields.</small>

          <div class="modal-footer">
            <button type="button" class="btn btn-gray" @click="redirectPostView">Cancel</button>
            <input type="submit" value="Update" class="btn" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import IPost from '@/interface/posts'
import { RouteNames } from '@/constants/route-names'
import { defineComponent, PropType, ref } from 'vue'
import { updatePost } from '@/composables/use-post'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import router from '@/router'

export default defineComponent({
    name: 'postUpdate',
    props: {
      post: {
        type: Object as PropType<IPost>,
        required: true
      }
    },
    setup(props, { emit }) {
      const invalidInput = ref(false)
      const state = ref<IPost>(Object.assign({}, props.post))
      const rules = ref({
        title: { required },
        author: { required },
        date: {},
        content: { required },
        id: {}
      })
      const $v = ref((useVuelidate(rules, state)))
      function redirectPostView() : void {
        router.push({ 
          name: RouteNames.POST_VIEW, 
          params: { 
            id: props.post.id 
          }
        })
      }
      async function onSubmit() {
        if(await $v.value.$validate()){
          invalidInput.value = false

          if(await updatePost(state.value)){
            alert('Post updated!')
            redirectPostView()
          }
        } else {
          invalidInput.value = true
        }

        return
      }

      return {
        state,
        invalidInput,
        redirectPostView,
        onSubmit
      }
    }
})
</script>

<style scoped>
.form-control {
  margin: 0 0 30px 0;
  border: none;
}
.form-control label {
  display: block;
}
.form-control input,
textarea {
  width: 96%;
  height: 40px;
  margin: 5px;
  padding: 1% 2%;
  font-size: 17px;
  border: none;
}
textarea {
  height: 200px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
.btn {
  color: #fff;
  background: #1D3557;
}
.btn-gray {
  background: silver;
}
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
</style>

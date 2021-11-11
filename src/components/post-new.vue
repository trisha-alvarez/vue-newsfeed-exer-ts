<template>
    <form @submit.prevent="onSubmit" id="update-form" class="add-form">
        <div class="form-control">
            <input type="text" v-model="state.title" name="title" placeholder="Title*" />
        </div>
        <div class="form-control">
            <input type="text" v-model="state.author" name="author" placeholder="Author*" />
        </div>
        <div class="form-control">
            <textarea form="update-form" v-model="state.content" name="content" placeholder="Content*"></textarea>
        </div>

        <input type="submit" value="Post" class="btn btn-block" />
        <span><small v-if="invalidInput" class="text-center">*Please fill required fields.</small></span>
    </form>
</template>

<script lang="ts">
import IPost from '@/interface/posts'
import { defineComponent, ref } from 'vue'
import { addPost } from '@/composables/use-post'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default defineComponent({
    name: 'PostNew',
    setup(props, { emit }) {
        const invalidInput = ref<boolean>(false)
        const state = ref<IPost>({
            title: '',
            author: '',
            date: new Date().toISOString().slice(0, 10),
            content: '',
            id: ''
        })
        const rules = ref({
            title: { required },
            author: { required },
            date: {},
            content: { required },
            id: {}
        })
        const $v = ref((useVuelidate(rules, state)))

        async function onSubmit() {
            if(await $v.value.$validate()){
                invalidInput.value = false
                
                if(await addPost(state.value)){
                    alert('Post added!')
                    emit('refetchFeed', true)

                    state.value = {
                        title: '',
                        author: '',
                        date: new Date().toISOString().slice(0, 10),
                        content: '',
                        id: ''
                    }
                }
            } else {
                invalidInput.value = true
            }

            return
        }

        return {
            state,
            invalidInput,
            onSubmit
        }
    }
})
</script>

<style scoped>
.add-form {
    margin-bottom: 40px;
}
.form-control {
    margin: 0 0 30px 0;
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
    border: 0;
}
textarea {
    height: 80px;
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
input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}
</style>
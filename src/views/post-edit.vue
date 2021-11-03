<template>
    <div>
        <post-update :post="post"/>
    </div>
</template>

<script lang="ts">
import IPost from '@/interface/posts'
import { defineComponent, ref, PropType } from 'vue'
import postUpdate from '@/components/post-update.vue'

export default defineComponent({
    name: 'PostEdit',
    components: {
        postUpdate
    },
    props: {
        post: {
            type: Object as PropType<IPost>,
            required: true
        }
    },
    setup(props) {
        const editPost = ref<IPost>(props.post)
        return {
            editPost
        }
    },
})
</script>

<style scoped>
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
input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}
</style>

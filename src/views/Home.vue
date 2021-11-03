<template>
  <div class="home">
    <div class="col-12 d-flex justify-content-center mb-4"><img :src="imgSrc" class="img-fluid img-thumbnail rounded-circle" width="300" /></div>
    <div class="col-12 d-flex justify-content-center"><h1>{{fullName}}</h1></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'home',
  setup() {
    const firstName = "Trisha"
    const lastName = "Alvarez"
    const filename = "annie.png"

    const fullName = computed((): string => {
      return firstName + ' ' + lastName
    })

    const imgSrc = computed((): string => {
      return require(`@/assets/${filename}`)
    })

    return {
      imgSrc,
      fullName
    }
  }
})
</script>

<style scoped>
h1 {
  font-weight: bold;
}
</style>
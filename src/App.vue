<template>
  <div id="nav">
    <Header/>
  </div>

  <div class="container">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/header.vue'

export default defineComponent({
  components: {
    Header
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Raleway', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: linear-gradient(184deg, rgba(142,202,230,1) 30%, rgba(255,228,92,1) 100%) no-repeat left center !important;
  background-size: cover !important;
  color: #2c3e50;
  min-height: 100vh;
}

.container {
  margin: 0 auto;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn-block {
  display: block;
  width: 100%;
}
</style>

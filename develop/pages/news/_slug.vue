<template>
    <main class="main">
        <h1 class="title">{{title}}</h1>
        <p class="publishedAt">{{publishedAt}}</p>
        <div class="post" v-html="body"></div>
    </main>
</template>

<script>
import axios from 'axios'

let url = 'https://nakamura-blog.microcms.io/api/v1/blog'
const apikey = 'e6539310-ddfd-475e-bb06-519498d943fb'

export default {
  async asyncData({ params }) {
    const { data } = await axios.get(
      url+'/'+params.slug,
      {
        headers: { 'X-API-KEY': apikey }
      }
    )
    return data
  }
}
</script>

<!--
<style scoped>
.title{
    margin-bottom: 20px;
}
.publishedAt{
    margin-bottom: 20px;
}
.post > p{
    line-height: 1.8;
    letter-spacing: 0.2px;
}
</style>
-->

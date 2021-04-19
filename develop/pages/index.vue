<template>
  <main class="main">
    <h2>記事一覧だよ</h2>
    <ul>
      <li v-for="content in contents" v-bind:key="content.id">
        <NuxtLink v-bind:to="`news/${content.id}`">
          {{content.title}}
        </NuxtLink>
        <!-- <a v-bind:href="`news/${content.id}`">
          {{content.title}}
        </a> -->
      </li>
    </ul>
  </main>
</template>

<script>
import axios from 'axios'

const url = 'https://nakamura-blog.microcms.io/api/v1/blog'
const apikey = 'e6539310-ddfd-475e-bb06-519498d943fb'

export default {
  async asyncData() {
    const { data } = await axios.get(
      url,
      {
        headers: { 'X-API-KEY': apikey }
      }
    )
    return data
  }
}
</script>

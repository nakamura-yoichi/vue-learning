<template>
  <main class="main">
    <h2>記事一覧だよ</h2>
    <ul>
      <li v-for="article in blog.articles" v-bind:key="article.id">
        <NuxtLink v-bind:to="article.id">
          {{article.title}}
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script>
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import axios from 'axios'

const url = 'https://nakamura-blog.microcms.io/api/v1/blog'
const apikey = 'e6539310-ddfd-475e-bb06-519498d943fb'

export default defineComponent({
  setup(){
    const blog = reactive({
      articles: ''
    })
    const getData = async() => {
      let result = await axios.get(url,{headers:{'X-API-KEY':apikey}})
      blog.articles = result.data.contents
    }
    getData()
    return{
      blog
    }
  }
})
</script>

<style>
</style>

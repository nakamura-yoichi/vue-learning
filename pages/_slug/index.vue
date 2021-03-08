<template>
    <main class="main">
        <h1 class="title">{{blog.article.title}}</h1>
        <p class="publishedAt">{{blog.article.publishedAt}}</p>
        <div class="post" v-html="blog.article.body"></div>
    </main>
</template>

<script>
import { defineComponent, reactive, useContext } from '@nuxtjs/composition-api'
import axios from 'axios'

let url = 'https://nakamura-blog.microcms.io/api/v1/blog'
const apikey = 'e6539310-ddfd-475e-bb06-519498d943fb'

export default defineComponent({
    setup(params) {
        const blog = reactive({
            article: ''
        })

        const {route} = useContext();

        const getData = async() => { 
            let slug = route.value.params.slug;
            let post_url = url + '/'+ slug
            let result = await axios.get(post_url,{headers:{'X-API-KEY':apikey}})
            blog.article = result.data
        }
        getData()

        return{
            blog
        }
    },
})
</script>

<style scoped>
.main{
    width: 800px;
    margin: 0 auto;
}
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

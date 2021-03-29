import axios from 'axios'

export default {
  //ソースファイルのディレクトリ
  srcDir: 'develop/',

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-microcms-blog',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/composition-api'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // ビルド設定
  build: {
    //「_nuxt」フォルダの名前を変更
    publicPath: '/assets/',
    //CSSを外部ファイルとして出力する
    extractCSS: true,
    //以下のオプションをつけるとCSSをひとつのファイルに出力できる
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },

    //LICENSEファイルを出力しないようにする
    terser:{
      extractComments: false,
    },

    //出力ファイル名にハッシュ（変な数値）を付けないようにする
    //さらにフォルダ別に格納するようにする
    filenames: {
      app: () => 'js/[name].js',
      chunk: () => 'js/[name].js',
      css: ()=> 'css/[name].css',
      img: () => 'img/[path][name].[ext]',
      font: () => 'font/[path][name].[ext]',
      video: () => 'movie/[path][name].[ext]'
    },
  },

  //静的サイト生成の設定
  generate: {
    //出力先フォルダ名を変更する
    dir: 'release',
  },

  //静的サイト生成の際に余分なタグやメタ情報を削除する
  hooks: {
    'generate:page': page => {
      const $ = require("cheerio")
      const doc = $.load(page.html);

      //不要なタグをアンラップする
      var unwarpTags = [
        '#__nuxt',
        '#__layout'
      ];
      unwarpTags.forEach(function(ele){
        var $parent = doc(ele).parent();
        var s = doc(ele).html();
        $parent.html(s);
      });

      //スクリプト削除
      doc("link[rel=preload]").remove();
      doc("html script").remove();

      //メタ属性削除
      doc("*").each((i, node) => {
        Object.keys(node.attribs).forEach((attr) => {
          if (["data-n-head-ssr", "data-n-head", "data-hid"].indexOf(attr) >= 0 ) {
            $(node).removeAttr(attr)
          }
        })
      })

      //コメント削除
      doc("*")
        .contents()
        .filter(function() { return this.type === 'comment'; })
        .remove();

      page.html = doc.html();
    },
  },

  //ルーティング（現在のバージョンでは不要）
  // generate: {
  //   async routes(){
  //     const pages = await axios.get(
  //       'https://nakamura-blog.microcms.io/api/v1/blog?limit=100',
  //       {
  //         headers: {'X-API-KEY':'e6539310-ddfd-475e-bb06-519498d943fb'}
  //       }
  //     ).then((res)=>
  //       res.data.contents.map((content)=>({
  //         route: `/${content.id}`,
  //         payload: content
  //       }))
  //     )
  //     return pages
  //   }
  // }
}

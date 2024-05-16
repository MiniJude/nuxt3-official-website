import { appDescription } from './constants/index'

export default defineNuxtConfig({
  ssr: true,

  extends: ['@nuxt/ui-pro'],
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxt/ui',
    'nuxt-swiper',
    '@nuxt/content',
    '@ant-design-vue/nuxt'
  ],

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: [
    // '@unocss/reset/tailwind.css',
    '~/assets/css/common.less'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "~/assets/css/variables.less";`,
        },
      }
    }
  },

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    // static: true,
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      failOnError: false,
      crawlLinks: true,
      // routes: ['/'],
    },
    devProxy: {
      '/api': {
        target: 'https://teacher-preview.exam.isrc.ac.cn/api',
        changeOrigin: true,
      },
    }
  },
  
  devtools: {
    enabled: true,
  },

  devServer: {
    host: '0.0.0.0',
    port: 4000
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },
  routeRules: {
    '/api/search.json': { prerender: true },
    // '/**': { prerender: true } // https://github.com/nuxt/content/issues/2509
  },
  content: {
    // experimental: {
    //   clientDB: true
    // },
    documentDriven: true // https://github.com/nuxt/content/issues/2403
  },
})

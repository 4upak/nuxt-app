// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        [
            '@pinia/nuxt',
            {
                autoImports: ['defineStore', 'acceptHMRUpdate'],
            },
        ],
    ],
    css: [
        'vuetify/lib/styles/main.sass',
        'assets/css/style.css',
        'assets/css/responsive.css',
        '@mdi/font/css/materialdesignicons.min.css',
    ],


    build: {
        transpile: ['vuetify'],

    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },
    runtimeConfig: {

        public:{
            API_BASE_URL: 'https://services.digichanger.pro/',
        }
    },





})

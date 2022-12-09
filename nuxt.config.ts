// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        [
            '@pinia/nuxt',
        ],
    ],
    css: [
        'vuetify/lib/styles/main.sass',
        'assets/css/style.css',
        'assets/css/responsive.css',
        '@mdi/font/css/materialdesignicons.min.css',
        'vue3-country-flag-icon/dist/CountryFlag.css'
    ],


    build: {
        transpile: ['vuetify'],

    },
    vite: {
        define: {
            'process.env.DEBUG': false,
            'process.env.PORT': 3001,
        },
    },
    runtimeConfig: {

        public:{
            API_BASE_URL: 'https://services.digichanger.pro/',
        }
    },






})

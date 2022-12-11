import { defineStore } from 'pinia'

export const useExchangersStore = defineStore('exchangers', {
    state: () => ({

        top_exchangers: [],
        exchangers_full_list: [],

    }),
    actions: {
        async getExchangers() {
            const runtimeConfig = useRuntimeConfig()
            const res = await useFetch(runtimeConfig.public.API_BASE_URL + 'digimon/api/exchanges/')
            this.top_exchangers = res.data._rawValue
        },

        async getExchangersFullList() {
            const runtimeConfig = useRuntimeConfig()
            const res = await useFetch(runtimeConfig.public.API_BASE_URL + 'digimon/api/exchangers/toplist/')
            this.exchangers_full_list = res.data._rawValue
            // count difference betweeb datestamps
            this.exchangers_full_list.forEach((item) => {
                item.date_diff = parseInt(Math.floor((Date.now() - new Date(item.creation_date)) / 1000 / 60 / 60 / 24))
                // round to 2 decimal places
                item.date_year = parseInt(item.date_diff/396)
                item.date_month = parseInt((item.date_diff - item.date_year*396)/30.5)
                item.date_days = parseInt(item.date_diff - item.date_year*396 - item.date_month*30)

            })

        }
    }
})
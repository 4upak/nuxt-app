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
            const res = await useFetch(runtimeConfig.public.API_BASE_URL + 'digimon/api/exchanges/')
            this.exchangers_full_list = res.data._rawValue
        }
    }
})
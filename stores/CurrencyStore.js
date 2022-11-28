import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useCurrencyStore = defineStore('currencies', {
    state: () => ({
        api_domain:'https://services.digichanger.pro/',
        isMobile: false,
        currencies_from_data: [],
        currencies_to_data : [],
        from_code_selected: null,
        to_code_selected: null,
        fromCurrencyName: null,
        toCurrencyName: null,
    }),

    actions: {
        async getCurrencies() {
            const res = await useFetch(this.api_domain + 'digimon/api/cryptotags/')
            this.currencies_from_data = JSON.parse(JSON.stringify(res.data._rawValue))
            this.currencies_to_data = JSON.parse(JSON.stringify(res.data._rawValue))
            console.log(this.currencies_from_data)
        },

        async searchingFrom(payload){
            console.log(payload)
            for (var i = 0; i < this.currencies_from_data.length; i++) {

                for (var j = 0; j < this.currencies_from_data[i].tag_currencies.length; j++) {
                    if (!this.currencies_from_data[i].tag_currencies[j].name.toLowerCase().includes(payload.toLowerCase())) {
                        this.currencies_from_data[i].tag_currencies[j].active = false
                    }
                    else{
                        this.currencies_from_data[i].tag_currencies[j].active = true
                    }
                }
            }

            for (i = 0; i < this.currencies_from_data.length; i++) {
                var flag = 0
                for (j = 0; j < this.currencies_from_data[i].tag_currencies.length; j++) {
                    if (this.currencies_from_data[i].tag_currencies[j].active==true) {
                        flag = 1
                    }
                }
                if (flag == 1) {
                    this.currencies_from_data[i].active = true
                }
                else{
                    this.currencies_from_data[i].active = false
                }
            }

        },
        async searchingTo(payload){
            for (var i = 0; i < this.currencies_to_data.length; i++) {

                for (var j = 0; j < this.currencies_to_data[i].tag_currencies.length; j++) {
                    if (!this.currencies_to_data[i].tag_currencies[j].name.toLowerCase().includes(payload.toLowerCase())) {
                        this.currencies_to_data[i].tag_currencies[j].active = false
                    }
                    else{
                        this.currencies_to_data[i].tag_currencies[j].active = true
                    }
                }
            }

            for (i = 0; i < this.currencies_to_data.length; i++) {
                var flag = 0
                for (j = 0; j < state.currencies_to_data[i].tag_currencies.length; j++) {
                    if (this.currencies_to_data[i].tag_currencies[j].active==true) {
                        flag = 1
                    }
                }
                if (flag == 1) {
                    this.currencies_to_data[i].active = true
                }
                else{
                    this.currencies_to_data[i].active = false
                }
            }


        },


    },



})
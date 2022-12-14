import { defineStore } from 'pinia'


// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useCurrencyStore = defineStore('currencies', {
    state: () => ({

        isMobile: false,
        currencies_from_data: [],
        currencies_to_data : [],
        from_code_selected: null,
        to_code_selected: null,
        fromCurrencyName: null,
        toCurrencyName: null,
        FromSearchItem: '',
        ToSearchItem: '',
    }),

    actions: {
        async getCurrencies() {
            //get VUE_APP_API_DOMAIN from .env


            //console.log('[currecny store] get currencies ')
            if(this.from_code_selected == null && this.to_code_selected == null) {


                const runtimeConfig = useRuntimeConfig()
                const res = await useFetch(runtimeConfig.public.API_BASE_URL + 'digimon/api/cryptotags/')
                this.currencies_from_data = JSON.parse(JSON.stringify(res.data._rawValue))
                var temp = this.currencies_from_data[0]
                this.currencies_from_data[0] = this.currencies_from_data[1]
                this.currencies_from_data[1] = temp

                this.currencies_to_data = JSON.parse(JSON.stringify(res.data._rawValue))

                var temp = this.currencies_to_data[0]
                this.currencies_to_data[0] = this.currencies_to_data[1]
                this.currencies_to_data[1] = temp
                return true
            }
            else{
                //console.log('[currecny store] get curreecies did not run')
                return false
            }
        },

        async searchingFrom(payload) {
            for (var i = 0; i < this.currencies_from_data.length; i++) {

                for (var j = 0; j < this.currencies_from_data[i].tag_currencies.length; j++) {
                    if (!this.currencies_from_data[i].tag_currencies[j].name.toLowerCase().includes(payload.toLowerCase())) {
                        this.currencies_from_data[i].tag_currencies[j].active = false
                    } else {
                        this.currencies_from_data[i].tag_currencies[j].active = true
                    }
                }
            }

            for (i = 0; i < this.currencies_from_data.length; i++) {
                var flag = 0
                for (j = 0; j < this.currencies_from_data[i].tag_currencies.length; j++) {
                    if (this.currencies_from_data[i].tag_currencies[j].active == true) {
                        flag = 1
                    }
                }
                if (flag == 1) {
                    this.currencies_from_data[i].active = true
                } else {
                    this.currencies_from_data[i].active = false
                }
            }

        },

        async searchingTo(payload) {
            for (var i = 0; i < this.currencies_to_data.length; i++) {

                for (var j = 0; j < this.currencies_to_data[i].tag_currencies.length; j++) {
                    if (!this.currencies_to_data[i].tag_currencies[j].name.toLowerCase().includes(payload.toLowerCase())) {
                        this.currencies_to_data[i].tag_currencies[j].active = false
                    } else {
                        this.currencies_to_data[i].tag_currencies[j].active = true
                    }
                }
            }

            for (i = 0; i < this.currencies_to_data.length; i++) {
                var flag = 0
                for (j = 0; j < this.currencies_to_data[i].tag_currencies.length; j++) {
                    if (this.currencies_to_data[i].tag_currencies[j].active == true) {
                        flag = 1
                    }
                }
                if (flag == 1) {
                    this.currencies_to_data[i].active = true
                } else {
                    this.currencies_to_data[i].active = false
                }
            }


        },

        setSelection(code, name, type, locale){
            if(type == 'from') {
                this.from_code_selected = code.toLowerCase()
                this.fromCurrencyName = name
                //find element in currencies_from_data where code_name = code

                for (var i = 0; i < this.currencies_from_data.length; i++) {
                    for (var j = 0; j < this.currencies_from_data[i].tag_currencies.length; j++) {
                        if (this.currencies_from_data[i].tag_currencies[j].code_name == code) {
                            this.currencies_from_data[i].tag_currencies[j].selected = true
                        } else {
                            this.currencies_from_data[i].tag_currencies[j].selected = false
                        }
                    }
                }

            }
            if(type == 'to') {
                this.to_code_selected = code.toLowerCase()
                this.toCurrencyName = name

                for (var i = 0; i < this.currencies_to_data.length; i++) {
                    for (var j = 0; j < this.currencies_to_data[i].tag_currencies.length; j++) {
                        if (this.currencies_to_data[i].tag_currencies[j].code_name == code) {
                            this.currencies_to_data[i].tag_currencies[j].selected = true
                        } else {
                            this.currencies_to_data[i].tag_currencies[j].selected = false
                        }
                    }
                }
            }


            if (this.from_code_selected != null && this.to_code_selected != null) {
                if(locale!='en')
                    navigateTo({ path: '/'+locale+'/exchange-from-'+this.from_code_selected+'-to-'+ this.to_code_selected+'/'})
                else
                    navigateTo({ path: '/exchange-from-'+this.from_code_selected+'-to-'+ this.to_code_selected+'/'})

            }

        },

        async loadSelection(from_code, to_code){
            if(from_code && to_code) {



                //console.log("[currency store] loadSelection started")
                from_code = from_code.toUpperCase()
                to_code = to_code.toUpperCase()
                //console.log(from_code + "->" + to_code + " length:" + this.currencies_from_data.length)




                for (var i = 0; i < this.currencies_from_data.length; i++) {
                    for (var j = 0; j < this.currencies_from_data[i].tag_currencies.length; j++) {
                        if (this.currencies_from_data[i].tag_currencies[j].code_name == from_code) {
                            this.currencies_from_data[i].tag_currencies[j].selected = true
                            this.from_code_selected = from_code
                            this.fromCurrencyName = this.currencies_from_data[i].tag_currencies[j].name
                            //console.log("[currency store] FromCurrency selected:" + this.fromCurrencyName + " " + this.from_code_selected)
                        } else {
                            this.currencies_from_data[i].tag_currencies[j].selected = false
                        }
                    }
                }

                for (var i = 0; i < this.currencies_to_data.length; i++) {
                    for (var j = 0; j < this.currencies_to_data[i].tag_currencies.length; j++) {
                        if (this.currencies_to_data[i].tag_currencies[j].code_name == to_code) {
                            this.currencies_to_data[i].tag_currencies[j].selected = true
                            this.to_code_selected = to_code
                            this.toCurrencyName = this.currencies_from_data[i].tag_currencies[j].name
                            //console.log("[currency store] ToCurrency selected:" + this.toCurrencyName + " " + this.to_code_selected)
                        } else {
                            this.currencies_to_data[i].tag_currencies[j].selected = false
                        }
                    }
                }
                //console.log("Load selections finished:"+this.from_code_selected.toLowerCase() + "->" + this.to_code_selected.toLowerCase())
            }
        },

        async currencyInfo(code, type) {
            if(code && type) {
                const runtimeConfig = useRuntimeConfig()
                const res = await useFetch(runtimeConfig.public.API_BASE_URL + 'digimon/api/currency_by_code/' + code + '/')
                //console.log(res)
                if (type == 'from')
                    this.fromCurrencyName = res.data._rawValue.name
                if (type == 'to')
                    this.toCurrencyName = res.data._rawValue.name
            }

        },

        changeCurrencies(locale){

            var temp = this.from_code_selected
            this.from_code_selected = this.to_code_selected
            this.to_code_selected = temp

            var temp2 = this.fromCurrencyName
            this.fromCurrencyName = this.toCurrencyName
            this.toCurrencyName = temp2

            for (var i = 0; i < this.currencies_from_data.length; i++) {
                for (var j = 0; j < this.currencies_from_data[i].tag_currencies.length; j++) {
                    if (this.currencies_from_data[i].tag_currencies[j].code_name == this.from_code_selected) {
                        this.currencies_from_data[i].tag_currencies[j].selected = true
                    } else {
                        this.currencies_from_data[i].tag_currencies[j].selected = false
                    }
                }
            }

            for (var i = 0; i < this.currencies_to_data.length; i++) {
                for (var j = 0; j < this.currencies_to_data[i].tag_currencies.length; j++) {
                    if (this.currencies_to_data[i].tag_currencies[j].code_name == this.to_code_selected) {
                        this.currencies_to_data[i].tag_currencies[j].selected = true
                    } else {
                        this.currencies_to_data[i].tag_currencies[j].selected = false
                    }
                }
            }
            if(locale!='en')
                navigateTo({ path: '/'+locale+'/exchange-from-'+this.from_code_selected+'-to-'+ this.to_code_selected+'/'})
            else
                navigateTo({ path: '/exchange-from-'+this.from_code_selected+'-to-'+ this.to_code_selected+'/'})

        },

        clearSelection(locale){


            this.from_code_selected = null
            this.fromCurrencyName  = null
            this.to_code_selected = null
            this.toCurrencyName = null
            this.FromSearchItem = ''
            this.ToSearchItem = ''

            for (var i = 0; i < this.currencies_from_data.length; i++) {
                for (var j = 0; j < this.currencies_from_data[i].tag_currencies.length; j++) {
                    this.currencies_from_data[i].tag_currencies[j].selected = false
                    this.currencies_from_data[i].tag_currencies[j].active = true
                }
            }

            for (var i = 0; i < this.currencies_to_data.length; i++) {
                for (var j = 0; j < this.currencies_to_data[i].tag_currencies.length; j++) {
                    this.currencies_to_data[i].tag_currencies[j].selected = false
                    this.currencies_to_data[i].tag_currencies[j].active = true
                }
            }

            //go to main page
            if(locale!='en')
                navigateTo({ path: '/'+locale+'/'})
            else
                navigateTo({ path: '/'})


        },

    }

})
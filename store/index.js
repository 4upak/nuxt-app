import { createStore } from 'vuex'
import axios from "axios";

const store = createStore({
    state: {
        currencies_from_data: [],
        currencies_to_data : [],
        active_from_id: 0,
        active_to_id:0,
        rates_result: [],
        top_exchangers: [],
        from_code_selected: null,
        to_code_selected: null,
        fromCurrencyName: null,
        toCurrencyName: null,
        isMobile: false,

    },
    mutations: {
        setCurrenciesLists(state, payloads){
            var temp = payloads[0]
            payloads[0] = payloads[1]
            payloads[1] = temp
            state.currencies_from_data = payloads
            state.currencies_to_data = JSON.parse(JSON.stringify(payloads))



        },

        setFromCodeSelected(state, payload){
            state.from_code_selected = payload
            console.log('setFromCodeSelected', payload)


            state.currencies_from_data.find(
                item => item.tag_currencies.find(
                    currency => currency.code_name == payload ? state.fromCurrencyName = currency.name : null)
            )
            localStorage.setItem('FromCodeSelected', payload);
            localStorage.setItem('fromCurrencyName', state.fromCurrencyName);



            if (state.from_code_selected != null && state.to_code_selected != null) {
                //redirect to exchange direction page
                window.location.href = '/rate/' + state.from_code_selected + '/' + state.to_code_selected + '/'
            }
        },

        setToCodeSelected(state, payload){
            state.to_code_selected = payload
            console.log('setToCodeSelected', payload)

            state.currencies_to_data.find(
                item => item.tag_currencies.find(
                    currency => currency.code_name == payload ? state.toCurrencyName = currency.name : null)
            )
            localStorage.setItem('ToCodeSelected', payload);
            localStorage.setItem('toCurrencyName', state.toCurrencyName);

            if (state.from_code_selected != null && state.to_code_selected != null) {
                //redirect to exchange direction page
                window.location.href = '/rate/' + state.from_code_selected + '/' + state.to_code_selected + '/'
            }
        },

        setRatesResult(state, payload){
            state.rates_result = payload
        },

        setTopExchangers(state, payload){
            state.top_exchangers = payload
        },

        searchingFrom(state, payload){
            for (var i = 0; i < state.currencies_from_data.length; i++) {

                for (var j = 0; j < state.currencies_from_data[i].tag_currencies.length; j++) {
                    if (!state.currencies_from_data[i].tag_currencies[j].name.toLowerCase().includes(payload.toLowerCase())) {
                        state.currencies_from_data[i].tag_currencies[j].active = false
                    }
                    else{
                        state.currencies_from_data[i].tag_currencies[j].active = true
                    }
                }
            }

            for (i = 0; i < state.currencies_from_data.length; i++) {
                var flag = 0
                for (j = 0; j < state.currencies_from_data[i].tag_currencies.length; j++) {
                    if (state.currencies_from_data[i].tag_currencies[j].active==true) {
                        flag = 1
                    }
                }
                if (flag == 1) {
                    state.currencies_from_data[i].active = true
                }
                else{
                    state.currencies_from_data[i].active = false
                }
            }

        },

        searchingTo(state, payload){
            for (var i = 0; i < state.currencies_to_data.length; i++) {

                for (var j = 0; j < state.currencies_to_data[i].tag_currencies.length; j++) {
                    if (!state.currencies_to_data[i].tag_currencies[j].name.toLowerCase().includes(payload.toLowerCase())) {
                        state.currencies_to_data[i].tag_currencies[j].active = false
                    }
                    else{
                        state.currencies_to_data[i].tag_currencies[j].active = true
                    }
                }
            }

            for (i = 0; i < state.currencies_to_data.length; i++) {
                var flag = 0
                for (j = 0; j < state.currencies_to_data[i].tag_currencies.length; j++) {
                    if (state.currencies_to_data[i].tag_currencies[j].active==true) {
                        flag = 1
                    }
                }
                if (flag == 1) {
                    state.currencies_to_data[i].active = true
                }
                else{
                    state.currencies_to_data[i].active = false
                }
            }


        },

        setMobile(state, payload){
            state.isMobile = payload
        },
        setFromCurrencyName(state, payload){
            state.fromCurrencyName = payload
        },
        setToCurrencyName(state, payload){
            state.toCurrencyName = payload
        },
        setFromCodeSelectedNoRedirect(state, payload){
            state.from_code_selected = payload
        },
        setToCodeSelectedNoRedirect(state, payload){
            state.to_code_selected = payload
        }

    },
    actions: {
        fetchCurrenciesLists(context){

            axios.get('https://services.digichanger.pro/digimon/api/cryptotags/')
                .then(response => context.commit("setCurrenciesLists", response.data))

        },
        setFromCode(context, code){
            context.commit("setFromCodeSelected", code)
            console.log("From selected works")

        },
        setToCode(context, code){
            context.commit("setToCodeSelected", code)
            console.log("To selected works")

        },
        fetchRates(context, payload){
            axios.get(`https://services.digichanger.pro/digimon/api/exchanges/${payload.from_code}/${payload.to_code}/`)
                .then(response => context.commit("setRatesResult", response.data))

        },
        fetchTopExchangers(context){
            axios.get('https://services.digichanger.pro/digimon/api/exchanges/')
                .then(response => context.commit("setTopExchangers", response.data))
        },
        searchFrom(state, payload){
            console.log('searchFrom', payload)
            state.commit('searchingFrom', payload)
        },
        searchTo(state, payload){
            console.log('searchTo', payload)
            state.commit('searchingTo', payload)
        },
        setMobile(state, payload){
            console.log('setMobile', payload)

            state.commit('setMobile', payload)
        },

        setFromCurrencyName(state, payload){
            state.commit('setFromCurrencyName', payload)
        },

        setToCurrencyName(state, payload){
            state.commit('setToCurrencyName', payload)
        },

        setFromCodeNoRedirect(state, payload){
            state.commit('setFromCodeSelectedNoRedirect', payload)
        },
        setToCodeNoRedirect(state, payload){
            state.commit('setToCodeSelectedNoRedirect', payload)
        },
    },
    getters:{
        getCurrenciesFromLists(state){
            return state.currencies_from_data
        },
        getCurrenciesToLists(state){
            return state.currencies_to_data
        },
        getRatesResult(state){
            return state.rates_result
        },
        getTopExchangers(state){
            return state.top_exchangers
        },
        getMobileCheck(state){
            return state.isMobile
        },
        getFromCurrencyName(state) {
            return state.fromCurrencyName
        },
        getToCurrencyName(state) {
            return state.toCurrencyName
        }
    },

})

export default store;
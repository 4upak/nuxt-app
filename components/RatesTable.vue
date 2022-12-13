<template>

    <div v-if="rates.length > 0">

      <template>
        <v-col
        class="d-flex align-center rate_result_cols"
        >

          <v-row class="rate_result_cols_header" >
            <v-col cols="12" md="2">
              Exchange
            </v-col>
            <v-col cols="12" md="5">
              Give
            </v-col>
            <v-col cols="12" md="2">
              Get
            </v-col>
            <v-col cols="12" md="3">
              Reserve
            </v-col>

          </v-row>

        </v-col>
      </template>

      <template
          v-for="item in rates"
          :key="item.id"

          >
          <v-col>
            <v-row class="rate_result_cols_header_seccond">
              <v-col cols="12" md="2">
                {{ item.exchange.name }}
              </v-col>
              <v-col cols="12" md="4">
                {{ item.from_rate}} <span class="from_currency">{{item.from_currency.name}}</span><br>
                <span class="min"><b>Min:</b> {{item.min}} -> </span>
                <span class="max"><b>Max:</b> {{item.max}}</span>
              </v-col>
              <v-col cols="12" md="3">
                {{ item.to_rate}}<br><span class="to_currency"> {{item.to_currency.name}}</span>
              </v-col>
              <v-col cols="12" md="3">
                {{ item.reserve}}<br><span class="to_currency"> {{item.to_currency.name}}</span>
              </v-col>
            </v-row>
          </v-col>
          <v-divider ></v-divider>

        </template>

    </div>

  <v-progress-linear
    v-else
    indeterminate
    color="primary"
  ></v-progress-linear>


</template>

<script>
import { mapState, mapActions} from 'pinia'

import {useRatesStore} from '../stores/RatesStore'
import {useCurrencyStore} from '../stores/CurrencyStore'
import {useMainStore} from '../stores/MainStore'

export default {

  setup() {
    const rates_store = useRatesStore()
    const route = useRoute()
    const from_code = route.params.from_code
    const to_code = route.params.to_code

    //console.log("rates table console")
    //console.log(from_code, to_code)
    rates_store.getRates(from_code, to_code)

  },

  name: "RatesTable",
  data () {
    return {

    }
  },
  computed: {
    ...mapState(useRatesStore,["rates"]),
    ...mapState(useMainStore,["isMobile"]),
    ...mapState(useCurrencyStore,["fromCurrencyName", "toCurrencyName"]),
  },
  methods: {
    ...mapActions(useRatesStore,["getRates"]),


  },
  mounted() {
    this.getRates(this.$route.params.from_code, this.$route.params.to_code)

  }
}
</script>

<style scoped>
  span.from_currency, span.to_currency{
    font-size: 12px;
    color: #888888;
  }
  span.min, span.max{
    font-size: 12px;
    color: #888888;
  }
</style>

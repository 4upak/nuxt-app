<template>

  <div v-if="rates.length > 0">
    <template
        v-for="item in rates"
        :key="item.id"

    >
      <div class="rate_view_mobile">
        <v-card
            class="rate_card_mobile_view"
        >
          <v-card-item>
            <div>
              <div class="review_count">
                Reviews:
                <v-badge
                    color="info"
                    content="12"
                    inline
                ></v-badge>
              </div>
              <div class="text-h6 mb-1">
                {{ item.exchange.name }}
              </div>
              <div >
                {{ item.from_rate}} <span class="from_currency">{{item.from_currency.name}}</span> ->
                {{ item.to_rate}} <span class="to_currency">{{item.to_currency.name}}</span>
              </div>
              <div>
                <span class="min"><b>Min:</b> {{item.min}} -> </span>
                <span class="max"><b>Max:</b> {{item.max}}</span>
              </div>
              <div class="reserve_mobile_view text-caption">Reserve: {{ item.reserve}} {{item.to_currency.code_name}}</div>
              <v-btn
                  class="mt-2 rate_mobile_button"
                  color="success"
                  :href="item.url"
                  style="margin-top:-25px !important;"
              >
                Exchange
              </v-btn>
            </div>
          </v-card-item>

        </v-card>
        <div style="margin-top: 10px"></div>
      </div>

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
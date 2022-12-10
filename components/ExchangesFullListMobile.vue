<template>
  <v-card
      class="rate_card_mobile_view"
      v-for="exch in exchangers_full_list"
      style="margin-bottom: 10px"
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
        <div class="exch_hars">
            <div class="text-h6 mb-1">
              <a :href="'https://'+exch.url">{{ exch.name }}</a>
            </div>
            <div >
              <b>{{ $t('Country')}}:</b> <span class="from_currency">{{exch.country}}</span><br>
            </div>
            <div >
              <b>{{ $t('Age')}}:</b> <span class="from_currency">{{exch.date_year}} {{$t('year')}}, {{exch.date_month}} {{$t('month')}}, {{exch.date_days}} {{$t('days')}}</span>
            </div>
            <div >
              <b>{{ $t('AdvCash rate')}}:</b> <span class="from_currency">{{exch.advcash_rate}}</span>
            </div>
            <div >
              <b>{{ $t('PerfectMoney rate')}}:</b> <span class="from_currency">{{exch.pm_rate}}</span>
            </div>
        </div>
        <v-btn
            class="mt-2 rate_mobile_button"
            color="success"
            :href="'https://'+exch.url"
            style="margin-top:-25px !important;"
        >
          {{$t('Detail')}}
        </v-btn>
      </div>
    </v-card-item>

  </v-card>
</template>

<script>
import { mapState } from 'pinia'

import {useExchangersStore} from "@/stores/ExchangersStore";

export default {
  setup() {
    const exchange_store = useExchangersStore()
    exchange_store.getExchangersFullList()

  },
  computed: {
    ...mapState(useExchangersStore, ['exchangers_full_list']),
  },

  name: "ExchangesFullList"
}
</script>

<style scoped>

</style>
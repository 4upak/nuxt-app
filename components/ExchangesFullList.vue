<template>
  <v-card
      class="mx-auto"

      outlined
      elevation="0"
  >
    <div>
      <v-col
            class="d-flex align-center rate_result_cols"
      >

        <v-row class="rate_result_cols_header" >
          <v-col cols="20" md="3">
            {{$t('Name')}}
          </v-col>
          <v-col cols="20" md="2">
            {{$t('Country')}}
          </v-col>
          <v-col cols="20" md="5">
            {{$t('Age')}}
          </v-col>
          <v-col cols="20" md="1">
            {{$t('AC')}}
          </v-col>
          <v-col cols="20" md="1">
            {{$t('PM')}}
          </v-col>


        </v-row>

      </v-col>
    </div>
    <div>
      <v-col

      >
        <v-row v-for="exch in exchangers_full_list" class="exch_cols">
          <v-col cols="20" md="3"><a :href="'https://'+exch.url">{{exch.name}}</a></v-col>
          <v-col cols="20" md="2">{{exch.country}}</v-col>
          <v-col cols="20" md="5">
            {{exch.date_year}} {{$t('year')}}, {{exch.date_month}} {{$t('month')}}, {{exch.date_days}} {{$t('days')}}
          </v-col>
          <v-col cols="20" md="1">{{exch.advcash_rate}}</v-col>
          <v-col cols="20" md="1">{{exch.pm_rate}}</v-col>
        </v-row>
      </v-col>
    </div>
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
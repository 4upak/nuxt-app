<template>

    <div v-if="exchangers_full_list.length >0">
      <template v-if="!isMobile">
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
          <v-col cols="20" md="4">
            {{$t('Age')}}
          </v-col>
          <v-col cols="20" md="1">
            {{$t('Rates')}}
          </v-col>
          <v-col cols="20" md="1">
            {{$t('AC')}}
          </v-col>
          <v-col cols="20" md="1">
            {{$t('PM')}}
          </v-col>


        </v-row>

      </v-col>
      </template>
      <template
      v-for="exch in exchangers_full_list"
      :key="exch.id"
      >
          <v-col
              v-if="!isMobile"
          >
            <v-row class="exch_cols rate_result_cols_header_seccond" v-if="exch.url">
              <v-col cols="20" md="3" ><a :href="'https://'+exch.url">{{exch.name}}</a></v-col>
              <v-col cols="20" md="2" class="exch_data">{{exch.country}}</v-col>
              <v-col cols="20" md="4"  class="exch_data">
                {{exch.date_year}} {{$t('year')}}, {{exch.date_month}} {{$t('month')}}, {{exch.date_days}} {{$t('days')}}
              </v-col>
              <v-col cols="20" md="1"  class="exch_data">{{exch.rate_count}}</v-col>
              <v-col cols="20" md="1"  class="exch_data">{{exch.advcash_rate}}</v-col>
              <v-col cols="20" md="1"  class="exch_data">{{exch.pm_rate}}</v-col>
            </v-row>
          </v-col>
      </template>
    </div>
</template>

<script>
import { mapState } from 'pinia'

import {useExchangersStore} from "@/stores/ExchangersStore";
import {useMainStore} from '../stores/MainStore'

export default {
  setup() {
    const exchange_store = useExchangersStore()
    exchange_store.getExchangersFullList()

  },
  computed: {
    ...mapState(useExchangersStore, ['exchangers_full_list']),
    ...mapState(useMainStore,["isMobile"]),
  },

  name: "ExchangesFullList"
}
</script>

<style scoped>

</style>
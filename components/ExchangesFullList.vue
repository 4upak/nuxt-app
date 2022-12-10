<template>
  <v-row v-for="exch in exchangers_full_list">
    <v-col cols="20" md="2">{{exch.name}}</v-col>
    <v-col cols="20" md="2">{{exch.url}}</v-col>
    <v-col cols="20" md="2">{{exch.country}}</v-col>
    <v-col cols="20" md="2">{{exch.creation_date}}</v-col>
    <v-col cols="20" md="1">{{exch.advcash_rate}}</v-col>
    <v-col cols="20" md="1">{{exch.pm_rate}}</v-col>
    <v-col cols="20" md="2">{{exch.status}}</v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import {useMainStore} from "@/stores/MainStore";
import {useExchangersStore} from "@/stores/ExchangersStore";

export default {
  setup() {
    //const main_store = useMainStore()
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
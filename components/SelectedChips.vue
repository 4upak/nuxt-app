<template v-if="fromCurrencyName">
  <div class="align-center align-self-center selected-chips" style=" ">
    <v-chip
        class="ma-2"
        close
        color="green"
        outlined
        @click:close="alert('work')"
        v-if="fromCurrencyName"
    >
      {{fromCurrencyName}}
    </v-chip>
    <v-icon
        class="ma-2"
        color="blue"
        @click="changeCurrencies(); getRates(from_code_selected, to_code_selected);"
        v-if="fromCurrencyName && toCurrencyName"
    >
      mdi-arrow-left-right-bold-outline
    </v-icon>

    <v-chip
        class="ma-2"
        close
        color="green"
        outlined
        @click:close="alert('work')"
        v-if="toCurrencyName"
    >
      {{toCurrencyName}}
    </v-chip>
    <v-icon
        class="ma-2"
        color="blue"
        @click="alert('work')"
        v-if="fromCurrencyName && toCurrencyName"
    >
      mdi-square-edit-outline
    </v-icon>
  </div>
</template>

<script>
import {mapState, mapActions, mapWritableState} from 'pinia'
import {useCurrencyStore} from '@/stores/CurrencyStore'
import {useRatesStore} from "@/stores/RatesStore"

export default {
  name: "SelectedChips",

  computed: {
    ...mapState(useCurrencyStore, ['fromCurrencyName', 'toCurrencyName', 'from_code_selected', 'to_code_selected']),
  },
  methods: {
    ...mapActions(useCurrencyStore, ['changeCurrencies']),
    ...mapActions(useRatesStore, ['getRates']),
  },

}
</script>

<style scoped>

</style>
<template>

  <div class="align-center align-self-center selected-chips" style=" " v-if="to_code_selected && from_code_selected">
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
        @click="changeSelected()"
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
        @click="clearSelection(this.$i18n.locale)"
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
    ...mapActions(useCurrencyStore, ['changeCurrencies','loadSelection','clearSelection']),
    ...mapActions(useRatesStore, ['getRates']),
    changeSelected() {
      this.changeCurrencies(this.$i18n.locale)
      this.loadSelection(this.from_code_selected, this.to_code_selected)
      this.getRates(this.from_code_selected, this.to_code_selected)
    }
  },

}
</script>

<style scoped>

</style>
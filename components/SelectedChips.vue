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
        @click="clearSelectionComponent()"
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
import {useMainStore} from "@/stores/MainStore";

export default {
  name: "SelectedChips",

  computed: {
    ...mapState(useCurrencyStore, ['fromCurrencyName', 'toCurrencyName', 'from_code_selected', 'to_code_selected']),
    ...mapWritableState(useMainStore, ['leftbar_tab']),
  },
  methods: {
    ...mapActions(useCurrencyStore, ['changeCurrencies','loadSelection','clearSelection']),
    ...mapActions(useRatesStore, ['getRates']),
    changeSelected() {
      this.changeCurrencies(this.$i18n.locale)
      this.loadSelection(this.from_code_selected, this.to_code_selected)
      this.getRates(this.from_code_selected, this.to_code_selected)
    },
    clearSelectionComponent() {
      this.leftbar_tab = 'one'
      this.clearSelection(this.$i18n.locale)
      document.querySelectorAll("div.v-list-item.v-list-item--active").forEach((el) => {
        console.log(el.textContent)
        el.classList.remove("v-list-item--active--selected")
        console.log('123')
      })
    }
  },

}
</script>

<style scoped>

</style>
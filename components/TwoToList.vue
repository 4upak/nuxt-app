<template>
  <v-text-field
    label="To currency"
    v-model="this.ToSearchItem"
    @input="searchTo"
    v-if="!to_code_selected || !from_code_selected"

  >
  </v-text-field>
  <template
      v-if="ToSearchItem.length > 0 && !this.from_code_selected && !this.to_code_selected"
  >
    <template
        v-for="(item, i) in currencies_to_data"

    >

          <template v-for="(currency, j) in item.tag_currencies">
            <div
                :key="j"
                :value="currency"
                @click="setSelection(currency.code_name, currency.name, 'to',this.$i18n.locale);"
                v-if = "currency.active == true"
                :class="currency.selected == true ? 'v-list-item--active--selected currency_item':'v-list-item--active--unselected currency_item'"

            >
              <div class="item_name">
                {{ currency.name }}
              </div>
            </div>
          </template>

    </template>
  </template>




</template>

<script>
import {mapState, mapActions, mapWritableState} from 'pinia'
import {useCurrencyStore} from '@/stores/CurrencyStore'

export default {
  name: "ToList",
  data: () => ({
    fromSelectedItem: 0,

  }),
  computed: {
    ...mapState(useCurrencyStore, ['currencies_to_data', 'to_code_selected','from_code_selected','toCurrencyName']),
    ...mapWritableState(useCurrencyStore, ['ToSearchItem']),

  },
  methods: {
    ...mapActions(useCurrencyStore, ['setSelection','searchingTo']),
    searchTo() {
      this.searchingTo(this.ToSearchItem)
    },

  },

}
</script>

<style scoped>

</style>

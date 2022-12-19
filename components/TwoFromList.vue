<template>
  <v-text-field
    label="From currency"
    v-model="this.FromSearchItem"
    @input="searchFrom"
    v-if="!to_code_selected || !from_code_selected"

  >
  </v-text-field>
  <template
      v-if="this.FromSearchItem.length > 0 && !this.from_code_selected && !this.to_code_selected"
  >
    <v-card>
    <template
        v-for="(item, i) in currencies_from_data"

    >

          <template v-for="(currency, j) in item.tag_currencies">


            <div
                :key="j"
                :value="currency"
                @click="setSelection(currency.code_name, currency.name, 'from',this.$i18n.locale);"
                v-if = "currency.active == true"
                :class="currency.selected == true ? 'v-list-item--active--selected currency_item':'v-list-item--active--unselected currency_item'"

            >
              <div class="item_name">
                {{ currency.name }}
              </div>

            </div>
          </template>

    </template>
    </v-card>

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
    ...mapState(useCurrencyStore, ['currencies_from_data', 'from_code_selected', 'to_code_selected','fromCurrencyName']),
    ...mapWritableState(useCurrencyStore, ['FromSearchItem']),
  },
  methods: {
    ...mapActions(useCurrencyStore, ['setSelection','searchingFrom']),
    searchFrom() {
        this.searchingFrom(this.FromSearchItem)
      },
  },

}
</script>


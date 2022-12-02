<template>

  <v-text-field
    label="From currency"
    v-model="FromSearchItem"
    @input="searchFrom"

  >
  </v-text-field>
  <template
      v-if="FromSearchItem.length > 0"
  >
    <v-card>
    <template
        v-for="(item, i) in currencies_from_data"

    >

          <template v-for="(currency, j) in item.tag_currencies">
            <v-list-item
                :key="j"
                :value="currency"
                active-color="primary"
                @click="setSelection(currency.code_name, currency.name, 'from')"
                v-if = "currency.active == true"
            >
              <v-list-item-title v-text="currency.name"></v-list-item-title>
            </v-list-item>
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
    FromSearchItem: "",
  }),
  computed: {
    ...mapState(useCurrencyStore, ['currencies_from_data', 'from_code_selected','fromCurrencyName']),
  },
  methods: {
    ...mapActions(useCurrencyStore, ['setSelection','searchingFrom']),
    searchFrom() {
        this.searchingFrom(this.FromSearchItem)
      },
  },

}
</script>


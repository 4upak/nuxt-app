<template>
  <v-text-field
    label="To currency"
    v-model="ToSearchItem"
    @input="searchTo"
    v-if="!to_code_selected || !from_code_selected"

  >
  </v-text-field>
  <template
      v-if="ToSearchItem.length > 0"
  >
    <template
        v-for="(item, i) in currencies_to_data"

    >

          <template v-for="(currency, j) in item.tag_currencies">
            <v-list-item
                :key="j"
                :value="currency"
                @click="setSelection(currency.code_name, currency.name, 'to'); ToSearchItem= '';"
                v-if = "currency.active == true"
            >
              <v-list-item-title v-text="currency.name"></v-list-item-title>
            </v-list-item>
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
    ToSearchItem: "",
  }),
  computed: {
    ...mapState(useCurrencyStore, ['currencies_to_data', 'to_code_selected','from_code_selected','toCurrencyName']),

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

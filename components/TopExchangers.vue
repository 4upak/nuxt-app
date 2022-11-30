<template>
  <div>
  <template
      v-if="top_exchangers.length > 0"
  >
    <v-card
      v-for="(exchanger, i) in top_exchangers"
      :key="i"
      style="margin-bottom: 50px"


    >
      <v-card-title>
        {{ exchanger.name }}
      </v-card-title>
      <v-card-subtitle>
        Rates: {{ exchanger.rates }}
      </v-card-subtitle>
      <v-table>
        <thead>
        <tr>
          <th>Rate</th>
          <th class="text-left">
            Give
          </th>
          <th class="text-left">
            Get
          </th>
        </tr>
        </thead>
        <tbody>

        <tr
          v-for="item in exchanger.popular_rates"
          :key="item.id"

        >
          <td v-if="item.from_currency_name != item.to_currency_name">{{ item.from_currency_name }} -><br> {{ item.to_currency_name }}</td>
          <td v-if="item.from_currency_name != item.to_currency_name">{{ item.from_rate}}<br>
            <span class="min"><b>Min:</b> {{item.min}}</span><br><span class="max"><b>Max:</b> {{item.max}}</span>
          </td>
          <td v-if="item.from_currency_name != item.to_currency_name">
            {{ item.to_rate}}<br>
            <span class="min"><b>Reserve:</b> {{ item.reserve}}</span>
          </td>
        </tr>

        </tbody>
      </v-table>

    </v-card>
  </template>
    <v-progress-linear
      v-else
      indeterminate
      color="primary" />

  </div>
</template>

<script>
import { mapState, mapActions} from 'pinia'
import {useExchangersStore} from '../stores/ExchangersStore'

export default {
  setup(){
    const exchangers_store = useExchangersStore()
    exchangers_store.getExchangers()

  },
  name: "TopExchangers",
  computed: {
    ...mapState(useExchangersStore,['top_exchangers']),
  },
  methods: {
  },

  mounted() {

  },

}
</script>

<style scoped>
span.min, span.max{
  font-size: 12px;
  color: #888888;
}
</style>

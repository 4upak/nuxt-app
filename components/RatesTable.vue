<template>
  <div v-if="getRatesResult.length > 0">
  <v-col
      class="d-flex align-center rate_result_cols"
      v-if="getRatesResult.length > 0"
  >
    <v-row class="rate_result_cols_header" v-if="!getMobileCheck">
      <v-col cols="12" md="2">
        Exchange
      </v-col>
      <v-col cols="12" md="5">
        Give
      </v-col>
      <v-col cols="12" md="2">
        Get
      </v-col>
      <v-col cols="12" md="3">
        Reserve
      </v-col>
      <!--<v-col cols="10" md="2">
        Reviews
      </v-col>-->
    </v-row>
  </v-col>
    <template
        v-for="item in getRatesResult"
        :key="item.id"

        >
      <v-col v-if = "!getMobileCheck">
        <v-row class="rate_result_cols_header_seccond">
          <v-col cols="12" md="2">
            {{ item.exchange.name }}
          </v-col>
          <v-col cols="12" md="5">
            {{ item.from_rate}} <span class="from_currency">{{item.from_currency.name}}</span><br>
            <span class="min"><b>Min:</b> {{item.min}} -> </span>
            <span class="max"><b>Max:</b> {{item.max}}</span>
          </v-col>
          <v-col cols="12" md="2">
            {{ item.to_rate}}<br><span class="to_currency"> {{item.to_currency.name}}</span>
          </v-col>
          <v-col cols="12" md="3">
            {{ item.reserve}}<br><span class="to_currency"> {{item.to_currency.name}}</span>
          </v-col>
          <!--<v-col cols="10" md="2">
            Reviews
          </v-col>-->
        </v-row>
      </v-col>
      <div class="rate_view_mobile" v-if="getMobileCheck">
        <v-card
            class="rate_card_mobile_view"
        >
          <v-card-item>
            <div>
              <div class="review_count">
                Reviews:
                <v-badge
                  color="info"
                  content="12"
                  inline
              ></v-badge>
              </div>
              <div class="text-h6 mb-1">
                {{ item.exchange.name }}
              </div>
              <div >
                {{ item.from_rate}} <span class="from_currency">{{item.from_currency.name}}</span> ->
                {{ item.to_rate}} <span class="to_currency">{{item.to_currency.name}}</span>
              </div>
              <div>
                <span class="min"><b>Min:</b> {{item.min}} -> </span>
                <span class="max"><b>Max:</b> {{item.max}}</span>
              </div>
              <div class="reserve_mobile_view text-caption">Reserve: {{ item.reserve}} {{item.to_currency.code_name}}</div>
              <v-btn
                  class="mt-2 rate_mobile_button"
                  color="success"
                  :href="item.url"
                  style="margin-top:-25px !important;"
              >
                Exchange
              </v-btn>
            </div>
          </v-card-item>

        </v-card>
        <div style="margin-top: 10px"></div>
      </div>

      <v-divider v-if="!getMobileCheck"></v-divider>
    </template>
  </div>
  <!--<v-table v-if="getRatesResult.length > 0" id="rates_table">
    <thead>
    <tr>
      <th class="text-left">
        Unit
      </th>
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
      v-for="item in getRatesResult"
      :key="item.id"
    >
      <td class="unit_name">
        {{ item.exchange.name }}
        <v-btn
            color="white"
            prepend-icon="mdi-cloud-upload"
            width="120"
            height="25"
            class="change_click_button"
        >
          Exchange
        </v-btn>
      </td>
      <td class="give">{{ item.from_rate}} <span class="from_currency">{{item.from_currency.name}}</span><br>
        <span class="min"><b>Min:</b> {{item.min}}</span> |
        <span class="max"><b>Max:</b> {{item.max}}</span>
      </td>
      <td class="get">
        {{ item.to_rate}}<span class="to_currency">{{item.to_currency.name}}</span>
        <span class="min"><b>Reserve:</b>{{ item.reserve}}</span>
      </td>
    </tr>
    </tbody>
  </v-table>-->


  <v-progress-linear
    v-else
    indeterminate
    color="primary"
  ></v-progress-linear>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "RatesTable",
  data () {
    return {
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(["getRatesResult","getMobileCheck"]),
  },
}
</script>

<style scoped>
  span.from_currency, span.to_currency{
    font-size: 12px;
    color: #888888;
  }
  span.min, span.max{
    font-size: 12px;
    color: #888888;
  }
</style>

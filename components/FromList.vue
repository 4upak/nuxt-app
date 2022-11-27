<template>
  <v-text-field
      label="Give currency"
      v-model="FromSearchItem"
      @input="searchFrom"
      id="from-list"
  >

  </v-text-field>

  <v-expansion-panels
      v-model="panel"
      multiple
      variant="accordion"
      v-if="getCurrenciesFromLists.length > 0"
  >
    <template
        v-for="(item, i) in getCurrenciesFromLists"
    >
        <v-expansion-panel
            :key="i"
            v-if="item.active == true"
            color="primary"
        >
          <v-expansion-panel-title
              color="blue"
          >{{item.name}}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <div
                :key="i"
                v-if="getCurrenciesFromLists.length > 0 && item.active == true"
            >
              <v-list
                  density="compact"
              >
                <template v-for="(currency, j) in item.tag_currencies">
                  <v-list-item
                      :key="j"
                      :value="currency"

                      @click="this.setFromCode(currency.code_name); scrollTo()"
                      v-if = "currency.active == true"
                      active-color="green"

                      :class="{ 'v-list-item--active': currency.code_name == this.$route.params.from_code }"

                  >
                    <v-list-item-title>
                      {{ currency.name }}
                    </v-list-item-title>

                  </v-list-item>
                </template>
              </v-list>
            </div>
          </v-expansion-panel-text>

        </v-expansion-panel>
    </template>
  </v-expansion-panels>
  <v-progress-circular
      indeterminate
      color="primary"
      v-else
      align-center
  ></v-progress-circular>

</template>

<script>

export default {
  name: "FromList",

  data: () => ({
    fromSelectedItem: 0,
    FromSearchItem: "",
    panel: [0, 1,2,3,4,5,6],
  }),

  computed: {
    ...mapGetters(["getCurrenciesFromLists"]),
  },
  methods: {
    ...mapActions(["setFromCode"]),
    searchFrom() {
      this.$store.dispatch("searchFrom", this.FromSearchItem);
    },
    scrollTo() {
      document.getElementById("to-list").scrollIntoView( { behavior: "smooth",  } );
    },
  },
}
</script>

<style scoped>

</style>


<template>

    <v-toolbar
      density="compact"
      color="#fff"
      height="80px"
    >
      <v-container
        fluid
        class="d-flex align-right top_toolbar-container"
        >

        <div
             class="logo"
        ><a href="/"><img style="width:100px" :src="logo"/></a></div>

        <v-tabs
          align-with-title
          height="80px"
          class="top_toolbar-tabs top-navbar"
        >
          <v-tab><nuxt-link active-class="active" to="/">Home</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" to="/news/">News</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" to="/exchanges/">Exchanges</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" to="/articles/">Articles</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" to="/faq/">F.A.Q</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" to="/contacts/">Contacts</nuxt-link></v-tab>
        </v-tabs>


        <div class="header_buttons">
          <v-btn
              variant="outlined"
              color="blue"
              class="ml-3 register_button"

          >
            Create account
          </v-btn>
          <v-btn
              variant="outlined"
              color="grey"
              class="ml-5 login_button"

          >
            Login
          </v-btn>
          <client-only>
            <v-menu
                transition="slide-y-transition"
                v-if="isMobile"
            >
              <template v-slot:activator="{ props }" >
                <v-btn
                    icon
                    v-bind="props"

                >
                  <v-icon
                      color="blue"
                      icon="mdi-hamburger"
                      size="x-large"

                  >

                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title><router-link to="/">Home</router-link></v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-title><router-link to="/news/">News</router-link></v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-title><router-link to="/exchanges/">Exchanges</router-link></v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-title><router-link to="/articles/">Articles</router-link></v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-title><router-link to="/faq/">F.A.Q</router-link></v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-title><router-link to="/contacts/">Contacts</router-link></v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>

              </v-list>
            </v-menu>
          </client-only>

        </div>



      </v-container>


    </v-toolbar>
</template>

<script>

import { mapState} from 'pinia'
import {useMainStore} from '../stores/MainStore'

import LogoImg from "@/assets/img/logo.png";
export default {
  name: "TopNavbar",
  data: () => ({
    logo: LogoImg,
  }),
  computed: {
    ...mapState(useMainStore, ['isMobile'])
  },


};


</script>

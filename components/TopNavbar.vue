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
        ><a :href="'/'+$i18n.locale+'/'"><img style="width:100px" :src="logo"/></a></div>

        <v-tabs
          align-with-title
          height="80px"
          class="top_toolbar-tabs top-navbar"
          v-if="$i18n.locale !='en'"
        >
          <v-tab><nuxt-link active-class="active" :to="'/'+$i18n.locale+'/'">{{ $t('home_page_title') }}</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" :to="'/'+$i18n.locale+'/news/'">{{ $t('news_page_title') }}</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" :to="'/'+$i18n.locale+'/exchanges/'">{{ $t('exchanges_page_title') }}</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" :to="'/'+$i18n.locale+'/articles/'">{{ $t('articles_page_title') }}</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" :to="'/'+$i18n.locale+'/faq/'">{{ $t('faq_page_title') }}</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" :to="'/'+$i18n.locale+'/contacts/'">{{ $t('contacts_page_title') }}</nuxt-link></v-tab>
        </v-tabs>
        <v-tabs
            align-with-title
            height="80px"
            class="top_toolbar-tabs top-navbar"
            v-else
        >
          <v-tab><nuxt-link active-class="active" :to="'/'">{{ $t('home_page_title') }}</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" :to="'/news/'">{{ $t('news_page_title') }}</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" :to="'/exchanges/'">{{ $t('exchanges_page_title') }}</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" :to="'/articles/'">{{ $t('articles_page_title') }}</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" :to="'/faq/'">{{ $t('faq_page_title') }}</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" :to="'/contacts/'">{{ $t('contacts_page_title') }}</nuxt-link></v-tab>
        </v-tabs>


        <div class="header_buttons">
          <LangSelector />



          <v-btn
              variant="outlined"
              color="blue"
              class="ml-3 register_button"

          >
            {{ $t('create_account') }}
          </v-btn>
          <v-btn
              variant="outlined"
              color="grey"
              class="ml-5 login_button"

          >
            {{ $t('login') }}
          </v-btn>

            <v-menu
                transition="slide-y-transition"
                v-if="isMobile"
                class="burger_menu"
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


        </div>



      </v-container>


    </v-toolbar>
</template>

<script>

import { mapState} from 'pinia'
import {useMainStore} from '../stores/MainStore'
import LangSelector from "@/components/LangSelector";


import LogoImg from "@/assets/img/logo.png";

export default {
  name: "TopNavbar",
  data: () => ({
    logo: LogoImg,

  }),
  computed: {
    ...mapState(useMainStore, ['isMobile']),

  },
  components:{
  },
  methods:{

  },


};


</script>

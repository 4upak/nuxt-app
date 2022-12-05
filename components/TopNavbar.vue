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
        >
          <v-tab><nuxt-link active-class="active" :to="'/'+$i18n.locale+'/'">{{ $t('home_page_title') }}</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" :to="'/'+$i18n.locale+'/news/'">{{ $t('news_page_title') }}</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" :to="'/'+$i18n.locale+'/exchanges/'">{{ $t('exchanges_page_title') }}</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" :to="'/'+$i18n.locale+'/articles/'">{{ $t('articles_page_title') }}</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" :to="'/'+$i18n.locale+'/faq/'">{{ $t('faq_page_title') }}</nuxt-link></v-tab>
          <v-tab><nuxt-link active-class="active" :to="'/'+$i18n.locale+'/contacts/'">{{ $t('contacts_page_title') }}</nuxt-link></v-tab>
        </v-tabs>


        <div class="header_buttons">

          <v-menu
              open-on-hover
              class="lang_selector"

          >
            <template v-slot:activator="{ props }">
              <v-btn
                  color="primary"
                  v-bind="props"
              >

                {{ $t('lang_name') }}
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                @click="selectLang('en')"
              >
                <v-list-item-title>English</v-list-item-title>
              </v-list-item>
              <v-list-item
                  @click="selectLang('ru')"
              >
                <v-list-item-title>Русский</v-list-item-title>
              </v-list-item>
              <v-list-item
                  @click="selectLang('uk')"
              >
                <v-list-item-title>Украинский</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>


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




import LogoImg from "@/assets/img/logo.png";
export default {
  name: "TopNavbar",
  data: () => ({
    logo: LogoImg,


  }),
  computed: {
    ...mapState(useMainStore, ['isMobile']),

  },
  methods:{
    selectLang(locale){
      console.log('selecting lang')
      this.$i18n.locale = locale
      localStorage.setItem('lang',locale)
    },
  },


};


</script>

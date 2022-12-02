import { defineStore } from 'pinia'


// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useMainStore = defineStore('main', {
    state: () => ({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        from_list_panel: [0,1,2,3,4,5,6],
        to_list_panel: [0,1,2,3,4,5,6],
    }),

    actions: {
        async getMobileCheck(req) {
            //if navigator is defined
            /*if (typeof(navigator) !== 'undefined') {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    this.isMobile = true
                    return true
                } else {
                    this.isMobile = false
                    return false
                }
            }*/

        },
    },


})
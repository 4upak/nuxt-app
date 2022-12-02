import {defineNuxtPlugin, useRequestHeaders} from '#app';
import MobileDetect from 'mobile-detect';
import {useMainStore} from '../stores/MainStore'

export default defineNuxtPlugin(() => {
    let headers = useRequestHeaders()

    const md = process.server ? new MobileDetect(headers['user-agent']) : new MobileDetect(navigator.userAgent)
    const isMobile = md.phone() !== null || md.mobile() === 'UnknownMobile'
    const isTablet = md.tablet() !== null || md.mobile() === 'UnknownTablet'
    const isDesktop = !isMobile && !isTablet
    const mainStore = useMainStore()
    mainStore.isMobile = isMobile
    mainStore.isTablet = isTablet
    mainStore.isDesktop = isDesktop


    return {
        provide: {
            isMobile: () => isMobile,
            isTablet: () => isTablet,
            isDesktop: () => isDesktop
        },
    };
})

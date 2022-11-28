export default function useMainStore(){
    const isMobile = false

    function getMobileCheck(){
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)) {
            this.isMobile= true
            return true
        } else {
            this.isMobile = false
            return false
        }
    }

    return {
        isMobile, getMobileCheck
    }
}
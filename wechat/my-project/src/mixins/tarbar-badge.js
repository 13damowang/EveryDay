import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters('m_cart', [
      'total'
    ])
  },
  methods: {
    setBadge () {
      uni.setTabBarBadge({
        index: 2,
        text: this.total + ''
      })
    }
  },
  onShow() {
    this.setBadge()
  },
  watch: {
    //动态监听增加商品数量，tarbar数量增加
    total () {
      this.setBadge()
    }
  },
}
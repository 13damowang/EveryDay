export default {
  namespaced: true,  //开启命名空间

  state: () => {
    return {
      address: JSON.parse(uni.getStorageSync('address') || '{}') 
    }
  },

  mutations: {
    /**
     * 
     * @param {*} state 
     * @param {*} address 
     */
    //更新收货地址
    UPDATAADDRESS (state, address) {
      state.address = address
      this.commit('m_user/SAVETOSTORAGE')
    },

    SAVETOSTORAGE (state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
  },

  getters: {
    deliveryAddress (state) {
      if (!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }

}
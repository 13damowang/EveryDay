export default {
  namespaced: true,  //开启命名空间

  state: () => {
    return {
      address: JSON.parse(uni.getStorageSync('address') || '{}') ,
      token: uni.getStorageSync('token') || '',
      userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
      redirectInfo: null  //重定向
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

    //更新用户信息
    UPDATEUSERINFO (state, userinfo) {
      state.userinfo = userinfo
      this.commit('m_user/SAVEUSERINFO')
    },

    SAVEUSERINFO (state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },

    //更新token
    UPDATETOKEN (state, token) {
      state.token = token
      this.commit('m_user/SAVETOKEN')
    },

    SAVETOKEN (state) {
      uni.setStorageSync('token', state.token)
    },

    //处理登录重定向
    UPDATEREDIRECTINFO (state, info) {
      state.redirectInfo = info
    }
  },

  getters: {
    //收货地址
    deliveryAddress (state) {
      if (!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }

}
export default {
  //开启命名空间
  namespaced: true,

  state: () => {
    return {
      //购物车数组，用来存储购物车中每个商品到信息对象
      //每个商品到信息对象，都包含6个属性
      /**
       {
         goods_id 商品id,
         goods_name 商品名称,
         goods_price 商品价格,
         goods_count 商品数量 默认为1,
         goods_small_logo 商品图片,
         goods_state 商品的勾选状态
       },
       * 
       */
      cart: JSON.parse(uni.getStorageSync('cart') || '[]')
    }
  },

  mutations: {
    ADDTOCART (state, shops) {
      //判断加入购物车中的商品id是否存在于cart，如果存在，则返回item，不存在返回undefined
      const findResult = state.cart.find(item => item.goods_id === shops.goods_id)

      //如果不存在，添加商品，如果存在，商品数量+1
      if (!findResult) {
        //如果goods_count为null或者undefined 那么++会NAN，首次添加的时候先初始化0
        // shops.goods_count = parseInt(shops.goods_count) >= 0 ? shops.goods_count : 0
        // shops.goods_count ??= 0
        state.cart.push(shops)
      } else {
        findResult.goods_count ++
      }
      this.commit('m_cart/SAVETOSTORAGE')
    },

    SAVETOSTORAGE (state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },

    UPDATESHOPSSTATE (state, shops) {
      const findResult = state.cart.find(item => item.goods_id === shops.goods_id)
      if (findResult) {
        findResult.goods_state = shops.goods_state
        this.commit('m_cart/SAVETOSTORAGE')
      }
    },

    UPDATASHOPSCOUNT (state, shops) {
      const findResult = state.cart.find(item => item.goods_id === shops.goods_id)
      if (findResult) {
        findResult.goods_count = shops.goods_count
        this.commit('m_cart/SAVETOSTORAGE')
      }
    },

    REMOVESHOPS (state, shops) {
      // state.cart.forEach((item, index) => {
        //   if (item.goods_id === shops.goods_id) {
          //     state.cart.splice(index, 1)
          //   }
          // })
      state.cart = state.cart.filter(item => item.goods_id !== shops.goods_id)
      this.commit('m_cart/SAVETOSTORAGE')
    },

    CHECKEDALL (state, newState) {
      state.cart.forEach(item => item.goods_state = newState)
      this.commit('m_cart/SAVETOSTORAGE')
    }

  },

  getters: {
    //动态根据加入购物车展示购物车中的商品数量
    total (state) {
      let c = 0
      state.cart.forEach(item => c += item.goods_count)
      return c
    },

    //结算商品的总数量
    checkedCount (state) {
      let count = 0
      state.cart.forEach(item => {
        if (item.goods_state) {
          count += item.goods_count
        }
      })
      return count
    },

    //全选
    checkedAll (state) {
      let flag = true
      state.cart.forEach(item => {
        if (!item.goods_state) {
          flag = false
        }
      })
      return flag
    },

    //商品总价
    shopsPrice (state) {
      let price = 0
      state.cart.forEach(item => {
        if (item.goods_state) {
          price += item.goods_count * item.goods_price
        }
      })
      return price.toFixed(2)
    }
  }
}
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
    }

  },

  getters: {
    //动态根据加入购物车展示购物车中的商品数量
    total (state) {
      let c = 0
      console.log(state.cart);
      state.cart.forEach(item => c += item.goods_count)
      return c
    }
  }
}
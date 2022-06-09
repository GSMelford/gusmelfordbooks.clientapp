import { createStore } from 'vuex'

import auth from '@/store/modules/auth'
import storeShop from '@/store/modules/storeShop'
import shop from '@/store/modules/shop'

export default createStore({
  modules: {
    auth,
    storeShop,
    shop
  }
})

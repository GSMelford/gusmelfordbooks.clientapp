import { createStore } from 'vuex'

import auth from '@/store/modules/auth'
import storeShop from '@/store/modules/storeShop'

export default createStore({
  modules: {
    auth,
    storeShop
  }
})

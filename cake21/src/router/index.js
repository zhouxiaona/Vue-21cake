import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import GoodsList from '@/components/goodsList/GoodsList'
import ShopCar from '@/components/shopcar/ShopCar'
import Kezhi from '@/components/kezhi/Kezhi'
import KezhiInfo from '@/components/kezhiinfo/KezhiInfo'
import Party from '@/components/party/Party'

export default new Router({
  mode:"history",
  routes: [
    {
      path:'/',
      redirect:'/GoodsList'
    },
    {
      path:'/GoodsList',
      component:GoodsList
    },
    {
      path:'/Kezhi',
      component:Kezhi
    },
    {
      path:'/KezhiInfo',
      component:KezhiInfo
    },
    {
      path:'/ShopCar',
      component:ShopCar
    },
    {
      path:'/Party',
      component:Party
    }
  ]
})

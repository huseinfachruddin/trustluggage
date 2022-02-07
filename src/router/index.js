import Vue from 'vue'
import store from '../store'
import vuerouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Courier from '../views/courier/Courier.vue'
import Admin from '../views/admin/Admin.vue'
import Users from '../views/admin/Users.vue'
import EditUser from '../views/admin/UserEdit.vue'
import Receipts from '../views/receipt/Receipts.vue'
import EditReceipt from '../views/receipt/ReceiptEdit.vue'
import NewReceipt from '../views/receipt/ReceiptNew.vue'
import Print from '../views/receipt/Print.vue'
import HistoryReceipt from '../views/receipt/ReceiptHistory.vue'

Vue.use(vuerouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta:{
      title:'Trust Luggage | jasa pengiriman terpercaya'
    }
  },
  {
    path: '/settingfrist',
    name: 'frist',
    beforeEnter: async (to,form,next) => {
      try {
        await store.dispatch('frist');
        next('/')
      } catch (error) {
        next('/')
      }
  }
  },
  {
    path: '/direct',
    name: 'direct',
    beforeEnter: async (to,form,next) => {
      try {
        await store.dispatch('direct');
      } catch (error) {
        next('/login')
      }
  }
  },
  {
    path: '/login',
    name: 'login',
    component:Login,
    meta:{
      title:'Login | Trust Luggage | jasa pengiriman terpercaya'
    }
  },
  {
    path: '/register',
    name: 'register',
    component:Register,
    meta:{
      title:'Register Page'
    }
  },
  //ADMIN AREA
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta:{
      auth:true,
      permision:'admin',
      title:'Admin | Trust Luggage | jasa pengiriman terpercaya'
    }

  },
  {
    path: '/admin/users',
    name: 'admin.user',
    component: Users,
    meta:{
      auth:true,
      permision:'admin',
      title:'User Table | Trust Luggage | jasa pengiriman terpercaya'
    }

  },
  {
    path: '/admin/users/:id',
    name: 'edit.user',
    component: EditUser,
    meta:{
      auth:true,
      permision:'admin',
      title:'User Edit | Trust Luggage | jasa pengiriman terpercaya'
    }

  },
  //COURIER AREA
  {
    path: '/courier',
    name: 'courier',
    component: Courier,
    meta:{
      auth:true,
      permision:'courier',
      title:'Courier | Trust Luggage | jasa pengiriman terpercaya'
    },
  },
    //RECEIPT AREA
  {
    path: '/receipt',
    name: 'admin.receipts',
    component: Receipts,
    meta:{
      auth:true,
      permision:'free',
      title:'Courier | Trust Luggage | jasa pengiriman terpercaya'

    }

  },
  {
    path: '/receipt/new',
    name: 'new.receipts',
    component: NewReceipt,
    meta:{
      auth:true,
      permision:'admin',
      title:'pengiriman baru'

    }

  },
  {
    path: '/receipt/:id',
    name: 'edit.receipt',
    component: EditReceipt,
    meta:{
      auth:true,
      permision:'free',
      title:'data pengiriman'
    }

  },
  {
    path: '/receipt/:id/history',
    name: 'history.receipt',
    component: HistoryReceipt,
    meta:{
      auth:true,
      permision:'free',
      title:'history pengiriman'
    }

  },
  {
    path: '/print/:id',
    name: 'print.receipt',
    component: Print,
    meta:{
      title:'vetak resi'
    }

  },
];




const router = new vuerouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach( async (to,from, next) => {
  document.title=to.meta.title;
  try {
    if (to.matched.some(record => record.meta.auth)) {
      await store.dispatch('profile');
      let data = store.state.auth.profile.user.role.name;
      let permision = to.meta.permision;
        if (data==permision) {
          return next()
        }if (permision=='free') {
          return next()
        }else{
          return next('/')
        }
    }else{
      return next()
    }

  } catch (error) {
    return next('/login')
  }

  });


export default router

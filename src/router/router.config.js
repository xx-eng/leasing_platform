export const constantRouterMap = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/user/home/Home')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/Login2')
  },
  {
    path: '/goods/:id',
    name: 'goods',
    component: () => import('@/views/user/GoodsDetail')
  },
  {
    path: '/category/:id',
    name: 'category',
    component: () => import('@/views/user/CategoryPage')
  },
  {
    path: '/rent/:goodsId',
    name: 'rent',
    component: () => import('@/views/user/rental/Rental')
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/user/pay/Payment')
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('@/views/user/personal/Personal')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/user/personal/order/Order')
  },
  {
    path: '/orderDescription',
    name: 'orderDescription',
    component: () => import('@/views/user/personal/order/operate/Description')
  },
  {
    path: '/continue',
    name: 'continue',
    component: () => import('@/views/user/personal/order/operate/Continue')
  },
  {
    path: '/terminal',
    name: 'terminal',
    component: () => import('@/views/user/personal/order/operate/Terminal')
  },
  {
    path: '/normal-terminal',
    name: 'NormalTerminal',
    component: () => import('@/views/user/personal/order/operate/NormalTerminal')
  },
  {
    path: '/comment',
    name: 'comment',
    component: () => import('@/views/user/personal/order/operate/Comment')
  },
  {
    path: '/favourite',
    name: 'favourite',
    component: () => import('@/views/user/Favourite')
  },
  {
    path: '/password',
    name: 'password',
    component: () => import('@/views/user/personal/account/Password')
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('@/views/user/personal/address/Address')
  },
  {
    path: '/recharge',
    name: 'recharge',
    component: () => import('@/views/user/personal/recharge/Recharge')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('@/views/user/personal/message/Message')
  },
  {
    path: '/buy',
    name: 'buy',
    component: () => import('@/views/user/personal/order/operate/Buy')
  },
  {
    path: '/addPage',
    name: 'addPage',
    component: () => import('@/views/user/personal/address/AddPage')
  },
  {
    path: '/complain',
    name: 'complain',
    component: () => import('@/views/user/personal/complain/Complain')
  },
  {
    path: '/register',
    name: 'register',
    component:() => import('@/views/user/Register')
  },
  {
    path: '/firmRegister',
    name: 'firmRegister',
    component:() => import('@/views/user/FirmRegister')
  },
  {
    path: '/school/home',
    name: 'schoolHome',
    component:() => import('@/views/user/personal/school/SchoolHome')
  },
  {
    path: '/school/myrent',
    name: 'schoolMyGoods',
    component:() => import('@/views/user/personal/school/myrent/MyGoodsList')
  },
  {
    path: '/school/myrent/addGoods',
    name: 'AddMyGoods',
    component:() => import('@/views/user/personal/school/myrent/AddMyGoods')
  },
  {
    path: '/school/schoolGoodsDetail/:id',
    name: 'SchoolGoodsDetail',
    component:() => import('@/views/user/personal/school/SchoolGoodsDetail')
  },
  {
    path: '/school/myFavourite',
    name: 'SchoolMyFavourite',
    component:() => import('@/views/user/personal/school/SchoolMyFavourite')
  },
  {
    path: '/school/rent/:goodsId',
    name: 'SchoolRental',
    component: () => import('@/views/user/personal/school/myrental/SchoolRental')
  },
  {
    path: '/school/mypay',
    name: 'SchoolMyPayment',
    component:() => import('@/views/user/personal/school/mypay/SchoolMyPayment')
  },
  {
    path: '/school/mypaysuccess',
    name: 'SchoolPaySuccess',
    component:() => import('@/views/user/personal/school/mypay/SchoolPaySuccess')
  },
  {
    path: '/PaySuccess',
    name: 'PaySuccess',
    component: () => import('@/views/user/pay/PaySuccess')
  }
]


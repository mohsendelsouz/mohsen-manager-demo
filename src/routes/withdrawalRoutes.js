import auth from "../middlewares/auth";
export const withdrawalRoutes = [
  {
    path: '/withdrawals',
    component: () => import(/* webpackChunkName: "withdrawals" */ '../views/withdrawal/WithdrawalList'),
    name: 'withdrawals',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/withdrawals/add',
    component: () => import(/* webpackChunkName: "withdrawals" */ '../views/withdrawal/WithdrawalForm'),
    name: 'withdrawals_add',
    meta: {
      middleware: [
        auth
      ]
    }
  },
];
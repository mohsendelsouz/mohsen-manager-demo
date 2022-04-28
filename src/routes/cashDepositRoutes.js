import auth from "../middlewares/auth";
export const cashDepositRoutes = [
  {
    path: '/cash-deposits',
    component: () => import(/* webpackChunkName: "jobs" */ '../views/cash/deposit/CashDepositList'),
    name: 'cash_deposits',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/cash-deposits/add',
    component: () => import(/* webpackChunkName: "jobs" */ '../views/cash/deposit/CashDepositForm'),
    name: 'cash_deposits_add',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/cash-deposits/edit/:id',
    component: () => import(/* webpackChunkName: "jobs" */ '../views/cash/deposit/CashDepositForm'),
    name: 'cash_deposits_edit',
    meta: {
      middleware: [
        auth
      ]
    }
  },
];
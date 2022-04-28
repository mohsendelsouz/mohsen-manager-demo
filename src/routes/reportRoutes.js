import auth from "../middlewares/auth";
export const reportRoutes = [
  {
    path: '/reports',
    component: () => import(/* webpackChunkName: "reports" */ '../views/report/Report'),
    name: 'reports',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/reports/charity',
    component: () => import(/* webpackChunkName: "reports" */ '../views/report/Charity'),
    name: 'reports_charity',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/reports/technician_wallet',
    component: () => import(/* webpackChunkName: "reports" */ '../views/report/Technician'),
    name: 'reports_technician_wallet',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/reports/company',
    component: () => import(/* webpackChunkName: "reports" */ '../views/report/Company'),
    name: 'reports_company',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/reports/truck',
    component: () => import(/* webpackChunkName: "reports" */ '../views/report/Truck'),
    name: 'reports_truck',
    meta: {
      middleware: [
        auth
      ]
    }
  }
];
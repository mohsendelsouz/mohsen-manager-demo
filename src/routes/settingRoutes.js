import auth from "../middlewares/auth";
export const settingRoutes = [
  {
    path: '/settings/manager',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/manager/ManagerList'),
    name: 'settings_manager',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/manager/add',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/manager/ManagerForm'),
    name: 'settings_manager_add',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/manager/edit/:id',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/manager/ManagerForm'),
    name: 'settings_manager_edit',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/user',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/user/UserList'),
    name: 'settings_user',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/user/add',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/user/UserForm'),
    name: 'settings_user_add',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/user/edit/:id',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/user/UserForm'),
    name: 'settings_user_edit',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/company',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/company/CompanyList'),
    name: 'settings_company',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/company/add',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/company/CompanyForm'),
    name: 'settings_company_add',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/company/edit/:id',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/company/CompanyForm'),
    name: 'settings_company_edit',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/machine',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/machine/MachineList'),
    name: 'settings_machine',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/machine/add',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/machine/MachineForm'),
    name: 'settings_machine_add',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/machine/edit/:id',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/machine/MachineForm'),
    name: 'settings_machine_edit',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/truck',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/truck/TruckList'),
    name: 'settings_truck',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/truck/add',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/truck/TruckForm'),
    name: 'settings_truck_add',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/truck/edit/:id',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/truck/TruckForm'),
    name: 'settings_truck_edit',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/charity',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/charity/CharityList'),
    name: 'settings_charity',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/charity/add',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/charity/CharityForm'),
    name: 'settings_charity_add',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/charity/edit/:id',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/charity/CharityForm'),
    name: 'settings_charity_edit',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/commission',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/commission/CommissionList'),
    name: 'settings_commission',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/commission/add',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/commission/CommissionForm'),
    name: 'settings_commission_add',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/settings/commission/edit/:id',
    component: () => import(/* webpackChunkName: "settings" */ '../views/settings/commission/CommissionForm'),
    name: 'settings_commission_edit',
    meta: {
      middleware: [
        auth
      ]
    }
  },
];
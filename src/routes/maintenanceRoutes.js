import auth from "../middlewares/auth";
export const maintenanceRoutes = [
  {
    path: '/trucks_maintenances',
    component: () => import(/* webpackChunkName: "maintenance" */ '../views/maintenances/truck/TruckMaintenanceList'),
    name: 'trucks_maintenances',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/trucks_maintenances/add',
    component: () => import(/* webpackChunkName: "maintenance" */ '../views/maintenances/truck/TruckMaintenanceForm'),
    name: 'trucks_maintenances_add',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/trucks_maintenances/edit/:id',
    component: () => import(/* webpackChunkName: "maintenance" */ '../views/maintenances/truck/TruckMaintenanceForm'),
    name: 'trucks_maintenances_edit',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/machines_maintenances',
    component: () => import(/* webpackChunkName: "maintenance" */ '../views/maintenances/machine/MachineMaintenanceList'),
    name: 'machines_maintenances',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/machines_maintenances/add',
    component: () => import(/* webpackChunkName: "maintenance" */ '../views/maintenances/machine/MachineMaintenanceForm'),
    name: 'machines_maintenances_add',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/machines_maintenances/edit/:id',
    component: () => import(/* webpackChunkName: "maintenance" */ '../views/maintenances/machine/MachineMaintenanceForm'),
    name: 'machines_maintenances_edit',
    meta: {
      middleware: [
        auth
      ]
    }
  },
];
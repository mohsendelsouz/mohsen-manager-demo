import auth from "@/middlewares/auth";
import guest from "@/middlewares/guest";
import { settingRoutes } from "@/routes/settingRoutes";
import { jobRoutes } from "@/routes/jobRoutes";
import { maintenanceRoutes } from "@/routes/maintenanceRoutes";
import { withdrawalRoutes } from "@/routes/withdrawalRoutes";
import { reportRoutes } from "@/routes/reportRoutes";
import { cashDepositRoutes } from "@/routes/cashDepositRoutes";
import { referralRoutes } from "@/routes/referralRoutes";

let routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard'),
    name: 'dashboard',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "auth" */ '../views/auth/Login'),
    name: 'login',
    meta: {
      middleware: [
        guest
      ]
    }
  },
]

routes.push(...settingRoutes);
routes.push(...jobRoutes);
routes.push(...maintenanceRoutes);
routes.push(...withdrawalRoutes);
routes.push(...reportRoutes);
routes.push(...cashDepositRoutes);
routes.push(...referralRoutes);

export default routes;

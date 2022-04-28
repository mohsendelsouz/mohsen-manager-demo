import auth from "../middlewares/auth";
export const jobRoutes = [
  {
    path: '/jobs',
    component: () => import(/* webpackChunkName: "jobs" */ '../views/job/JobList'),
    name: 'jobs',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/jobs/details/:id',
    component: () => import(/* webpackChunkName: "jobs" */ '../views/job/JobDetails'),
    name: 'jobs_details',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/jobs/add',
    component: () => import(/* webpackChunkName: "jobs" */ '../views/job/JobForm'),
    name: 'jobs_add',
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/jobs/edit/:id',
    component: () => import(/* webpackChunkName: "jobs" */ '../views/job/JobForm'),
    name: 'jobs_edit',
    meta: {
      middleware: [
        auth
      ]
    }
  },
];
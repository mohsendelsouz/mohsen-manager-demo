import auth from "../middlewares/auth";
export const referralRoutes = [
  {
    path: '/referrals',
    component: () => import(/* webpackChunkName: "jobs" */ '../views/referral/ReferralList'),
    name: 'referrals',
    meta: {
      middleware: [
        auth
      ]
    }
  }
];
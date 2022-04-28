<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <router-link :to="{name: 'dashboard'}" class="brand-link">
      <img :src="baseUrl + 'img/logo.png'"
           alt="So Clean Logo">
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img :src="baseUrl + 'img/user2-160x160.jpg'"
               class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block">{{ user ? user.name : '' }}</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'dashboard'}" exact-active-class="active">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>Dashboard</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :class="['nav-link', {'active': ['jobs_details', 'jobs_add', 'jobs_edit'].includes($route.name)}]"
                         :to="{name: 'jobs'}" active-class="active">
              <i class="nav-icon fas fa-briefcase"></i>
              <p>Jobs</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link"
                         :to="{name: 'referrals'}" active-class="active">
              <i class="nav-icon fas fa-users"></i>
              <p>Referrals</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :class="['nav-link', {'active': ['cash_deposits_add', 'cash_deposits_edit'].includes($route.name)}]"
                         :to="{name: 'cash_deposits'}" active-class="active">
              <i class="nav-icon fas fa-dollar-sign"></i>
              <p>Cash</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'withdrawals'}" active-class="active">
              <i class="nav-icon fas fa-money-bill-wave-alt"></i>
              <p>Withdrawals</p>
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-tools"></i>
              <p>
                Maintenances
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :class="['nav-link', {'active': ['trucks_maintenances_add', 'trucks_maintenances_edit'].includes($route.name)}]"
                             :to="{name: 'trucks_maintenances'}"
                             active-class="active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Trucks</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'machines_maintenances'}"
                             :class="['nav-link', {'active': ['machines_maintenances_add', 'machines_maintenances_edit'].includes($route.name)}]"
                             active-class="active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Machines</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-cog"></i>
              <p>
                Settings
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
<!--              <li class="nav-item">
                <router-link :to="{name: 'settings_manager'}"
                             :class="['nav-link', {'active': ['settings_manager_add', 'settings_manager_edit'].includes($route.name)}]"
                             active-class="active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Managers</p>
                </router-link>
              </li>-->
              <li class="nav-item">
                <router-link :to="{name: 'settings_user'}"
                             :class="['nav-link', {'active': ['settings_user_add', 'settings_user_edit'].includes($route.name)}]"
                             active-class="active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Users</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'settings_company'}"
                             :class="['nav-link', {'active': ['settings_company_add', 'settings_company_edit'].includes($route.name)}]"
                             active-class="active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Companies</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'settings_machine'}"
                             :class="['nav-link', {'active': ['settings_machine_add', 'settings_machine_edit'].includes($route.name)}]"
                             active-class="active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Machines</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'settings_truck'}"
                             :class="['nav-link', {'active': ['settings_truck_add', 'settings_truck_edit'].includes($route.name)}]"
                             active-class="active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Trucks</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'settings_charity'}"
                             :class="['nav-link', {'active': ['settings_charity_add', 'settings_charity_edit'].includes($route.name)}]"
                             active-class="active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Charity</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'settings_commission'}"
                             :class="['nav-link', {'active': ['settings_commission_add', 'settings_commission_edit'].includes($route.name)}]"
                             active-class="active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Commission</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-clipboard-check"></i>
              <p>
                Reports
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{name: 'reports'}"
                             class="nav-link"
                             active-class="active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Overview</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'reports_charity'}"
                             class="nav-link"
                             active-class="active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Charity</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'reports_technician_wallet'}"
                             class="nav-link"
                             active-class="active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Technician</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'reports_company'}"
                             class="nav-link"
                             active-class="active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Company</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'reports_truck'}"
                             class="nav-link"
                             active-class="active">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Truck</p>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      user: 'auth/getUser'
    })
  },
}
</script>
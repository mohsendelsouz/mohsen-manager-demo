<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-8">
          <h1 class="m-0">Reports</h1>
        </div><!-- /.col -->
        <div class="col-sm-4">
          <div id="entry-date-range" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%">
            <i class="fa fa-calendar"></i>&nbsp;
            <span></span> <i class="fa fa-caret-down"></i>
          </div>
        </div>
      </div><!-- /.row -->
    </div><!-- /.container-fluid -->
  </div>
  <!-- /.content-header -->

  <section class="content">
    <div class="container-fluid" v-if="reports">
      <div class="row">
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-info">
            <div class="inner">
              <h3>{{ reports.jobs }}</h3>

              <p>Jobs</p>
            </div>
            <div class="icon">
              <i class="fas fa-briefcase"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-success">
            <div class="inner">
              <h3>${{ reports.total_amount.toFixed(2) }}</h3>

              <p>Amount</p>
            </div>
            <div class="icon">
              <i class="fas fa-dollar-sign"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-warning">
            <div class="inner">
              <h3>${{ reports.total_tip.toFixed(2) }}</h3>

              <p>Tip</p>
            </div>
            <div class="icon">
              <i class="fas fa-hand-holding-usd"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-danger">
            <div class="inner">
              <h3>${{ reports.total_wow }}</h3>

              <p>Wow</p>
            </div>
            <div class="icon">
              <i class="far fa-surprise"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
      </div>

      <div class="row">
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-warning">
            <div class="inner">
              <h3>{{ reports.active_technician }}</h3>

              <p>Active Technician</p>
            </div>
            <div class="icon">
              <i class="fas fa-users"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-danger">
            <div class="inner">
              <h3>${{ reports.truck_maintenance.toFixed(2) }}</h3>

              <p>Truck Maintenance</p>
            </div>
            <div class="icon">
              <i class="fas fa-truck-pickup"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-info">
            <div class="inner">
              <h3>${{ reports.machine_maintenance.toFixed(2) }}</h3>

              <p>Machine Maintenance</p>
            </div>
            <div class="icon">
              <i class="fas fa-tools"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-success">
            <div class="inner">
              <h3>${{ reports.profit.toFixed(2) }}</h3>

              <p>Profit</p>
            </div>
            <div class="icon">
              <i class="fas fa-money-bill"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
      </div>

      <div class="row">
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-danger">
            <div class="inner">
              <h3>${{ reports.technician_commission.toFixed(2) }}</h3>

              <p>Technician Commission</p>
            </div>
            <div class="icon">
              <i class="fas fa-percent"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-info">
            <div class="inner">
              <h3>${{ reports.general_manager_commission.toFixed(2) }}</h3>

              <p>GM Commission</p>
            </div>
            <div class="icon">
              <i class="fas fa-user-tie"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-success">
            <div class="inner">
              <h3>${{ reports.operational_manager_commission.toFixed(2) }}</h3>

              <p>OM Commission</p>
            </div>
            <div class="icon">
              <i class="fas fa-user-tie"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-warning">
            <div class="inner">
              <h3>${{ reports.sales_commission.toFixed(2) }}</h3>

              <p>Sales Commission</p>
            </div>
            <div class="icon">
              <i class="fas fa-percent"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
      </div>

      <hr>

      <div class="row">
        <div class="col-lg-3 col-6" v-for="(company, i) in companies" :key="'company_'+i">
          <!-- small card -->
          <div class="small-box bg-dark">
            <div class="inner">
              <h3>{{ company.job_count }}</h3>

              <p>{{ company.name }}</p>
            </div>
            <div class="icon">
              <i class="fas fa-building"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
      </div>

      <hr>

      <div class="row">
        <div class="col-lg-3 col-6" v-for="(truck, i) in trucks" :key="'truck_'+i">
          <!-- small card -->
          <div class="small-box bg-blue">
            <div class="inner">
              <h3>{{ truck.job_count }}</h3>

              <p>{{ truck.name }}</p>
            </div>
            <div class="icon">
              <i class="fas fa-truck-pickup"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
      </div>

      <hr>

      <div class="row">
        <div class="col-lg-3 col-6" v-for="(machine, i) in machines" :key="'machine_'+i">
          <!-- small card -->
          <div class="small-box bg-cyan">
            <div class="inner">
              <h3>{{ machine.job_count }}</h3>

              <p>{{ machine.name }}</p>
            </div>
            <div class="icon">
              <i class="fas fa-tools"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      reports: null,
      trucks: [],
      machines: [],
      companies: [],
      filters: {
        date: ''
      },
    }
  },
  mounted() {
    let start = window.moment().startOf('week');
    let end = window.moment();
    let self = this;

    window.$('#entry-date-range').daterangepicker(
      {
        autoUpdateInput: false,
        startDate: start,
        endDate: end,
        locale: {
          cancelLabel: 'Clear',
          format: 'MMM D, YYYY'
        },
        ranges: {
          'This Week': [window.moment().startOf('week'), window.moment()],
          'Last Week': [window.moment().subtract(7, 'days').startOf('week'), window.moment().subtract(7, 'days').endOf('week')],
          'Last 30 Days': [window.moment().subtract(29, 'days'), window.moment()],
          'This Month': [window.moment().startOf('month'), window.moment().endOf('month')],
          'Last Month': [window.moment().subtract(1, 'month').startOf('month'), window.moment().subtract(1, 'month').endOf('month')]
        }
      },
      function (start, end) {
        self.changeDateRange(start, end);
      }
    )

    this.changeDateRange(start, end);
  },
  methods: {
    loadData() {
      this.axios.get('reports', {
          params: this.filters
        })
        .then((response) => {
          this.reports = response.data.data;
        })

      this.axios.get('reports/trucks', {
          params: this.filters
        })
        .then((response) => {
          this.trucks = response.data.data;
        })

      this.axios.get('reports/machines', {
          params: this.filters
        })
        .then((response) => {
          this.machines = response.data.data;
        })

      this.axios.get('reports/companies', {
          params: this.filters
        })
        .then((response) => {
          this.companies = response.data.data;
        })
    },
    changeDateRange(start, end) {
      window.$('#entry-date-range span').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
      this.filters.date = start.format('YYYY-MM-DD') + '/' + end.format('YYYY-MM-DD')

      this.loadData();
    }
  }
}
</script>
<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-8">
          <h1 class="m-0">Technician</h1>
        </div><!-- /.col -->
        <div class="col-sm-4">
          <select class="form-control"
                  @change="loadData"
                  v-model="filters.technician">
            <option value="">Select Technician</option>
            <option :value="technician.id"
                    v-for="technician in technicians"
                    :key="'tech_'+technician.id">{{ technician.name }}</option>
          </select>
        </div>
      </div><!-- /.row -->
    </div><!-- /.container-fluid -->
  </div>
  <!-- /.content-header -->

  <section class="content">
    <div class="container-fluid">
      <div class="row" v-if="report">
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-info">
            <div class="inner">
              <h3>{{ report.wow_wallet }}</h3>

              <div class="row">
                <div class="col-md-6">
                  <p style="margin: 0">Wow Wallet</p>
                </div>
                <div class="col-md-6 text-right">
                  <h5 style="margin: 0; font-weight: bold">YTD: ${{ report.wow_ytd }}</h5>
                </div>
              </div>
            </div>
            <div class="icon">
              <i class="far fa-surprise"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-success">
            <div class="inner">
              <h3>{{ report.tip_wallet }}</h3>

              <div class="row">
                <div class="col-md-6">
                  <p style="margin: 0">Tip Wallet</p>
                </div>
                <div class="col-md-6 text-right">
                  <h5 style="margin: 0; font-weight: bold">YTD: ${{ report.tip_ytd }}</h5>
                </div>
              </div>
            </div>
            <div class="icon">
              <i class="fas fa-hand-holding-usd"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-gradient-blue">
            <div class="inner">
              <h3>{{ report.commission_wallet }}</h3>

              <div class="row">
                <div class="col-md-6">
                  <p style="margin: 0">COMM Wallet</p>
                </div>
                <div class="col-md-6 text-right">
                  <h5 style="margin: 0; font-weight: bold">YTD: ${{ report.commission_ytd }}</h5>
                </div>
              </div>
            </div>
            <div class="icon">
              <i class="fas fa-dollar-sign"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-danger">
            <div class="inner">
              <h3>{{ report.job }}</h3>

              <div class="row">
                <div class="col-md-6">
                  <p style="margin: 0">Job</p>
                </div>
                <div class="col-md-6 text-right">
                  <h5 style="margin: 0; font-weight: bold">YTD: {{ report.job_ytd }}</h5>
                </div>
              </div>
            </div>
            <div class="icon">
              <i class="fas fa-briefcase"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
      </div>

      <div class="row mb-4" v-show="report">
        <div class="col-sm-8"></div><!-- /.col -->
        <div class="col-sm-4">
          <div id="entry-date-range" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%">
            <i class="fa fa-calendar"></i>&nbsp;
            <span></span> <i class="fa fa-caret-down"></i>
          </div>
        </div>
      </div><!-- /.row -->

      <div class="row" v-if="goalReport">
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box custom-widget"  @click.prevent="showDetails('Wow')">
            <div class="inner">
              <h3 :class="['text-center', {'text-danger': goalReport.wows_actual - goalReport.wows_goal < 0}, {'text-success': goalReport.wows_actual - goalReport.wows_goal > 0}]">{{ goalReport.wows_actual - goalReport.wows_goal }}</h3>

              <div class="row">
                <div class="col-md-6">
                  <h5 style="margin: 0; font-weight: bold">{{ goalReport.wows_actual }}</h5>
                </div>
                <div class="col-md-6 text-right">
                  <h5 style="margin: 0; font-weight: bold">{{ goalReport.wows_goal }}</h5>
                </div>
              </div>
            </div>
            <div class="icon">
              <i class="far fa-surprise"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box custom-widget" @click.prevent="showDetails('Production')">
            <div class="inner">
              <h3 :class="['text-center', {'text-danger': goalReport.production_actual - goalReport.production_goal < 0}, {'text-success': goalReport.production_actual - goalReport.production_goal > 0}]">${{ goalReport.production_actual - goalReport.production_goal }}</h3>

              <div class="row">
                <div class="col-md-6">
                  <h5 style="margin: 0; font-weight: bold">${{ goalReport.production_actual }}</h5>
                </div>
                <div class="col-md-6 text-right">
                  <h5 style="margin: 0; font-weight: bold">${{ goalReport.production_goal }}</h5>
                </div>
              </div>
            </div>
            <div class="icon">
              <i class="fas fa-dollar-sign"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box custom-widget" @click.prevent="showDetails('SC')">
            <div class="inner">
              <h3 :class="['text-center', {'text-danger': goalReport.sc_actual - goalReport.sc_goal < 0}, {'text-success': goalReport.sc_actual - goalReport.sc_goal > 0}]">{{ (goalReport.sc_actual - goalReport.sc_goal).toFixed(2) }}</h3>

              <div class="row">
                <div class="col-md-6">
                  <h5 style="margin: 0; font-weight: bold">{{ goalReport.sc_actual.toFixed(2) }}</h5>
                </div>
                <div class="col-md-6 text-right">
                  <h5 style="margin: 0; font-weight: bold">{{ goalReport.sc_goal.toFixed(2) }}</h5>
                </div>
              </div>
            </div>
            <div class="icon">
              <i class="fas fa-star"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box custom-widget" @click.prevent="showDetails('Job')">
            <div class="inner">
              <h3 :class="['text-center', {'text-danger': goalReport.job_actual - goalReport.job_goal < 0}, {'text-success': goalReport.job_actual - goalReport.job_goal > 0}]">{{ (goalReport.job_actual - goalReport.job_goal) }}</h3>

              <div class="row">
                <div class="col-md-6">
                  <h5 style="margin: 0; font-weight: bold">{{ goalReport.job_actual }}</h5>
                </div>
                <div class="col-md-6 text-right">
                  <h5 style="margin: 0; font-weight: bold">{{ goalReport.job_goal }}</h5>
                </div>
              </div>
            </div>
            <div class="icon">
              <i class="fas fa-briefcase"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
      </div>
    </div>
  </section>

  <report-modal-component></report-modal-component>
</template>

<script>
import ReportModalComponent from '@/components/ReportModalComponent';
export default {
  components: {ReportModalComponent},
  data() {
    return {
      report: null,
      goalReport: null,
      technicians: [],
      reportFilter: {
        date: ''
      },
      filters: {
        technician: ''
      },
    }
  },
  created() {
    this.axios.get('/technicians')
      .then((response) => {
        this.technicians = response.data.data
      })
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
    showDetails(type) {
      this.$store.commit('report/setTitle', type + ' (' + window.$('#entry-date-range span').html() + ')')
      this.$store.commit('report/setType', type);
      this.$store.commit('report/setJobs', []);

      let myModal = new window.bootstrap.Modal(document.getElementById('report-modal'));
      myModal.show();

      this.axios.get('reports/jobs', {
          params: {...this.reportFilter, ...{type, technician_id: this.filters.technician}}
        })
        .then((response) => {
          this.$store.commit('report/setJobs', response.data.data)
        })
    },
    loadData() {
      this.report = null;

      if (this.filters.technician !== '') {
        this.axios.get('reports/technician-wallet', {
            params: this.filters
          })
          .then((response) => {
            this.report = response.data.data;
            this.loadGoalReport();
          })
      }
    },
    loadGoalReport() {
      this.goalReport = null;

      if (this.filters.technician !== '') {
        this.axios.get('reports/technician-goal/' + this.filters.technician, {
            params: this.reportFilter
          })
          .then((response) => {
            this.goalReport = response.data.data;
          })
      }
    },
    changeDateRange(start, end) {
      window.$('#entry-date-range span').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
      this.reportFilter.date = start.format('YYYY-MM-DD') + '/' + end.format('YYYY-MM-DD')

      this.loadGoalReport();
    }
  }
}
</script>
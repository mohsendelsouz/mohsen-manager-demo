<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-8">
          <h1 class="m-0">Company Report</h1>
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
    <div class="container-fluid" v-if="reports.length">

      <div class="card" v-for="company in reports" :key="'company_'+company.id">
        <div class="card-header">
          <h3 class="card-title">{{ company.name }}</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-lg-3 col-6">
              <!-- small card -->
              <div class="small-box custom-widget">
                <div class="inner">
                  <h3 :class="['text-center', {'text-danger': company.wows_actual - company.wows_goal < 0}, {'text-success': company.wows_actual - company.wows_goal > 0}]">{{ company.wows_actual - company.wows_goal }}</h3>

                  <div class="row">
                    <div class="col-md-6">
                      <h5 style="margin: 0; font-weight: bold">{{ company.wows_actual }}</h5>
                    </div>
                    <div class="col-md-6 text-right">
                      <h5 style="margin: 0; font-weight: bold">{{ company.wows_goal }}</h5>
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
              <div class="small-box custom-widget">
                <div class="inner">
                  <h3 :class="['text-center', {'text-danger': company.production_actual - company.production_goal < 0}, {'text-success': company.production_actual - company.production_goal > 0}]">${{ company.production_actual - company.production_goal }}</h3>

                  <div class="row">
                    <div class="col-md-6">
                      <h5 style="margin: 0; font-weight: bold">${{ company.production_actual }}</h5>
                    </div>
                    <div class="col-md-6 text-right">
                      <h5 style="margin: 0; font-weight: bold">${{ company.production_goal }}</h5>
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
              <div class="small-box custom-widget">
                <div class="inner">
                  <h3 :class="['text-center', {'text-danger': company.job_actual - company.job_goal < 0}, {'text-success': company.job_actual - company.job_goal > 0}]">{{ (company.job_actual - company.job_goal) }}</h3>

                  <div class="row">
                    <div class="col-md-6">
                      <h5 style="margin: 0; font-weight: bold">{{ company.job_actual }}</h5>
                    </div>
                    <div class="col-md-6 text-right">
                      <h5 style="margin: 0; font-weight: bold">{{ company.job_goal }}</h5>
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
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      reports: [],
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
      this.axios.get('/reports/companies-goal', {
          params: this.filters
        })
        .then((response) => {
          this.reports = response.data.data;
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
<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-8">
          <h1 class="m-0">Charity Reports</h1>
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
    <div class="container-fluid" v-if="charities.length">
      <div class="row">
        <div class="col-lg-3 col-6" v-for="charity in charities" :key="'charity_'+charity.id">
          <!-- small card -->
          <div class="small-box bg-info">
            <div class="inner">
              <h3>${{ charity.total_amount }}</h3>

              <p>{{ charity.name }}</p>
            </div>
            <div class="icon">
              <i class="fas fa-hand-holding-heart"></i>
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
      charities: [],
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
      this.axios.get('reports/charities', {
          params: this.filters
        })
        .then((response) => {
          this.charities = response.data.data;
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
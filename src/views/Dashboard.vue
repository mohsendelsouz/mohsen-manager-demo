<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Dashboard</h1>
        </div><!-- /.col -->
      </div><!-- /.row -->
    </div><!-- /.container-fluid -->
  </div>
  <!-- /.content-header -->

  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-info">
            <div class="inner">
              <h3>{{ topWidget.technician }}</h3>

              <p>Technician</p>
            </div>
            <div class="icon">
              <i class="fas fa-users"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-success">
            <div class="inner">
              <h3>{{ topWidget.truck }}</h3>

              <p>Truck</p>
            </div>
            <div class="icon">
              <i class="fas fa-truck-pickup"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-danger">
            <div class="inner">
              <h3>{{ topWidget.machine }}</h3>

              <p>Machine</p>
            </div>
            <div class="icon">
              <i class="fas fa-tools"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-gradient-blue">
            <div class="inner">
              <h3>{{ topWidget.job }}</h3>

              <p>Job</p>
            </div>
            <div class="icon">
              <i class="fas fa-briefcase"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header border-0">
              <div class="d-flex justify-content-between">
                <h3 class="card-title">Last 6 months sales</h3>
              </div>
            </div>
            <div class="card-body">
              <div class="position-relative mb-4"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                <canvas id="sales-chart" height="400" style="display: block; height: 200px; width: 532px;" width="1064" class="chartjs-render-monitor"></canvas>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-header border-0">
              <div class="d-flex justify-content-between">
                <h3 class="card-title">Last 6 months job count</h3>
              </div>
            </div>
            <div class="card-body">
              <div class="position-relative mb-4">
                <canvas id="job-count-chart" height="200"></canvas>
              </div>
            </div>
          </div>
          <!-- /.card -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      salesChart: null,
      jobCountChart: null,
      topWidget: {
        technician: '0',
        truck: '0',
        machine: '0',
        job: 0
      }
    }
  },
  created() {
    this.axios.get('/top-widgets')
      .then((response) => {
        this.topWidget = response.data.data;
      })
  },
  mounted() {
    this.axios.get('/sales-chart')
      .then((response) => {
        this.salesChart = response.data.data;
        this.loadSalesChart();
      })

    this.axios.get('/job-count-chart')
      .then((response) => {
        this.jobCountChart = response.data.data;
        this.loadJobCountChart();
      })
  },
  methods: {
    loadSalesChart() {
      let ticksStyle = {
        fontColor: '#495057',
        fontStyle: 'bold'
      }

      let mode = 'index'
      let intersect = true
      let self = this;

      let $salesChart = window.$('#sales-chart')
      // eslint-disable-next-line no-unused-vars
      let salesChart = new window.Chart($salesChart, {
        type: 'bar',
        data: {
          labels: self.salesChart.labels,
          datasets: [
            {
              backgroundColor: '#007bff',
              borderColor: '#007bff',
              data: self.salesChart.data
            },
          ]
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            mode: mode,
            intersect: intersect
          },
          hover: {
            mode: mode,
            intersect: intersect
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              // display: false,
              gridLines: {
                display: true,
                lineWidth: '4px',
                color: 'rgba(0, 0, 0, .2)',
                zeroLineColor: 'transparent'
              },
              ticks: window.$.extend({
                beginAtZero: true,

                // Include a dollar sign in the ticks
                callback: function (value) {
                  if (value >= 1000) {
                    value /= 1000
                    value += 'k'
                  }

                  return '$' + value
                }
              }, ticksStyle)
            }],
            xAxes: [{
              display: true,
              gridLines: {
                display: false
              },
              ticks: ticksStyle
            }]
          }
        }
      })
    },
    loadJobCountChart() {
      let ticksStyle = {
        fontColor: '#495057',
        fontStyle: 'bold'
      }

      let mode = 'index'
      let intersect = true
      let self = this;

      let $visitorsChart = window.$('#job-count-chart')
      // eslint-disable-next-line no-unused-vars
      let visitorsChart = new window.Chart($visitorsChart, {
        data: {
          labels: self.jobCountChart.labels,
          datasets: [{
            type: 'line',
            data: self.jobCountChart.data,
            backgroundColor: 'transparent',
            borderColor: '#007bff',
            pointBorderColor: '#007bff',
            pointBackgroundColor: '#007bff',
            fill: false
            // pointHoverBackgroundColor: '#007bff',
            // pointHoverBorderColor    : '#007bff'
          }]
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            mode: mode,
            intersect: intersect
          },
          hover: {
            mode: mode,
            intersect: intersect
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              // display: false,
              gridLines: {
                display: true,
                lineWidth: '4px',
                color: 'rgba(0, 0, 0, .2)',
                zeroLineColor: 'transparent'
              },
              ticks: window.$.extend({
                beginAtZero: true,
              }, ticksStyle)
            }],
            xAxes: [{
              display: true,
              gridLines: {
                display: false
              },
              ticks: ticksStyle
            }]
          }
        }
      })
    }
  }
}
</script>
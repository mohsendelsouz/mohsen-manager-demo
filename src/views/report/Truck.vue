<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-8">
          <h1 class="m-0">Truck Reports</h1>
        </div><!-- /.col -->
        <div class="col-sm-4">

        </div>
      </div><!-- /.row -->
    </div><!-- /.container-fluid -->
  </div>
  <!-- /.content-header -->

  <section class="content">
    <div class="container-fluid" v-if="trucks.length">

      <div class="card" v-for="truck in trucks" :key="'truck_'+truck.id">
        <div class="card-header">
          <h3 class="card-title">{{ truck.name }}</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-lg-3 col-6">
              <!-- small card -->
              <div class="small-box custom-widget">
                <div class="inner">
                  <h3 class="text-center">${{ truck.total_amount }}</h3>

                  <div class="row">
                    <div class="col-md-6">
                      <h5 style="margin: 0; font-weight: bold">
                        <i class="fas fa-briefcase text-muted"></i>
                        {{ truck.total_job }}
                      </h5>
                    </div>
                    <div class="col-md-6 text-right">
                      <h5 style="margin: 0; font-weight: bold"></h5>
                    </div>
                  </div>
                </div>
                <div class="icon">
                  <i class="fas fa-briefcase"></i>
                </div>
              </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-4 col-6">
              <!-- small card -->
              <div class="small-box custom-widget">
                <div class="inner">
                  <h3 class="text-center">${{ truck.total_maintenance }}</h3>

                  <div class="row">
                    <div class="col-md-4">
                      <h5 style="margin: 0; font-weight: bold">
                        <i class="fas fa-gas-pump text-muted"></i>
                        ${{ truck.total_maintenance_gas }}
                      </h5>
                    </div>
                    <div class="col-md-4 text-center">
                      <h5 style="margin: 0; font-weight: bold">
                        <i class="fas fa-tools text-muted"></i>
                        ${{ truck.total_maintenance_service }}
                      </h5>
                    </div>
                    <div class="col-md-4 text-right">
                      <h5 style="margin: 0; font-weight: bold">
                        <i class="fas fa-paper-plane text-muted"></i>
                        ${{ truck.total_maintenance_supply }}
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="icon">
                  <i class="fas fa-money-bill-wave"></i>
                </div>
              </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
              <!-- small card -->
              <div class="small-box custom-widget">
                <div class="inner">
                  <h3 class="text-center">&nbsp;</h3>

                  <div class="row">
                    <div class="col-md-6">
                      <h5 style="margin: 0; font-weight: bold">
                        <i class="fas fa-truck-pickup text-muted"></i>
                        ${{ truck.total_maintenance_gas }}
                      </h5>
                    </div>
                    <div class="col-md-6 text-right">
                      <h5 style="margin: 0; font-weight: bold">
                        <i class="fas fa-tractor text-muted"></i>
                        {{ truck.total_machine_gas }}
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="icon">
                  <i class="fas fa-gas-pump"></i>
                </div>
              </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-2 col-6">
              <!-- small card -->
              <div class="small-box custom-widget">
                <div class="inner">
                  <h3 class="text-center">${{ truck.total_profit }}</h3>

                  <div class="row">
                    <div class="col-md-12 text-center">
                      <h5 style="margin: 0; font-weight: bold">Profit</h5>
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
                  <h3 class="text-center">{{ truck.millage }}</h3>

                  <div class="row">
                    <div class="col-md-12">
                      <h5 style="margin: 0">
                        Current Millage
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="icon">
                  <i class="fas fa-road"></i>
                </div>
              </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
              <!-- small card -->
              <div class="small-box custom-widget">
                <div class="inner">
                  <h3 class="text-center">{{ truck.next_inspection }}</h3>

                  <div class="row">
                    <div class="col-md-12">
                      <h5 style="margin: 0">
                        Next Inspection
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="icon">
                  <i class="fas fa-check"></i>
                </div>
              </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
              <!-- small card -->
              <div class="small-box custom-widget">
                <div class="inner">
                  <h3 class="text-center">{{ truck.next_regular_maintenance }}</h3>

                  <div class="row">
                    <div class="col-md-12">
                      <h5 style="margin: 0">
                        Regular Main. After (Millage)
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="icon">
                  <i class="fas fa-hammer"></i>
                </div>
              </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
              <!-- small card -->
              <div class="small-box custom-widget">
                <div class="inner">
                  <h3 class="text-center">{{ truck.next_major_maintenance }}</h3>

                  <div class="row">
                    <div class="col-md-12">
                      <h5 style="margin: 0">
                        Major Main. After (Millage)
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="icon">
                  <i class="fas fa-tools"></i>
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
      trucks: []
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.axios.get('/reports/truck/details')
        .then(response => {
          this.trucks = response.data.data;
        })
    }
  }
}
</script>
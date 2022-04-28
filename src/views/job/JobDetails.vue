<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Job Details</h1>
        </div><!-- /.col -->
      </div><!-- /.row -->
    </div><!-- /.container-fluid -->
  </div>
  <!-- /.content-header -->

  <section class="content">
    <div class="container-fluid" v-if="job">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Job Information</h3>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-sm table-hover table-bordered table-striped">
                  <tr>
                    <th>Date</th>
                    <td>{{ job.date }}</td>
                    <th>Company</th>
                    <td>{{ job.company.name }}</td>
                  </tr>
                  <tr>
                    <th>Invoice No.</th>
                    <td>{{ job.invoice_no }}</td>
                    <th>Truck</th>
                    <td>{{ job.truck.name }}</td>
                  </tr>
                  <tr>
                    <th>Client</th>
                    <td>{{ job.client }}</td>
                    <th>Payment Method</th>
                    <td>{{ job.payment_method }}</td>
                  </tr>
                  <tr>
                    <th>Payment Received At</th>
                    <td>{{ job.payment_received_at }}</td>
                    <th>Truck Technician</th>
                    <td>{{ job.truck_technician.name }}</td>
                  </tr>
                  <tr>
                    <th>Sales Person</th>
                    <td>{{ job.sales_person ? job.sales_person.name : '' }}</td>
                    <th>Machine</th>
                    <td>{{ job.machine.name }}</td>
                  </tr>
                  <tr>
                    <th>Operational Manager</th>
                    <td>{{ job.operational_manager.name }}</td>
                    <th>General Manager</th>
                    <td>{{ job.general_manager.name }}</td>
                  </tr>
                  <tr v-if="job.all_wows.length">
                    <th colspan="5" class="text-center">Wows</th>
                  </tr>
                  <tr v-for="wow in job.all_wows" :key="'wow_'+wow.id">
                    <th>{{ wow.type }}</th>
                    <td colspan="4">{{ wow.review }}</td>
                  </tr>
                  <tr v-if="job.referral">
                    <th colspan="5" class="text-center">Referral</th>
                  </tr>
                  <tr v-if="job.referral">
                    <th>Name</th>
                    <td>{{ job.referral.first_name + ' ' + job.referral.last_name }}</td>
                    <th>Email</th>
                    <td>{{ job.referral.email }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Technicians</h3>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-sm table-hover table-bordered">
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Commission (%)</th>
                    <th>Wow</th>
                    <th>Tip</th>
                    <th>Reliable</th>
                    <th>Team Player</th>
                    <th>Integrity</th>
                    <th>Great Communicator</th>
                    <th>Proactive</th>
                    <th>AVG SC</th>
                  </tr>
                  </thead>

                  <tbody>
                  <tr v-for="(technician, i) in job.technicians" :key="'technician_'+i">
                    <td>{{ technician.technician.name }}</td>
                    <td>{{ technician.default_percentage }}</td>
                    <td>{{ technician.wow }}</td>
                    <td>{{ technician.tip }}</td>
                    <td>{{ technician.reliable }}</td>
                    <td>{{ technician.team_player }}</td>
                    <td>{{ technician.integrity }}</td>
                    <td>{{ technician.great_communicator }}</td>
                    <td>{{ technician.proactive }}</td>
                    <td class="text-warning">
                      <i class="fas fa-star"
                         v-for="r in parseInt(technician.avg_sc)"
                         :key="'star_'+r"></i>
                      <i class="fas fa-star-half-alt"
                         v-if="!Number.isInteger(technician.avg_sc)"
                         :key="'star_'"></i>
                      <i class="far fa-star"
                         v-for="r in parseInt(5-technician.avg_sc)"
                         :key="'star_'+r"></i>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Financial Information</h3>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-sm table-hover table-bordered table-striped">
                  <tr>
                    <th>Amount</th>
                    <td>${{ job.amount }}</td>
                  </tr>
                  <tr>
                    <th>Charity Donate</th>
                    <td>${{ job.charity_donate }}</td>
                  </tr>
                  <tr>
                    <th>Referral</th>
                    <td>${{ job.referral_amount }}</td>
                  </tr>
                  <tr>
                    <th>Tip</th>
                    <td>${{ job.tip }}</td>
                  </tr>
                  <tr>
                    <th>Wow</th>
                    <td>${{ job.wows }}</td>
                  </tr>
                  <tr>
                    <th>Technician Commission</th>
                    <td>${{ job.technician_commission }}</td>
                  </tr>
                  <tr>
                    <th>Sales Commission</th>
                    <td>${{ job.sales_commission }}</td>
                  </tr>
                  <tr>
                    <th>Operational Manager Commission</th>
                    <td>${{ job.operational_manager_commission }}</td>
                  </tr>
                  <tr>
                    <th>General Manager Commission</th>
                    <td>${{ job.general_manager_commission }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Transactions</h3>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-sm table-hover table-bordered">
                  <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Amount</th>
                  </tr>
                  </thead>

                  <tbody>
                  <tr v-for="(transaction, i) in job.transactions" :key="'transaction_'+i">
                    <td>{{ transaction.date }}</td>
                    <td>{{ transaction.type }}</td>
                    <td>{{ transaction.user ? transaction.user.name : '' }}</td>
                    <td>${{ transaction.amount }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
      job: null
    }
  },
  created() {
    this.axios.get('/jobs/'+this.$route.params.id)
      .then((response) => {
        this.job = response.data.data;
      })
  }
}
</script>
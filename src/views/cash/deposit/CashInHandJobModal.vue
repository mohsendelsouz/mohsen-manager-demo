<template>
  <div class="modal fade" id="technician-hand-modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Technician Hand</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>Invoice No.</th>
              <th>Client</th>
              <th>Amount</th>
              <th>Technician Name</th>
            </tr>
            </thead>

            <tbody>
            <template v-for="job in jobs" :key="'job_'+job.id">
              <tr>
                <td :rowspan="job.technicians.length">{{ job.invoice_no }}</td>
                <td :rowspan="job.technicians.length">{{ job.client }}</td>
                <td :rowspan="job.technicians.length">${{ job.amount }}</td>
                <td>{{ job.technicians[0].technician.name }}</td>
              </tr>

              <template v-for="(technician, i) in job.technicians" :key="'technician_'+i">
                <tr v-if="i">
                  <td>{{ technician.technician.name }}</td>
                </tr>
              </template>

            </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    jobs: Array
  }
}
</script>
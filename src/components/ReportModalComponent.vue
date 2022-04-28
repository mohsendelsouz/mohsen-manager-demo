<template>
  <div class="modal fade" id="report-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <table class="table table-bordered table-sm">
            <thead>
            <tr>
              <th>Date</th>
              <th>Company</th>
              <th>Invoice No.</th>
              <th>Client</th>
              <th v-if="type === 'Wow'">Wow</th>
              <th v-if="type === 'Production'">Production</th>
              <th v-if="type === 'SC'">Scorecard</th>
              <th v-if="type === 'SC'">Comment</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(job, i) in jobs.filter(j => type !== 'SC' || j.technicians[0].avg_sc !== 0)" :key="'rj_'+i">
              <td>{{ job.date }}</td>
              <td>{{ job.company.name }}</td>
              <td>{{ job.invoice_no }}</td>
              <td>{{ job.client }}</td>
              <td v-if="type === 'Wow'" class="p-0">
                <table class="table table-sm p-0" style="margin-bottom: 0">
                  <tbody>
                  <tr v-for="wow in job.all_wows" :key="'wow_'+wow.id">
                    <th width="40%">{{ wow.type }}</th>
                    <td>{{ wow.review }}</td>
                  </tr>
                  </tbody>
                </table>
              </td>
              <td v-if="type === 'Production'">${{ job.technicians[0].commission }}</td>
              <td v-if="type === 'SC'">{{ job.technicians[0].avg_sc }}</td>
              <td v-if="type === 'SC'">{{ job.technicians[0].comment }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      title: 'report/getTitle',
      jobs: 'report/getJobs',
      type: 'report/getType',
    })
  },
}
</script>
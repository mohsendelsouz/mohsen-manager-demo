<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Job</h1>
        </div><!-- /.col -->
      </div><!-- /.row -->
    </div><!-- /.container-fluid -->
  </div>
  <!-- /.content-header -->

  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header d-flex justify-content-end">
              <router-link class="btn btn-sm btn-success" :to="{name: 'jobs_add'}">
                <i class="fas fa-plus"></i> Add Job
              </router-link>
            </div>
            <div class="card-body">
              <table-component
                :columns="columns"
                :rows="jobs"
                :sortable="sortable"
                @sorting="sorting"
                :pagination="pagination"
                @search="search"
                @pageChanged="pageChanged">

                <template v-slot:action="{ row }">
                  <a type="button"
                     class="btn btn-sm btn-success mr-1"
                     v-if="!row.amount"
                     title="Pay"
                     @click.prevent="payJob(row)">
                    <i class="fas fa-money-bill"></i>
                  </a>

                  <a type="button"
                     class="btn btn-sm btn-dark mr-1"
                     v-if="!row.tip"
                     title="Tip"
                     @click.prevent="tip(row)">
                    <i class="fab fa-gratipay"></i>
                  </a>

                  <a type="button"
                     class="btn btn-sm btn-warning mr-1"
                     title="Scorecard"
                     @click.prevent="sc(row)">
                    <i class="fas fa-star"></i>
                  </a>

                  <a type="button"
                     class="btn btn-sm btn-success mr-1"
                     title="Wow"
                     @click.prevent="wow(row)">
                    <i class="far fa-smile"></i>
                  </a>

                  <a type="button"
                     v-if="row.payment_method === 'Cash' && !row.manager_received"
                     class="btn btn-sm btn-secondary mr-1"
                     title="Cash Received"
                     @click.prevent="cashReceived(row)">
                    <i class="fas fa-donate"></i>
                  </a>

                  <router-link type="button"
                               :to="{name: 'jobs_details', params: {id: row.id}}"
                               title="View Details"
                               class="btn btn-sm btn-info mr-1">
                    <i class="fas fa-eye"></i>
                  </router-link>

                  <router-link :to="{name: 'jobs_edit', params: {id: row.id}}"
                               v-if="!row.tip && !row.amount"
                               title="Edit"
                               class="btn btn-sm btn-warning mr-1">
                    <i class="fas fa-edit"></i>
                  </router-link>

                  <a type="button"
                     class="btn btn-sm btn-danger"
                     title="Delete"
                     @click.prevent="deleteData(row)">
                    <i class="fas fa-trash"></i>
                  </a>
                </template>
              </table-component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="modal fade" id="modal-sc">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Scoreboard</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <table class="table table-sm table-bordered" v-if="formSc">
            <template v-for="t in formSc" :key="'t_'+t.id">
              <tr >
                <th class="text-center text-primary" colspan="2">{{ t.name }}</th>
              </tr>
              <tr>
                <th>Reliable</th>
                <td class="text-center text-warning">
                  <i class="fas fa-star"
                     v-for="r in t.reliable"
                     :key="'reliable_'+r"
                     @click="changeSc(t.id, 'reliable', r)"></i>
                  <i class="far fa-star"
                     v-for="r in 5-t.reliable"
                     :key="'reliable_'+r"
                     @click="changeSc(t.id, 'reliable',  t.reliable + r)"></i>
                </td>
              </tr>
              <tr>
                <th>Team Player</th>
                <td class="text-center text-warning">
                  <i class="fas fa-star"
                     v-for="r in t.team_player"
                     :key="'team_player_'+r"
                     @click="changeSc(t.id, 'team_player', r)"></i>
                  <i class="far fa-star"
                     v-for="r in 5-t.team_player"
                     :key="'team_player_'+r"
                     @click="changeSc(t.id, 'team_player',  t.team_player + r)"></i>
                </td>
              </tr>
              <tr>
                <th>Integrity</th>
                <td class="text-center text-warning">
                  <i class="fas fa-star"
                     v-for="r in t.integrity"
                     :key="'integrity_'+r"
                     @click="changeSc(t.id, 'integrity', r)"></i>
                  <i class="far fa-star"
                     v-for="r in 5-t.integrity"
                     :key="'integrity_'+r"
                     @click="changeSc(t.id, 'integrity',  t.integrity + r)"></i>
                </td>
              </tr>
              <tr>
                <th>Great Communicator</th>
                <td class="text-center text-warning">
                  <i class="fas fa-star"
                     v-for="r in t.great_communicator"
                     :key="'great_communicator_'+r"
                     @click="changeSc(t.id, 'great_communicator', r)"></i>
                  <i class="far fa-star"
                     v-for="r in 5-t.great_communicator"
                     :key="'great_communicator_'+r"
                     @click="changeSc(t.id, 'great_communicator',  t.great_communicator + r)"></i>
                </td>
              </tr>
              <tr>
                <th>Proactive</th>
                <td class="text-center text-warning">
                  <i class="fas fa-star"
                     v-for="r in t.proactive"
                     :key="'proactive_'+r"
                     @click="changeSc(t.id, 'proactive', r)"></i>
                  <i class="far fa-star"
                     v-for="r in 5-t.proactive"
                     :key="'proactive_'+r"
                     @click="changeSc(t.id, 'proactive',  t.proactive + r)"></i>
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <input type="text"
                         class="form-control form-control-sm modal-sc-comment"
                         v-model="t.comment"
                         placeholder="Comment">
                </td>
              </tr>
            </template>
          </table>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
          <button type="button"
                  class="btn btn-primary"
                  @click.prevent="submitSc">Save changes</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->

  <div class="modal fade" id="modal-wows">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Wows</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>Type</th>
              <th>Review</th>
              <th>Charity</th>
              <th>Donate Amount</th>
            </tr>
            </thead>

            <tbody>
            <tr>
              <td>Home Stars</td>
              <td>
                <input class="form-control form-control-sm"
                       v-model="formWows.homeStars.review"
                       :disabled="selectedJob && selectedJob.all_wows.find(w => w.type === 'Home Stars')"
                       type="text"
                       placeholder="Review">
              </td>
              <td>
                <select class="form-control form-control-sm"
                        :disabled="!formWows.homeStars.review || (selectedJob && selectedJob.donates.find(w => w.type === 'Home Stars'))"
                        @change="changeCharity('homeStars')"
                        v-model="formWows.homeStars.charity_id">
                  <option value="">Select Charity</option>
                  <option :value="charity.id"
                          v-for="charity in charities"
                          :key="'charity_'+charity.id">{{ charity.name }}</option>
                </select>
              </td>
              <td>
                <input type="text"
                       :disabled="!formWows.homeStars.review || (selectedJob && selectedJob.donates.find(w => w.type === 'Home Stars'))"
                       class="form-control form-control-sm"
                       v-model="formWows.homeStars.donate_amount">
              </td>
            </tr>
            <tr>
              <td>Google Reviews</td>
              <td>
                <input class="form-control form-control-sm"
                       :disabled="selectedJob && selectedJob.all_wows.find(w => w.type === 'Google Reviews')"
                       v-model="formWows.googleReviews.review"
                       type="text"
                       placeholder="Review">
              </td>
              <td>
                <select class="form-control form-control-sm"
                        :disabled="!formWows.googleReviews.review || (selectedJob && selectedJob.donates.find(w => w.type === 'Google Reviews'))"
                        @change="changeCharity('googleReviews')"
                        v-model="formWows.googleReviews.charity_id">
                  <option value="">Select Charity</option>
                  <option :value="charity.id"
                          v-for="charity in charities"
                          :key="'charity_'+charity.id">{{ charity.name }}</option>
                </select>
              </td>
              <td>
                <input type="text"
                       :disabled="!formWows.googleReviews.review || (selectedJob && selectedJob.donates.find(w => w.type === 'Google Reviews'))"
                       class="form-control form-control-sm"
                       v-model="formWows.googleReviews.donate_amount">
              </td>
            </tr>
            <tr :class="{'table-secondary': selectedJob && selectedJob.all_wows.find(w => w.type === '5 Around')}">
              <td>5 Around</td>
              <td>
                <input class="form-control form-control-sm"
                       :disabled="selectedJob && selectedJob.all_wows.find(w => w.type === '5 Around')"
                       v-model="formWows.fiveAround.review"
                       type="text"
                       placeholder="Review">
              </td>
              <td></td>
              <td></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
          <button type="button"
                  class="btn btn-primary"
                  @click.prevent="submitWows">Save changes</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
</template>

<script>
import TableComponent from "@/components/TableComponent";
export default {
  components: {TableComponent},
  data() {
    return {
      jobs: [],
      charities: [],
      formSc: null,
      formWows: {
        homeStars: {
          to: '',
          review: '',
          charity_id: '',
          donate_amount: ''
        },
        googleReviews: {
          to: '',
          review: '',
          charity_id: '',
          donate_amount: ''
        },
        fiveAround: {
          to: '',
          review: ''
        },
      },
      selectedJob: null,
      scModal: null,
      wowsModal: null,
      charityModal: null,
      queryParams: {
        search: '',
        search_columns: '',
        page: 1,
        sort: 'date',
        sort_order: 'desc',
        per_page: 10
      },
      sortable: {
        order: 'date',
        sort: 'desc'
      },
      columns: [
        {
          label: "Date",
          field: "date",
          sortable: true,
          searchable: true,
        },
        {
          label: "Company",
          field: "company.name",
          sortable: true,
          searchable: true,
        },
        {
          label: "Invoice No.",
          field: "invoice_no",
          sortable: true,
          searchable: true,
        },
        {
          label: "Client",
          field: "client",
          sortable: true,
          searchable: true,
        },
        {
          label: "Amount",
          field: "amount",
          sortable: true,
          searchable: true,
          display: function (row) {
            return '$'+row.amount;
          }
        },
        {
          label: "Action",
          field: 'action',
          sortable: false,
          slot: true,
          class: ['text-right']
        }
      ],
      pagination: null,
    }
  },
  created() {
    this.axios.get('/charities')
      .then((response) => {
        this.charities = response.data.data;
      });
    this.loadData();
  },
  methods: {
    loadData() {
      this.jobs = [];

      this.axios.get('/jobs', {params: this.queryParams})
        .then((response) => {
          this.jobs = response.data.data;
          this.pagination = response.data.meta;
        })
    },
    changeSc(id, type, score) {
      this.formSc.find(t => t.id === id)[type] = score;
    },
    sc(job) {
      this.formSc = job.technicians.map(t => (
        {
          id: t.technician.id,
          name: t.technician.name,
          comment: t.comment,
          reliable: t.reliable ? t.reliable : 4,
          team_player: t.team_player ? t.team_player : 4,
          integrity: t.integrity ? t.integrity : 4,
          great_communicator: t.great_communicator ? t.great_communicator : 4,
          proactive: t.proactive ? t.proactive : 4,
        }
      ))

      this.selectedJob = job;
      this.scModal = new window.bootstrap.Modal(document.getElementById('modal-sc'));
      this.scModal.show();

      setTimeout(() => {
        window.$(".modal-sc-comment:eq(0)").focus();
      }, 500);
    },
    submitSc() {
      this.axios.post('/jobs/sc/' + this.selectedJob.id, {technicians: this.formSc})
        .then(() => {
          this.loadData();
          this.scModal.hide();
        })
    },
    wow(job) {
      this.selectedJob = job;
      this.formWows.homeStars.review = '';
      this.formWows.googleReviews.review = '';
      this.formWows.fiveAround.review = '';

      job.all_wows.forEach(wow => {
        if (wow.type === 'Home Stars') {
          this.formWows.homeStars.review = wow.review;
        } else if (wow.type === 'Google Reviews') {
          this.formWows.googleReviews.review = wow.review;
        } else if (wow.type === '5 Around') {
          this.formWows.fiveAround.review = wow.review;
        }
      })

      job.donates.forEach(donate => {
        if (donate.type === 'Home Stars') {
          this.formWows.homeStars.donate_amount = donate.amount;
          this.formWows.homeStars.charity_id = donate.charity_id;
        } else if (donate.type === 'Google Reviews') {
          this.formWows.googleReviews.donate_amount = donate.amount;
          this.formWows.googleReviews.charity_id = donate.charity_id;
        }
      })

      this.wowsModal = new window.bootstrap.Modal(document.getElementById('modal-wows'));
      this.wowsModal.show();

      setTimeout(() => {
        window.$("#modal-wows input:eq(0)").focus();
      }, 500);
    },
    changeCharity(type) {
      if (this.formWows[type].charity_id !== '') {
        this.formWows[type].donate_amount = this.charities.find(c => c.id === this.formWows[type].charity_id).default_amount;
      }
    },
    cashReceived(row) {
      this.$swal({
        title: 'Are you received cash?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: '#dd4b39',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.post('/jobs/manager-received/'+row.id).then(() => {
            this.loadData();
            this.$swal.fire(
              'Received',
              'Cash has been received!',
              'success'
            )
          });
        }
      });
    },
    submitWows() {
      this.axios.post('/jobs/wow/' + this.selectedJob.id, this.formWows)
        .then(() => {
          this.loadData();
          this.wowsModal.hide();
        })
        .catch(() => {})
    },
    payJob(job) {
      this.$swal({
        title: 'Enter job total amount for ' + job.invoice_no,
        input: 'number',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        showLoaderOnConfirm: true,
        preConfirm: (amount) => {
          return this.axios.post('/jobs/pay/' + job.id, {amount})
            .then(() => {})
            .catch(() => {
              this.$swal.showValidationMessage(
                `Sorry! Something went wrong.`
              )
            })
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.loadData();
          this.showSuccessMsg(job.invoice_no + ' Paid');
        }
      })
    },
    tip(job) {
      this.$swal({
        title: 'Enter tip amount for ' + job.invoice_no,
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        showLoaderOnConfirm: true,
        preConfirm: (amount) => {
          return this.axios.post('/jobs/tip/' + job.id, {amount})
            .then(() => {})
            .catch(() => {
              this.$swal.showValidationMessage(
                `Sorry! Something went wrong.`
              )
            })
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.loadData();
          this.showSuccessMsg(job.invoice_no + ' tip paid');
        }
      })
    },
    deleteData(row) {
      this.$swal({
        title: 'Are you sure want to delete?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        confirmButtonColor: '#dd4b39',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete('/jobs/'+row.id).then(() => {
            this.loadData();
            this.$swal.fire(
              'Deleted',
              'Job has been deleted!',
              'success'
            )
          });
        }
      });
    },
  }
}
</script>
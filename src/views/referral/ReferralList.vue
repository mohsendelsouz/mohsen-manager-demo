<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Referrals</h1>
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
            <div class="card-body">
              <table-component
                :columns="columns"
                :rows="referrals"
                :sortable="sortable"
                @sorting="sorting"
                :pagination="pagination"
                @search="search"
                @pageChanged="pageChanged">

                <template v-slot:action="{ row }">
                  <a type="button"
                     class="btn btn-sm btn-success mr-1"
                     v-if="!row.sent"
                     @click.prevent="send(row)">
                    <i class="fas fa-paper-plane"></i>
                  </a>
                </template>

                <template v-slot:sent="{ row }">
                  <span class="badge badge-pill badge-success" v-if="row.sent">Yes</span>
                  <span class="badge badge-pill badge-danger" v-else>No</span>
                </template>
              </table-component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TableComponent from "@/components/TableComponent";
export default {
  components: {TableComponent},
  data() {
    return {
      referrals: [],
      queryParams: {
        search: '',
        search_columns: '',
        page: 1,
        sort: 'job.date',
        sort_order: 'desc',
        per_page: 10
      },
      sortable: {
        order: 'job.date',
        sort: 'desc'
      },
      columns: [
        {
          label: "Date",
          field: "job.date",
          sortable: true,
          searchable: false,
        },
        {
          label: "Invoice No.",
          field: 'job.invoice_no',
          sortable: true,
          searchable: true,
        },
        {
          label: "Job Client",
          field: 'job.client',
          sortable: true,
          searchable: true,
        },
        {
          label: "Name",
          field: 'name',
          sortable: true,
          searchable: true,
        },
        {
          label: "Email",
          field: 'email',
          sortable: true,
          searchable: true,
        },
        {
          label: "Sent Date",
          field: 'date',
          sortable: true,
          searchable: false,
        },
        {
          label: "Amount",
          field: 'amount',
          sortable: true,
          searchable: false,
          display: function(row) {
            return '$'+row.amount;
          }
        },
        {
          label: "Sent",
          field: 'sent',
          sortable: true,
          slot: true,
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
    this.loadData();
  },
  methods: {
    loadData() {
      this.referrals = [];

      this.axios.get('/referrals', {params: this.queryParams})
        .then((response) => {
          this.referrals = response.data.data;
          this.pagination = response.data.meta;
        })
    },
    send(referral) {
      this.$swal({
        title: 'Enter the amount',
        input: 'text',
        inputValue: '50',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        showLoaderOnConfirm: true,
        preConfirm: (amount) => {
          return this.axios.post('/referrals/send/' + referral.id, {amount})
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
          this.showSuccessMsg('Referral Bonus Paid');
        }
      })
    }
  }
}
</script>
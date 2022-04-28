<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Withdrawal</h1>
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
              <router-link class="btn btn-sm btn-success"
                           :to="{name: 'withdrawals_add'}">
                <i class="fas fa-plus"></i> Add Withdrawal
              </router-link>
            </div>

            <div class="card-body">
              <table-component
                :columns="columns"
                :rows="withdrawals"
                :sortable="sortable"
                @sorting="sorting"
                :pagination="pagination"
                @search="search"
                @pageChanged="pageChanged">

                <template v-slot:status="{ row }">
                  <span class="badge badge-pill badge-warning" v-if="row.status === 0">Pending</span>
                  <span class="badge badge-pill badge-success" v-if="row.status === 1">Accepted</span>
                  <span class="badge badge-pill badge-danger" v-if="row.status === 2">Rejected</span>
                </template>

                <template v-slot:action="{ row }">
                  <a type="button"
                     v-if="row.status === 0"
                     class="btn btn-sm btn-success mr-1"
                     @click.prevent="accept(row)">
                    <i class="fas fa-check"></i>
                  </a>
                  <a type="button"
                     v-if="row.status === 0"
                     class="btn btn-sm btn-danger"
                     @click.prevent="reject(row)">
                    <i class="fas fa-times"></i>
                  </a>
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
      withdrawals: [],
      queryParams: {
        search: '',
        search_columns: '',
        page: 1,
        sort: 'created_at',
        sort_order: 'desc',
        per_page: 10
      },
      sortable: {
        order: 'created_at',
        sort: 'desc'
      },
      columns: [
        {
          label: "Date",
          field: "created_at",
          sortable: true,
          searchable: true,
        },
        {
          label: "Technician",
          field: "user.name",
          sortable: true,
          searchable: true,
        },
        {
          label: "Type",
          field: "type",
          sortable: true,
          searchable: true,
        },
        {
          label: "Amount",
          field: "amount",
          sortable: true,
          searchable: true,
          display: function(row) {
            return '-$'+row.amount;
          }
        },
      ],
      pagination: null,
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.machines = [];

      this.axios.get('/withdrawals', {params: this.queryParams})
        .then((response) => {
          this.withdrawals = response.data.data;
          this.pagination = response.data.meta;
        })
    },
    reject(withdrawal) {
      this.$swal({
        title: 'Are you sure want to reject?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, reject it!',
        confirmButtonColor: '#dd4b39',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.post('/withdrawals/'+withdrawal.id+'/reject').then(() => {
            this.loadData();
            this.$swal.fire(
              'Rejected',
              'Withdrawal has been deleted!',
              'success'
            )
          });
        }
      });
    },
    accept(withdrawal) {
      this.$swal({
        title: 'Are you sure want to accept?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, accept it!',
        confirmButtonColor: '#dd4b39',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.post('/withdrawals/'+withdrawal.id+'/accept').then(() => {
            this.loadData();
            this.$swal.fire(
              'Accepted',
              'Withdrawal has been accepted!',
              'success'
            )
          });
        }
      });
    }
  }
}
</script>
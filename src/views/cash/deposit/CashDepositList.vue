<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Cash</h1>
        </div><!-- /.col -->
      </div><!-- /.row -->
    </div><!-- /.container-fluid -->
  </div>
  <!-- /.content-header -->

  <section class="content">
    <div class="container-fluid">
      <div class="row" v-if="report">
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-info" @click.prevent="showTechnicianHandCash">
            <div class="inner">
              <h3>${{ report.technician_hand }}</h3>

              <p>Technician Hand</p>
            </div>
            <div class="icon">
              <i class="fas fa-dollar-sign"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-success">
            <div class="inner">
              <h3>${{ report.manager_hand }}</h3>

              <p>Manager Hand</p>
            </div>
            <div class="icon">
              <i class="fas fa-dollar-sign"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small card -->
          <div class="small-box bg-danger">
            <div class="inner">
              <h3>${{ report.deposit }}</h3>

              <p>Cash Deposit</p>
            </div>
            <div class="icon">
              <i class="fas fa-dollar-sign"></i>
            </div>
          </div>
        </div>
        <!-- ./col -->
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header d-flex justify-content-end">
              <router-link class="btn btn-sm btn-success"
                           :to="{name: 'cash_deposits_add'}">
                <i class="fas fa-plus"></i> Add Deposit
              </router-link>
            </div>
            <div class="card-body">
              <table-component
                :columns="columns"
                :rows="deposits"
                :sortable="sortable"
                @sorting="sorting"
                :pagination="pagination"
                @search="search"
                @pageChanged="pageChanged">

                <template v-slot:action="{ row }">
                  <router-link :to="{name: 'cash_deposits_edit', params: {id: row.id}}"
                               class="btn btn-sm btn-warning mr-1">
                    <i class="fas fa-edit"></i>
                  </router-link>

                  <a type="button"
                     class="btn btn-sm btn-danger"
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

  <cash-in-hand-job-modal :jobs="technicianHandJobs"></cash-in-hand-job-modal>
</template>

<script>
import TableComponent from "@/components/TableComponent";
import CashInHandJobModal from "./CashInHandJobModal";

export default {
  components: {TableComponent, CashInHandJobModal},
  data() {
    return {
      deposits: [],
      report: null,
      technicianHandModal: null,
      technicianHandJobs: [],
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
          label: "Amount",
          field: "amount",
          sortable: true,
          searchable: true,
          display: function (row) {
            return '$'+row.amount;
          }
        },
        {
          label: "Note",
          field: "note",
          sortable: false,
          searchable: true,
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
    this.loadReport();
    this.loadData();
  },
  mounted() {
    this.technicianHandModal = new window.bootstrap.Modal(document.getElementById('technician-hand-modal'));
  },
  methods: {
    showTechnicianHandCash() {
      this.technicianHandModal.show();
    },
    loadReport() {
      this.axios.get('reports/cash')
        .then((response) => {
          this.report = response.data.data

          console.log(response.data.data.jobs);
          this.technicianHandJobs = response.data.data.jobs
        })
    },
    loadData() {
      this.deposits = [];

      this.axios.get('/cash-deposits', {params: this.queryParams})
        .then((response) => {
          this.deposits = response.data.data;
          this.pagination = response.data.meta;
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
          this.axios.delete('/cash-deposits/'+row.id).then(() => {
            this.loadData();
            this.$swal.fire(
              'Deleted',
              'Deposit has been deleted!',
              'success'
            )
          });
        }
      });
    },
  }
}
</script>
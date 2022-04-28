<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">User</h1>
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
                           :to="{name: 'settings_user_add'}">
                <i class="fas fa-plus"></i> Add User
              </router-link>
            </div>
            <div class="card-body">
              <table-component
                :columns="columns"
                :rows="users"
                :sortable="sortable"
                @sorting="sorting"
                :pagination="pagination"
                @search="search"
                @pageChanged="pageChanged">

                <template v-slot:action="{ row }">
                  <router-link :to="{name: 'settings_user_edit', params: {id: row.id}}"
                               class="btn btn-sm btn-warning mr-1">
                    <i class="fas fa-edit"></i>
                  </router-link>

                  <a type="button"
                     class="btn btn-sm btn-danger"
                     @click.prevent="deleteData(row)">
                    <i class="fas fa-trash"></i>
                  </a>
                </template>

                <template v-slot:active="{ row }">
                  <span class="badge badge-pill badge-success" v-if="row.active">Active</span>
                  <span class="badge badge-pill badge-danger" v-else>Inactive</span>
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
      users: [],
      queryParams: {
        search: '',
        search_columns: '',
        page: 1,
        sort: 'name',
        sort_order: 'asc',
        per_page: 10
      },
      sortable: {
        order: 'name',
        sort: 'asc'
      },
      columns: [
        {
          label: "Name",
          field: "name",
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
          label: "Role",
          field: 'role',
          sortable: false,
          searchable: false,
          display: function(row) {
            return row.roles.map(r => r.role).join(', ');
          }
        },
        {
          label: "Active",
          field: 'active',
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
      this.users = [];

      this.axios.get('/users', {params: this.queryParams})
        .then((response) => {
          this.users = response.data.data;
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
          this.axios.delete('/users/'+row.id).then(() => {
            this.loadData();
            this.$swal.fire(
              'Deleted',
              'User has been deleted!',
              'success'
            )
          });
        }
      });
    },
  }
}
</script>
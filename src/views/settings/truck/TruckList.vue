<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Truck</h1>
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
              <button class="btn btn-sm btn-secondary mr-2"
                      @click.prevent="showSetting">
                <i class="fas fa-cog"></i> Settings
              </button>

              <router-link class="btn btn-sm btn-success"
                           :to="{name: 'settings_truck_add'}">
                <i class="fas fa-plus"></i> Add Truck
              </router-link>
            </div>
            <div class="card-body">
              <table-component
                :columns="columns"
                :rows="trucks"
                :sortable="sortable"
                @sorting="sorting"
                :pagination="pagination"
                @search="search"
                @pageChanged="pageChanged">

                <template v-slot:action="{ row }">
                  <button class="btn btn-sm btn-success mr-1"
                          @click.prevent="showInspectionModal(row)"
                          title="Inspection">
                    <i class="fas fa-check"></i>
                  </button>

                  <router-link :to="{name: 'settings_truck_edit', params: {id: row.id}}"
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

  <div class="modal fade" id="modal-truck-setting">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Setting</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Regular Maintenance</label>
            <input type="text"
                   v-model="settingForm.truck_regular_maintenance_millage"
                   :class="['form-control', {'is-invalid': errorFor('truck_regular_maintenance_millage')}]">
            <v-errors :errors="errorFor('truck_regular_maintenance_millage')" />
          </div>

          <div class="mb-3">
            <label class="form-label">Major Maintenance</label>
            <input type="text"
                   v-model="settingForm.truck_major_maintenance_millage"
                   :class="['form-control', {'is-invalid': errorFor('truck_major_maintenance_millage')}]">
            <v-errors :errors="errorFor('truck_major_maintenance_millage')" />
          </div>

          <div class="mb-3">
            <label class="form-label">Inspection</label>
            <select :class="['form-control', {'is-invalid': errorFor('truck_inspection')}]"
                    v-model="settingForm.truck_inspection">
              <option value="">Select Type</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
            <v-errors :errors="errorFor('truck_inspection')" />
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
          <button type="button"
                  @click.prevent="saveSetting"
                  class="btn btn-primary">Save changes</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->

  <div class="modal fade" id="modal-truck-inspection">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Inspection</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Date</label>
            <div class="input-group date"
                 id="date"
                 data-target-input="nearest">
              <input type="text"
                     :class="['form-control datetimepicker-input', {'is-invalid': errorFor('date')}]"
                     v-model="inspectionForm.date"
                     data-target="#date"/>
              <div class="input-group-append"
                   data-target="#date"
                   data-toggle="datetimepicker">
                <div class="input-group-text">
                  <i class="fa fa-calendar"></i>
                </div>
              </div>

              <v-errors :errors="errorFor('date')" />
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Comment</label>
            <input type="text"
                   v-model="inspectionForm.comment"
                   :class="['form-control', {'is-invalid': errorFor('comment')}]">
            <v-errors :errors="errorFor('comment')" />
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
          <button type="button"
                  @click.prevent="saveInspection"
                  class="btn btn-primary">Save changes</button>
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
      trucks: [],
      settingModal: null,
      inspectionModal: null,
      inspectionForm: {
        truck_id: '',
        date: '',
        comment: ''
      },
      settingForm: {
        truck_regular_maintenance_millage: '',
        truck_major_maintenance_millage: '',
        truck_inspection: ''
      },
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
          label: "Machine",
          field: "machine.name",
          sortable: true,
          searchable: true,
        },
        {
          label: "Millage",
          field: "millage",
          sortable: true,
          searchable: true,
        },
        {
          label: "Last Inspection",
          field: "last_inspection",
          sortable: true,
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
    this.loadSetting();
    this.loadData();
  },
  mounted() {
    let self = this;
    //Date picker
    window.$('#date').datetimepicker({
      format: 'YYYY-MM-DD'
    })

    window.$('#date').on("change.datetimepicker", function (e) {
      self.inspectionForm.date = e.date.format('YYYY-MM-DD');
    });

    this.settingModal = new window.bootstrap.Modal(document.getElementById('modal-truck-setting'));
    this.inspectionModal = new window.bootstrap.Modal(document.getElementById('modal-truck-inspection'));
  },
  methods: {
    showSetting() {
      this.settingModal.show();
    },
    showInspectionModal(truck) {
      this.inspectionForm.truck_id = truck.id;
      this.inspectionModal.show();
    },
    saveSetting() {
      this.axios.post('/settings/trucks', this.settingForm)
        .then(() => {
          this.showSuccessMsg('Setting Updated!')
          this.settingModal.hide();
        })
        .catch((err) => {
          this.allErrors = err.response.data.errors;
        })
    },
    saveInspection() {
      this.axios.post('/inspection/trucks', this.inspectionForm)
        .then(() => {
          this.showSuccessMsg('Inspection Status Updated!')
          this.loadData();
          this.inspectionModal.hide();

          this.inspectionForm.date = '';
          this.inspectionForm.comment = '';
        })
        .catch((err) => {
          this.allErrors = err.response.data.errors;
        })
    },
    loadSetting() {
      this.axios.get('/settings')
        .then(response => {
          this.settingForm.truck_regular_maintenance_millage = response.data.data.truck_regular_maintenance_millage;
          this.settingForm.truck_major_maintenance_millage = response.data.data.truck_major_maintenance_millage;
          this.settingForm.truck_inspection = response.data.data.truck_inspection;
        })
    },
    loadData() {
      this.trucks = [];

      this.axios.get('/trucks', {params: this.queryParams})
        .then((response) => {
          this.trucks = response.data.data;
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
          this.axios.delete('/trucks/'+row.id).then(() => {
            this.loadData();
            this.$swal.fire(
              'Deleted',
              'Truck has been deleted!',
              'success'
            )
          });
        }
      });
    },
  }
}
</script>
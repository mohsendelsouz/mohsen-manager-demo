<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">{{ title }}</h1>
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
            <div class="card-header">
              <h3 class="card-title">Company Information</h3>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Name</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('name')}]"
                           v-model="form.name">
                    <v-errors :errors="errorFor('name')" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Sales Person</label>
                    <select :class="['form-control', {'is-invalid': errorFor('sales_person_id')}]"
                            v-model="form.sales_person_id">
                      <option value="">Select Sales Person</option>
                      <option :value="person.id"
                              v-for="person in salesPersons"
                              :key="'person_'+person.id">{{ person.name }}</option>
                    </select>

                    <v-errors :errors="errorFor('sales_person_id')" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Email</label>
                    <input type="email"
                           :class="['form-control', {'is-invalid': errorFor('email')}]"
                           v-model="form.email">
                    <v-errors :errors="errorFor('email')" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Job Goal</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('job_goal')}]"
                           v-model="form.job_goal">
                    <v-errors :errors="errorFor('job_goal')" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Wow Goal</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('wows_goal')}]"
                           v-model="form.wows_goal">
                    <v-errors :errors="errorFor('wows_goal')" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Production Goal</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('production_goal')}]"
                           v-model="form.production_goal">
                    <v-errors :errors="errorFor('production_goal')" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Operation Manager</label>
                    <select :class="['form-control', {'is-invalid': errorFor('operation_manager_id')}]"
                            v-model="form.operation_manager_id">
                      <option value="">Select Operation Manager</option>
                      <option :value="person.id"
                              v-for="person in operationManagers"
                              :key="'person_'+person.id">{{ person.name }}</option>
                    </select>

                    <v-errors :errors="errorFor('operation_manager_id')" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>General Manager</label>
                    <select :class="['form-control', {'is-invalid': errorFor('general_manager_id')}]"
                            v-model="form.general_manager_id">
                      <option value="">Select General Manager</option>
                      <option :value="person.id"
                              v-for="person in generalManagers"
                              :key="'person_'+person.id">{{ person.name }}</option>
                    </select>

                    <v-errors :errors="errorFor('general_manager_id')" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Active</label>
                    <div class="form-group">
                      <div class="form-check d-inline mr-3">
                        <input class="form-check-input"
                               type="radio"
                               name="active"
                               value="1"
                               v-model="form.active">
                        <label class="form-check-label">Yes</label>
                      </div>
                      <div class="form-check d-inline">
                        <input class="form-check-input"
                               type="radio"
                               name="active"
                               value="0"
                               v-model="form.active">
                        <label class="form-check-label">No</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button type="submit"
                      class="btn btn-success mr-1"
                      @click.prevent="submit"
                      :disabled="loading">Save</button>

              <router-link :to="{name: 'settings_company'}"
                           class="btn btn-secondary">Cancel</router-link>
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
      title: 'Add Company',
      salesPersons: [],
      operationManagers: [],
      generalManagers: [],
      form: {
        name: '',
        email: '',
        active: '1',
        sales_person_id: '',
        operation_manager_id: '',
        general_manager_id: '',
        production_goal: '',
        wows_goal: '',
        job_goal: '',
      }
    }
  },
  created() {
    this.axios.get('/sales-persons')
      .then((response) => {
        this.salesPersons = response.data.data;
      })

    this.axios.get('/operation-managers')
      .then((response) => {
        this.operationManagers = response.data.data;
      })

    this.axios.get('/general-managers')
      .then((response) => {
        this.generalManagers = response.data.data;
      })

    if (this.$route.name === 'settings_company_edit') {
      this.axios.get('/companies/'+this.$route.params.id)
        .then((response) => {
          this.form.name = response.data.data.name;
          this.form.email = response.data.data.email;
          this.form.active = response.data.data.active;
          this.form.sales_person_id = response.data.data.sales_person_id;
          this.form.operation_manager_id = response.data.data.operation_manager_id;
          this.form.general_manager_id = response.data.data.general_manager_id;
          this.form.production_goal = response.data.data.production_goal;
          this.form.wows_goal = response.data.data.wows_goal;
          this.form.job_goal = response.data.data.job_goal;
        })

      this.title = 'Edit Company';
    }
  },
  methods: {
    submit() {
      this.allErrors = null;
      this.loading = true;

      if (this.$route.name === 'settings_company_edit') {
        this.axios.patch('/companies/'+this.$route.params.id, this.form)
          .then(() => {
            this.$router.push({name: 'settings_company'});
            this.showSuccessMsg('Updated Successfully!')
          })
          .catch((err) => {
            this.allErrors = err.response.data.errors;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.axios.post('/companies', this.form)
          .then(() => {
            this.$router.push({name: 'settings_company'});
            this.showSuccessMsg('Added Successfully!')
          })
          .catch((err) => {
            this.allErrors = err.response.data.errors;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  }
}
</script>
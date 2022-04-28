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
              <h3 class="card-title">Manager Information</h3>
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
                    <label>Email</label>
                    <input type="email"
                           :class="['form-control', {'is-invalid': errorFor('email')}]"
                           v-model="form.email">
                    <v-errors :errors="errorFor('email')" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Password</label>
                    <input type="password"
                           :class="['form-control', {'is-invalid': errorFor('password')}]"
                           v-model="form.password">
                    <v-errors :errors="errorFor('password')" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Sales Commission (%)</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('sales_commission')}]"
                           v-model="form.sales_commission">
                    <v-errors :errors="errorFor('sales_commission')" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Operational Manager Commission (%)</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('operational_manager_commission')}]"
                           v-model="form.operational_manager_commission">
                    <v-errors :errors="errorFor('operational_manager_commission')" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>General Manager Commission (%)</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('general_manager_commission')}]"
                           v-model="form.general_manager_commission">
                    <v-errors :errors="errorFor('general_manager_commission')" />
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

              <router-link :to="{name: 'settings_manager'}"
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
      title: 'Add Manager',
      form: {
        name: '',
        email: '',
        password: '',
        active: '1',
        operational_manager_commission: '',
        general_manager_commission: '',
        sales_commission: '',
      }
    }
  },
  created() {
    if (this.$route.name === 'settings_manager_edit') {
      this.axios.get('/managers/'+this.$route.params.id)
        .then((response) => {
          this.form.name = response.data.data.name;
          this.form.email = response.data.data.email;
          this.form.active = response.data.data.active;
          this.form.operational_manager_commission = response.data.data.operational_manager_commission;
          this.form.general_manager_commission = response.data.data.general_manager_commission;
          this.form.sales_commission = response.data.data.sales_commission;
        })

      this.title = 'Edit Manager';
    }
  },
  methods: {
    submit() {
      this.allErrors = null;
      this.loading = true;

      if (this.$route.name === 'settings_manager_edit') {
        this.axios.patch('/managers/'+this.$route.params.id, this.form)
          .then(() => {
            this.$router.push({name: 'settings_manager'});
            this.showSuccessMsg('Updated Successfully!')
          })
          .catch((err) => {
            this.allErrors = err.response.data.errors;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.axios.post('/managers', this.form)
          .then(() => {
            this.$router.push({name: 'settings_manager'});
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
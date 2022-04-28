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
              <h3 class="card-title">User Information</h3>
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
                    <label>Wows Goal</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('wows_goal')}]"
                           v-model="form.wows_goal">
                    <v-errors :errors="errorFor('wows_goal')" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Scorecard Goal</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('scorecard_goal')}]"
                           v-model="form.scorecard_goal">
                    <v-errors :errors="errorFor('scorecard_goal')" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Job Goal</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('job_goal')}]"
                           v-model="form.job_goal">
                    <v-errors :errors="errorFor('job_goal')" />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label :class="[{'is-invalid': errorFor('roles')}]">Roles</label>
                    <select class="select2"
                            id="roles"
                            multiple="multiple"
                            data-placeholder="Select Roles"
                            style="width: 100%;">
                      <option :value="role"
                              v-for="(role, i) in roles"
                              :key="'role_'+i">{{ role }}</option>
                    </select>

                    <v-errors :errors="errorFor('roles')" />
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

                <div class="col-md-6">
                  <table class="table table-sm table-bordered table-striped">
                    <thead>
                    <tr>
                      <th>Role</th>
                      <th>Commission</th>
                    </tr>
                    </thead>

                    <tbody>
                    <template v-for="(role, i) in roles.filter(r => r !== 'Admin')" :key="'role'+i">
                      <tr v-if="form.roles.includes(role)">
                        <td>{{ role }}</td>
                        <td>
                          <select class="form-control form-control-sm"
                                  v-model="form.commissions[role]">
                            <option value="">Select Commission</option>
                            <option :value="commission.id"
                                    v-for="(commission, i) in commissions"
                                    :key="'commission_'+i">{{ commission.name + ' (' + commission.percentage + '%)' }}</option>
                          </select>
                        </td>
                      </tr>
                    </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button type="submit"
                      class="btn btn-success mr-1"
                      @click.prevent="submit"
                      :disabled="loading">Save</button>

              <router-link :to="{name: 'settings_user'}"
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
      title: 'Add User',
      roles: ['Admin', 'Technician', 'Sales Person', 'Operation Manager', 'General Manager'],
      commissions: [],
      form: {
        name: '',
        email: '',
        password: '',
        commissions: {
          'Technician': '',
          'Admin': '',
          'Sales Person': '',
          'Operation Manager': '',
          'General Manager': '',
        },
        roles: [],
        scorecard_goal: '',
        production_goal: '',
        job_goal: '',
        wows_goal: '',
        active: '1'
      }
    }
  },
  async created() {
    await this.axios.get('/commissions')
      .then((response) => {
        this.commissions = response.data.data;
      })

    if (this.$route.name === 'settings_user_edit') {
      await this.axios.get('/users/'+this.$route.params.id)
        .then((response) => {
          this.form.name = response.data.data.name;
          this.form.email = response.data.data.email;
          this.form.active = response.data.data.active;
          this.form.roles = response.data.data.roles.map(r => {
            this.form.commissions[r.role] = r.commission_id;
            return r.role;
          });
          this.form.production_goal = response.data.data.production_goal;
          this.form.wows_goal = response.data.data.wows_goal;
          this.form.job_goal = response.data.data.job_goal;
          this.form.scorecard_goal = response.data.data.scorecard_goal;

          window.$('#roles').val(this.form.roles);
          window.$('#roles').trigger('change');
        })

      this.title = 'Edit User';
    }
  },
  mounted() {
    let self = this;

    window.$('.select2').select2();

    window.$('#roles').on('change.select2', function () {
      self.form.roles = window.$(this).val();
    });
  },
  methods: {
    submit() {
      this.allErrors = null;
      this.loading = true;

      if (this.$route.name === 'settings_user_edit') {
        this.axios.patch('/users/'+this.$route.params.id, this.form)
          .then(() => {
            this.$router.push({name: 'settings_user'});
            this.showSuccessMsg('Updated Successfully!')
          })
          .catch((err) => {
            this.allErrors = err.response.data.errors;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.axios.post('/users', this.form)
          .then(() => {
            this.$router.push({name: 'settings_user'});
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
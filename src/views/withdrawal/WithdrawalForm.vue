<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Add Withdrawal</h1>
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
              <h3 class="card-title">Withdrawal Information</h3>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Technician</label>

                    <select :class="['form-control', {'is-invalid': errorFor('user_id')}]"
                            v-model="form.user_id">
                      <option value="">Select Technician</option>

                      <option :value="technician.id"
                              v-for="(technician, i) in technicians"
                              :key="'technician_'+i">{{ technician.name }}</option>
                    </select>
                    <v-errors :errors="errorFor('user_id')" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Type</label>
                    <select :class="['form-control', {'is-invalid': errorFor('type')}]"
                            v-model="form.type">
                      <option value="">Select Type</option>
                      <option value="wow">Wow</option>
                      <option value="tip">Tip</option>
                      <option value="commission">Commission</option>
                    </select>
                    <v-errors :errors="errorFor('type')" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Amount</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('amount')}]"
                           v-model="form.amount">
                    <v-errors :errors="errorFor('amount')" />
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button type="submit"
                      class="btn btn-success mr-1"
                      @click.prevent="submit"
                      :disabled="loading">Save</button>

              <router-link :to="{name: 'withdrawals'}"
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
      technicians: [],
      form: {
        type: '',
        amount: '',
        user_id: '',
      }
    }
  },
  created() {
    this.axios.get('/technicians')
      .then((response) => {
        this.technicians = response.data.data;
      })
  },
  methods: {
    submit() {
      this.allErrors = null;
      this.loading = true;

      this.axios.post('/withdrawals', this.form)
        .then(() => {
          this.$router.push({name: 'withdrawals'});
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
</script>
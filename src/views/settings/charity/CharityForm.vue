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
              <h3 class="card-title">Charity Information</h3>
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
                    <label>Default Amount</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('default_amount')}]"
                           v-model="form.default_amount">
                    <v-errors :errors="errorFor('default_amount')" />
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button type="submit"
                      class="btn btn-success mr-1"
                      @click.prevent="submit"
                      :disabled="loading">Save</button>

              <router-link :to="{name: 'settings_charity'}"
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
      title: 'Add Charity',
      machines: [],
      form: {
        name: '',
        default_amount: '',
      }
    }
  },
  created() {
    if (this.$route.name === 'settings_charity_edit') {
      this.axios.get('/charities/'+this.$route.params.id)
        .then((response) => {
          this.form.name = response.data.data.name;
          this.form.default_amount = response.data.data.default_amount;
        })

      this.title = 'Edit Charity';
    }
  },
  methods: {
    submit() {
      this.allErrors = null;
      this.loading = true;

      if (this.$route.name === 'settings_charity_edit') {
        this.axios.patch('/charities/'+this.$route.params.id, this.form)
          .then(() => {
            this.$router.push({name: 'settings_charity'});
            this.showSuccessMsg('Updated Successfully!')
          })
          .catch((err) => {
            this.allErrors = err.response.data.errors;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.axios.post('/charities', this.form)
          .then(() => {
            this.$router.push({name: 'settings_charity'});
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
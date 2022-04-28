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
              <h3 class="card-title">Truck Information</h3>
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
                    <label>Machine</label>

                    <select :class="['form-control', {'is-invalid': errorFor('name')}]"
                            v-model="form.machine_id">
                      <option value="">Select Machine</option>
                      <option :value="machine.id"
                              v-for="(machine, i) in machines"
                              :key="'machine_'+i">{{ machine.name }}</option>
                    </select>
                    <v-errors :errors="errorFor('machine_id')" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Millage</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('millage')}]"
                           v-model="form.millage">
                    <v-errors :errors="errorFor('millage')" />
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button type="submit"
                      class="btn btn-success mr-1"
                      @click.prevent="submit"
                      :disabled="loading">Save</button>

              <router-link :to="{name: 'settings_truck'}"
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
      title: 'Add Truck',
      machines: [],
      form: {
        name: '',
        machine_id: '',
        millage: ''
      }
    }
  },
  created() {
    this.axios.get('/machines')
      .then((response) => {
        this.machines = response.data.data;
      });

    if (this.$route.name === 'settings_truck_edit') {
      this.axios.get('/trucks/'+this.$route.params.id)
        .then((response) => {
          this.form.name = response.data.data.name;
          this.form.machine_id = response.data.data.machine.id;
          this.form.millage = response.data.data.millage;
        })

      this.title = 'Edit Truck';
    }
  },
  methods: {
    submit() {
      this.allErrors = null;
      this.loading = true;

      if (this.$route.name === 'settings_truck_edit') {
        this.axios.patch('/trucks/'+this.$route.params.id, this.form)
          .then(() => {
            this.$router.push({name: 'settings_truck'});
            this.showSuccessMsg('Updated Successfully!')
          })
          .catch((err) => {
            this.allErrors = err.response.data.errors;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.axios.post('/trucks', this.form)
          .then(() => {
            this.$router.push({name: 'settings_truck'});
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
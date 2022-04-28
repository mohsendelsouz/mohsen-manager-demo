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
              <h3 class="card-title">Truck Maintenance Information</h3>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Truck</label>

                    <select :class="['form-control', {'is-invalid': errorFor('truck_id')}]"
                            v-model="form.truck_id">
                      <option value="">Select Truck</option>
                      <option :value="truck.id"
                              v-for="(truck, i) in trucks"
                              :key="'truck_'+i">{{ truck.name }}</option>
                    </select>
                    <v-errors :errors="errorFor('truck_id')" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Date:</label>
                    <div class="input-group date"
                         id="date"
                         data-target-input="nearest">
                      <input type="text"
                             :class="['form-control datetimepicker-input', {'is-invalid': errorFor('date')}]"
                             v-model="form.date"
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
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Type</label>
                    <select :class="['form-control', {'is-invalid': errorFor('type')}]"
                            v-model="form.type">
                      <option value="">Select Type</option>
                      <option value="Gas">Gas</option>
                      <option value="Regular Service">Regular Service</option>
                      <option value="Major Service">Major Service</option>
                      <option value="Emergency Service">Emergency Service</option>
                      <option value="Supply">Supply</option>
                    </select>
                    <v-errors :errors="errorFor('type')" />
                  </div>
                </div>

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
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Comment</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('comment')}]"
                           v-model="form.comment">
                    <v-errors :errors="errorFor('comment')" />
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button type="submit"
                      class="btn btn-success mr-1"
                      @click.prevent="submit"
                      :disabled="loading">Save</button>

              <router-link :to="{name: 'trucks_maintenances'}"
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
      title: 'Add Truck Maintenance',
      trucks: [],
      form: {
        truck_id: '',
        date: '',
        type: '',
        amount: '',
        millage: '',
        comment: '',
      }
    }
  },
  created() {
    this.axios.get('/trucks')
      .then((response) => {
        this.trucks = response.data.data;
      });

    if (this.$route.name === 'trucks_maintenances_edit') {
      this.axios.get('/trucks_maintenances/'+this.$route.params.id)
        .then((response) => {
          this.form.date = response.data.data.date;
          this.form.type = response.data.data.type;
          this.form.amount = response.data.data.amount;
          this.form.comment = response.data.data.comment;
          this.form.truck_id = response.data.data.truck.id;
          this.form.millage = response.data.data.millage;
        })

      this.title = 'Edit Truck Maintenance';
    }
  },
  mounted() {
    let self = this;
    //Date picker
    window.$('#date').datetimepicker({
      format: 'YYYY-MM-DD'
    })

    window.$('#date').on("change.datetimepicker", function (e) {
      self.form.date = e.date.format('YYYY-MM-DD');
    });
  },
  methods: {
    submit() {
      this.allErrors = null;
      this.loading = true;

      if (this.$route.name === 'trucks_maintenances_edit') {
        this.axios.patch('/trucks_maintenances/'+this.$route.params.id, this.form)
          .then(() => {
            this.$router.push({name: 'trucks_maintenances'});
            this.showSuccessMsg('Updated Successfully!')
          })
          .catch((err) => {
            this.allErrors = err.response.data.errors;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.axios.post('/trucks_maintenances', this.form)
          .then(() => {
            this.$router.push({name: 'trucks_maintenances'});
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
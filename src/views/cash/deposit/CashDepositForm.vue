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
              <h3 class="card-title">Machine Information</h3>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Date</label>
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

              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Note</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('note')}]"
                           v-model="form.note">
                    <v-errors :errors="errorFor('note')" />
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button type="submit"
                      class="btn btn-success mr-1"
                      @click.prevent="submit"
                      :disabled="loading">Save</button>

              <router-link :to="{name: 'cash_deposits'}"
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
      title: 'Add Deposit',
      form: {
        date: '',
        amount: '',
        note: ''
      }
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
  created() {
    if (this.$route.name === 'cash_deposits_edit') {
      this.axios.get('/cash-deposits/'+this.$route.params.id)
        .then((response) => {
          this.form.date = response.data.data.date;
          this.form.amount = response.data.data.amount;
          this.form.note = response.data.data.note;
        })

      this.title = 'Edit Deposit';
    }
  },
  methods: {
    submit() {
      this.allErrors = null;
      this.loading = true;

      if (this.$route.name === 'cash_deposits_edit') {
        this.axios.patch('/cash-deposits/'+this.$route.params.id, this.form)
          .then(() => {
            this.$router.push({name: 'cash_deposits'});
            this.showSuccessMsg('Updated Successfully!')
          })
          .catch((err) => {
            this.allErrors = err.response.data.errors;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.axios.post('/cash-deposits', this.form)
          .then(() => {
            this.$router.push({name: 'cash_deposits'});
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
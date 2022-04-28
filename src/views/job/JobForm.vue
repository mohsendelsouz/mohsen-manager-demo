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
              <h3 class="card-title">Job Information</h3>
            </div>
            <div class="card-body">
              <div class="row">
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
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Company</label>

                    <select :class="['form-control', {'is-invalid': errorFor('company_id')}]"
                            @change="changeCompany"
                            v-model="form.company_id">
                      <option value="">Select Company</option>
                      <option :value="company.id"
                              v-for="(company, i) in companies"
                              :key="'company_'+i">{{ company.name }}</option>
                    </select>
                    <v-errors :errors="errorFor('company_id')" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Invoice No</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('invoice_no')}]"
                           v-model="form.invoice_no">
                    <v-errors :errors="errorFor('invoice_no')" />
                  </div>
                </div>
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
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Client</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('client')}]"
                           v-model="form.client">
                    <v-errors :errors="errorFor('client')" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Client Email</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('client_email')}]"
                           v-model="form.client_email">
                    <v-errors :errors="errorFor('client_email')" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <div class="form-group">
                      <div class="form-check">
                        <input class="form-check-input"
                               type="checkbox"
                               v-model="form.referred"
                               value="1">
                        <label class="form-check-label">Referred</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row" v-if="form.referred">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Referring Client Name</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('referral.name')}]"
                           v-model="form.referral.name">
                    <v-errors :errors="errorFor('referral.name')" />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label>Referring Client Email</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('referral.email')}]"
                           v-model="form.referral.email">
                    <v-errors :errors="errorFor('referral.email')" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Payment Method</label>

                    <select :class="['form-control', {'is-invalid': errorFor('payment_method')}]"
                            v-model="form.payment_method">
                      <option value="">Select Payment Method</option>
                      <option value="Cash">Cash</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                    <v-errors :errors="errorFor('payment_method')" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Sales Person</label>

                    <select :class="['form-control', {'is-invalid': errorFor('sales_person_id')}]"
                            @change="changeCommission('Sales Person')"
                            v-model="form.sales_person_id">
                      <option value="">Select Sales Person</option>
                      <option :value="user.id"
                              v-for="(user, i) in salesPersons"
                              :key="'user_'+i">{{ user.name }}</option>
                    </select>
                    <v-errors :errors="errorFor('sales_person_id')" />
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
                    <label>Tip</label>
                    <input type="text"
                           :class="['form-control', {'is-invalid': errorFor('tip')}]"
                           v-model="form.tip">
                    <v-errors :errors="errorFor('tip')" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>General Manager</label>

                    <select :class="['form-control', {'is-invalid': errorFor('general_manager_id')}]"
                            @change="changeCommission('General Manager')"
                            v-model="form.general_manager_id">
                      <option value="">Select General Manager</option>
                      <option :value="generalManager.id"
                              v-for="(generalManager, i) in generalManagers"
                              :key="'generalManager_'+i">{{ generalManager.name }}</option>
                    </select>
                    <v-errors :errors="errorFor('general_manager_id')" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Operational Manager</label>

                    <select :class="['form-control', {'is-invalid': errorFor('operational_manager_id')}]"
                            @change="changeCommission('Operation Manager')"
                            v-model="form.operational_manager_id">
                      <option value="">Select Operational Manager</option>

                      <option :value="operationalManager.id"
                              v-for="(operationalManager, i) in operationManagers"
                              :key="'operationalManager_'+i">{{ operationalManager.name }}</option>
                    </select>
                    <v-errors :errors="errorFor('operational_manager_id')" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Truck Technician</label>

                    <select :class="['form-control', {'is-invalid': errorFor('truck_technician_id')}]"
                            v-model="form.truck_technician_id">
                      <option value="">Select Truck Technician</option>
                      <option :value="technician.id"
                              v-for="(technician, i) in technicians"
                              :key="'technician_'+i">{{ technician.name }}</option>
                    </select>
                    <v-errors :errors="errorFor('truck_technician_id')" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label :class="[{'is-invalid': errorFor('general_manager_id')}]">Technicians</label>
                    <select class="select2"
                            id="technicians"
                            multiple="multiple"
                            data-placeholder="Select Technicians"
                            style="width: 100%;">
                      <option v-for="(technician, i) in technicians"
                              :key="'tech_'+i"
                              :value="technician.id">{{ technician.name }}</option>
                    </select>

                    <v-errors :errors="errorFor('technicians')" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <table class="table table-sm table-bordered table-striped">
                    <thead>
                    <tr>
                      <th>Technician</th>
                      <th>Commission (%)</th>
                    </tr>
                    </thead>

                    <tbody>
                    <template v-for="(t, i) in technicians" :key="'er'+i">
                      <tr v-if="form.technicians.includes(t.id.toString())">
                        <td>{{ t.name }}</td>
                        <td>
                          <input type="text"
                                 class="form-control form-control-sm"
                                 v-model="form.commissions[t.id]">
                        </td>
                      </tr>
                    </template>
                    </tbody>
                  </table>
                </div>

                <div class="col-md-6">
                  <table class="table table-sm table-bordered table-striped">
                    <thead>
                    <tr>
                      <th>Type</th>
                      <th>Commission (%)</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr v-if="form.sales_person_id">
                      <td>Sales Person</td>
                      <td>
                        <input type="text"
                               class="form-control form-control-sm"
                               v-model="form.sales_commission_percentage">
                      </td>
                    </tr>
                    <tr v-if="form.operational_manager_id">
                      <td>Operation Manager</td>
                      <td>
                        <input type="text"
                               class="form-control form-control-sm"
                               v-model="form.operational_manager_commission_percentage">
                      </td>
                    </tr>
                    <tr v-if="form.general_manager_id">
                      <td>General Manager</td>
                      <td>
                        <input type="text"
                               class="form-control form-control-sm"
                               v-model="form.general_manager_commission_percentage">
                      </td>
                    </tr>
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

              <router-link :to="{name: 'jobs'}"
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
      title: 'Add Job',
      companies: [],
      trucks: [],
      technicians: [],
      managers: [],
      salesPersons: [],
      operationManagers: [],
      generalManagers: [],
      form: {
        referral: {
          name: '',
          email: ''
        },
        referred: false,
        date: '',
        sales_commission_percentage: '',
        operational_manager_commission_percentage: '',
        general_manager_commission_percentage: '',
        company_id: '',
        invoice_no: '',
        truck_id: '',
        client: '',
        client_email: '',
        payment_method: '',
        tip: '',
        amount: '',
        truck_technician_id: '',
        sales_person_id: '',
        operational_manager_id: '',
        general_manager_id: '',
        technicians: [],
        commissions: [],
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

    window.$('#paymentReceivedDate').datetimepicker({
      format: 'YYYY-MM-DD'
    })

    window.$('#paymentReceivedDate').on("change.datetimepicker", function (e) {
      self.form.payment_received_at = e.date.format('YYYY-MM-DD');
    });

    window.$('.select2').select2()

    window.$('#technicians').on('change.select2', function () {
      self.form.technicians = window.$(this).val();
    });
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

    this.axios.get('/companies')
      .then((response) => {
        this.companies = response.data.data;
      });

    this.axios.get('/trucks')
      .then((response) => {
        this.trucks = response.data.data;
      });

    this.axios.get('/technicians')
      .then((response) => {
        this.technicians = response.data.data;

        this.technicians.forEach(t => {
          this.form.commissions[t.id] =  t.roles.find(r => r.role === 'Technician').commission.percentage;
        })
      });

    if (this.$route.name === 'jobs_edit') {
      this.axios.get('/jobs/'+this.$route.params.id)
        .then((response) => {
          this.form.date = response.data.data.date;
          this.form.company_id = response.data.data.company.id;
          this.form.invoice_no = response.data.data.invoice_no;
          this.form.truck_id = response.data.data.truck.id;
          this.form.client = response.data.data.client;
          this.form.client_email = response.data.data.client_email;
          this.form.payment_method = response.data.data.payment_method;
          this.form.payment_received_at = response.data.data.payment_received_at;
          this.form.tip = response.data.data.tip;
          this.form.amount = response.data.data.amount;
          this.form.amount = response.data.data.amount;
          this.form.truck_technician_id = response.data.data.truck_technician.id;

          if (response.data.data.sales_person)
            this.form.sales_person_id = response.data.data.sales_person.id;

          this.form.operational_manager_id = response.data.data.operational_manager.id;
          this.form.general_manager_id = response.data.data.general_manager.id;
          this.form.technicians = response.data.data.technicians.map(t => t.technician_id);

          window.$('#technicians').val(this.form.technicians);
          window.$('#technicians').trigger('change');
        })

      this.title = 'Edit Job';
    }
  },
  methods: {
    changeCompany() {
      if (this.form.company_id) {
        let company = this.companies.find(c => c.id === this.form.company_id);

        this.form.sales_person_id = company.sales_person_id;
        this.form.operational_manager_id = company.operation_manager_id;
        this.form.general_manager_id = company.general_manager_id;

        this.changeCommission('General Manager');
        this.changeCommission('Operation Manager');
        this.changeCommission('Sales Person');
      }
    },
    changeCommission(type) {
      if (type === 'General Manager') {
          if (this.form.general_manager_id) {
            this.form.general_manager_commission_percentage = this.generalManagers
              .find(m => m.id === this.form.general_manager_id)
              .roles.find(r => r.role === 'General Manager')
              .commission.percentage;
          }
      } else if (type === 'Operation Manager') {
        if (this.form.operational_manager_id) {
          this.form.operational_manager_commission_percentage = this.operationManagers
            .find(m => m.id === this.form.operational_manager_id)
            .roles.find(r => r.role === 'Operation Manager')
            .commission.percentage;
        }
      } else if (type === 'Sales Person') {
        if (this.form.sales_person_id) {
          this.form.sales_commission_percentage = this.salesPersons
            .find(m => m.id === this.form.sales_person_id)
            .roles.find(r => r.role === 'Sales Person')
            .commission.percentage;
        }
      }
    },
    submit() {
      this.allErrors = null;
      this.loading = true;

      if (this.$route.name === 'jobs_edit') {
        this.axios.patch('/jobs/'+this.$route.params.id, this.form)
          .then(() => {
            this.$router.push({name: 'jobs'});
            this.showSuccessMsg('Updated Successfully!')
          })
          .catch((err) => {
            this.allErrors = err.response.data.errors;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.axios.post('/jobs', this.form)
          .then(() => {
            this.$router.push({name: 'jobs'});
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
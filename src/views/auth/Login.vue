<template>
  <div class="login-box">
    <!-- /.login-logo -->
    <div class="card card-outline card-primary">
      <div class="card-header text-center">
        <a href="#" class="h1">
          <img :src="baseUrl + 'img/logo.png'">
        </a>
      </div>
      <div class="card-body">
        <p class="login-box-msg">Sign in to start your session</p>

        <form action="#" method="post">
          <input type="email"
                 :class="['form-control mb-2', {'is-invalid': errorFor('email')}]"
                 placeholder="Email"
                 v-model="form.email">

          <v-errors :errors="errorFor('email')"></v-errors>

          <input type="password"
                 :class="['form-control mb-2', {'is-invalid': errorFor('password')}]"
                 placeholder="Password"
                 v-model="form.password">

          <v-errors :errors="errorFor('password')"></v-errors>

          <div class="row">
            <!-- /.col -->
            <div class="col-12">
              <button type="submit"
                      class="btn btn-primary btn-block"
                      @click.prevent="login">Sign In</button>
            </div>
            <!-- /.col -->
          </div>
        </form>
      </div>
      <!-- /.card-body -->
    </div>
    <!-- /.card -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
        device: 'web',
      }
    }
  },
  methods: {
    login() {
      this.allErrors = null;

      this.$store.dispatch('auth/login', this.form)
        .then(() => window.location.href = process.env.VUE_APP_BASE)
        .catch((err) => this.allErrors = err.errors)
        .finally(() => this.loading = false);
    }
  }
}
</script>
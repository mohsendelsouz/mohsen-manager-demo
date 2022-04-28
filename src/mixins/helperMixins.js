export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE
    }
  },
  methods: {
    showSuccessMsg(msg) {
      this.$swal.fire({
        position: 'top-right',
        icon: 'success',
        toast: true,
        title: msg,
        showConfirmButton: false,
        timer: 1500
      })
    },
    showFailMsg(msg) {
      this.$swal.fire({
        position: 'top-right',
        icon: 'error',
        toast: true,
        title: msg,
        showConfirmButton: false,
        timer: 1500
      })
    },
    pageChanged(page) {
      this.queryParams.page = page;
      this.loadData();
    },
    sorting({column, order}) {
      this.queryParams.sort = column;
      this.queryParams.sort_order = order;
      this.queryParams.page = 1;
      this.loadData();
    },
    search({q, columns}) {
      this.queryParams.page = 1;
      this.queryParams.search = q;
      this.queryParams.search_columns = columns;
      this.loadData();
    }
  },
}
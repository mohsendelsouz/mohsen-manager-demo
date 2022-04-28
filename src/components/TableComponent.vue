<template>
  <div class="row d-flex justify-content-end">
    <div class="col-md-3">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="fas fa-search"></i>
          </span>
        </div>
        <input type="text"
               class="form-control"
               placeholder="Search"
               v-model="q" @input="changeQuery">
      </div>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-bordered table-hover text-nowrap">
      <thead>
      <tr>
        <th v-for="(col, index) in columns"
            :key="index"
            :class="col.class ? col.class : ''"
            @click="sorting(col)"
            :style="[{ width: col.width ? col.width : 'auto' }, { 'max-width': col.max_width ? col.max_width : 'auto' }]">
          <div v-if="col.headerSlot">
            <slot :name="col.headerSlotName"></slot>
          </div>
          <div v-else>
            {{ col.label }}
            <span v-if="col.sortable">
              <i class="fas fa-sort-amount-down-alt"
                 aria-hidden="true"
                 v-if="sortColumn === col.field && sortOrder === 'asc'"></i>


              <i class="fas fa-sort-amount-down"
                 aria-hidden="true"
                 v-if="sortColumn === col.field && sortOrder === 'desc'"></i>
            </span>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-if="rows.length > 0">
        <tr v-for="(row, i) in rows" :key="i">
          <td v-for="(col, j) in columns"
              :key="j" @click.prevent="col.click ? col.click(row) : false"
              :class="col.class ? col.class : ''">
            <div v-if="col.display" v-html="col.display(row)"></div>
            <div v-else-if="col.slot">
              <slot :row="row" :index="i" :name="col.field"></slot>
            </div>
            <template v-else>
              <span>{{ col.field.split('.').length > 1 ? (row[col.field.split('.')[0]] !== null ? row[col.field.split('.')[0]][col.field.split('.')[1]] : '') : row[col.field] }}</span>
            </template>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td :colspan="columns.length">
            <span>You currently have 0 items.</span>
          </td>
        </tr>
      </template>

      <slot :name="'footer'"></slot>
      </tbody>
    </table>
  </div>

  <pagination v-model="page"
              v-if="pagination"
              class="pagination pagination-sm no-margin"
              :per-page="perPage"
              :records="pagination.total"
              :options="paginationOptions"
              @paginate="changePage"/>
</template>

<script>
import Pagination from 'v-pagination-3';
import PaginationComponent from "@/components/PaginationComponent";

export default {
  name: "TableComponent",
  components: {Pagination},
  emits: ['pageChanged', 'sorting', 'search'],
  props: {
    isLoading: {
      type: Boolean,
      require: true,
    },
    pagination: {
      type: Object,
      required: false,
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    footer: {
      type: Array,
      default: () => {
        return [];
      },
    },
    rows: {
      type: Array,
      default: () => {
        return [];
      },
    },
    sortable: {
      type: Object,
      default: () => {
        return {
          order: "id",
          sort: "asc",
        };
      },
    },
  },
  data() {
    return {
      page: 1,
      q: '',
      paginationOptions: {
        theme: "bootstrap4",
        chunk: 10,
        template: PaginationComponent
      },
      sortColumn: this.sortable.order,
      sortOrder: this.sortable.sort
    }
  },
  computed: {
    perPage() {
      return this.pagination ? parseInt(this.pagination.per_page) : 10;
    }
  },
  methods: {
    sorting(column) {
      if (column.sortable) {
        if (column.field === this.sortColumn)
          this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        else {
          this.sortOrder = 'asc';
        }

        this.sortColumn = column.field;
        this.$emit('sorting', {column: this.sortColumn, order: this.sortOrder});
      }
    },
    changePage() {
      this.$emit('pageChanged', this.page);
    },
    changeQuery() {
      let columns = this.columns.filter((col) => col.searchable).map(col => col.field);

      this.$emit('search', {q: this.q, columns: columns.join(',')});
    }
  }
}
</script>
<template>
  <div class="row">
    <div class="col-md-6">
      <p v-show="props.hasRecords" :class='props.theme.count'>{{props.count}}</p>
    </div>

    <div class="col-md-6 d-flex justify-content-end">
      <ul class="pagination pagination-sm">
        <li v-if="props.hasEdgeNav"
            @click="props.setFirstPage"
            class="paginate_button page-item">
          <a href="javascript:void(0)" v-bind="props.firstPageProps">{{props.texts.first}}</a>
        </li>

        <li v-if="props.hasChunksNav"
            @click="props.setPrevChunk"
            class="paginate_button page-item">
          <a href="javascript:void(0)" v-bind="props.prevChunkProps">{{props.texts.prevChunk}}</a>
        </li>

        <li @click="props.setPrevPage"
            class="paginate_button page-item">
          <a href="javascript:void(0)" v-bind="props.prevProps">{{props.texts.prevPage}}</a>
        </li>

        <li v-for="page in props.pages" :key="page"
            :class="['page-item', {'active': page === props.page}]"
            v-on="props.pageEvents(page)">
          <a href="javascript:void(0)" v-bind="props.aProps" :class="props.theme.link">{{page}}</a>
        </li>

        <li @click="props.setNextPage"
            class="page-item">
          <a href="javascript:void(0)" v-bind="props.nextProps">{{props.texts.nextPage}}</a>
        </li>

        <li v-if="props.hasChunksNav"
            @click="props.setNextChunk"
            class="page-item">
          <a href="javascript:void(0)" v-bind="props.nextChunkProps">{{props.texts.nextChunk}}</a>
        </li>

        <li v-if="props.hasEdgeNav"
            @click="props.setLastPage"
            class="page-item">
          <a href="javascript:void(0)" v-bind="props.lastPageProps">{{props.texts.last}}</a>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: ['props']
}
</script>
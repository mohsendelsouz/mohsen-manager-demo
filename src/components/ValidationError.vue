<template>
  <span class="error invalid-feedback" v-for="(err, index) in errors" :key="key(index)">
    {{ err }}
  </span>
</template>

<script>
export default {
  props: ['errors'],
  methods: {
    key(index) {
      return `validation_error_${index}_${Math.random()}`
    }
  }
}
</script>
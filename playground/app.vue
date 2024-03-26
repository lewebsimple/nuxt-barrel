<script setup lang="ts">
const { data } = await useFetch("/api/barrel");
</script>

<template>
  <pre>{{ data }}</pre>
</template>

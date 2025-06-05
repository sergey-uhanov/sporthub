<script lang="ts" setup>

import CreatorHeader from "@/features/layouts-components/ui/CreatorHeader.vue";
import CreatorFooter from "@/features/layouts-components/ui/CreatorFooter.vue";
</script>

<template>
  <CreatorHeader/>
  <slot/>
  <CreatorFooter/>

</template>

<style lang="scss">

</style>
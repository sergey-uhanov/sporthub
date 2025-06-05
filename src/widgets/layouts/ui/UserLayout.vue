<script lang="ts" setup>


import UserHeader from "@/features/layouts-components/ui/UserHeader.vue";
import UserFooter from "@/features/layouts-components/ui/UserFooter.vue";
</script>

<template>
  <UserHeader/>
  <slot/>
  <UserFooter/>

</template>

<style lang="scss">

</style>
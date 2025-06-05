<script lang="ts" setup="">

import Disclaimer from "@/shared/ui/disclaimer/Disclaimer.vue";

import LogoIcon from "@/shared/assets/icons/logo-icon.vue";
</script>

<template>
  <div class="creator-auth-form">
    <a class="creator-auth-form__home-link" href="/">
      <logo-icon class="creator-auth-form__home-link-logo"/>
      sporthub
    </a>
    <slot/>
    <Disclaimer class="creator-auth-form__disclaimer"/>
  </div>
  <div class="creator-auth-form__plug"></div>
</template>

<style lang="scss">
.creator-auth-form {
  max-width: 580px;
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0;
  background: $black-bg;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;

  @include media-breakpoint-down(sm) {
    max-width: 100%;
  }

  &__creator-form {
    height: 100%;
    margin-top: 129px;
  }

  &__plug {
    width: 415px;

    @include media-breakpoint-down(sm) {
      display: none;
    }
  }

  &__home-link {
    color: $white;
    font-weight: 700;
    font-size: 22px;
    display: flex;
    margin: 31px auto 0 auto;
    max-width: 139px;
    width: 100%;
  }

  &__home-link-logo {
    width: 32px;
    height: 32px;
    position: relative;
    top: -6px;
    left: -6px;
    flex-shrink: 0;
  }

  &__disclaimer {
    padding-bottom: 24px;

    @include media-breakpoint-down(xs) {
      max-width: 180px;
      line-height: 1.3;
      padding-bottom: 11px;
    }
  }
}
</style>
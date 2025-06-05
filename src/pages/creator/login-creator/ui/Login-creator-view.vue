<script lang="ts" setup="">

import {PhotoCollageCreator} from "@/shared/ui/creator-photo-collage";
import SphereIcon from "@/shared/assets/icons/sphere-icon.vue";
import CreatorLoginForm from "../../../../widgets/creator-auth";
import {FormLogin} from "@/features/auth";
import CreatorAuthForm from "@/widgets/creator-auth/ui/CreatorAuthForm.vue";
</script>

<template>
  <main class="creator-login-page">
    <div class="creator-login-page__container">
      <PhotoCollageCreator/>
      <CreatorAuthForm>
        <FormLogin class="creator-login-form__creator-form" role="creator"/>
      </CreatorAuthForm>
    </div>
    <sphere-icon class="creator-login-page__icon"/>
    <sphere-icon class="creator-login-page__icon2"/>
  </main>
</template>

<style lang="scss">


.creator-login-page {
  background: $black-bg;
  height: 100vh;
  overflow: hidden;

  &__container {
    max-width: 1127px;
    margin: 0 auto;
    display: flex;
    gap: 159px;
    width: 100%;
  }



  &__icon {
    position: absolute;
    bottom: 0;
    left: 76px;

    @include media-breakpoint-down(sm) {
      display: none;
    }
  }

  &__icon2 {
    position: absolute;
    top: 0;
    left: 50%;

    @include media-breakpoint-down(sm) {
      display: none;
    }
  }
}


</style>
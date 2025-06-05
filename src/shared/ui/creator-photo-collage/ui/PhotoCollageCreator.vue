<script setup lang="ts">

</script>

<template>
  <div class="photo-collage">
    <div class="photo-collage__biggest-column">
      <div class="photo-collage__img-wrapper">
        <img src="../assets/creator-login3.webp" alt="collage photo" width="280" height="340">
      </div>
      <div class="photo-collage__img-wrapper">
        <img src="../assets/creator-login5.webp" alt="collage photo" width="280" height="340">
      </div>
      <div class="photo-collage__img-wrapper">
        <img src="../assets/creator-login.webp" alt="collage photo" width="280" height="340">
      </div>
      <div class="photo-collage__img-wrapper">
        <img src="../assets/creator-login4.webp" alt="collage photo" width="280" height="340">
      </div>
    </div>

    <div class="photo-collage__smallest-column">
      <div class="photo-collage__img-wrapper">
        <img src="../assets/creator-login6.webp" alt="collage photo" width="220" height="280">
      </div>
      <div class="photo-collage__img-wrapper">
        <img src="../assets/creator-login7.webp" alt="collage photo" width="220" height="280">
      </div>
      <div class="photo-collage__img-wrapper">
        <img src="../assets/creator-login2.webp" alt="collage photo" width="220" height="280">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.photo-collage {
  display: flex;
  gap: 43px;
  position: relative;
  z-index: 10;
  @media (max-width: 1150px) {
    padding-left: 15px;
  }

  &__biggest-column {
    display: flex;
    flex-direction: column;
    row-gap: 32px;
    transform: translateY(-329px);


    @include media-breakpoint-down(md) {
      transform: translateY(-50px);
      max-width: 190px;
    }

    @include media-breakpoint-down(sm) {
      display: none;
    }

    .photo-collage__img-wrapper {
      max-width: 280px;
      max-height: 340px;
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__smallest-column {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    transform: translateY(-39px);

    @media (max-width: 1150px) {
      display: none;
    }

    .photo-collage__img-wrapper {
      max-width: 220px;
      max-height: 280px;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
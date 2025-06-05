<script setup lang="ts">
</script>

<template>
  <form class="login-form">
    <h1 class="login-form__title">
      <slot name="title"/>
    </h1>

    <slot name="input-block"/>

    <div class="reg-link">
      <slot name="reg-link">

      </slot>
    </div>
    <div class="login-form__error-message">
      <slot name="errorMessage"/>
    </div>
  </form>
</template>

<style lang="scss">
.login-form {
  background-color: $black-bg;
  padding: 24px 80px;
  position: relative;
  z-index: 10;
  max-width: 580px;
  width: 100%;
  border-radius: 16px;

  @include media-breakpoint-down(xs) {
    padding: 24px 15px;
  }

  &__title {
    font-weight: 500;
    font-size: 36px;
    color: $white-color;
    text-align: center;
    margin-bottom: 45px;
  }

  &__password-input-wrapper {
    position: relative;
    max-width: 420px;
  }

  &__forget-password-link {
    font-weight: 500;
    font-size: 14px;
    text-align: right;
    color: $light;
    position: absolute;
    top: 0;
    right: 0;
  }

  &__input {
    margin-bottom: 26px;
  }

  &__submit-btn {
    display: block;
    max-width: 180px;
    margin: 40px auto 43px auto;
  }

  &__error-message{
    color: $error-color;
    position: absolute;
    bottom: 150px;
  }
}

.reg-link {
  color: $grey-color;
  text-align: center;

  &__span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.375;
    text-decoration: underline;
    text-decoration-skip-ink: none;
    color: $light;
    margin-left: 5px;
  }
}
</style>
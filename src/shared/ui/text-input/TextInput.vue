<script lang="ts" setup="">
import {ref, useTemplateRef} from "vue";
import EyeIcon from "@/shared/assets/icons/eye-icon.vue";
import NonYeyIcon from "@/shared/assets/icons/non-eye-icon.vue";

const props = defineProps<{
  label: string,
  type: string,
  id: string,
  error?: string
}>()

const inputValue = defineModel()

const isPassword = props.type === 'password'
const isShow = ref(false)
const passwordRef = useTemplateRef<HTMLInputElement>('passwordInput')

function handelShowPassword() {
  isShow.value = !isShow.value
  if (passwordRef.value === null) return

  passwordRef.value.type = isShow.value ? 'text' : 'password'
}
</script>

<template>
  <div class="text-input">
    <label class="text-input__label" :for="props.id">{{ props.label }}</label>
    <input
        ref="passwordInput"
        v-model="inputValue"
        class="text-input__input"
        :type="props.type" :id="props.id"
        :placeholder="`Your ${props.label}`"
        :style="props.error?.length ? { border: '1px solid red' } : {}"
    >
    <div v-if="isPassword" @click="handelShowPassword" class="text-input__show-password-word">
      <non-yey-icon v-if="isShow"/>
      <eye-icon v-else/>

    </div>
    <div class="text-input__error">{{props.error}}</div>
  </div>

</template>

<style lang="scss">
.text-input {
  position: relative;
  max-width: 420px;
  width: 100%;

  &__label {
    font-family: $font-family;
    font-weight: 400;
    font-size: 14px;
    color: $white-color;
    margin-bottom: 5px;
    display: block;
  }

  &__input {
    font-family: $font-family;
    font-weight: 400;
    font-size: 16px;
    color: $grey-color;
    border-radius: 8px;
    padding: 16px;
    width: 100%;
    background: $grey-bg;

    &:-webkit-autofill,
    textarea:-webkit-autofill,
    select:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 100px $grey-bg inset;
      -webkit-text-fill-color: $grey-color;
    }
  }

  &__error{
    color: $error-color;
    position: absolute;
    bottom: -13px;
    font-size: 12px;
  }

  &__show-password-word{
    position: absolute;
    right: 16px;
    bottom: 5px;
  }
}
</style>
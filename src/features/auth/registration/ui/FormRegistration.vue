<script lang="ts" setup>
import {ref} from "vue";
import TextInput from "@/shared/ui/text-input/TextInput.vue";
import ColorBtn from "@/shared/ui/buttons/ui/ColorBtn.vue";
import AuthForm from "@/shared/ui/auth-form/ui/AuthForm.vue";
import {type UserRegistrationData} from "@/entities/user"
import {useRegistration} from "@/features/auth/registration/lib/useRegistration.ts";

const {errorMessage, loading, registerUser} = useRegistration();

const props = defineProps<{
  role: string
}>()


const userRegistrationData = ref<UserRegistrationData>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
});


async function handleSubmit() {
  await registerUser(userRegistrationData.value, props.role);
}
</script>

<template>
  <AuthForm>
    <template #title>Sign up</template>
    <template #input-block>
      <TextInput
          class="reg-input"
          v-model="userRegistrationData.firstName"
          :error="errorMessage.firstNameError"
          type="text" id="reg-first-name"
          label="First name"
      />
      <TextInput
          class="reg-input"
          v-model="userRegistrationData.lastName"
          :error="errorMessage.lastNameError"
          type="text" id="reg-last-name"
          label="Last Name"
      />
      <TextInput
          class="reg-input"
          v-model="userRegistrationData.email"
          :error="errorMessage.emailError"
          type="text" id="reg-email"
          label="Email"
      />


      <TextInput
          class="reg-input"
          v-model="userRegistrationData.password"
          :error="errorMessage.passwordError"
          type="password" id="login-password"
          label="Password"

      />

      <ColorBtn
          class="login-form__submit-btn"
          @click.prevent="handleSubmit"
          :disabled="loading"
          size="16"
          padding="15px 62px 11.5px 62px">
        {{ loading ? 'Loading' : 'Sign up' }}
      </ColorBtn>
    </template>

    <template #reg-link>
      Already have an account?
      <RouterLink
          :to="{name:`login-creator`}"
          class="reg-link__span">
        Sign in
      </RouterLink>
    </template>

    <template #errorMessage>
      {{ errorMessage.formError }}
    </template>
  </AuthForm>

</template>

<style lang="scss">
.reg-input {
  margin-bottom: 27px;
}
</style>
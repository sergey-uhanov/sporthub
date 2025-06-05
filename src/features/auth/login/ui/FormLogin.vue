<script lang="ts" setup>
import {inject, ref} from "vue";
import {type Auth, signInWithEmailAndPassword} from "firebase/auth";
import {useRoute, useRouter} from "vue-router";
import TextInput from "@/shared/ui/text-input/TextInput.vue";
import ColorBtn from "@/shared/ui/buttons/ui/ColorBtn.vue";
import * as yup from 'yup';
import AuthForm from "@/shared/ui/auth-form/ui/AuthForm.vue";
import {string} from "yup";

const auth = inject<Auth>('firebaseAuth')!;
const router = useRouter();
const route = useRoute();


const email = ref<string>('');
const password = ref<string>('');
const formError = ref<string>('');
const emailError = ref<string>('');
const passwordError = ref<string>('');
const loading = ref(false);

const loginSchema = yup.object({
  email: yup.string().email('Введите корректный email').required('Email обязателен'),
  password: yup.string().min(6, 'Пароль должен быть не менее 6 символов').required('Пароль обязателен'),
});

const props = defineProps<{
  role: string
}>()


const handleLog = async () => {
  formError.value = '';
  emailError.value = '';
  passwordError.value = '';
  loading.value = true;

  try {
    await loginSchema.validate({email: email.value, password: password.value}, {abortEarly: false});

     const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);


    const userData = userCredential.user;


    // todo
    //закончить логирование
    //сахранить данные о пользователе и сессии

    // await router.push({name: `${props.role}-home`});

  } catch (err: any) {

    if (err instanceof yup.ValidationError) {

      err.inner.forEach(error => {
        if (error.path === 'email') {
          emailError.value = error.message;
        }
        if (error.path === 'password') {
          passwordError.value = error.message;
        }
      });
    } else {

      console.error('Ошибка при аутентификации:', err);
      console.log(err)
      formError.value = 'Неверный емайл или пароль';
    }
  } finally {
     loading.value = false;
  }
};
</script>

<template>
  <AuthForm  >
    <template #title>Sign up</template>
    <template #input-block>
      <TextInput
          class="login-form__input"
          v-model="email"
          :error="emailError"
          type="text" id="login-email"
          label="Email"
      />

      <div class="login-form__password-input-wrapper">
        <TextInput
            v-model="password"
            :error="passwordError"
            type="password" id="login-password"
            label="Password"
        />

        <RouterLink
            :to="{name:`${route.meta.forgotPage}`}"
            class="login-form__forget-password-link"
        >
          Forgot password?
        </RouterLink>
      </div>
      <ColorBtn
          class="login-form__submit-btn"
          @click.prevent="handleLog"
          :disabled="loading"
          size="16"
          padding="11.5px 65px">
        {{ loading ? 'Loading' : 'Sign in' }}
      </ColorBtn>
    </template>
    <template #reg-link>
      Don’t have an account?
      <RouterLink
          :to="{name:`${route.meta.forgotPage}`}"
          class="reg-link__span">
        Sign up
      </RouterLink>
    </template>
    <template #errorMessage>
      {{formError}}
    </template>
  </AuthForm>

</template>

<style lang="scss">

</style>
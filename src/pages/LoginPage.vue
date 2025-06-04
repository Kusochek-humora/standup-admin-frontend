<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'
const email = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    })

    router.push('/admin-panel')
  } catch (error) {
    alert('Неверный логин или пароль')
    console.error(error)
  }
}
</script>
<template>
  <section class="page">
    <a style="margin: 40px 0 0 0" href="https://test-standup.ru/" target="_blank">
      <img src="../assets/images/logo.svg" alt="logo" />
    </a>

    <form class="login" @submit.prevent="handleLogin">
      <h1 class="login__title title">Авторизация</h1>
      <input class="login__ipt" type="text" placeholder="Логин" v-model="email" />
      <input class="login__ipt" type="password" placeholder="Пароль" v-model="password" />
      <button type="submit" class="login__btn">Войти</button>
    </form>
  </section>
</template>
<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 0 20px;

  background: $bg;


}
.login {
  border: 2px solid rgba(255, 255, 255, 1);
  border-radius: 20px;
  height: 330px;
  max-width: 450px;
  width: 100%;
  margin-top: 150px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title {
    color: $yellow;
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  &__ipt {
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    height: 50px;
    padding: 15px 20px;
    width: 100%;
    background-color: transparent;
    &:first-of-type {
      margin-bottom: 20px;
    }
    &::placeholder {
      color: rgba(131, 133, 168, 1);
      font-size: 16px;
    }
  }

  &__btn {
    background-color: $yellow;
    padding: 10px;
    border-radius: 10px;
    max-width: 180px;
    width: 100%;
    height: 50px;

    margin-top: 20px;
    font-weight: 600;
    color: $black;
  }
}
</style>

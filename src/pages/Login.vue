<template>
  <div class="login-container">
    <q-card class="login-card">
      <h2 class="text-center">Agenda Pessoal</h2>
      <q-form class="login-form">
        <q-input
          outlined 
          label="Username"
          class="form_input"
          v-model="username" 
          placeholder="luiza"
          :rules="[val => !!val || 'Username é obrigatório']"
        />
        <q-input
          outlined 
          label="Senha"
          class="form_input"
          v-model="password" 
          placeholder="*****"
          :type="isPwd ? 'password' : 'text'" 
          :rules="[val => !!val || 'Senha é obrigatório']"
        />
        <q-btn 
          label="Salvar"
          type="submit"
          class="login-btn"
        />
      </q-form>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>

<style scoped>
  .login-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #6CA0D2;
  }
  .login-card {
    padding: 2rem;
    width: 25.25rem;
  }
  .form_input {
    padding: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1rem;
  }
  .login-btn {
    background: #98bfdc; 
    color: white;
    width: 100%;
  }
</style>
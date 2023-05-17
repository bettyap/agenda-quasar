<template>
  <div class="login-container">
    <q-card class="login-card">
      <h2 class="text-center">Agenda Pessoal</h2>
      <q-form class="login-form" @submit="login">
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
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
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
import api from '../services/api.js'
import { defineComponent } from 'vue'
import { Notify } from 'quasar'
export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      username: this.username,
      password: this.password,
      isPwd: true
    }
  },
  methods: {
    login(event) {
      event.preventDefault()

      api.post('/auth/login', {
        username: this.username,
        password: this.password
      }).then(response => {
        const data = response.data

        localStorage.setItem("token", data.accessToken);
        api.defaults.headers.common['Authorization'] = "Bearer " + data.accessToken;

        api.get('/usuario/buscar/' + data.id).then(userResponse => {
          if (userResponse.status == 200) {
            localStorage.setItem("user", JSON.stringify(userResponse.data.object.usuario))
            this.$router.push('/')
          }
        })

      }).catch((_error) => {
        Notify.create({
          message: 'Algo deu errado!',
          color: 'negative',
          position: 'top-right',
          type: 'negative',
          actions: [{ icon: 'close', color: 'white' }]
        })
      }) 
    }
  }
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
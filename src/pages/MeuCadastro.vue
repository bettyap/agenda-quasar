<template>
  <q-page class="meu-cadastro-container">
    <q-card class="meu-cadastro-card">
      <h2>Minhas Informações</h2>
      <q-form class="meu-cadastro-content" @submit="atualizarCadastro">
        <q-input 
          outlined
          v-model="nome"
          label="Nome"
          :rules="[val => !!val || 'Nome é obrigatório']"
        />
        <q-input 
          outlined
          v-model="cpf"
          label="CPF"
          mask="###.###.###-##"
          :rules="[val => !!val || 'CPF é obrigatório']"
        />
        <q-input 
          outlined
          v-model="dataNascimento"
          label="Data de Nascimento"
          type="date"
          :rules="[val => !!val || 'Data de Nascimento é obrigatório']"
        />
        <q-input 
          outlined
          v-model="email"
          label="Email"
          type="email"
          :rules="[val => !!val || 'Email é obrigatório']"
        />
        <q-input 
          outlined
          v-model="telefone"
          label="Telefone"
          type="(##)#####-####"
          :rules="[val => !!val || 'Telefone é obrigatório']"
        />
        <q-input 
          outlined
          v-model="username"
          label="Username"
          :rules="[val => !!val || 'Username é obrigatório']"
        />
        <q-btn 
          label="Salvar"
          type="submit"
          class="meu-cadastro-btn"
        />
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import api from '../services/api.js'
import { Notify } from 'quasar'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MeuCadastro',
  data() {
    return {
      nome: "",
      cpf: "",
      dataNascimento: "",
      telefone: "",
      email: "",
      username: ""
    }
  },
  mounted() {
    let userInfo = localStorage.getItem("user")
    userInfo = JSON.parse(userInfo)
    this.cpf = userInfo.cpf
    this.dataNascimento = userInfo.dataNascimento
    this.nome = userInfo.nome
    this.telefone = userInfo.telefone
    this.email = userInfo.email
    this.username = userInfo.username
    this.password = userInfo.password
    this.id =  userInfo.id
  },
  methods: {
    atualizarCadastro(event){
      event.preventDefault()

      api.put('/usuario/atualizar',{
        cpf: this.cpf,
        dataNascimento: this.dataNascimento,
        email: this.email,
        id: this.id,
        nome: this.nome,
        password: this.password,
        telefone: this.telefone,
        username: this.username
      }).then( response => {
        if (response.status == 200) {
          Notify.create({
            message: 'Atualizado com sucesso!',
            color: 'positive',
            position: 'top-right',
            type: 'positive',
            actions: [{ icon: 'close', color: 'white' }]
          })

          localStorage.setItem("user", JSON.stringify(response.data.object))
        }
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
  .meu-cadastro-container {
    width: 100%;
    background: #E1EAFB;
    padding: 2rem;
  }
  .meu-cadastro-card {
    padding: 2rem;
  }
  .meu-cadastro-content {
    width: 50%;
  }
  .meu-cadastro-btn {
    background: #98bfdc; 
    color: white;
    width: 100%;
  }
</style>
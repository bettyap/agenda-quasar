<template>
  <q-page class="cadastrar-pessoa-container">
    <q-card class="cadastrar-pessoa-card">
      <h3>Pessoa</h3>
      <q-form class="cadastrar-pessoa-content" @submit="onSubmit">
        <label>Adicionar foto</label>
        <img v-if="preview" :src="preview" alt="Preview" class="foto-preview">
        <input type="file" ref="fileInput" @change="previewImage" class="form-input"/>
        <q-input 
          outlined 
          v-model="nome" 
          label="Nome *" 
          :rules="[val => !!val || 'Nome é obrigatório']"
        />
        <q-input 
          outlined 
          v-model="cpf" 
          label="CPF *"
          mask="###.###.###-##"
          :rules="[val => !!val || 'CPF é obrigatório']"
        />
        <q-input 
          outlined 
          v-model="endereco.pais"
          label="País *" 
          :rules="[val => !!val || 'País é obrigatório']"
        />
        <q-input 
          outlined 
          v-model="endereco.estado"
          label="Estado *" 
          :rules="[val => !!val || 'Estado é obrigatório']"
        />
        <q-input 
          outlined 
          v-model="endereco.cep"
          label="CEP *"
          mask="#####-###"
          :rules="[val => !!val || 'CEP é obrigatório']"
        />
        <q-input 
          outlined 
          v-model="endereco.cidade" 
          label="Cidade *" 
          :rules="[val => !!val || 'Cidade é obrigatório']"
        />
        <q-input 
          outlined 
          v-model="endereco.bairro" 
          label="Bairro *" 
          :rules="[val => !!val || 'Bairro é obrigatório']"
        />
        <q-input 
          outlined 
          v-model="endereco.logradouro"
          label="Endereço *" 
          :rules="[val => !!val || 'Endereço é obrigatório']"
        />
        <q-input 
          outlined 
          v-model="endereco.numero"
          label="Número *" 
          :rules="[val => !!val || 'Número é obrigatório']"
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
  name: 'CadastrarPessoa',
  data() {
    return {
      id: "",
      nome: "",
      cpf: "",
      endereco: {
        id: "",
        bairro: "",
        cep: "",
        cidade: "",
        estado: "",
        logradouro: "",
        numero: "",
        pais: ""
      },
      preview: null,
    }
  },
  props: {
    person: {
      type: Object,
      default() {
        return null
      }
    }
  },
  mounted() {
    if( this.person !== null ) {
      // this.id = this.person.id
      this.nome = this.person.nome
      this.cpf = this.person.cpf
      this.endereco.id = this.person.endereco.id
      this.endereco.cep = this.person.endereco.cep
      this.endereco.bairro = this.person.endereco.bairro
      this.endereco.cidade = this.person.endereco.cidade
      this.endereco.estado = this.person.endereco.estado
      this.endereco.logradouro = this.person.endereco.logradouro
      this.endereco.numero = this.person.endereco.numero
      this.endereco.pais = this.person.endereco.pais
    }
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()

      let pessoa = await this.criarCadastroPessoa()
      
      if(this.$refs.fileInput.files.length !== 0){
        let upload = await this.onUpload(pessoa.data.object.id)
      }

      this.$emit('completed')
    },
    async criarCadastroPessoa() {
      let response = null

      try {
        response = await api.post('/pessoa/salvar', {
          id: this.id,
          nome: this.nome,
          cpf: this.cpf,
          endereco: {
            id: this.endereco.id,
            bairro: this.endereco.bairro,
            cep:  this.endereco.cep,
            cidade: this.endereco.cidade,
            estado: this.endereco.estado,
            logradouro: this.endereco.logradouro,
            numero: this.endereco.numero,
            pais: this.endereco.pais
          }
        })
        Notify.create({
          message: 'Realizado com sucesso!',
          color: 'positive',
          position: 'top-right',
          type: 'positive',
          actions: [{ icon: 'close', color: 'white' }]
        })
      } catch (error) {
        Notify.create({
          message: 'Algo deu errado!',
          color: 'negative',
          position: 'top-right',
          type: 'negative',
          actions: [{ icon: 'close', color: 'white' }]
        })
        console.error(error)
      }
      return response 
    },

    previewImage(event) {
      const file = event.target.files[0];
      if (file && file.type.includes('image/')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.preview = reader.result;
          this.file = file;
        };
      }
    },

    async onUpload(id) {
      const formData = new FormData()
      formData.append('foto', this.$refs.fileInput.files[0])

      let response = null

      try {
        response = await api.post(`/foto/upload/${id}`, formData)
      } catch (error) {
        console.error(error);
      }
      return response
    }
  }
})
</script>

<style scoped>
  .cadastrar-pessoa-container {
    width: 100%;
    background: #E1EAFB;
    padding: 2rem;
  }
  .cadastrar-pessoa-card {
    padding: 2rem;
  }
  .cadastrar-pessoa-content {
    width: 50%;
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
  }
  .foto-preview {
    width: 4rem;
    height: 4rem;
    margin: 0.5rem 0px;
  }
  .form-input {
    margin-bottom: 1rem;
  }
  .meu-cadastro-btn {
    background: #98bfdc; 
    color: white;
    width: 100%;
  }
</style>
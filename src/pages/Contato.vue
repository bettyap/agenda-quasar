<template>
  <q-page class="contato-container">
    <q-card class="contato-card">
      <div class="contato-card-content">
        <div class="contato-content" v-for="(contato, index) in contatos" :key="index">
          <div v-if="!contato.isEditing" class="contato-input">
            <p>{{contato.contatoTipo}}</p>
            <p>{{contato.value}}</p>
            <p>Descrição: {{contato.descricao}}</p>
            <q-btn
              outline
              type="button"
              class="contato-input-button"
              @click="editarContato(contato)"
            >
              Editar
            </q-btn>
            <hr class="contato-input-row"/>
          </div>
          <div v-else class="contato-input">
            <div class="contato-input-content__select">
              <q-select :options="opcoes" v-model="contato.contatoTipo" />
            </div>
            <div class="contato-input-content__input">
              <q-input 
                v-if="contato.contatoTipo != 'Escolha o tipo de contato'" 
                v-model="contato.value"
                :mask="contatoMasks[contato.contatoTipo]"
                outlined 
              />
            </div>
            <q-input
              v-if="contato.contatoTipo != 'Escolha o tipo de contato'"
              outlined 
              v-model="contato.descricao" 
              label="Descrição"
              placeholder="Ex: Casa, Principal, WhatsApp..."
            />
            <hr class="contato-input-row"/>
          </div>
          
          <div class="icons">
            <q-icon name="favorite_border" size="1.5rem" @click="toggleFavorito(contato)"/>
            <q-icon name="delete_outline" size="1.5rem" @click="removerContato(contato,index)" />
          </div>
        </div>
        
        <q-btn
          outline
          type="button"
          class="contato-input-button"
          @click="adicionarContato()"
        >
          Adicionar Mais
        </q-btn>
      </div>
      <q-btn 
        label="Salvar"
        type="submit"
        class="contato-btn"
        @click="cadastrarContato()"
      />
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
      contatos: [
        {
          isEditing: true,
          contatoTipo: 'Escolha o tipo de contato',
          value: '',
          descricao: '',
          privado: false,
          favorito: false,
        },
      ],
      contatoMasks: {
        'CELULAR': '(##)#####-####',
        'EMAIL': '',
        'TELEFONE': '(##)####-####'
      },
      opcoes: [
        'Escolha o tipo de contato', 'CELULAR', 'EMAIL', 'TELEFONE'
      ]
    };
  },
  async mounted() {
    const pessoaId  = this.$route.params.id
    let response = await api.get('/contato/listar/' + pessoaId)

    let contatos = response.data

    if (contatos.length){
      this.contatos = contatos.map(contato => {

        let value = ""
        if (contato.tipoContato === "EMAIL") {
          value = contato.email
        } else {
          value = contato.telefone
        }

        return {
          id: contato.id,
          descricao: contato.tag,
          contatoTipo: contato.tipoContato,
          privado: contato.privado,
          favorito: false,
          value: value,
          isEditing: false
        }
      })
    }
  },
  methods: {
    adicionarContato() {
      this.contatos.push({
        isEditing: true,
        contatoTipo: 'Escolha o tipo de contato',
        value: '',
        descricao: '',
      });
    },
    async removerContato(contato,index) {
      if (contato.id) {
        try {
          api.delete(`/contato/remover/${contato.id}`)
          Notify.create({
            message: 'Contato excluído com sucesso!',
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
      }
      this.contatos.splice(index, 1)
    },
    async cadastrarContato() {
      for(let contato of this.contatos) {
        const pessoaId  = this.$route.params.id

        if(!contato.isEditing) {
          continue
        }

        let email = null
        let telefone = null

        if (contato.contatoTipo === "EMAIL") {
          email = contato.value
        } else {
          telefone = contato.value 
        }

        let usuario = localStorage.getItem("user")
        usuario = JSON.parse(usuario)

        let contatoRequest = {
          tag: contato.descricao,
          privado: contato.privado,
          favorito: contato.favorito,
          email: email,
          telefone: telefone,
          tipoContato: contato.contatoTipo,
          pessoa: {
            id: pessoaId
          },
          usuario: {
            id: usuario.id
          }
        }

        if(contato.id) {
          contatoRequest.id = contato.id
        }

        try {
          let response = await api.post('/contato/salvar', contatoRequest)
          Notify.create({
            message: 'Contato criado com sucesso!',
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
      } 
    },
    editarContato(contato) {
      contato.isEditing = true
    },
    async toggleFavorito(contato) {
      let usuario = localStorage.getItem("user")
      usuario = JSON.parse(usuario)
      console.log(contato)
      
      if(!contato.favorito){
        try {
          let response = await api.post('/favorito/salvar', {
            id: contato.id,
            pessoa: {
              id: this.pessoaContato.id
            },
            usuario: {
              id: usuario.id
            }
          })
          contato.favorito = true
        } catch (error) {
          console.error(error)
        }
      } else {
        try {
          await api.delete(`/favorito/remover/${contato.id}`)
          contato.favorito = false
        } catch (error) {
          console.error(error)
        }  
      }
    }
  } 
})
</script>

<style scoped>
  .contato-container {
    width: 100%;
    background: #E1EAFB;
    padding: 2rem;
  }
  .contato-card {
    padding: 2rem;
  }
  .contato-card-content{
    margin-bottom: 1rem;
  }
  .contato-content {
    display: flex;
  }
  .contato-input {
    flex: 1;
  }
  .icons {
    display: flex;
    gap: 0.25rem;
    color: #6da1d2;
    cursor: pointer;
  }
  .contato-input-button {
    color: #98bfdc;
  }
  .contato-input-row {
    margin: 1rem 0;
  }
  .contato-input-content__input {
    margin: 1rem 0;
  }
  .contato-btn {
    background: #98bfdc; 
    color: white;
    width: 100%;
  }
</style>
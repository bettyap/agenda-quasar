<template>
  <q-page class="flex home-container">
    <main class="home-content">
      <section class="home-content-section">
        <div class="home-container-div">
          <q-card v-for="pessoa in listaPessoas" :key="pessoa.id" class="home-container-card">
            <q-card-section class="home-content-card">
              <q-avatar size="5.25rem" v-if="pessoa.foto">
                <img class="avatar" :src="pessoa.foto" alt="">
              </q-avatar>
              <q-avatar v-else>
                <img class="avatar" alt="">
              </q-avatar>
              
              <div class="home-card-info">
                <span>{{pessoa.nome}}</span>
                <span>{{pessoa.cpf}}</span>
                <div class="home-card-info-row">
                  <span>{{pessoa.endereco.cep}}</span>
                  <span>{{pessoa.endereco.cidade}}</span> 
                  <span>{{pessoa.endereco.estado}}</span>
                </div>
                <div class="icons">
                  <router-link :to="`/contato/${pessoa.id}`">
                    <q-icon name="add" size="1.5rem" />
                    <span>Contato</span>
                  </router-link>
                </div>
              </div>
              <div class="icons">
                <router-link :to="`/pessoa/${pessoa.id}`">
                  <q-icon 
                    name="mode_edit_outline"
                    size="1.5rem"
                  />
                </router-link>
                <q-icon 
                  name="delete_outline"
                  size="1.5rem"
                  id="show-modal-confirmation"  
                  @click="showConfirmationModal(pessoa)"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="container-add">
          <q-btn 
            label="Adicionar"
            class="button-add"
            id="show-modal" 
            @click="mostrarPerson(null)" 
          />
        </div>
      </section>
    </main>
  </q-page>
</template>

<script>
import api from '../services/api.js'
import { Dialog, Notify } from 'quasar'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      busca: '',
      listaPessoas: [],
      showModal: false,
      showModalConfirmation: false,
      showModalContact: false,
      currentPerson: null,
      personDelete: null,
      pessoaContatoEditar: null
    }
  },
  mounted () {
    this.infoUser()
  },
  methods: {
    onSearchInput (value) {
      this.busca = value
      this.infoUser()
    },
    async infoUser() {
      try {
        let response = await api.post('/pessoa/pesquisar',{
          nome: this.busca
        })
        this.listaPessoas = response.data
        for(let pessoa of this.listaPessoas) {
          let fotoResponse = await api.get(`/foto/download/${pessoa.id}`, {
            responseType: 'blob'
          })
          pessoa.foto = URL.createObjectURL(fotoResponse.data)
          
        }
      }catch(error) {
        console.error(error);
      }
    },
    onCompleted() {
      this.infoUser()
    },
    showConfirmationModal(pessoa) {
      Dialog.create({
        title: 'Confirmar',
        message: 'Você tem certeza que deseja excluir?',
        ok:{
          push: true,
          color: 'primary'
        },
        cancel: {
          push: true,
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        this.personDelete = pessoa
        this.onDelete(this.personDelete)
      })
    },
    async onDelete(pessoa) {
      try {
        let response = await api.delete(`/pessoa/remover/${pessoa.id}`)
        if (response.status == 200) {
          this.infoUser()
          Notify.create({
            message: 'Pessoa excluída com sucesso!',
            color: 'positive',
            position: 'top-right',
            type: 'positive',
            actions: [{ icon: 'close', color: 'white' }]
          })
        } 
      } catch(error) {
        Notify.create({
          message: 'Algo deu errado, lista de contatos existentes!',
          color: 'negative',
          position: 'top-right',
          type: 'negative',
          actions: [{ icon: 'close', color: 'white' }]
        })
        console.error(error)
      } finally {
        this.showModalConfirmation = false
      }
    },
    async showContactModal(pessoa) {
      let contatoResponse = await api.get(`/contato/listar/${pessoa.id}`)
      pessoa.contatos = contatoResponse.data

      this.showModalContact = true
      this.pessoaContatoEditar = pessoa
    },
    onCreateContact() {
      this.showModalContact = false
      this.infoUser()
    },
  }
})
</script>

<style scoped>
  .home-container {
    width: 100%;
    background: #E1EAFB;
  }
  .home-content {
    width: 100%;
    display: flex;
  }
  .home-content-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 3rem;
    overflow: auto;
  }
  .home-container-div {
    display: grid;
    grid-template-columns: auto auto;
  }
  .home-container-card{
    margin: 1rem;
  }
  .home-content-card {
    display: flex;
    padding: 1rem;
  }
  .home-content-card:hover {
    box-shadow: 0 3px 6px 0 rgba(0,0,0,0.2);
  }
  .avatar{
    width: 6.25rem;
    height: 6rem;
    border-radius: 50%;
  }
  .home-card-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 0.5rem;
    gap: 0.5rem;
  }
  .icons {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    height: 1.25rem;
    cursor: pointer;
    color: #6da1d2;
  }
  .icons a {
    color: #6da1d2;
  }
  .icons i {
    transition: transform .1s ease;
  }
  .icons i:hover {
    color: #98bfdc;
    transform: translateY(-3px);
  }
  .home-card-info-row {
    display: flex;
    gap: 2rem;
  }
  .modal-container-btn {
    display: flex;
    gap: 2rem;
  }
  .container-add {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
  .button-add {
    width: 20%;
    background: #98bfdc; 
    color: white;
  }
  @media(max-width: 880px){
    .home-content {
      flex-direction: column;
    }
    .home-content-section {
      padding: 0.4rem;
    }
    .home-container-div {
      grid-template-columns: auto;
      margin-top: 1rem;
    }
    .home-content-card {
      padding: 0.5rem;
      margin: 0.5rem 0.5rem;
      height: 9rem;
    }
    .avatar {
      width: 4.25rem;
      height: 4rem;
    }
    .icons {
      gap: 0.4rem
    }
  }
</style>
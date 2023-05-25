<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Agenda com Quasar
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-primary"
    >
      <q-list class="text-white">

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      essentialLinks: [
        {
          title: 'Home',
          icon: 'home',
          link: '/'
        },
        {
          title: 'Meu Cadastro',
          icon: 'person',
          link: '/meucadastro'
        },
        {
          title: 'Pessoa',
          icon: 'person',
          link: '/pessoa'
        },
        {
          title: 'Sair',
          icon: 'logout',
          click: this.handleLogout
        },
      ],
      leftDrawerOpen: false
    }
  },
  components: {
    EssentialLink
  },
  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    handleLogout(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  }
})
</script>

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/pessoa/:id?', component: () => import('src/pages/Pessoa.vue') },
      { path: '/contato/:id', component: () => import('src/pages/Contato.vue') },
      { path: '/meucadastro', component: () => import('pages/MeuCadastro.vue') },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }

]

export default routes

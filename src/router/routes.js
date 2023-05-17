const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/cadastrarpessoa', component: () => import('pages/CadastrarPessoa.vue') },
      { path: '/meucadastro', component: () => import('pages/MeuCadastro.vue') },
    ]
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }

]

  // router.beforeEach((to, _from, next) => {
  //   const isAuthenticated = localStorage.getItem("token") ? true : false

  //   if (to.name !== 'login' && !isAuthenticated){
  //     next({ name: 'login' })
  //   } else {
  //     next()
  //   }
  // })

export default routes

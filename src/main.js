// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//import the vue instance
import Vue from 'vue'
//importar o vue router
import VueRouter from 'vue-router'
//import the App component
import App from './App'
//importar o componente Agendar
import Agendar from './components/Agendar'
//importar o componente Login
import Login from './components/Login'

//Diga ao vue para usar o router.
Vue.use(VueRouter)

//defina suas rotas
const routes = [
  //defina a url raíz da aplicação
  {path: '/', component: Login },
  {path: '/agendar', component: Agendar},
]

// Criar a instancia do router e passar a opção de 'routes'
// Você pode colocar opções adicionais aqui, Mas vamos
// deixar isso assim por enquanto

const router = new VueRouter({
  routes, // ->  routes: routes
  mode: 'history'
})

new Vue({
  //passar o router para a instância do vue.
  router,
  //passar o template para o componente raíz
  template: '<App/>',
  //declarar componentes que o componente raiz pode acessar
  components: { App },
}).$mount('#app')//montará o router no app
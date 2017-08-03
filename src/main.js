// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import the vue instance
import Vue from 'vue'
//import the App component
import App from './App'
//importar o componente Agendar
import Agendar from './components/Agendar'
//importar o componente Agendamentos
import Agendamentos from './components/Agendamentos'
//importar o componente Login
import Login from './components/Login'
//importar o vue router
import VueRouter from 'vue-router'

//Diga ao vue para usar o router.
Vue.use(VueRouter)

//defina suas rotas
const routes = [
  //defina a url raíz da aplicação
  { path: '/', component: Login },
  {path: '/agendar', component: Agendar},
  {path: '/agendamentos', component: Agendamentos},
]

// Criar a instancia do router e passar a opção de 'routes'
// Você pode colocar opções adicionais aqui, Mas vamos
// deixar isso assim por enquanto

const router = new VueRouter({
  routes, // ->  routes: routes
  mode: 'history'
})

//instantinat the vue instance
new Vue({
  //defina o seletor para o componente raíz
  el: '#app',
  //passar o template para o componente raíz
  template: '<App/>',
  //declarar componentes que o componente raiz pode acessar
  components: { App },
  //passar o router para a instância do vue.
  router
}).$mount('#app')//montará o router no app
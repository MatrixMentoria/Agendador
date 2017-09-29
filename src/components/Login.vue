<template>
  <div class="mascara">
    <div class="backgroundImage">
       <div id="login">
          <div class="navbar-fixed">
              <nav id="nav_f" class="red darken-4" role="navigation">
              <a href="http://www.unicarioca.edu.br/" id="logo-container" target="_blank" class="brand-logo center" alt="UniCarioca">Agendamento de Provas</a>
              </nav>
          </div>
          <div id='formContainer'>
              <form id="formulario" class="container card-panel col s12 m12 l12">
                  <h4 class="center-align">Entrar</h4>

                  <div class="input-field col s12">
                      <i class="material-icons prefix">account_circle</i>
                      <input v-model="email" id="icon_prefix" type="email" class="validate" required>
                      <label for="text" data-error="incorreto" data-success="ok">E-mail: </label>
                  </div>

                  <div class="input-field col s12">
                      <i class="material-icons prefix">edit</i>
                      <input @keyup.enter="login" v-model="senha" id="icon_prefix" type="password" class="validate" required>
                      <label for="password" data-error="incorreto" data-success="ok">Senha:</label>
                  </div>

                  <div class="row center">
                      <a @click="login" class="red darken-4 waves-effect waves-light btn">Entrar</a>
                  </div>
              </form>
            </div><!--formContainer--> 
        </div><!--login-->
    </div><!--backGroundImage-->
  </div><!--opacidade do background-->
</template>

<style>
  .backgroundImage{
    background: url(./background.jpg) no-repeat;
    background-size: cover;
    height: 100vmin;
  }

  #formulario{
    background-color: #fff; 
    padding: 10px; 
    min-width: 100px;
    max-width: 400px;
  }

  #formContainer{
    height: 90vmin;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .mascara{
    background-color: rgba(50,50,50,0.2);
  }

</style>

<script>
import {firebase} from '../Firebase'

export default {
  name: 'login',
  data() {
    return {
      email: '',
      senha: '',
    }
  },
  beforeCreate: function() {
    firebase.auth().signOut();
  },
  methods: {
    login: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.senha).then(function(){
        if (firebase.auth().currentUser.displayName == "adm") {
          window.location.href = "/cadastrar"
        } else {
          window.location.href = "/agendar";
        }
      }).catch(function(error) {
        console.log(error);
        if (error.code == "auth/invalid-email") {
          alert("E-mail inválido");
        } else if(error.code == "auth/wrong-password") {
          alert("E-mail ou senha incorreto");
        } else if(error.code == "auth/user-not-found") {
          alert("E-mail não cadastrado");
        } else {
          alert(error);
        }
    });
    },
  }
}
</script>



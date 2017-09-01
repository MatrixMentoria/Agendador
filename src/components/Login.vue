<template>
  <div id="login">
    <div class="navbar-fixed">
      <nav id="nav_f" class="red darken-4" role="navigation">
        <a href="http://www.unicarioca.edu.br/" id="logo-container" target="_blank" class="brand-logo center" alt="UniCarioca">Agendamento de Provas</a>
      </nav>
    </div>
    <div class="container">
      <form id="formulario">
        <div class="row">
          <p class="center-align" id="loginEstud"><strong>Entrar</strong></p>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">account_circle</i>
            <input v-model="email" id="icon_prefix" type="email" class="validate" required>
            <label for="text" data-error="incorreto" data-success="ok">E-mail: </label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">edit</i>
            <input v-model="senha" id="icon_prefix" type="password" class="validate" required>
            <label for="password" data-error="incorreto" data-success="ok">Senha:</label>
          </div>
        </div>

        <div class="row center">
            <a @click="login" class="red darken-4 waves-effect waves-light btn">Entrar</a>
            <a @click="signup" class="red darken-4 waves-effect waves-light btn">Cadastrar Usuário</a>
        </div>
      </form>
    </div>
  </div>
</template>


<style>
    #loginEstud {
      font-size: 25px;
    }
</style>

<<script>
import {firebaseauth} from '../FirebaseAuth'
import sMDAJSON from '../sMDA.json'

export default {
  name: 'login',
  data() {
    return {
      email: '',
      senha: '',
      smdajson: sMDAJSON,
    }
  },
  /*for (var i = 0; i < smdaLenght; i++) {
          if(user.uid == this.smdajson.smda[i].smdaCode){
            window.location.href = "/cadastrar";
          }
        }*/
  created: function() {
    firebaseauth.signOut();
    var smdaLenght = Object.keys(this.smdajson.smda).length;
    var smdaFirebase = this.smdajson;
    firebaseauth.onAuthStateChanged(function(user) {
    if (user) {
      for (var i = 0; i < smdaLenght; i++) {
        if (user.uid == smdaFirebase.smda[i].smdaCode){
            window.location.href = "/cadastrar";
        }
      }
    } 
});
  },
  methods: {
    login: function () {
      firebaseauth.signInWithEmailAndPassword(this.email, this.senha).then(function(){
        window.location.href = "/agendar";
      }).catch(function(error) {
      alert("email ou senha incorreto");
    });
    },
    signup: function () {
      firebaseauth.createUserWithEmailAndPassword(this.email, this.senha).then(function(){
        alert("Cadastrado com sucesso");
      }).catch(function(error) {
      alert("erro ao cadastrar, verifique se as informações estão corretas");
      });
    }
  }
}
</script>



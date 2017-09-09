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
            <input @keyup.enter="login" v-model="senha" id="icon_prefix" type="password" class="validate" required>
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
import {firebase} from '../Firebase'
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
  created: function() {
    firebase.auth().signOut();
    var smdaLenght = Object.keys(this.smdajson.smda).length;
    var smdaFirebase = this.smdajson;
    firebase.auth().onAuthStateChanged(function(user) {
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
      firebase.auth().signInWithEmailAndPassword(this.email, this.senha).then(function(){
        window.location.href = "/agendar";
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
    signup: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.senha).then(function(){
        alert("Cadastrado com sucesso");
      }).catch(function(error) {
        if (error.code == "auth/invalid-email") {
          alert("E-mail Inválido");
        } else if (error.code == "auth/weak-password") {
          alert("A senha deve conter no mínimo 6 caracteres");
        } else if (error.code == "auth/email-already-in-use") {
          alert("E-mail já cadastrado");
        } else {
          alert(error);
        }
      });
    }
  }
}
</script>



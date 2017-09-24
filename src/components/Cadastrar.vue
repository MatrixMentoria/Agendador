<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <filtro></filtro>
      <tabela></tabela>
      
      <div class="fixed-action-btn">
        <a class="btn-floating btn-large red darken-4 modal-trigger" href="#modalNovo">
          <i class="large material-icons">add</i>
        </a>
      </div>
      <modal-novo></modal-novo>
    </div>
  </div>
</template>

<script>
import {firebase} from '../Firebase'
import Navbar from './CadastrarComponents/Navbar';
import Filtro from './CadastrarComponents/Filtro';
import Tabela from './CadastrarComponents/Tabela';
import ModalNovo from './CadastrarComponents/ModalNovo';

export default {
  name:'cadastrar',
    components: {
      Navbar,
      Filtro,
      Tabela,
      ModalNovo
    },
    beforeCreate: function() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user){
          if (user.displayName !== "adm") {
            alert("Você não tem permissão para acessar essa página");
            window.location.href = "/agendar";
          }
        } else {
          window.location.href = "/";
        }
      });
    },
    mounted: function() {
      $(".button-collapse").sideNav();
      $('.modal').modal();
    }
}
</script>

<style>
    #textoAjuda {
        font-size: 25px;
    }
</style>



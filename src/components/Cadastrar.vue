<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <filtro></filtro>
      <tabela></tabela>
    </div>
  </div>
</template>

<script>
import {firebaseauth} from '../FirebaseAuth'
import Navbar from './CadastrarComponents/Navbar';
import Filtro from './CadastrarComponents/Filtro';
import Tabela from './CadastrarComponents/Tabela';


export default {
  name:'cadastrar',
    components: {
      Navbar,
      Filtro,
      Tabela,
      //NovoCadastro,
    },
      mounted: function() {
        $(".button-collapse").sideNav();
    },
    beforeCreate: function() {
        firebaseauth.onAuthStateChanged(function(user) {
            if (!user) {
            alert("deslogado, entre para poder acessar essa página");
            window.location.href = "/";
            }
        });
    }
}
</script>

<style>
    #textoAjuda {
        font-size: 25px;
    }
</style>



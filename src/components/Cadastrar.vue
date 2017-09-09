<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <filtro></filtro>
      <tabela></tabela>
      
      <div class="fixed-action-btn">
        <a class="btn-floating btn-large red darken-4 modal-trigger" href="#modalAdd">
          <i class="large material-icons">mode_edit</i>
        </a>
      </div>
      <novo-cadastro></novo-cadastro>
    </div>
  </div>
</template>

<script>
import {firebase} from '../Firebase'
import Navbar from './CadastrarComponents/Navbar';
import Filtro from './CadastrarComponents/Filtro';
import Tabela from './CadastrarComponents/Tabela';
import NovoCadastro from './CadastrarComponents/NovoCadastro';
import sMDAJSON from '../sMDA.json'

export default {
  name:'cadastrar',
    components: {
      Navbar,
      Filtro,
      Tabela,
      NovoCadastro
    },
    data() {
      return {
        smdajson: sMDAJSON,
      }
    },
      mounted: function() {
        $(".button-collapse").sideNav();
        $('.modal').modal();
    },
    created: function() {
      var smdaLenght = Object.keys(this.smdajson.smda).length;
      var smdaFirebase = this.smdajson;
      var smda = false;
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
            window.location.href = "/";
            }
            for (var i = 0; i < smdaLenght; i++) {
              if (user.uid == smdaFirebase.smda[i].smdaCode){
                smda = true;
              }
            }
            if (smda === false) {
              alert("Você não tem permissão para acessar essa página");
              window.location.href = "/agendar";
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



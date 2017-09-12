<template>
  <div id="agendar">
    <navbar></navbar>
    <lista-de-disciplinas v-bind:disciplinas="disciplinas"></lista-de-disciplinas>
    <div class="fixed-action-btn">
        <a class="btn-floating btn-large red darken-4 modal-trigger" href="#modalAdd">
          <i class="large material-icons">local_printshop</i>
        </a>
      </div>
    <Pagina-De-Impressao></Pagina-De-Impressao>
  </div>
</template>

<script>
  import ListaDeDisciplinas from './AgendarComponents/ListaDeDisciplinas';
  import Navbar from './AgendarComponents/Navbar';
  import {firebase} from '../Firebase'
  import PaginaDeImpressao from './AgendarComponents/PaginaDeImpressao';

  const firebaseDatabase = firebase.database();
  const disciplinasRef = firebaseDatabase.ref('disciplina');

  export default {
    name:'agendar',
    components: {
      Navbar,
      ListaDeDisciplinas,
      PaginaDeImpressao,
    },
    data() {
      return {
        disciplinas: []
      };
    },
    mounted: function() {
        $(".button-collapse").sideNav();
        $('.modal').modal();
    },
    beforeCreate: function() {
      var disciplinasPromise = disciplinasRef.once('value');
        disciplinasPromise.then((snapshot) => {
        snapshot.forEach((item) => {               
          this.disciplinas = item.val();
          this.disciplinas.forEach((item)=> {
            this.$set(item,'pendente',true);
          })
        });             
      });
    }
  };
</script>
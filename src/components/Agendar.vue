<template>
  <div id="agendar">
    <navbar></navbar>
    <lista-de-disciplinas v-bind:disciplinas="disciplinas"></lista-de-disciplinas>
  </div>
</template>

<script>
  import {firebaseauth} from '../FirebaseAuth'
  import ListaDeDisciplinas from './ListaDeDisciplinas';
  import Navbar from './Navbar';
  import disciplinasJSON from '../../dados_json/disciplinascompleto.json'

  disciplinasJSON.disciplinas.forEach((item)=>{
    item.pendente = true;
  })

  export default {
    name:'agendar',
    components: {
      Navbar,
      ListaDeDisciplinas,
    },
    data() {
      return {
        disciplinas: disciplinasJSON.disciplinas,
      };
    },
    beforeCreate: function() {
      firebaseauth.onAuthStateChanged(function(user) {
        if (!user) {
          alert("deslogado, entre para poder acessar essa página");
          window.location.href = "/";
        }
      });
    }
  };
</script>
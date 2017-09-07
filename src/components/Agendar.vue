<template>
  <div id="agendar">
    <navbar></navbar>
    <lista-de-disciplinas v-bind:disciplinas="disciplinas"></lista-de-disciplinas>
  </div>
</template>

<script>
  import {firebase} from '../Firebase'
  import ListaDeDisciplinas from './AgendarComponents/ListaDeDisciplinas';
  import Navbar from './AgendarComponents/Navbar';

  const firebaseDatabase = firebase.database();
  const disciplinasRef = firebaseDatabase.ref('agendamentos');

  /*disciplinasJSON.disciplinas.forEach((item)=>{
    item.pendente = true;
  })*/

  export default {
    name:'agendar',
    components: {
      Navbar,
      ListaDeDisciplinas,
    },
    data() {
      return {
        disciplinas: ''
      };
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
      firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
          alert("deslogado, entre para poder acessar essa página");
          window.location.href = "/";
        }
      });
    }
  };
</script>
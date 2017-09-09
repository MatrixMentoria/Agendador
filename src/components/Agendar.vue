<template>
  <div id="agendar">
    <navbar></navbar>
    <lista-de-disciplinas v-bind:disciplinas="disciplinas"></lista-de-disciplinas>
  </div>
</template>

<script>
  import ListaDeDisciplinas from './AgendarComponents/ListaDeDisciplinas';
  import Navbar from './AgendarComponents/Navbar';
  import {firebase} from '../Firebase'

  const firebaseDatabase = firebase.database();
  const disciplinasRef = firebaseDatabase.ref('agendamentos');

  export default {
    name:'agendar',
    components: {
      Navbar,
      ListaDeDisciplinas,
    },
    data() {
      return {
        disciplinas: []
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
    }
  };
</script>
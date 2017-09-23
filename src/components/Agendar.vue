<template>
  <div id="agendar">
    <navbar></navbar>
    <lista-de-disciplinas v-bind:disciplinas="disciplinas"></lista-de-disciplinas>
    <div class="fixed-action-btn">
        <a class="btn-floating btn-large red darken-4" @click="imprimir()">
          <i class="large material-icons">local_printshop</i>
        </a>
    </div>
    </div>
</template>

<script>
  import ListaDeDisciplinas from './AgendarComponents/ListaDeDisciplinas';
  import Navbar from './AgendarComponents/Navbar';
  import {firebase} from '../Firebase'
  const firebaseDatabase = firebase.database();

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
    methods: {
      imprimir: function(){
        var winPrint = window.open('/impressao', '', 'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
        //winPrint.document.write('<table><thead><tr><th>Disciplina</th><th>Unidade</th><th>Data</th><th>Horario</th><th>Sala</th></tr></thead>');
        //winPrint.document.close();
        winPrint.focus();
        winPrint.print();
       // winPrint.close(); 
      }
    },
    mounted: function() {
      $(".button-collapse").sideNav();
      $('.modal').modal();
      $('.modal').modal({dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .100, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      endingBottom: '0%',
      endingTop: '0%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
      },
      complete: function() { } // Callback for Modal close
    }
  );
    },
    beforeCreate: function() {
      firebaseDatabase.ref('disciplinasCadastradas').once('value').then(disciplina => {
        var self = this;
          disciplina.forEach((discip) => {
            self.disciplinas.push(discip.val());
          });
           this.disciplinas.forEach((item)=> {
            this.$set(item,'pendente',true);
          })
      })
    }
  };
</script>
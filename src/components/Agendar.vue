<template>
  <div id="agendar">
    <navbar></navbar>
    <lista-de-disciplinas v-bind:disciplinas="disciplinas"></lista-de-disciplinas>
  </div>
</template>

<script>
  import ListaDeDisciplinas from './AgendarComponents/ListaDeDisciplinas';
  import Navbar from './AgendarComponents/Navbar';
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
  };
</script>
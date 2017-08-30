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
}
</script>

<style>
    #textoAjuda {
        font-size: 25px;
    }
    /* tabela {
      padding-left: 300px;
    } */

    /* @media only screen and (max-width : 992px) {
      navbar, tabela {
        padding-left: 0;
      }
    } */
</style>



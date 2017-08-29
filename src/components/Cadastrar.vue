<template>
  <div>
    <navbar></navbar>
    <sidenav></sidenav>
    <tabela></tabela>
  </div>
</template>

<script>
import Navbar from './CadastrarComponents/Navbar';
import Sidenav from './CadastrarComponents/Sidenav';
import Tabela from './CadastrarComponents/Tabela';

export default {
  name:'cadastrar',
    components: {
      Navbar,
      Sidenav,
      Tabela,
      //NovoCadastro,
    },
}
</script>

<style>

</style>



<template>
  <div id="app">
	<nav class="nav-wrapper red darken-4">
		<span class="brand-logo center">Agendamentos</span>
  		<ul id="nav-mobile" class="left hide-on-med-and-down">
		    <li><router-link v-bind:to="'/Agendar'">Agendar</router-link></li>
  		  <li><router-link v-bind:to="'/Agendamentos'">Agendamentos</router-link></li>
        </ul>
	</nav>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'app',
}
</script>
<!-- styling for the component -->
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
}
</style>
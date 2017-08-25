<template>
  <div id="login">
    <div class="navbar-fixed">
      <nav id="nav_f" class="red darken-4" role="navigation">
        <a href="http://www.unicarioca.edu.br/" id="logo-container" target="_blank" class="brand-logo center" alt="UniCarioca">Agendamento de Provas</a>
      </nav>
    </div>
    <div class="container">
      <form id="formulario">
        <div class="row">
          <p class="center-align" id="loginEstud">Login de Estudantes</p>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">account_circle</i>
            <input id="icon_prefix" type="text" class="validate">
            <label for="text" data-error="incorreto" data-success="ok">Matrícula: </label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">edit</i>
            <input id="icon_prefix" type="password" class="validate">
            <label for="password" data-error="incorreto" data-success="ok">Senha de Acesso: </label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col l1 s1 offset-l5 push-s4 push-m5 ">
            <router-link to="/Agendar"><a class="red darken-4 waves-effect waves-light btn">Entrar</a></router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<style>
    #loginEstud {
      font-size: 25px;
    }
</style>

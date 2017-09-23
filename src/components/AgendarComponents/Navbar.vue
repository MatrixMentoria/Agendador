<template>
    <div class="navbar-fixed">
        <nav class="nav-wrapper red darken-4">
            <span class="brand-logo center">Agendamento de Provas</span>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a @click="logout">Sair</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
import {firebase} from '../../Firebase'

export default {
    mounted: function() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user.displayName == "adm") {
            alert("Por favor, utilize uma conta de usuário para agendar");
            window.location.href = "/cadastrar";
          }
        });
        $(".button-collapse").sideNav();
    },
    methods: {
        logout: function() {
            firebase.auth().signOut().then(function(){
                window.location.href = "/";
            });
        }
    }
};
</script>

<style>
    #textoAjuda {
        font-size: 25px;
    }
</style>

